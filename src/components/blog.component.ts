import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../services/portfolio.service';
import { MediumService } from '../services/medium.service';
import { Blog, BlogPost } from '../models/portfolio.interface';
import { BlogCardComponent } from './blog-card.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, BlogCardComponent],
  template: `
    <section class="blog-section section" id="blog">
      <div class="container">
        <div class="section-header">
          @if (blogConfig()) {
            <h2 class="section-title">{{ blogConfig()!.title }}</h2>
            <p class="section-subtitle">{{ blogConfig()!.subtitle }}</p>
          } @else {
            <h2 class="section-title">Technical Insights & Thoughts</h2>
            <p class="section-subtitle">
              Sharing knowledge about architecture, AI, and engineering leadership
            </p>
          }
        </div>

        @if (blogPosts() && blogPosts()!.length > 0) {
          <div class="blog-grid" [class.visible]="isVisible">
            @for (post of blogPosts(); track post.url) {
              <app-blog-card
                [post]="post"
                [isVisible]="isVisible"
                [animationDelay]="$index * 0.15 + 's'"
              />
            }
          </div>

          <!-- View All Articles Button -->
          <div class="blog-actions">
            <a
              [href]="getMediumProfileUrl()"
              class="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
              [class.animate-fade-in-up]="isVisible"
              style="animation-delay: 1s;"
            >
              <span>Read All Articles</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15,3 21,3 21,9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        } @else if (isLoadingMedium()) {
          <!-- Loading State -->
          <div class="blog-loading">
            <div class="loading-grid">
              @for (placeholder of [1, 2, 3]; track $index) {
                <div class="blog-placeholder">
                  <div class="placeholder-image"></div>
                  <div class="placeholder-content">
                    <div class="placeholder-title"></div>
                    <div class="placeholder-text"></div>
                    <div class="placeholder-text short"></div>
                    <div class="placeholder-meta"></div>
                  </div>
                </div>
              }
            </div>
            <div class="loading-message">
              <div class="loading-spinner"></div>
              <p>Loading latest articles...</p>
            </div>
          </div>
        } @else if (hasError()) {
          <!-- Error State with Fallback -->
          <div class="blog-error">
            <div class="error-message">
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
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3>Unable to Load Latest Articles</h3>
              <p>Showing recent articles from our archive instead.</p>
            </div>
          </div>
        } @else {
          <!-- Empty State -->
          <div class="blog-empty">
            <div class="empty-icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
            </div>
            <h3>Articles Coming Soon</h3>
            <p>Technical insights and thought leadership articles will be published here.</p>
            <a
              [href]="getMediumProfileUrl()"
              class="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Blog
            </a>
          </div>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .blog-section {
        background: var(--color-light);
        position: relative;
      }

      .blog-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background:
          radial-gradient(circle at 80% 20%, rgba(231, 76, 60, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 20% 80%, rgba(26, 71, 42, 0.03) 0%, transparent 50%);
        pointer-events: none;
      }

      .section-header {
        text-align: center;
        margin-bottom: 3.5rem;
        position: relative;
        z-index: 1;
      }

      .blog-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
        position: relative;
        z-index: 1;
      }

      .blog-actions {
        text-align: center;
        position: relative;
        z-index: 1;
      }

      .blog-actions .btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        opacity: 0;
        transform: translateY(20px);
      }

      .blog-actions .btn.animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
      }

      .blog-actions .btn:hover svg {
        transform: translate(2px, -2px);
      }

      /* Loading States */
      .blog-loading {
        position: relative;
        z-index: 1;
      }

      .loading-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
      }

      .blog-placeholder {
        background: white;
        border-radius: var(--border-radius);
        overflow: hidden;
        box-shadow: var(--box-shadow);
        animation: pulse 2s ease-in-out infinite alternate;
      }

      .placeholder-image {
        height: 180px;
        background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
      }

      .placeholder-content {
        padding: 24px;
      }

      .placeholder-title {
        height: 20px;
        background: #e0e0e0;
        border-radius: 4px;
        margin-bottom: 16px;
        width: 85%;
      }

      .placeholder-text {
        height: 14px;
        background: #f0f0f0;
        border-radius: 4px;
        margin-bottom: 8px;
      }

      .placeholder-text.short {
        width: 60%;
      }

      .placeholder-meta {
        height: 12px;
        background: #e0e0e0;
        border-radius: 4px;
        margin-top: 16px;
        width: 40%;
      }

      .loading-message {
        text-align: center;
        padding: 2rem;
      }

      .loading-spinner {
        width: 32px;
        height: 32px;
        border: 3px solid rgba(26, 71, 42, 0.2);
        border-top: 3px solid var(--color-primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
      }

      /* Error State */
      .blog-error {
        text-align: center;
        padding: 2rem;
        position: relative;
        z-index: 1;
      }

      .error-message {
        background: rgba(255, 193, 7, 0.1);
        padding: 2rem;
        border-radius: var(--border-radius);
        border: 1px solid rgba(255, 193, 7, 0.2);
      }

      .error-icon {
        color: #ffc107;
        margin-bottom: 1rem;
      }

      .blog-error h3 {
        color: var(--color-text);
        margin-bottom: 0.5rem;
        font-size: 1.25rem;
      }

      .blog-error p {
        color: var(--color-text-secondary);
        margin: 0;
      }

      /* Empty State */
      .blog-empty {
        text-align: center;
        padding: 4rem 2rem;
        position: relative;
        z-index: 1;
      }

      .empty-icon {
        color: var(--color-neutral);
        margin-bottom: 1.5rem;
      }

      .blog-empty h3 {
        color: var(--color-text);
        margin-bottom: 1rem;
        font-size: 1.5rem;
      }

      .blog-empty p {
        color: var(--color-text-secondary);
        margin-bottom: 2rem;
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
      }

      /* Animations */
      @keyframes pulse {
        from {
          opacity: 1;
        }
        to {
          opacity: 0.6;
        }
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
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
        .blog-grid {
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .loading-grid {
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
      }

      @media (max-width: 768px) {
        .blog-grid {
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

        .blog-error,
        .blog-empty {
          padding: 2rem 1rem;
        }
      }

      /* Intersection Observer Enhancement */
      .blog-grid.visible app-blog-card {
        animation-play-state: running;
      }
    `,
  ],
})
export class BlogComponent implements OnInit {
  protected readonly blogConfig = signal<Blog | null>(null);
  protected readonly blogPosts = signal<BlogPost[] | null>(null);
  protected readonly isLoadingMedium = signal<boolean>(false);
  protected readonly hasError = signal<boolean>(false);
  protected isVisible = false;

