import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { PortfolioService } from '../services/portfolio.service';
import { AnalyticsService } from '../services/analytics.service';
import { Project } from '../models/portfolio.interface';
import { ProjectCardComponent } from './project-card.component';

type ProjectCategory = 'professional' | 'side-project' | 'freelance';

interface CategoryInfo {
  key: ProjectCategory | 'all';
  label: string;
  count: number;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTabsModule, ProjectCardComponent],
  template: `
    <section class="projects-section section" id="projects">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Featured Projects</h2>
          <p class="section-subtitle">Enterprise solutions, side projects, and freelance work</p>
        </div>

        @if (allProjects() && allProjects()!.length > 0) {
          <!-- Category Tabs - Only show if multiple categories exist -->
          @if (shouldShowCategories()) {
            <div class="category-tabs">
              <mat-tab-group
                [selectedIndex]="selectedCategoryIndex()"
                (selectedIndexChange)="onCategoryChange($event)"
                mat-align-tabs="center"
                animationDuration="300ms"
              >
                @for (category of availableCategories(); track category.key) {
                  <mat-tab [label]="category.label + ' (' + category.count + ')'"> </mat-tab>
                }
              </mat-tab-group>
            </div>
          }

          <!-- Projects Grid -->
          <div class="projects-grid" [class.visible]="isVisible">
            @for (project of filteredProjects(); track project.id) {
              <app-project-card
                [project]="project"
                [isVisible]="isVisible"
                [animationDelay]="$index * 0.2 + 's'"
              />
            }
          </div>

          <!-- View More Projects Button -->
          @if (!showingAllProjects() && hasMoreProjectsToShow()) {
            <div class="projects-actions">
              <button
                class="btn btn-primary view-all-btn"
                (click)="showAllProjects()"
                [class.animate-fade-in-up]="isVisible"
                [disabled]="isLoadingMore()"
                style="animation-delay: 1s;"
                type="button"
              >
                @if (isLoadingMore()) {
                  <div class="loading-spinner">
                    <svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                        opacity="0.25"
                      />
                      <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
                    </svg>
                  </div>
                  <span>Loading...</span>
                } @else {
                  <span>View More</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                }
              </button>
            </div>
          } @else if (showingAllProjects() && hasMoreProjectsToShow()) {
            <div class="projects-actions" id="projects-expanded">
              <button
                class="btn btn-secondary view-less-btn"
                (click)="showLessProjects()"
                [class.animate-fade-in-up]="isVisible"
                type="button"
              >
                <span>Show Less</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </button>
            </div>
          }
        } @else if (portfolioService.isLoading()) {
          <!-- Loading State -->
          <div class="projects-loading">
            <div class="loading-grid">
              @for (placeholder of [1, 2, 3]; track $index) {
                <div class="project-placeholder">
                  <div class="placeholder-image"></div>
                  <div class="placeholder-content">
                    <div class="placeholder-title"></div>
                    <div class="placeholder-text"></div>
                    <div class="placeholder-text short"></div>
                    <div class="placeholder-tags"></div>
                  </div>
                </div>
              }
            </div>
          </div>
        } @else if (portfolioService.hasError()) {
          <!-- Error State -->
          <div class="projects-error">
            <div class="error-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h3>Unable to Load Projects</h3>
            <p>There was an error loading the project data. Please try refreshing the page.</p>
            <button mat-raised-button color="accent" (click)="retryLoad()">Retry</button>
          </div>
        } @else {
          <!-- Empty State -->
          <div class="projects-empty">
            <div class="empty-icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="9" x2="15" y2="15" />
                <line x1="15" y1="9" x2="9" y2="15" />
              </svg>
            </div>
            <h3>No Projects Available</h3>
            <p>Projects will be displayed here once they are available.</p>
          </div>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .projects-section {
        background: white;
        position: relative;
      }

      .projects-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background:
          radial-gradient(circle at 20% 80%, rgba(26, 71, 42, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(231, 76, 60, 0.03) 0%, transparent 50%);
        pointer-events: none;
      }

      .section-header {
        text-align: center;
        margin-bottom: 3rem;
        position: relative;
        z-index: 1;
      }

      .category-tabs {
        margin-bottom: 3rem;
        position: relative;
        z-index: 1;
      }

      .category-tabs .mat-mdc-tab-group {
        --mdc-tab-indicator-active-indicator-color: var(--color-primary);
      }

      .category-tabs .mat-mdc-tab {
        --mdc-secondary-navigation-tab-label-text-color: var(--color-text-secondary);
        --mdc-secondary-navigation-tab-active-label-text-color: var(--color-primary);
        --mdc-secondary-navigation-tab-hover-label-text-color: var(--color-primary);
      }

      .category-tabs .mat-mdc-tab-body-content {
        overflow: visible;
      }

      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
        gap: 2.5rem;
        margin-bottom: 3rem;
        position: relative;
        z-index: 1;
      }

      .projects-actions {
        text-align: center;
        position: relative;
        z-index: 1;
        margin-top: 3rem;
      }

      .projects-actions .btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        opacity: 0;
        transform: translateY(20px);
        padding: 14px 28px;
        font-size: 16px;
        font-weight: 500;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      .projects-actions .btn.animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
      }

      .projects-actions .btn.btn-primary {
        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
        color: white;
        box-shadow: 0 4px 15px rgba(26, 71, 42, 0.2);
      }

      .projects-actions .btn.btn-primary:hover {
        box-shadow: 0 6px 20px rgba(26, 71, 42, 0.3);
        transform: translateY(-2px);
      }

      .projects-actions .btn.btn-secondary {
        background: white;
        color: var(--color-primary);
        border: 2px solid var(--color-primary);
      }

      .projects-actions .btn.btn-secondary:hover {
        background: var(--color-primary);
        color: white;
      }

      .projects-actions .btn svg {
        transition: transform 0.3s ease;
      }

      .projects-actions .btn.view-all-btn:hover svg {
        transform: translateY(2px);
      }

      .projects-actions .btn.view-less-btn:hover svg {
        transform: translateY(-2px);
      }

      /* Loading States */
      .projects-loading {
        position: relative;
        z-index: 1;
      }

      .loading-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
        gap: 2.5rem;
      }

      .project-placeholder {
        background: white;
        border-radius: var(--border-radius);
        overflow: hidden;
        box-shadow: var(--box-shadow);
        animation: pulse 2s ease-in-out infinite alternate;
      }

      .placeholder-image {
        height: 240px;
        background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
      }

      .placeholder-content {
        padding: var(--spacing-card);
      }

      .placeholder-title {
        height: 24px;
        background: #e0e0e0;
        border-radius: 4px;
        margin-bottom: 16px;
        width: 80%;
      }

      .placeholder-text {
        height: 16px;
        background: #f0f0f0;
        border-radius: 4px;
        margin-bottom: 8px;
      }

      .placeholder-text.short {
        width: 60%;
      }

      .placeholder-tags {
        height: 32px;
        background: #e0e0e0;
        border-radius: 4px;
        margin-top: 20px;
        width: 70%;
      }

      /* Error State */
      .projects-error {
        text-align: center;
        padding: 4rem 2rem;
        position: relative;
        z-index: 1;
      }

      .error-icon {
        color: var(--color-accent);
        margin-bottom: 1.5rem;
      }

      .projects-error h3 {
        color: var(--color-text);
        margin-bottom: 1rem;
        font-size: 1.5rem;
      }

      .projects-error p {
        color: var(--color-text-secondary);
        margin-bottom: 2rem;
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
      }

      /* Empty State */
      .projects-empty {
        text-align: center;
        padding: 4rem 2rem;
        position: relative;
        z-index: 1;
      }

      .empty-icon {
        color: var(--color-neutral);
        margin-bottom: 1.5rem;
      }

      .projects-empty h3 {
        color: var(--color-text);
        margin-bottom: 1rem;
        font-size: 1.5rem;
      }

      .projects-empty p {
        color: var(--color-text-secondary);
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
      }

      /* Loading Spinner */
      .loading-spinner {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .spinner {
        animation: spin 1s linear infinite;
      }

      .view-all-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      .view-all-btn:disabled:hover {
        transform: none;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }

      /* Animations */
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes pulse {
        from {
          opacity: 1;
        }
        to {
          opacity: 0.6;
        }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Responsive Design */
      @media (max-width: 1024px) {
        .projects-grid {
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .loading-grid {
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }
      }

      @media (max-width: 768px) {
        .projects-grid {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .loading-grid {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .section-header {
          margin-bottom: 2.5rem;
        }

        .projects-error,
        .projects-empty {
          padding: 2rem 1rem;
        }
      }

      @media (max-width: 480px) {
        .projects-actions .btn {
          width: 100%;
          max-width: 300px;
        }
      }

      /* Intersection Observer Enhancement */
      .projects-grid.visible app-project-card {
        animation-play-state: running;
      }
    `,
  ],
})
export class ProjectsComponent implements OnInit {
  protected readonly allProjects = signal<Project[] | null>(null);
  protected readonly selectedCategory = signal<ProjectCategory | 'all'>('all');
  protected readonly availableCategories = signal<CategoryInfo[]>([]);
  protected readonly selectedCategoryIndex = signal<number>(0);
  protected readonly showingAllProjects = signal<boolean>(false);
  protected readonly isLoadingMore = signal<boolean>(false);
  protected isVisible = false;

