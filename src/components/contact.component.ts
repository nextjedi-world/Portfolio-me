import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../services/portfolio.service';
import { AnalyticsService } from '../services/analytics.service';
import { ContactFormComponent } from './contact-form.component';
import { Contact, CTAButton, SocialLink } from '../models/portfolio.interface';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  template: `
    <section class="contact-section section" id="contact">
      <div class="container">
        @if (contactInfo()) {
          <div class="contact-content" [class.visible]="isVisible">
            <!-- Contact Header -->
            <div class="contact-header">
              <h2 class="contact-title"
                  [class.animate-fade-in-up]="isVisible">
                {{ contactInfo()!.title }}
              </h2>
              <p class="contact-subtitle"
                 [class.animate-fade-in-up]="isVisible"
                 style="animation-delay: 0.2s;">
                {{ contactInfo()!.subtitle }}
              </p>
            </div>

            <!-- Message Form -->
            @if (contactInfo()!.formEndpoint) {
              <div class="contact-form-wrapper"
                   [class.animate-fade-in-up]="isVisible"
                   style="animation-delay: 0.3s;">
                <app-contact-form
                  [endpoint]="contactInfo()!.formEndpoint"
                  [fallbackEmail]="contactInfo()!.email">
                </app-contact-form>
              </div>
            }

            <!-- Main CTA Buttons -->
            <div class="contact-cta-group"
                 [class.animate-fade-in-up]="isVisible"
                 style="animation-delay: 0.4s;">
              @for (cta of contactInfo()!.cta; track cta.url) {
                <a [href]="cta.url"
                   [class]="'btn btn-' + cta.type + (cta.type === 'secondary' ? ' light' : '')"
                   [target]="getTargetForUrl(cta.url)"
                   [rel]="getRelForUrl(cta.url)"
                   (click)="trackCTAClick(cta.text)"
                   [title]="cta.url.startsWith('mailto:') ? 'Send email to ' + cta.url.substring(7) : cta.text">
                  <span>{{ cta.text }}</span>
                  @if (getCTAIcon(cta.text)) {
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      @switch (getCTAIcon(cta.text)) {
                        @case ('email') {
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        }
                        @case ('linkedin') {
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                          <rect x="2" y="9" width="4" height="12"/>
                          <circle cx="4" cy="4" r="2"/>
                        }
                        @default {
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15,3 21,3 21,9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        }
                      }
                    </svg>
                  }
                </a>
              }
            </div>

            <!-- Social Links -->
            @if (contactInfo()!.social && contactInfo()!.social.length > 0) {
              <div class="social-links"
                   [class.animate-fade-in-up]="isVisible"
                   style="animation-delay: 1s;">
                <div class="social-label">Connect with me:</div>
                <div class="social-icons">
                  @for (social of contactInfo()!.social; track social.platform) {
                    <a [href]="social.url"
                       [title]="'Connect on ' + social.platform"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="social-link"
                       (click)="trackSocialClick(social.platform)">
                      @switch (social.platform.toLowerCase()) {
                        @case ('linkedin') {
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        }
                        @case ('github') {
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        }
                        @case ('medium') {
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                          </svg>
                        }
                        @default {
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15,3 21,3 21,9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                        }
                      }
                    </a>
                  }
                </div>
              </div>
            }
          </div>
        } @else if (portfolioService.isLoading()) {
          <div class="contact-loading">
            <div class="loading-spinner"></div>
            <p>Loading contact information...</p>
          </div>
        }

        <!-- Footer Info -->
        <div class="footer-info"
             [class.animate-fade-in-up]="isVisible"
             style="animation-delay: 1.2s;">
          <p>&copy; 2025 Arunabh Priyadarshi. Built with Angular & passion for clean code.</p>
          <div class="footer-links">
            <a href="#" (click)="showPrivacyPolicy($event)">Privacy Policy</a>
            <span class="separator">•</span>
            <a href="#" (click)="showTermsOfService($event)">Terms of Service</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
      color: white;
      position: relative;
      overflow: hidden;
    }

    .contact-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%),
        radial-gradient(circle at 70% 30%, rgba(231, 76, 60, 0.15) 0%, transparent 50%);
      pointer-events: none;
    }

    .contact-content {
      text-align: center;
      position: relative;
      z-index: 1;
    }

    .contact-header {
      margin-bottom: 3rem;
    }

    .contact-title {
      font-size: 42px;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: white;
      opacity: 0;
      transform: translateY(30px);
    }

    .contact-title.animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }

    .contact-subtitle {
      font-size: 20px;
      margin-bottom: 0;
      color: rgba(255, 255, 255, 0.9);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.5;
      opacity: 0;
      transform: translateY(30px);
    }

    .contact-subtitle.animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }

    .contact-form-wrapper {
      margin-bottom: 2rem;
      opacity: 0;
      transform: translateY(30px);
    }

    .contact-form-wrapper.animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }

    .contact-cta-group {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 3rem;
      opacity: 0;
      transform: translateY(30px);
    }

    .contact-cta-group.animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }

    .contact-cta-group .btn {
      min-width: 160px;
      font-weight: 600;
    }

    .contact-cta-group .btn:hover {
      transform: translateY(-3px);
    }

    .social-links {
      opacity: 0;
      transform: translateY(30px);
    }

    .social-links.animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }

    .social-label {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 1rem;
      color: rgba(255, 255, 255, 0.9);
    }

    .social-icons {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
    }

    .social-link {
      width: 48px;
      height: 48px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      transition: var(--transition);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .social-link:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    }

    .footer-info {
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      padding-top: 2rem;
      margin-top: 3rem;
      color: rgba(255, 255, 255, 0.7);
      opacity: 0;
      transform: translateY(20px);
    }

    .footer-info.animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }

    .footer-info p {
      margin-bottom: 1rem;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8) !important;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      font-size: 13px;
    }

    .footer-links a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: var(--transition);
    }

    .footer-links a:hover {
      color: white;
    }

    .separator {
      color: rgba(255, 255, 255, 0.5);
    }

    /* Loading State */
    .contact-loading {
      text-align: center;
      padding: 4rem 2rem;
      position: relative;
      z-index: 1;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1.5rem;
    }

    .contact-loading p {
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
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

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .contact-title {
        font-size: 32px;
      }

      .contact-subtitle {
        font-size: 18px;
      }

      .contact-cta-group {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      .contact-cta-group .btn {
        width: 100%;
        max-width: 280px;
      }

      .status-details {
        flex-direction: column;
        gap: 1rem;
      }

      .social-icons {
        gap: 1rem;
      }

      .social-link {
        width: 44px;
        height: 44px;
      }

      .footer-links {
        flex-direction: column;
        gap: 0.5rem;
      }
    }

    @media (max-width: 480px) {
      .contact-title {
        font-size: 28px;
      }

      .contact-subtitle {
        font-size: 16px;
      }

    }
  `]
})
export class ContactComponent implements OnInit {
  protected readonly contactInfo = signal<Contact | null>(null);
  protected isVisible = false;