  constructor(
    protected portfolioService: PortfolioService,
    private mediumService: MediumService,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.setupIntersectionObserver();
    this.subscribeToDataChanges();
  }

  private loadData(): void {
    const data = this.portfolioService.data();
    if (data?.blog) {
      this.blogConfig.set(data.blog);
      this.loadMediumPosts();
    }
  }

  private subscribeToDataChanges(): void {
    const checkInterval = setInterval(() => {
      const data = this.portfolioService.data();
      if (data?.blog) {
        this.blogConfig.set(data.blog);
        this.loadMediumPosts();
        clearInterval(checkInterval);
      }
    }, 100);
    setTimeout(() => clearInterval(checkInterval), 10000);
  }

  private loadMediumPosts(): void {
    const config = this.blogConfig();
    if (!config) return;

    this.isLoadingMedium.set(true);
    this.hasError.set(false);

    this.mediumService.getBlogPosts(config.mediumRssUrl, config.fallbackPosts).subscribe({
      next: (posts) => {
        this.blogPosts.set(posts);
        this.isLoadingMedium.set(false);

        // If we got fallback posts due to Medium API failure, show warning
        if (posts === config.fallbackPosts && posts.length > 0) {
          this.hasError.set(true);
        }
      },
      error: (error) => {
        console.warn('Medium RSS failed, using fallback posts:', error);
        this.blogPosts.set(config.fallbackPosts);
        this.hasError.set(true);
        this.isLoadingMedium.set(false);
      },
    });
  }

  protected getMediumProfileUrl(): string {
    const config = this.blogConfig();
    return config?.mediumProfileUrl || 'https://blog.arunabh.me';
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

    // Observe the blog section
    setTimeout(() => {
      const section = document.querySelector('.blog-section');
      if (section) {
        observer.observe(section);
      }
    }, 100);
  }
}
