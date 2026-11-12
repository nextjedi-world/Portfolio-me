import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

// Import navigation and footer components
import { NavigationComponent } from '../components/navigation.component';
import { FooterComponent } from '../components/footer.component';

// Import services
import { PortfolioService } from '../services/portfolio.service';
import { ThemeService } from '../services/theme.service';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly isLoading = signal<boolean>(true);
  protected readonly hasError = signal<boolean>(false);

  constructor(
    private portfolioService: PortfolioService,
    private themeService: ThemeService,
    private analyticsService: AnalyticsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initializeApp();
    this.setupRouteTracking();
  }

  private async initializeApp(): Promise<void> {
    try {
      // Wait for portfolio data to load
      await this.waitForPortfolioData();

      // Initialize theme service (auto-detects system preferences)
      // ThemeService constructor already handles this

      // Set up SEO meta tags
      this.setupSEO();

      // App is ready
      this.isLoading.set(false);
    } catch (error) {
      console.error('Failed to initialize app:', error);
      this.hasError.set(true);
      this.isLoading.set(false);
    }
  }

  private waitForPortfolioData(): Promise<void> {
    return new Promise((resolve, reject) => {
      const checkData = () => {
        if (this.portfolioService.data()) {
          resolve();
        } else if (this.portfolioService.hasError()) {
          reject(new Error('Failed to load portfolio data'));
        } else {
          // Still loading, check again
          setTimeout(checkData, 100);
        }
      };
      checkData();
    });
  }

  private setupSEO(): void {
    const data = this.portfolioService.data();
    if (!data?.seo) return;

    const seo = data.seo;

    // Set page title
    document.title = seo.title;

    // Set meta description
    this.updateMetaTag('description', seo.description);

    // Set meta keywords
    this.updateMetaTag('keywords', seo.keywords);

    // Set author
    this.updateMetaTag('author', seo.author);

    // Set Open Graph tags
    this.updateMetaTag('og:title', seo.title);
    this.updateMetaTag('og:description', seo.description);
    this.updateMetaTag('og:image', seo.ogImage);
    this.updateMetaTag('og:url', seo.canonicalUrl);
    this.updateMetaTag('og:type', 'website');

    // Set Twitter Card tags
    this.updateMetaTag('twitter:card', 'summary_large_image');
    this.updateMetaTag('twitter:title', seo.title);
    this.updateMetaTag('twitter:description', seo.description);
    this.updateMetaTag('twitter:image', seo.ogImage);

    // Set canonical URL
    this.updateCanonicalUrl(seo.canonicalUrl);
  }

  private updateMetaTag(name: string, content: string): void {
    const property = name.startsWith('og:') || name.startsWith('twitter:') ? 'property' : 'name';

    let meta = document.querySelector(`meta[${property}="${name}"]`) as HTMLMetaElement;

    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(property, name);
      document.head.appendChild(meta);
    }

    meta.content = content;
  }

  private updateCanonicalUrl(url: string): void {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }

    canonical.href = url;
  }

  private setupRouteTracking(): void {
    // Track initial page view
    this.analyticsService.trackPageView(window.location.pathname, document.title);

    // Track route changes
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Small delay to ensure title is updated
        setTimeout(() => {
          this.analyticsService.trackPageView(event.urlAfterRedirects, document.title);
        }, 50);
      });
  }
}
