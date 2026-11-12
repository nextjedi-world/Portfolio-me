import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Project } from '../models/portfolio.interface';
import { PortfolioService } from '../services/portfolio.service';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule],
  template: `
    @if (project) {
      <mat-card
        class="project-card"
        [class.animate-fade-in-up]="isVisible"
        [style.animation-delay]="animationDelay"
      >
        <!-- Project Image -->
        <mat-card-header class="project-image" (click)="showCaseStudy()">
          <img
            [src]="project.image"
            [alt]="project.title + ' screenshot'"
            loading="lazy"
            crossorigin="anonymous"
            (error)="onImageError($event)"
          />
          <div class="image-overlay">
            <div class="overlay-content">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15,3 21,3 21,9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>View Case Study</span>
            </div>
          </div>
        </mat-card-header>

        <!-- Project Content -->
        <mat-card-content class="project-content">
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-description">{{ project.description }}</p>

          <!-- Project Metrics -->
          @if (hasMetrics()) {
            <div class="project-metrics">
              <div class="metrics-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
                </svg>
              </div>
              @for (metric of getMetricsArray(); track $index) {
                <span class="metric-item">{{ metric }}</span>
                @if ($index < getMetricsArray().length - 1) {
                  <span class="metric-separator">|</span>
                }
              }
            </div>
          }

          <!-- Tech Stack -->
          @if (project.techStack && project.techStack.length > 0) {
            <mat-chip-set class="tech-stack">
              @for (tech of project.techStack; track tech) {
                <mat-chip>{{ tech }}</mat-chip>
              }
            </mat-chip-set>
          }
        </mat-card-content>

        <!-- Action Button -->
        <mat-card-actions class="project-actions">
          <button mat-raised-button color="accent" (click)="showCaseStudy()" type="button">
            <span>View Case Study</span>
            <mat-icon>open_in_new</mat-icon>
          </button>
        </mat-card-actions>
      </mat-card>
    }
  `,
  styles: [
    `
      mat-card.project-card {
        height: 100%;
        display: flex;
        flex-direction: column;
        opacity: 0;
        transform: translateY(30px);
        transition: var(--transition);
      }

      .project-card.animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
      }

      .project-card:hover {
        transform: translateY(-8px);
        box-shadow: var(--box-shadow-hover);
      }

      .project-image {
        height: 240px;
        position: relative;
        overflow: hidden;
        background: linear-gradient(45deg, #f8f9fa, #e9ecef);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .project-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--transition);
      }

      .image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(26, 71, 42, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: var(--transition);
      }

      .project-card:hover .image-overlay {
        opacity: 1;
      }

      .project-card:hover .project-image img {
        transform: scale(1.1);
      }

      .overlay-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        text-align: center;
        gap: 8px;
      }

      .overlay-content svg {
        width: 32px;
        height: 32px;
      }

      .overlay-content span {
        font-size: 14px;
        font-weight: 600;
      }

      .project-content {
        padding: var(--spacing-card);
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }

      .project-title {
        font-size: var(--font-size-card);
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--color-primary);
        line-height: 1.3;
      }

      .project-description {
        font-size: var(--font-size-body);
        color: var(--color-text);
        line-height: 1.6;
        margin-bottom: 20px;
        flex-grow: 1;
      }

      .project-metrics {
        background: linear-gradient(135deg, rgba(26, 71, 42, 0.1), rgba(39, 174, 96, 0.1));
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-size: 13px;
        color: var(--color-primary);
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }

      .metrics-icon {
        color: var(--color-success);
        display: flex;
        align-items: center;
      }

      .metric-item {
        white-space: nowrap;
      }

      .metric-separator {
        color: var(--color-text-secondary);
        margin: 0 4px;
      }

      .tech-stack {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 24px;
      }

      .tech-tag {
        background: var(--color-primary);
        color: white;
        padding: 4px 10px;
        border-radius: 16px;
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
      }

      .project-actions {
        margin-top: auto;
      }

      .project-actions .btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px 24px;
      }

      .project-actions .btn:hover svg {
        transform: translate(2px, -2px);
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        .project-image {
          height: 200px;
        }

        .project-content {
          padding: 20px;
        }

        .tech-stack {
          gap: 4px;
        }

        .tech-tag {
          font-size: 11px;
          padding: 3px 8px;
        }

        .project-metrics {
          font-size: 12px;
          padding: 10px 12px;
        }
      }

      /* Animation keyframes */
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

      /* Fallback for missing images */
      .project-image.no-image {
        background: linear-gradient(45deg, var(--color-light), var(--color-neutral));
        color: var(--color-text-secondary);
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .project-image.no-image::before {
        content: '📋';
        font-size: 48px;
        display: block;
        margin-bottom: 8px;
      }
    `,
  ],
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Input() isVisible = false;
  @Input() animationDelay = '0s';

  constructor(
    private router: Router,
    private portfolioService: PortfolioService,
    private analyticsService: AnalyticsService,
  ) {}

  protected hasMetrics(): boolean {
    return !!(this.project?.metrics && Object.keys(this.project.metrics).length > 0);
  }

  protected getMetricsArray(): string[] {
    if (!this.hasMetrics() || !this.project?.metrics) return [];
    return Object.values(this.project.metrics);
  }

  protected onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    const container = img.parentElement;
    if (container) {
      container.classList.add('no-image');
      img.style.display = 'none';
    }
  }

  protected showCaseStudy(): void {
    console.log('Case study clicked for project:', this.project.title);

    // Track project click
    const category = this.project.category || 'Uncategorized';
    this.analyticsService.trackEvent(
      'click_project',
      'Projects',
      `${category}: ${this.project.title}`,
    );

    // Generate slug from project title
    const projectSlug = this.portfolioService.generateSlug(this.project.title);

    // Navigate to project detail page
    this.router.navigate([projectSlug, 'detail']);
  }

  protected trackCaseStudyClick(): void {
    // Keep for backward compatibility
    this.showCaseStudy();
  }
}