  constructor(
    protected portfolioService: PortfolioService,
    private router: Router,
    private analyticsService: AnalyticsService,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.setupIntersectionObserver();

    // Subscribe to data changes
    this.subscribeToDataChanges();
  }

  private loadData(): void {
    const data = this.portfolioService.data();
    if (data && data.projectCategories) {
      const allProjects = this.portfolioService.getProjects();
      this.allProjects.set(allProjects);
      this.setupCategories(allProjects);
    }
  }

  private subscribeToDataChanges(): void {
    // Check for data periodically until loaded
    const checkInterval = setInterval(() => {
      const data = this.portfolioService.data();
      if (data && data.projectCategories) {
        const allProjects = this.portfolioService.getProjects();
        this.allProjects.set(allProjects);
        this.setupCategories(allProjects);
        clearInterval(checkInterval);
      }
    }, 100);

    // Clear interval after 10 seconds to prevent memory leak
    setTimeout(() => clearInterval(checkInterval), 10000);
  }

  private setupCategories(projects: Project[]): void {
    // Get categories from the service
    const serviceCategories = this.portfolioService.getAvailableCategories();

    // Create category info array
    const categories: CategoryInfo[] = [];

    // Add "All" category only if we have multiple categories
    if (serviceCategories.length > 1) {
      categories.push({
        key: 'all',
        label: 'All Projects',
        count: projects.length,
      });
    }

    // Add individual categories from service
    serviceCategories.forEach((category) => {
      categories.push({
        key: category.key,
        label: category.label,
        count: category.count,
      });
    });

    this.availableCategories.set(categories);

    // Set initial category: if only one category exists, select it automatically
    if (serviceCategories.length === 1) {
      this.selectedCategory.set(serviceCategories[0].key);
    } else {
      this.selectedCategory.set('all');
    }
  }

