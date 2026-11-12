import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PortfolioData, Project } from '../models/portfolio.interface';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private portfolioData = signal<PortfolioData | null>(null);
  private loading = signal<boolean>(false);
  private error = signal<string | null>(null);

  constructor(private http: HttpClient) {
    this.loadPortfolioData();
  }

  get data() {
    return this.portfolioData.asReadonly();
  }

  get isLoading() {
    return this.loading.asReadonly();
  }

  get hasError() {
    return this.error.asReadonly();
  }

  private loadPortfolioData(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<PortfolioData>('/data/portfolio.json')
      .pipe(
        map((data) => {
          // Resolve all references in the data
          const resolvedData = this.resolveReferences(data);
          this.portfolioData.set(resolvedData);
          this.loading.set(false);
          return resolvedData;
        }),
        catchError((error) => {
          console.error('Failed to load portfolio data:', error);
          this.error.set('Failed to load portfolio data');
          this.loading.set(false);
          return of(null);
        }),
      )
      .subscribe();
  }

  private resolveReferences(data: any): any {
    if (!data || typeof data !== 'object') {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.resolveReferences(item));
    }

    const resolved: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string' && value.startsWith('@shared.')) {
        // Resolve reference
        resolved[key] = this.resolveReference(value, data);
      } else if (typeof value === 'object') {
        // Recursively resolve nested objects
        resolved[key] = this.resolveReferences(value);
      } else {
        resolved[key] = value;
      }
    }

    return resolved;
  }

  private resolveReference(reference: string, data: any): any {
    // Remove @ and split by dots
    const path = reference.substring(1).split('.');

    let current = data;
    for (const segment of path) {
      if (current && typeof current === 'object' && segment in current) {
        current = current[segment];
      } else {
        console.warn(`Reference ${reference} could not be resolved`);
        return reference; // Return original reference if resolution fails
      }
    }

    return current;
  }

  getPersonalInfo() {
    return this.portfolioData()?.personal || null;
  }

  getMetrics() {
    return this.portfolioData()?.metrics || [];
  }

  getStory() {
    return this.portfolioData()?.story || null;
  }

  getProjects() {
    const data = this.portfolioData();
    if (!data?.projectCategories) return [];

    // Flatten all projects from all categories
    const allProjects: Project[] = [];
    Object.values(data.projectCategories).forEach((category) => {
      Object.values(category.projects).forEach((project) => {
        allProjects.push(project);
      });
    });

    return allProjects;
  }

  getProjectCategories() {
    return this.portfolioData()?.projectCategories || {};
  }

  getProjectsByCategory(categoryKey: string) {
    const categories = this.getProjectCategories();
    if (!categories[categoryKey]) return [];

    return Object.values(categories[categoryKey].projects);
  }

  getFeaturedProjects(limit: number = 3) {
    return this.getProjects().slice(0, limit);
  }

  getFeaturedProjectsByCategory(categoryKey: string) {
    const categories = this.getProjectCategories();
    const category = categories[categoryKey];

    if (!category) return [];

    return category.featured.map((projectId) => category.projects[projectId]).filter(Boolean);
  }

  getProjectById(id: string) {
    return this.getProjects().find((project) => project.id === id) || null;
  }

  getSkills() {
    return this.portfolioData()?.skills || null;
  }

  getContact() {
    return this.portfolioData()?.contact || null;
  }

  getNavigation() {
    return this.portfolioData()?.navigation || [];
  }

  getBlog() {
    return this.portfolioData()?.blog || null;
  }

  getSEO() {
    return this.portfolioData()?.seo || null;
  }

  getTheme() {
    return this.portfolioData()?.theme || null;
  }

  refreshData(): Observable<PortfolioData | null> {
    this.loadPortfolioData();
    return of(this.portfolioData());
  }

  // Utility method to generate URL-friendly slugs from project titles
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim() // Remove leading/trailing spaces
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }

  // Get project by URL slug
  getProjectBySlug(slug: string) {
    const projects = this.getProjects();
    return (
      projects.find((project) => {
        const projectSlug = this.generateSlug(project.title);
        return projectSlug === slug;
      }) || null
    );
  }

  // Get all projects with their generated slugs
  getProjectsWithSlugs() {
    return this.getProjects().map((project) => ({
      ...project,
      slug: this.generateSlug(project.title),
    }));
  }

  // Get available categories with metadata for UI components
  getAvailableCategories() {
    const categories = this.getProjectCategories();
    return Object.entries(categories).map(([key, category]) => ({
      key: key as 'professional' | 'side-project' | 'freelance',
      label: category.label,
      description: category.description,
      icon: category.icon,
      count: Object.keys(category.projects).length,
      featured: category.featured,
    }));
  }
}
