import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioService } from '../services/portfolio.service';
import { Story } from '../models/portfolio.interface';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <section class="story-section section" id="about">
      <div class="container">
        @if (story()) {
          <div class="story-content">
            <h2 class="story-title">{{ story()!.title }}</h2>
            
            @for (paragraph of story()!.paragraphs; track $index) {
              <p class="story-text" 
                 [class.animate-fade-in-up]="isVisible"
                 [style.animation-delay]="($index * 0.2) + 's'">
                {{ paragraph }}
              </p>
            }

            @if (portfolioService.data()?.personal?.company; as company) {
              <a class="story-company-link"
                 [href]="company.url"
                 target="_blank"
                 rel="noopener noreferrer">
                Explore {{ company.name }}
                <mat-icon>arrow_forward</mat-icon>
              </a>
            }

            @if (story()!.highlights.length) {
              <div class="story-highlight"
                   [class.animate-fade-in-up]="isVisible"
                   [style.animation-delay]="(story()!.paragraphs.length * 0.2 + 0.3) + 's'">
                <div class="highlight-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                </div>
                <div class="highlight-text">
                  <div class="highlight-heading">Career Highlights:</div>
                  <ul class="highlight-list">
                    @for (item of story()!.highlights; track $index) {
                      <li class="highlight-item">
                        <div class="highlight-icon">
                          <mat-icon>chevron_right</mat-icon>
                        </div>
                        <span>{{ item }}</span>
                      </li>
                    }
                  </ul>
                </div>
              </div>
            }
          </div>
        } @else if (portfolioService.isLoading()) {
          <div class="story-loading">
            <div class="loading-placeholder">
              <div class="placeholder-title"></div>
              <div class="placeholder-line"></div>
              <div class="placeholder-line"></div>
              <div class="placeholder-line short"></div>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .story-section {
      background: var(--color-light);
      position: relative;
    }

    .story-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, transparent 0%, rgba(26, 71, 42, 0.02) 50%, transparent 100%);
      pointer-events: none;
    }

    .story-content {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
      position: relative;
      z-index: 1;
    }

    .story-title {
      font-size: var(--font-size-section);
      font-weight: 600;
      margin-bottom: 2rem;
      color: var(--color-primary);
      position: relative;
    }

    .story-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, var(--color-accent), var(--color-primary));
      border-radius: 2px;
    }

    .story-text {
      font-size: 18px;
      line-height: 1.8;
      color: var(--color-text);
      margin-bottom: 1.5rem;
      text-align: left;
      opacity: 0;
      transform: translateY(20px);
    }

    .story-text.animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }

    .story-text strong {
      color: var(--color-primary);
      font-weight: 600;
    }

    .story-company-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 1.5rem;
      color: var(--color-primary);
      font-size: 18px;
      font-weight: 600;
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    .story-highlight {
      background: white;
      padding: 2rem;
      border-radius: var(--border-radius);
      margin-top: 3rem;
      box-shadow: var(--box-shadow);
      border: 1px solid rgba(26, 71, 42, 0.1);
      position: relative;
      opacity: 0;
      transform: translateY(20px);
    }

    .story-highlight.animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }

    .story-highlight::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
      border-radius: var(--border-radius) var(--border-radius) 0 0;
    }

    .highlight-icon {
      width: 48px;
      height: 48px;
      background: var(--color-success);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      color: white;
      box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
    }

    .highlight-text {
      margin: 0;
      text-align: left;
    }

    .highlight-heading {
      font-size: 18px;
      font-weight: 700;
      color: var(--color-primary);
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .highlight-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .highlight-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 1rem;
      color: var(--color-text);
      font-weight: 400;
      line-height: 1.6;
    }

    .highlight-item:last-child {
      margin-bottom: 0;
    }

    .highlight-item .highlight-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      margin-right: 0.75rem;
      margin-top: 1px;
      flex-shrink: 0;
    }

    .highlight-item .highlight-icon mat-icon {
      color: var(--color-primary);
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .highlight-item span {
      font-size: 16px;
      line-height: 1.6;
      flex: 1;
      text-align: justify;
    }

    /* Loading State */
    .story-loading {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }

    .loading-placeholder {
      animation: pulse 2s ease-in-out infinite alternate;
    }

    .placeholder-title {
      height: 32px;
      background: #e0e0e0;
      border-radius: 4px;
      margin-bottom: 2rem;
      width: 60%;
      margin-left: auto;
      margin-right: auto;
    }

    .placeholder-line {
      height: 18px;
      background: #e0e0e0;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .placeholder-line.short {
      width: 70%;
      margin-left: auto;
      margin-right: auto;
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
    @media (max-width: 768px) {
      .story-content {
        max-width: 100%;
      }

      .story-title {
        font-size: 28px;
        text-align: center;
      }

      .story-text {
        font-size: 16px;
        text-align: center;
        line-height: 1.7;
      }

      .story-highlight {
        padding: 1.5rem;
        margin-top: 2rem;
      }

      .highlight-text {
        font-size: 15px;
      }
    }

    @media (max-width: 480px) {
      .story-title {
        font-size: 24px;
      }

      .story-text {
        font-size: 15px;
        line-height: 1.6;
      }

      .story-highlight {
        padding: 1.25rem;
      }

      .highlight-icon {
        width: 40px;
        height: 40px;
      }

      .highlight-icon svg {
        width: 20px;
        height: 20px;
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

    /* Intersection Observer will add this class */
    .story-section.visible .story-text,
    .story-section.visible .story-highlight {
      animation-play-state: running;
    }
  `]
})
export class StoryComponent implements OnInit {
  protected readonly story = signal<Story | null>(null);
  protected isVisible = false;

  constructor(protected portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadData();
    this.setupIntersectionObserver();
    this.subscribeToDataChanges();
  }

  private loadData(): void {
    const data = this.portfolioService.data();
    if (data && data.story) {
      this.story.set(data.story);
    }
  }
  
  private subscribeToDataChanges(): void {
    const checkInterval = setInterval(() => {
      const data = this.portfolioService.data();
      if (data && data.story) {
        this.story.set(data.story);
        clearInterval(checkInterval);
      }
    }, 100);
    setTimeout(() => clearInterval(checkInterval), 10000);
  }

  private setupIntersectionObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    // Observe the story section
    setTimeout(() => {
      const section = document.querySelector('.story-section');
      if (section) {
        observer.observe(section);
      }
    }, 100);
  }
}