  private setupIntersectionObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      },
    );

    // Observe the projects section
    setTimeout(() => {
      const section = document.querySelector('.projects-section');
      if (section) {
        observer.observe(section);
      }
    }, 100);
  }

  protected retryLoad(): void {
    this.portfolioService.refreshData().subscribe(() => {
      this.loadData();
    });
  }

  // Category management methods
  protected shouldShowCategories(): boolean {
    const categories = this.availableCategories();
    return categories.length > 1; // Show tabs only if multiple categories or "All" exists
  }

  protected filteredProjects(): Project[] {
    const selectedCategory = this.selectedCategory();
    const showingAll = this.showingAllProjects();

    if (selectedCategory === 'all') {
      // Show all or featured projects based on state
      if (showingAll) {
        return this.portfolioService.getProjects();
      } else {
        return this.portfolioService.getFeaturedProjects(4);
      }
    } else {
      // Show all or limited projects from the selected category
      const categoryProjects = this.portfolioService.getProjectsByCategory(selectedCategory);
      if (showingAll) {
        return categoryProjects;
      } else {
        return categoryProjects.slice(0, 4);
      }
    }
  }

  protected onCategoryChange(categoryIndex: number): void {
    const categories = this.availableCategories();
    if (categoryIndex >= 0 && categoryIndex < categories.length) {
      const selectedCategoryKey = categories[categoryIndex].key;
      this.selectedCategory.set(selectedCategoryKey);
      this.selectedCategoryIndex.set(categoryIndex);
      // Reset showing all when category changes
      this.showingAllProjects.set(false);
    }
  }

  protected hasMoreProjectsToShow(): boolean {
    const selectedCategory = this.selectedCategory();

    if (selectedCategory === 'all') {
      // Check if there are more than 4 total projects
      const allProjects = this.portfolioService.getProjects();
      return allProjects.length > 4;
    } else {
      // Check if the selected category has more than 4 projects
      const categoryProjects = this.portfolioService.getProjectsByCategory(selectedCategory);
      return categoryProjects.length > 4;
    }
  }

  protected showAllProjects(): void {
    // Show loading state
    this.isLoadingMore.set(true);

    // Simulate loading delay to show the loading spinner
    setTimeout(() => {
      // Expand to show all projects
      this.showingAllProjects.set(true);
      this.isLoadingMore.set(false);
    }, 800); // 800ms loading delay
  }

  protected showLessProjects(): void {
    // Collapse back to first 4 projects and scroll to the expanded section
    this.showingAllProjects.set(false);

    // Scroll to the top of the projects section after collapsing
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        const navHeight = 70; // Navigation height
        const elementPosition = projectsSection.offsetTop - navHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth',
        });
      }
    }, 100); // Small delay to allow DOM update
  }
}
