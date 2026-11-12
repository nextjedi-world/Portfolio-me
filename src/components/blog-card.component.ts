import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../models/portfolio.interface';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (post) {
      <article
        class="blog-card"
        [class.animate-fade-in-up]="isVisible"
        [style.animation-delay]="animationDelay"
      >
        <!-- Blog Image -->
        <div class="blog-image">
          <img
            [src]="post.thumbnail"
            [alt]="post.title"
            loading="lazy"
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
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
              <span>Read Article</span>
            </div>
          </div>
        </div>

        <!-- Blog Content -->
        <div class="blog-content">
          <div class="blog-header">
            <h3 class="blog-title">
              <a
                [href]="post.url"
                target="_blank"
                rel="noopener noreferrer"
                (click)="trackArticleClick()"
              >
                {{ post.title }}
              </a>
            </h3>
          </div>

          <p class="blog-excerpt">{{ post.excerpt }}</p>

          <div class="blog-meta">
            <div class="meta-item">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              <span>{{ post.readTime }}</span>
            </div>
            <div class="meta-item">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{{ post.publishedDate }}</span>
            </div>
          </div>

          <div class="blog-actions">
            <a
              [href]="post.url"
              class="read-more-link"
              target="_blank"
              rel="noopener noreferrer"
              (click)="trackArticleClick()"
            >
              <span>Read More</span>
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
        </div>
      </article>
    }
  `,
  styles: [
    `
      .blog-card {
        background: white;
        border-radius: var(--border-radius);
        overflow: hidden;
        box-shadow: var(--box-shadow);
        transition: var(--transition);
        border: 1px solid rgba(0, 0, 0, 0.05);
        height: 100%;
        display: flex;
        flex-direction: column;
        opacity: 0;
        transform: translateY(30px);
      }

      .blog-card.animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
      }

      .blog-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--box-shadow-hover);
      }

      .blog-image {
        height: 180px;
        position: relative;
        overflow: hidden;
        background: linear-gradient(45deg, #f8f9fa, #e9ecef);
      }

      .blog-image img {
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
        background: rgba(26, 71, 42, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: var(--transition);
      }

      .blog-card:hover .image-overlay {
        opacity: 1;
      }

      .blog-card:hover .blog-image img {
        transform: scale(1.05);
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
        width: 28px;
        height: 28px;
      }

      .overlay-content span {
        font-size: 13px;
        font-weight: 600;
      }

      .blog-content {
        padding: 24px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }

      .blog-header {
        margin-bottom: 12px;
      }

      .blog-title {
        margin: 0;
        line-height: 1.4;
      }

      .blog-title a {
        font-size: 18px;
        font-weight: 600;
        color: var(--color-primary);
        text-decoration: none;
        transition: var(--transition);
        display: block;
      }

      .blog-title a:hover {
        color: var(--color-accent);
      }

      .blog-excerpt {
        font-size: 14px;
        color: var(--color-text-secondary);
        line-height: 1.6;
        margin-bottom: 16px;
        flex-grow: 1;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .blog-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-top: 12px;
        border-top: 1px solid rgba(0, 0, 0, 0.08);
      }

      .meta-item {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: var(--color-text-secondary);
        font-weight: 500;
      }

      .meta-item svg {
        opacity: 0.7;
      }

      .blog-actions {
        margin-top: auto;
      }

      .read-more-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        font-weight: 600;
        color: var(--color-primary);
        text-decoration: none;
        transition: var(--transition);
        padding: 8px 12px;
        border-radius: 6px;
        border: 1px solid var(--color-primary);
        background: transparent;
      }

      .read-more-link:hover {
        background: var(--color-primary);
        color: white;
        transform: translateY(-1px);
      }

      .read-more-link:hover svg {
        transform: translate(2px, -2px);
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        .blog-content {
          padding: 20px;
        }

        .blog-title a {
          font-size: 16px;
        }

        .blog-excerpt {
          font-size: 13px;
        }

        .blog-meta {
          flex-direction: column;
          gap: 8px;
          align-items: flex-start;
        }

        .read-more-link {
          font-size: 13px;
          padding: 6px 10px;
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
      .blog-image.no-image {
        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 48px;
      }

      .blog-image.no-image::before {
        content: '📝';
      }
    `,
  ],
})
export class BlogCardComponent {
  @Input() post!: BlogPost;
  @Input() isVisible = false;
  @Input() animationDelay = '0s';

  constructor(private analyticsService: AnalyticsService) {}

  protected onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    const container = img.parentElement;
    if (container) {
      container.classList.add('no-image');
      img.style.display = 'none';
    }
  }

  protected trackArticleClick(): void {
    // Track blog article click
    this.analyticsService.trackExternalLink(this.post.url, 'Blog Article');
    this.analyticsService.trackEvent('click_blog_article', 'Blog', this.post.title);
    console.log(`Blog article clicked: ${this.post.title}`);
  }
}
