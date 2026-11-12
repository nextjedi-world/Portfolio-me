import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioService } from '../services/portfolio.service';
import { SEOService } from '../services/seo.service';
import { AnalyticsService } from '../services/analytics.service';
import { Project } from '../models/portfolio.interface';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
  ],
  template: `
    <div class="project-detail-page">
      <!-- Navigation Header -->
      <header class="detail-header">
        <div class="container">
          <button mat-icon-button class="back-button" (click)="goBack()" aria-label="Go back">
            <mat-icon>arrow_back</mat-icon>
          </button>
          <div class="header-content">
            <h1 class="page-title">Project Details</h1>
            <p class="page-subtitle">Comprehensive case study</p>
          </div>
        </div>
      </header>

      @if (project()) {
        <main class="detail-content">
          <div class="container">
            <!-- Hero Section -->
            <section class="project-hero">
              <div class="hero-grid">
                <div class="project-image-large">
                  <img
                    [src]="project()!.image"
                    [alt]="project()!.title + ' screenshot'"
                    loading="eager"
                    crossorigin="anonymous"
                    (error)="onImageError($event)"
                  />
                  <div class="image-badge">
                    <mat-icon>rocket_launch</mat-icon>
                    <span>Live Project</span>
                  </div>
                </div>

                <div class="project-info">
                  <h1 class="project-title">{{ project()!.title }}</h1>
                  <p class="project-description">{{ project()!.description }}</p>

                  <!-- Project Actions -->
                  <div class="project-actions">
                    @if (project()!.demoUrl) {
                      <button mat-raised-button color="accent" (click)="openDemo()" type="button">
                        <mat-icon>open_in_new</mat-icon>
                        <span>View Live Demo</span>
                      </button>
                    }
                    @if (project()!.githubUrl) {
                      <button
                        mat-outlined-button
                        color="primary"
                        (click)="openGithub()"
                        type="button"
                      >
                        <mat-icon>code</mat-icon>
                        <span>View Source</span>
                      </button>
                    }
                  </div>

                  <!-- Tech Stack -->
                  @if (project()!.techStack && project()!.techStack!.length > 0) {
                    <div class="tech-stack-section">
                      <h3>Technology Stack</h3>
                      <mat-chip-set class="tech-chips">
                        @for (tech of project()!.techStack; track tech) {
                          <mat-chip>{{ tech }}</mat-chip>
                        }
                      </mat-chip-set>
                    </div>
                  }
                </div>
              </div>
            </section>

            <!-- Project Details Grid -->
            <section class="project-details">
              <div class="details-grid">
                <!-- Key Highlights -->
                @if (project()!.highlights && project()!.highlights!.length > 0) {
                  <mat-card class="detail-card">
                    <mat-card-header>
                      <div class="card-icon">
                        <mat-icon>star</mat-icon>
                      </div>
                      <mat-card-title>Key Highlights</mat-card-title>
                    </mat-card-header>
                    <mat-card-content>
                      <ul class="highlights-list">
                        @for (highlight of project()!.highlights; track $index) {
                          <li>{{ highlight }}</li>
                        }
                      </ul>
                    </mat-card-content>
                  </mat-card>
                }

                <!-- Project Metrics -->
                @if (hasMetrics()) {
                  <mat-card class="detail-card">
                    <mat-card-header>
                      <div class="card-icon">
                        <mat-icon>analytics</mat-icon>
                      </div>
                      <mat-card-title>Project Metrics</mat-card-title>
                    </mat-card-header>
                    <mat-card-content>
                      <div class="metrics-grid">
                        @for (metric of getMetricsArray(); track $index) {
                          <div class="metric-item">
                            <div class="metric-value">{{ metric.value }}</div>
                            <div class="metric-label">{{ metric.key }}</div>
                          </div>
                        }
                      </div>
                    </mat-card-content>
                  </mat-card>
                }

                <!-- Project Timeline -->
                <mat-card class="detail-card">
                  <mat-card-header>
                    <div class="card-icon">
                      <mat-icon>schedule</mat-icon>
                    </div>
                    <mat-card-title>Project Timeline</mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <div class="timeline">
                      <div class="timeline-item">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                          <h4>Planning & Design</h4>
                          <p>Requirements analysis, system architecture, and UI/UX design</p>
                        </div>
                      </div>
                      <div class="timeline-item">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                          <h4>Development</h4>
                          <p>Core functionality implementation and feature development</p>
                        </div>
                      </div>
                      <div class="timeline-item">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                          <h4>Testing & Deployment</h4>
                          <p>Quality assurance, performance optimization, and production launch</p>
                        </div>
                      </div>
                    </div>
                  </mat-card-content>
                </mat-card>

                <!-- Technical Implementation -->
                <mat-card class="detail-card full-width">
                  <mat-card-header>
                    <div class="card-icon">
                      <mat-icon>engineering</mat-icon>
                    </div>
                    <mat-card-title>Technical Implementation</mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <p class="implementation-text">
                      This project demonstrates enterprise-level software development practices with
                      a focus on scalability, maintainability, and performance. The architecture
                      leverages modern technologies and follows industry best practices for
                      {{ project()!.techStack?.join(', ') || 'full-stack development' }}.
                    </p>
                    <p class="implementation-text">
                      Key technical decisions were made to ensure optimal user experience, robust
                      security measures, and efficient resource utilization. The solution addresses
                      real-world business challenges with measurable outcomes.
                    </p>
                  </mat-card-content>
                </mat-card>
              </div>
            </section>

            <!-- Call to Action -->
            <section class="project-cta">
              <div class="cta-content">
                <h2>Interested in Similar Solutions?</h2>
                <p>
                  Let's discuss how I can help bring your project ideas to life with proven
                  expertise and innovative approaches.
                </p>
                <div class="cta-actions">
                  <button class="btn btn-cta-primary" (click)="contactMe()" type="button">
                    <mat-icon>message</mat-icon>
                    <span>Let's Talk</span>
                  </button>
                  <button class="btn btn-cta-secondary" (click)="viewAllProjects()" type="button">
                    <mat-icon>apps</mat-icon>
                    <span>View All Projects</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      } @else if (isLoading()) {
        <!-- Loading State -->
        <div class="detail-loading">
          <div class="container">
            <div class="loading-content">
              <div class="loading-spinner"></div>
              <h2>Loading Project Details...</h2>
              <p>Please wait while we fetch the project information.</p>
            </div>
          </div>
        </div>
      } @else {
        <!-- Error/Not Found State -->
        <div class="detail-error">
          <div class="container">
            <div class="error-content">
              <mat-icon class="error-icon">error_outline</mat-icon>
              <h2>Project Not Found</h2>
              <p>The requested project could not be found or may have been moved.</p>
              <div class="error-actions">
                <button mat-raised-button color="accent" (click)="goBack()" type="button">
                  <mat-icon>arrow_back</mat-icon>
                  <span>Go Back</span>
                </button>
                <button mat-outlined-button color="primary" (click)="goHome()" type="button">
                  <mat-icon>home</mat-icon>
                  <span>Go Home</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .project-detail-page {
        min-height: 100vh;
        background: var(--color-light);
      }

      .detail-header {
        background: white;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        padding: 1rem 0;
        position: sticky;
        top: 70px; /* Account for main navigation */
        z-index: 100;
      }

      .detail-header .container {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .back-button {
        color: var(--color-primary);
      }

      .header-content {
        flex-grow: 1;
      }

      .page-title {
        font-size: 24px;
        font-weight: 600;
        color: var(--color-primary);
        margin: 0;
        line-height: 1.2;
      }

      .page-subtitle {
        font-size: 14px;
        color: var(--color-text-secondary);
        margin: 0;
      }

      .detail-content {
        padding: 2rem 0;
      }

      .project-hero {
        margin-bottom: 3rem;
      }

      .hero-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: start;
      }

      .project-image-large {
        position: relative;
        border-radius: var(--border-radius);
        overflow: hidden;
        box-shadow: var(--box-shadow-hover);
        aspect-ratio: 16/10;
      }

      .project-image-large img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--transition);
      }

      .image-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: var(--color-accent);
        color: white;
        padding: 8px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .image-badge mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }

      .project-info {
        padding: 1rem 0;
      }

      .project-title {
        font-size: var(--font-size-hero);
        font-weight: 700;
        color: var(--color-primary);
        margin-bottom: 1.5rem;
        line-height: 1.1;
      }

      .project-description {
        font-size: 18px;
        line-height: 1.6;
        color: var(--color-text);
        margin-bottom: 2rem;
      }

      .project-actions {
        display: flex;
        gap: 1rem;
        margin-bottom: 2.5rem;
        flex-wrap: wrap;
      }

      .project-actions button {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .tech-stack-section h3 {
        font-size: 18px;
        font-weight: 600;
        color: var(--color-primary);
        margin-bottom: 1rem;
      }

      .tech-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .project-details {
        margin-bottom: 3rem;
      }

      .details-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
      }

      .detail-card {
        height: fit-content;
      }

      .detail-card.full-width {
        grid-column: 1 / -1;
      }

      .detail-card mat-card-header {
        margin-bottom: 1rem;
      }

      .card-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
        color: white;
        border-radius: 50%;
        margin-right: 1rem;
      }

      .highlights-list {
        padding-left: 1.5rem;
        margin: 0;
      }

      .highlights-list li {
        margin-bottom: 0.8rem;
        line-height: 1.6;
        color: var(--color-text);
      }

      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1.5rem;
      }

      .metric-item {
        text-align: center;
        padding: 1rem;
        background: var(--color-light);
        border-radius: 8px;
      }

      .metric-value {
        font-size: 24px;
        font-weight: 700;
        color: var(--color-accent);
        margin-bottom: 0.5rem;
      }

      .metric-label {
        font-size: 12px;
        color: var(--color-text-secondary);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .timeline {
        position: relative;
        padding-left: 2rem;
      }

      .timeline::before {
        content: '';
        position: absolute;
        left: 10px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: var(--color-primary);
      }

      .timeline-item {
        position: relative;
        margin-bottom: 2rem;
      }

      .timeline-marker {
        position: absolute;
        left: -2rem;
        top: 0;
        width: 12px;
        height: 12px;
        background: var(--color-accent);
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 0 3px var(--color-primary);
      }

      .timeline-content h4 {
        font-size: 16px;
        font-weight: 600;
        color: var(--color-primary);
        margin-bottom: 0.5rem;
      }

      .timeline-content p {
        color: var(--color-text);
        margin: 0;
        line-height: 1.5;
      }

      .implementation-text {
        font-size: 16px;
        line-height: 1.7;
        color: var(--color-text);
        margin-bottom: 1.5rem;
      }

      .project-cta {
        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
        color: white;
        padding: 4rem 2rem;
        border-radius: var(--border-radius);
        text-align: center;
        margin-top: 2rem;
      }

      .cta-content h2 {
        font-size: 32px;
        font-weight: 600;
        margin-bottom: 1rem;
        color: white;
      }

      .cta-content p {
        font-size: 18px;
        margin-bottom: 2rem;
        opacity: 0.9;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        color: rgba(255, 255, 255, 0.9);
      }

      .cta-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      .cta-actions .btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 28px;
        font-size: 16px;
        font-weight: 500;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
      }

      .cta-actions .btn-cta-primary {
        background: white;
        color: var(--color-primary);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }

      .cta-actions .btn-cta-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      }

      .cta-actions .btn-cta-secondary {
        background: transparent;
        color: white;
        border: 2px solid white;
      }

      .cta-actions .btn-cta-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
      }

      .cta-actions .btn mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
      }

      /* Loading State */
      .detail-loading,
      .detail-error {
        min-height: 60vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }

      .loading-content,
      .error-content {
        max-width: 400px;
      }

      .loading-spinner {
        width: 60px;
        height: 60px;
        border: 4px solid rgba(26, 71, 42, 0.1);
        border-left: 4px solid var(--color-primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 2rem;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      .error-icon {
        font-size: 60px;
        width: 60px;
        height: 60px;
        color: var(--color-accent);
        margin-bottom: 1rem;
      }

      .error-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
        flex-wrap: wrap;
      }

      .error-actions button {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      /* Responsive Design */
      @media (max-width: 1024px) {
        .hero-grid {
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .project-title {
          font-size: 36px;
        }

        .details-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 768px) {
        .detail-header {
          top: 60px;
        }

        .detail-content {
          padding: 1rem 0;
        }

        .project-title {
          font-size: 28px;
        }

        .project-description {
          font-size: 16px;
        }

        .project-actions,
        .cta-actions {
          flex-direction: column;
        }

        .project-actions button,
        .cta-actions button {
          width: 100%;
          justify-content: center;
        }

        .cta-content h2 {
          font-size: 24px;
        }

        .cta-content p {
          font-size: 16px;
        }

        .timeline {
          padding-left: 1.5rem;
        }

        .timeline-marker {
          left: -1.5rem;
        }
      }

      @media (max-width: 480px) {
        .project-actions {
          gap: 0.5rem;
        }

        .metrics-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .project-cta {
          padding: 2rem 0;
        }
      }
    `,
  ],
})
export class ProjectDetailComponent implements OnInit {
  protected readonly project = signal<Project | null>(null);
  protected readonly isLoading = signal<boolean>(true);
  private projectSlug: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private portfolioService: PortfolioService,
    private seoService: SEOService,
    private analyticsService: AnalyticsService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.projectSlug = params.get('projectSlug') || '';
      this.loadProject();
    });
  }

  private loadProject(): void {
    this.isLoading.set(true);

    // Get project by slug from portfolio service
    const foundProject = this.portfolioService.getProjectBySlug(this.projectSlug);

    setTimeout(() => {
      this.project.set(foundProject);
      this.isLoading.set(false);

      // Update SEO for project page
      if (foundProject) {
        this.seoService.updateProjectSEO(foundProject);
        this.seoService.addProjectStructuredData(foundProject);

        // Track project view
        const category = foundProject.category || 'Uncategorized';
        this.analyticsService.trackProjectView(foundProject.title, category);
      }
    }, 500); // Small delay for better UX
  }

  protected hasMetrics(): boolean {
    const project = this.project();
    return !!(project?.metrics && Object.keys(project.metrics).length > 0);
  }

  protected getMetricsArray(): { key: string; value: string }[] {
    if (!this.hasMetrics()) return [];
    return Object.entries(this.project()!.metrics!).map(([key, value]) => ({ key, value }));
  }

  protected onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/project-placeholder.jpg';
  }

  protected openDemo(): void {
    const demoUrl = this.project()?.demoUrl;
    if (demoUrl) {
      this.analyticsService.trackExternalLink(demoUrl, 'Project Demo');
      window.open(demoUrl, '_blank', 'noopener,noreferrer');
    }
  }

  protected openGithub(): void {
    const githubUrl = this.project()?.githubUrl;
    if (githubUrl) {
      this.analyticsService.trackExternalLink(githubUrl, 'Project GitHub');
      window.open(githubUrl, '_blank', 'noopener,noreferrer');
    }
  }

  protected contactMe(): void {
    // Scroll to contact section on home page
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const contactElement = document.getElementById('contact');
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  }

  protected viewAllProjects(): void {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const projectsElement = document.getElementById('projects');
        if (projectsElement) {
          projectsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  }

  protected goBack(): void {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.goHome();
    }
  }

  protected goHome(): void {
    this.router.navigate(['/']);
  }
}
