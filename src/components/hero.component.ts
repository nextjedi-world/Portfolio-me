import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PortfolioService } from '../services/portfolio.service';
import { ThemeService } from '../services/theme.service';
import { PersonalInfo, Metric } from '../models/portfolio.interface';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatProgressSpinnerModule],
  template: `
    <section class="hero-section">
      <div class="container">
        @if (personalInfo() && metrics()) {
          <div class="hero-grid">
            <!-- Hero Content (Left Side) -->
            <div class="hero-content">
              <h1 class="hero-title">{{ personalInfo()!.name }}</h1>
              <p class="hero-subtitle">
                Founder of
                <a [href]="personalInfo()!.company.url" target="_blank" rel="noopener noreferrer">{{
                  personalInfo()!.company.name
                }}</a>
                · {{ personalInfo()!.title }}
              </p>
              <p class="hero-tagline">"{{ personalInfo()!.tagline }}"</p>

              <!-- Metrics Grid -->
              <div class="metrics-grid">
                @for (metric of metrics(); track metric.id) {
                  <mat-card class="metric-card" [title]="metric.description">
                    <mat-card-content>
                      <div class="metric-value">{{ metric.value }}</div>
                      <div class="metric-label">{{ metric.label }}</div>
                    </mat-card-content>
                  </mat-card>
                }
              </div>

              <!-- CTA Buttons -->
              <div class="cta-group">
                <button
                  mat-raised-button
                  color="accent"
                  (click)="scrollToSection('projects')"
                  type="button"
                >
                  View My Work
                </button>
                <button
                  mat-outlined-button
                  color="primary"
                  (click)="scrollToSection('contact')"
                  type="button"
                >
                  Let's Talk
                </button>
                <a
                  mat-outlined-button
                  color="primary"
                  href="https://github.com/sponsors/nextjedi"
                  target="_blank"
                  rel="noopener noreferrer"
                  type="button"
                  class="sponsor-button"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    style="margin-right: 8px;"
                  >
                    <path
                      d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5z"
                    />
                  </svg>
                  Sponsor
                </a>
              </div>
            </div>

            <!-- Profile Image Section (Right Side) -->
            <div class="hero-image-area">
              <div class="profile-image">
                <img
                  [src]="personalInfo()!.profileImage"
                  [alt]="personalInfo()!.name + ' - ' + personalInfo()!.title"
                  loading="eager"
                  crossorigin="anonymous"
                  (error)="onImageError($event)"
                />
              </div>
            </div>
          </div>
        } @else if (portfolioService.isLoading()) {
          <div class="hero-loading">
            <mat-spinner diameter="50"></mat-spinner>
            <p>Loading portfolio...</p>
          </div>
        } @else if (portfolioService.hasError()) {
          <div class="hero-error">
            <p>Unable to load portfolio data. Please refresh the page.</p>
          </div>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .hero-section {
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        color: var(--color-text);
        min-height: 100vh;
        display: flex;
        align-items: stretch;
        position: relative;
        overflow: hidden;
        padding-top: 0;
        margin-top: -70px;
        padding-top: 70px;
      }

      .hero-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
        align-items: stretch;
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
      }

      .hero-image-area {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }

      .profile-image {
        width: 100%;
        height: 100%;
        min-height: calc(100vh - 70px);
        overflow: hidden;
        position: relative;
        background: var(--color-primary);
      }

      .profile-image::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 30%;
        background: linear-gradient(to top, rgba(43, 32, 20, 0.22), transparent);
        z-index: 1;
      }

      .profile-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        position: relative;
        z-index: 0;
        filter: sepia(0.08) saturate(1.08) contrast(1.04) brightness(1.02);
      }

      .hero-content {
        padding: 80px 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        position: relative;
      }

      .hero-title {
        font-size: var(--font-size-hero);
        font-weight: 700;
        margin-bottom: 16px;
        line-height: 1.1;
        letter-spacing: -0.02em;
        color: var(--color-text);
      }

      .hero-subtitle {
        font-size: 24px;
        margin-bottom: 20px;
        color: var(--color-text-secondary);
        font-weight: 500;
      }

      .hero-subtitle a {
        color: var(--color-primary);
        font-weight: 600;
        text-decoration: underline;
        text-underline-offset: 4px;
      }

      .hero-tagline {
        font-size: 20px;
        margin-bottom: 40px;
        font-style: italic;
        color: var(--color-text-secondary);
        line-height: 1.4;
      }

      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-bottom: 40px;
      }

      mat-card.metric-card {
        background: white !important;
        border: 1px solid rgba(226, 232, 240, 0.8) !important;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
        transition: var(--transition);
        cursor: help;
        text-align: center;
      }

      mat-card.metric-card:hover {
        transform: translateY(-5px);
        background: white !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
        border-color: var(--color-primary) !important;
      }

      mat-card.metric-card mat-card-content {
        padding: 8px;
      }

      .metric-value {
        font-size: 28px;
        font-weight: 700;
        color: var(--color-primary);
        margin-bottom: 5px;
        line-height: 1;
      }

      .metric-label {
        font-size: 14px;
        color: var(--color-text-secondary);
        font-weight: 500;
      }

      .cta-group {
        display: flex;
        gap: 16px;
        flex-wrap: nowrap;
        align-items: center;
        margin-top: 40px;
      }

      .cta-group button,
      .cta-group a {
        padding: 14px 28px;
        font-size: 16px;
        font-weight: 500;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 48px;
        font-family: var(--font-primary);
      }

      .cta-group .btn-primary {
        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
        color: white;
        box-shadow: 0 4px 15px rgba(26, 71, 42, 0.2);
      }

      .cta-group .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(26, 71, 42, 0.3);
      }

      .cta-group .btn-secondary {
        background: white;
        color: var(--color-primary);
        border: 2px solid var(--color-primary);
      }

      .cta-group .btn-secondary:hover {
        background: var(--color-primary);
        color: white;
        transform: translateY(-2px);
      }

      .sponsor-button {
        display: inline-flex;
        align-items: center;
        text-decoration: none;
      }

      .sponsor-button svg {
        color: #ea4aaa;
        transition: transform 0.3s ease;
      }

      .sponsor-button:hover svg {
        transform: scale(1.2);
        color: #d73a99;
      }

      /* Loading and Error States */
      .hero-loading,
      .hero-error {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 400px;
        text-align: center;
      }

      mat-spinner {
        margin-bottom: 20px;
      }

      /* Responsive Design */
      @media (max-width: 1024px) {
        .hero-section {
          margin-top: -60px;
          padding-top: 60px;
        }

        .hero-grid {
          grid-template-columns: 1fr;
          text-align: center;
        }

        .hero-content {
          padding: 60px 40px;
          text-align: left;
        }

        .profile-image {
          min-height: 400px;
          max-height: 500px;
        }
      }

      @media (max-width: 768px) {
        .hero-section {
          padding: 60px 0;
          min-height: auto;
        }

        .hero-title {
          font-size: 36px;
        }

        .hero-subtitle {
          font-size: 20px;
        }

        .hero-tagline {
          font-size: 18px;
        }

        .metrics-grid {
          grid-template-columns: 1fr;
          gap: 15px;
        }

        .profile-image {
          width: 100%;
          max-width: 400px;
          height: 400px;
          margin: 0 auto;
        }

        .cta-group {
          flex-wrap: wrap;
          justify-content: center;
        }

        .cta-group button {
          flex: 1;
          min-width: 140px;
          margin-bottom: 8px;
        }
      }

      @media (max-width: 480px) {
        .hero-title {
          font-size: 28px;
        }

        .hero-subtitle {
          font-size: 18px;
        }

        .hero-tagline {
          font-size: 16px;
        }

        .profile-image {
          width: 100%;
          max-width: 350px;
          height: 350px;
          margin: 0 auto;
        }

        .metric-card {
          padding: 16px;
        }

        .metric-value {
          font-size: 24px;
        }

        .cta-group {
          flex-direction: column;
          gap: 10px;
        }

        .cta-group button {
          width: 100%;
        }
      }
    `,
  ],
})
export class HeroComponent implements OnInit {
  protected readonly personalInfo = signal<PersonalInfo | null>(null);
  protected readonly metrics = signal<Metric[] | null>(null);

  constructor(
    protected portfolioService: PortfolioService,
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    // Load data when component initializes
    this.loadData();

    // Subscribe to data changes
    this.subscribeToDataChanges();
  }

  private loadData(): void {
    const data = this.portfolioService.data();
    if (data) {
      this.personalInfo.set(data.personal);
      this.metrics.set(data.metrics);
    }
  }

  private subscribeToDataChanges(): void {
    // Check for data periodically until loaded
    const checkInterval = setInterval(() => {
      const data = this.portfolioService.data();
      if (data && data.personal) {
        this.personalInfo.set(data.personal);
        this.metrics.set(data.metrics);
        clearInterval(checkInterval);
      }
    }, 100);

    // Clear interval after 10 seconds to prevent memory leak
    setTimeout(() => clearInterval(checkInterval), 10000);
  }

  protected scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  protected onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    // Fallback to a placeholder or default image
    img.src = 'assets/images/profile-placeholder.jpg';
  }
}
