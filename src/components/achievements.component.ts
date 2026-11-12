import { Component, OnInit, signal, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PortfolioService } from '../services/portfolio.service';
import { Achievement } from '../models/portfolio.interface';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDialogModule, MatButtonModule],
  template: `
    <section class="achievements-section section" id="achievements">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Recognition & Achievements</h2>
          <p class="section-subtitle">
            Proven excellence in competitive programming and technical leadership
          </p>
        </div>

        @if (achievements() && achievements()!.length > 0) {
          <div class="achievements-grid" [class.visible]="isVisible">
            @for (achievement of getDisplayedAchievements(); track achievement.title) {
              <div
                class="achievement-badge"
                [class]="
                  'achievement-badge achievement-' +
                  achievement.type +
                  (achievement.certificateUrl ? ' has-certificate' : '')
                "
                [class.animate-fade-in-up]="isVisible"
                [style.animation-delay]="$index * 0.1 + 's'"
                [attr.role]="achievement.certificateUrl ? 'button' : null"
                [attr.tabindex]="achievement.certificateUrl ? '0' : null"
                (click)="achievement.certificateUrl ? openCertificate(achievement) : null"
                (keydown.enter)="achievement.certificateUrl ? openCertificate(achievement) : null"
                (keydown.space)="achievement.certificateUrl ? openCertificate(achievement) : null"
              >
                <div class="badge-glow"></div>
                <div class="badge-ribbon">
                  <span class="ribbon-text">{{ getTypeLabel(achievement.type) }}</span>
                </div>
                <div class="badge-icon">
                  <mat-icon>{{ getAchievementIcon(achievement.type) }}</mat-icon>
                </div>
                <div class="badge-content">
                  <h3 class="badge-title">{{ achievement.title }}</h3>
                  <p class="badge-description">{{ achievement.description }}</p>
                  <div class="badge-year">{{ achievement.year }}</div>
                </div>
                @if (achievement.certificateUrl) {
                  <div class="badge-certificate-hint">
                    <mat-icon>description</mat-icon>
                    <span>View Certificate</span>
                  </div>
                }
              </div>
            }
          </div>

          @if (shouldShowExpandButton()) {
            <div class="expand-button-container">
              <button
                mat-raised-button
                color="primary"
                class="expand-button"
                (click)="toggleExpanded()"
                [class.animate-fade-in-up]="isVisible"
                [style.animation-delay]="getDisplayedAchievements().length * 0.1 + 0.2 + 's'"
              >
                <mat-icon>{{ isExpanded ? 'expand_less' : 'expand_more' }}</mat-icon>
                {{ isExpanded ? 'View Less' : 'View More' }}
              </button>
            </div>
          }
        } @else if (portfolioService.isLoading()) {
          <!-- Loading State -->
          <div class="achievements-loading">
            <div class="loading-grid">
              @for (placeholder of [1, 2, 3, 4, 5, 6]; track $index) {
                <div class="achievement-placeholder">
                  <div class="placeholder-icon"></div>
                  <div class="placeholder-content">
                    <div class="placeholder-title"></div>
                    <div class="placeholder-text"></div>
                    <div class="placeholder-meta"></div>
                  </div>
                </div>
              }
            </div>
          </div>
        } @else {
          <!-- Empty State -->
          <div class="achievements-empty">
            <mat-icon>emoji_events</mat-icon>
            <h3>No Achievements Available</h3>
            <p>Achievement data will be displayed here once available.</p>
          </div>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .achievements-section {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        position: relative;
        overflow: hidden;
      }

      .achievements-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background:
          radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255, 105, 180, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(26, 71, 42, 0.05) 0%, transparent 50%);
        pointer-events: none;
      }

      .section-header {
        text-align: center;
        margin-bottom: 3rem;
        position: relative;
        z-index: 1;
      }

      .achievements-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        position: relative;
        z-index: 1;
      }

      .achievement-badge {
        background: white;
        border-radius: 20px;
        padding: 1.5rem;
        position: relative;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
        transform: translateY(30px);
        overflow: hidden;
        text-align: center;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        border: 3px solid transparent;
      }

      .achievement-badge.has-certificate {
        cursor: pointer;
      }

      .achievement-badge:not(.has-certificate) {
        cursor: default;
      }

      .achievement-badge.has-certificate:hover {
        transform: translateY(-12px) scale(1.02);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      }

      .achievement-badge:not(.has-certificate):hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
      }

      .achievement-badge.animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
      }

      /* Different colors for different types */
      .achievement-competition {
        border-color: #ffd700;
      }
      .achievement-competition.has-certificate:hover {
        box-shadow: 0 20px 60px rgba(255, 215, 0, 0.3);
      }
      .achievement-competition .badge-glow {
        background: linear-gradient(45deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.2));
      }

      .achievement-speaking {
        border-color: #ff69b4;
      }
      .achievement-speaking.has-certificate:hover {
        box-shadow: 0 20px 60px rgba(255, 105, 180, 0.3);
      }
      .achievement-speaking .badge-glow {
        background: linear-gradient(45deg, rgba(255, 105, 180, 0.2), rgba(255, 20, 147, 0.2));
      }

      .achievement-certification {
        border-color: #4169e1;
      }
      .achievement-certification.has-certificate:hover {
        box-shadow: 0 20px 60px rgba(65, 105, 225, 0.3);
      }
      .achievement-certification .badge-glow {
        background: linear-gradient(45deg, rgba(65, 105, 225, 0.2), rgba(30, 144, 255, 0.2));
      }

      .badge-glow {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 20px;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .achievement-badge.has-certificate:hover .badge-glow {
        opacity: 1;
      }

      .badge-ribbon {
        position: absolute;
        top: -3px;
        right: -3px;
        background: linear-gradient(45deg, #ff6b6b, #ee5a5a);
        color: white;
        padding: 8px 16px;
        border-radius: 0 20px 0 20px;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        box-shadow: 0 2px 8px rgba(238, 90, 90, 0.3);
      }

      .achievement-competition .badge-ribbon {
        background: linear-gradient(45deg, #ffd700, #ffa500);
        box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
      }

      .achievement-speaking .badge-ribbon {
        background: linear-gradient(45deg, #ff69b4, #ff1493);
        box-shadow: 0 2px 8px rgba(255, 105, 180, 0.3);
      }

      .achievement-certification .badge-ribbon {
        background: linear-gradient(45deg, #4169e1, #1e90ff);
        box-shadow: 0 2px 8px rgba(65, 105, 225, 0.3);
      }

      .badge-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 1.5rem;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 25px rgba(26, 71, 42, 0.2);
        transition: all 0.3s ease;
        position: relative;
      }

      .achievement-competition .badge-icon {
        background: linear-gradient(135deg, #ffd700, #ffa500);
        box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
      }

      .achievement-speaking .badge-icon {
        background: linear-gradient(135deg, #ff69b4, #ff1493);
        box-shadow: 0 8px 25px rgba(255, 105, 180, 0.3);
      }

      .achievement-certification .badge-icon {
        background: linear-gradient(135deg, #4169e1, #1e90ff);
        box-shadow: 0 8px 25px rgba(65, 105, 225, 0.3);
      }

      .badge-icon::before {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        border-radius: 50%;
        background: inherit;
        opacity: 0.3;
        filter: blur(10px);
        z-index: -1;
      }

      .achievement-badge.has-certificate:hover .badge-icon {
        transform: scale(1.1) rotate(5deg);
      }

      .badge-icon mat-icon {
        color: white;
        font-size: 36px;
        width: 36px;
        height: 36px;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
      }

      .badge-content {
        position: relative;
        z-index: 2;
      }

      .badge-title {
        font-size: 16px;
        font-weight: 700;
        color: var(--color-text);
        margin-bottom: 0.5rem;
        line-height: 1.3;
      }

      .badge-description {
        color: var(--color-text-secondary);
        font-size: 13px;
        line-height: 1.4;
        margin-bottom: 1rem;
      }

      .badge-year {
        display: inline-block;
        background: linear-gradient(45deg, var(--color-primary), var(--color-primary-light));
        color: white;
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        box-shadow: 0 3px 10px rgba(26, 71, 42, 0.2);
      }

      .achievement-competition .badge-year {
        background: linear-gradient(45deg, #ffd700, #ffa500);
        box-shadow: 0 3px 10px rgba(255, 215, 0, 0.3);
      }

      .achievement-speaking .badge-year {
        background: linear-gradient(45deg, #ff69b4, #ff1493);
        box-shadow: 0 3px 10px rgba(255, 105, 180, 0.3);
      }

      .achievement-certification .badge-year {
        background: linear-gradient(45deg, #4169e1, #1e90ff);
        box-shadow: 0 3px 10px rgba(65, 105, 225, 0.3);
      }

      .badge-certificate-hint {
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 10px;
        display: flex;
        align-items: center;
        gap: 4px;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .achievement-badge.has-certificate:hover .badge-certificate-hint {
        opacity: 1;
      }

      .badge-certificate-hint mat-icon {
        font-size: 14px;
        width: 14px;
        height: 14px;
      }

      /* Loading State */
      .achievements-loading {
        position: relative;
        z-index: 1;
      }

      .loading-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
      }

      .achievement-placeholder {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        display: flex;
        align-items: flex-start;
        gap: 1.5rem;
        animation: pulse 2s ease-in-out infinite alternate;
      }

      .placeholder-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
      }

      .placeholder-content {
        flex: 1;
      }

      .placeholder-title {
        height: 20px;
        background: #e0e0e0;
        border-radius: 4px;
        margin-bottom: 12px;
        width: 80%;
      }

      .placeholder-text {
        height: 14px;
        background: #f0f0f0;
        border-radius: 4px;
        margin-bottom: 16px;
      }

      .placeholder-meta {
        height: 12px;
        background: #e0e0e0;
        border-radius: 4px;
        width: 60%;
      }

      /* Empty State */
      .achievements-empty {
        text-align: center;
        padding: 4rem 2rem;
        position: relative;
        z-index: 1;
      }

      .achievements-empty mat-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        color: var(--color-neutral);
        margin-bottom: 1.5rem;
      }

      .achievements-empty h3 {
        color: var(--color-text);
        margin-bottom: 1rem;
        font-size: 1.5rem;
      }

      .achievements-empty p {
        color: var(--color-text-secondary);
        max-width: 400px;
        margin: 0 auto;
      }

      /* Animations */
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

      @keyframes pulse {
        from {
          opacity: 1;
        }
        to {
          opacity: 0.6;
        }
      }

      /* Responsive Design */
      @media (max-width: 1024px) {
        .achievements-grid {
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .achievement-card {
          padding: 1.5rem;
          gap: 1rem;
        }
      }

      @media (max-width: 768px) {
        .achievements-grid {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .achievement-card {
          flex-direction: column;
          text-align: center;
          padding: 2rem 1.5rem;
        }

        .achievement-icon {
          margin: 0 auto;
        }

        .achievement-meta {
          justify-content: center;
        }

        .section-header {
          margin-bottom: 2.5rem;
        }

        .achievements-empty {
          padding: 2rem 1rem;
        }
      }

      @media (max-width: 480px) {
        .achievement-card {
          padding: 1.5rem 1rem;
        }

        .achievement-title {
          font-size: 16px;
        }

        .achievement-description {
          font-size: 13px;
        }
      }

      /* Expand Button */
      .expand-button-container {
        display: flex;
        justify-content: center;
        margin-top: 3rem;
        position: relative;
        z-index: 1;
      }

      .expand-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 12px 24px;
        border-radius: 25px;
        font-weight: 600;
        text-transform: none;
        font-size: 14px;
        min-width: 140px;
        box-shadow: 0 4px 15px rgba(26, 71, 42, 0.3);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
        transform: translateY(20px);
      }

      .expand-button.animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
      }

      .expand-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(26, 71, 42, 0.4);
      }

      .expand-button mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        transition: transform 0.3s ease;
      }

      .expand-button:hover mat-icon {
        transform: scale(1.1);
      }

      /* Intersection Observer Enhancement */
      .achievements-grid.visible .achievement-card {
        animation-play-state: running;
      }
    `,
  ],
})
export class AchievementsComponent implements OnInit {
  protected readonly achievements = signal<Achievement[] | null>(null);
  protected isVisible = false;
  protected isExpanded = false;
  protected readonly initialDisplayCount = 6;

