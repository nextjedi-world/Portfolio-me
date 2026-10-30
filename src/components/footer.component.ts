import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-main">
            <div class="footer-brand">
              <div class="brand-logo">
                <span class="brand-initials">AP</span>
              </div>
              <p class="brand-tagline">Building enterprise solutions that drive innovation</p>
            </div>

            <div class="footer-links">
              <div class="link-group">
                <h4>Connect</h4>
                <ul>
                  <li><a href="https://nextjedi.com" target="_blank" rel="noopener noreferrer">Next Jedi</a></li>
                  <li><a href="https://github.com/nextjedi" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                  <li><a href="https://linkedin.com/in/arunabhpriyadarshi" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                  <li><a href="mailto:arunabhmaster@gmail.com">Email</a></li>
                </ul>
              </div>

              <div class="link-group">
                <h4>Navigate</h4>
                <ul>
                  <li><a href="#" (click)="navigateToSection($event, 'about')">About</a></li>
                  <li><a href="#" (click)="navigateToSection($event, 'projects')">Projects</a></li>
                  <li><a href="#" (click)="navigateToSection($event, 'contact')">Contact</a></li>
                </ul>
              </div>

              <div class="link-group">
                <h4>Legal</h4>
                <ul>
                  <li><a routerLink="/privacy">Privacy Policy</a></li>
                  <li><a routerLink="/terms">Terms of Use</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <div class="copyright">
              <p>&copy; {{ currentYear }} Arunabh Priyadarshi. All rights reserved.</p>
            </div>
            <div class="footer-legal-links">
              <a routerLink="/privacy">Privacy</a>
              <span class="separator">•</span>
              <a routerLink="/terms">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      color: #e0e0e0;
      padding: 4rem 0 2rem;
      margin-top: 5rem;
      position: relative;
    }

    .footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .footer-content {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }

    .footer-main {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 4rem;
    }

    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .brand-logo {
      display: inline-flex;
    }

    .brand-initials {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
      color: white;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 700;
      font-family: var(--font-logo);
      text-transform: uppercase;
      font-style: italic;
      letter-spacing: 2px;
      box-shadow: 0 4px 20px rgba(26, 71, 42, 0.3);
    }

    .brand-tagline {
      color: #b0b0b0;
      font-size: 0.95rem;
      line-height: 1.6;
      max-width: 250px;
    }

    .footer-links {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 3rem;
    }

    .link-group h4 {
      color: white;
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .link-group ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .link-group a {
      color: #b0b0b0;
      text-decoration: none;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .link-group a:hover {
      color: var(--color-primary);
      transform: translateX(4px);
    }

    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .copyright p {
      color: #808080;
      font-size: 0.9rem;
      margin: 0;
    }

    .footer-legal-links {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .footer-legal-links a {
      color: #808080;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s ease;
    }

    .footer-legal-links a:hover {
      color: var(--color-primary);
    }

    .separator {
      color: #606060;
      font-size: 0.8rem;
    }

    @media (max-width: 768px) {
      .footer {
        padding: 3rem 0 1.5rem;
      }

      .footer-main {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }

      .footer-links {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
      }

      .brand-tagline {
        max-width: 100%;
      }

      .footer-bottom {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .footer-links {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .link-group h4 {
        font-size: 0.9rem;
      }

      .link-group a {
        font-size: 0.9rem;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}

  navigateToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.scrollToSection(sectionId);
        }, 100);
      });
    } else {
      this.scrollToSection(sectionId);
    }
  }

  private scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 70;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }
}