  constructor(
    protected portfolioService: PortfolioService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.setupIntersectionObserver();
    this.subscribeToDataChanges();
  }

  private loadData(): void {
    const data = this.portfolioService.data();
    if (data && data.contact) {
      this.contactInfo.set(data.contact);
    }
  }
  
  private subscribeToDataChanges(): void {
    const checkInterval = setInterval(() => {
      const data = this.portfolioService.data();
      if (data && data.contact) {
        this.contactInfo.set(data.contact);
        clearInterval(checkInterval);
      }
    }, 100);
    setTimeout(() => clearInterval(checkInterval), 10000);
  }

  protected getTargetForUrl(url: string): string {
    return url.startsWith('mailto:') ? '_self' : '_blank';
  }

  protected getRelForUrl(url: string): string {
    return url.startsWith('mailto:') ? '' : 'noopener noreferrer';
  }

  protected getCTAIcon(text: string): string {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('email') || lowerText.includes('mail')) return 'email';
    if (lowerText.includes('linkedin')) return 'linkedin';
    return 'external';
  }

  protected trackCTAClick(ctaText: string): void {
    // Track the contact interaction
    this.analyticsService.trackContactInteraction(ctaText);
    
    // Check if this is an email link
    const cta = this.contactInfo()?.cta?.find(c => c.text === ctaText);
    if (cta?.url.startsWith('mailto:')) {
      console.log('Email link clicked:', cta.url);
    }
    // Allow default behavior for email links
  }

  protected trackSocialClick(platform: string): void {
    // Track social link click
    this.analyticsService.trackContactInteraction(`Social: ${platform}`);
    console.log(`Social link clicked: ${platform}`);
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
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    setTimeout(() => {
      const section = document.querySelector('.contact-section');
      if (section) {
        observer.observe(section);
      }
    }, 100);
  }

  protected showPrivacyPolicy(event: Event): void {
    event.preventDefault();
    alert('Privacy Policy:\n\nThis is a personal portfolio website showcasing professional work and experience. If you send a message through the contact form, your name, email address and message are stored in a private Google Sheet so I can reply. All images are from Unsplash or are professional work samples used with appropriate permissions.');
  }

  protected showTermsOfService(event: Event): void {
    event.preventDefault();
    alert('Terms of Service:\n\nThis portfolio website is for informational purposes only. All work examples and case studies are presented with appropriate permissions and represent actual professional achievements. Content is protected by standard copyright laws.');
  }
}