  constructor(
    protected portfolioService: PortfolioService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.setupIntersectionObserver();
    this.subscribeToDataChanges();
  }

  private loadData(): void {
    const data = this.portfolioService.data();
    if (data && data.achievements) {
      this.achievements.set(data.achievements);
    }
  }

  private subscribeToDataChanges(): void {
    const checkInterval = setInterval(() => {
      const data = this.portfolioService.data();
      if (data && data.achievements) {
        this.achievements.set(data.achievements);
        clearInterval(checkInterval);
      }
    }, 100);

    setTimeout(() => clearInterval(checkInterval), 10000);
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

    setTimeout(() => {
      const section = document.querySelector('.achievements-section');
      if (section) {
        observer.observe(section);
      }
    }, 100);
  }

  protected getAchievementIcon(type: string): string {
    switch (type) {
      case 'competition':
        return 'emoji_events';
      case 'speaking':
        return 'campaign';
      case 'certification':
        return 'school';
      default:
        return 'star';
    }
  }

  protected getTypeLabel(type: string): string {
    switch (type) {
      case 'competition':
        return 'Competition';
      case 'speaking':
        return 'Speaking';
      case 'certification':
        return 'Certification';
      default:
        return 'Achievement';
    }
  }

  protected getDisplayedAchievements(): Achievement[] {
    const allAchievements = this.achievements();
    if (!allAchievements) return [];

    if (this.isExpanded) {
      return allAchievements;
    } else {
      return allAchievements.slice(0, this.initialDisplayCount);
    }
  }

  protected shouldShowExpandButton(): boolean {
    const allAchievements = this.achievements();
    return allAchievements ? allAchievements.length > this.initialDisplayCount : false;
  }

  protected toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  protected openCertificate(achievement: Achievement): void {
    if (!achievement.certificateUrl) {
      console.warn('No certificate URL available for:', achievement.title);
      return;
    }

    this.dialog.open(CertificateDialogComponent, {
      data: achievement,
      width: '90vw',
      maxWidth: '800px',
      height: '80vh',
      panelClass: 'certificate-dialog',
    });
  }
}

// Certificate Dialog Component
@Component({
  selector: 'certificate-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="certificate-dialog-content">
      <div class="dialog-header">
        <h2 mat-dialog-title>{{ data.title }}</h2>
        <button mat-icon-button mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="dialog-body" mat-dialog-content>
        <div class="certificate-container">
          <img
            [src]="data.certificateUrl"
            [alt]="'Certificate for ' + data.title"
            (load)="onImageLoad()"
            (error)="onImageError()"
            [style.display]="imageLoaded ? 'block' : 'none'"
          />

          @if (!imageLoaded && !imageError) {
            <div class="certificate-loading">
              <mat-icon>description</mat-icon>
              <p>Loading certificate...</p>
            </div>
          }

          @if (imageError) {
            <div class="certificate-error">
              <mat-icon>error</mat-icon>
              <p>Unable to load certificate</p>
              <a [href]="data.certificateUrl" target="_blank" rel="noopener noreferrer">
                Open in new tab
              </a>
            </div>
          }
        </div>
      </div>

      <div class="dialog-actions" mat-dialog-actions>
        <button mat-stroked-button mat-dialog-close>Close</button>
        <a
          [href]="data.certificateUrl"
          target="_blank"
          rel="noopener noreferrer"
          mat-raised-button
          color="primary"
        >
          <mat-icon>open_in_new</mat-icon>
          View Original
        </a>
      </div>
    </div>
  `,
  styles: [
    `
      .certificate-dialog-content {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #e0e0e0;
      }

      .dialog-header h2 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
      }

      .dialog-body {
        flex: 1;
        padding: 1.5rem;
        overflow: auto;
      }

      .certificate-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 300px;
      }

      .certificate-container img {
        max-width: 100%;
        max-height: 100%;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }

      .certificate-loading,
      .certificate-error {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        color: #666;
      }

      .certificate-loading mat-icon,
      .certificate-error mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
      }

      .certificate-error a {
        color: var(--color-primary);
        text-decoration: none;
        font-weight: 500;
      }

      .certificate-error a:hover {
        text-decoration: underline;
      }

      .dialog-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        padding: 1rem 1.5rem;
        border-top: 1px solid #e0e0e0;
      }

      .dialog-actions a {
        text-decoration: none;
      }
    `,
  ],
})
export class CertificateDialogComponent {
  imageLoaded = false;
  imageError = false;

  constructor(
    public dialogRef: MatDialogRef<CertificateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Achievement,
  ) {}

  onImageLoad(): void {
    this.imageLoaded = true;
  }

  onImageError(): void {
    this.imageError = true;
  }
}
