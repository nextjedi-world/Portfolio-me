import { Component, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PortfolioService } from '../services/portfolio.service';
import { NavigationItem, PersonalInfo } from '../models/portfolio.interface';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="navigation" 
            [class.scrolled]="isScrolled()" 
            [class.mobile-menu-open]="isMobileMenuOpen()">
      <nav class="nav-container">
        <div class="container">
          <div class="nav-content">
            <!-- Logo/Brand -->
            <div class="nav-brand">
              <a href="#" class="brand-link" (click)="goToHome($event)">
                <div class="brand-text">
                  <span class="brand-initials">{{ getInitials() }}</span>
                  <span class="brand-name">{{ getFirstName() }}</span>
                </div>
              </a>
            </div>

            <!-- Desktop Navigation -->
            <div class="nav-links desktop-nav">
              @if (navItems() && navItems()!.length > 0) {
                @for (item of navItems(); track item.href) {
                  <a href="#" 
                     class="nav-link"
                     [class.active]="isActiveSection(item.section)"
                     (click)="navigateToSection($event, item.section)">
                    {{ item.label }}
                  </a>
                }
              } @else {
                <!-- Default navigation items while loading -->
                <a href="#" class="nav-link" (click)="navigateToSection($event, 'about')">About</a>
                <a href="#" class="nav-link" (click)="navigateToSection($event, 'projects')">Projects</a>
                <a href="#" class="nav-link" (click)="navigateToSection($event, 'contact')">Contact</a>
              }
            </div>

            <!-- Mobile Menu Toggle -->
            <button class="mobile-menu-toggle" 
                    (click)="toggleMobileMenu()"
                    [attr.aria-expanded]="isMobileMenuOpen()"
                    aria-label="Toggle navigation menu">
              <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="mobile-nav" [class.open]="isMobileMenuOpen()">
          <div class="mobile-nav-content">
            @if (navItems() && navItems()!.length > 0) {
              @for (item of navItems(); track item.href) {
                <a href="#" 
                   class="mobile-nav-link"
                   [class.active]="isActiveSection(item.section)"
                   (click)="navigateToSection($event, item.section); closeMobileMenu()">
                  {{ item.label }}
                </a>
              }
            } @else {
              <!-- Default navigation items while loading -->
              <a href="#" class="mobile-nav-link" (click)="navigateToSection($event, 'about'); closeMobileMenu()">About</a>
              <a href="#" class="mobile-nav-link" (click)="navigateToSection($event, 'projects'); closeMobileMenu()">Projects</a>
              <a href="#" class="mobile-nav-link" (click)="navigateToSection($event, 'contact'); closeMobileMenu()">Contact</a>
            }
          </div>
        </div>
      </nav>

      <!-- Mobile Menu Backdrop -->
      @if (isMobileMenuOpen()) {
        <div class="mobile-backdrop" (click)="closeMobileMenu()"></div>
      }
    </header>
  `,
  styles: [`
    .navigation {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    .navigation.scrolled {
      background: rgba(255, 255, 255, 0.98);
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
      border-bottom-color: rgba(0, 0, 0, 0.08);
    }

    .nav-container {
      position: relative;
    }

    .nav-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0;
      min-height: 70px;
    }

    .nav-brand {
      flex-shrink: 0;
    }

    .brand-link {
      text-decoration: none;
      color: var(--color-text);
      transition: var(--transition);
    }

    .brand-link:hover {
      color: var(--color-primary);
    }

    .brand-link:hover .brand-initials {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 4px 15px rgba(26, 71, 42, 0.3);
    }

    .brand-text {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand-initials {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
      color: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 600;
      font-family: var(--font-logo);
      text-transform: uppercase;
      font-style: italic;
      letter-spacing: 1px;
      transition: var(--transition);
    }

    .brand-name {
      font-size: 20px;
      font-weight: 600;
      font-family: var(--font-heading);
      color: var(--color-primary);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .nav-link {
      font-size: 16px;
      font-weight: 500;
      color: var(--color-text);
      text-decoration: none;
      transition: var(--transition);
      position: relative;
      padding: 0.5rem 0;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--color-primary);
      transition: var(--transition);
    }

    .nav-link:hover,
    .nav-link.active {
      color: var(--color-primary);
    }

    .nav-link:hover::after,
    .nav-link.active::after {
      width: 100%;
    }

    .mobile-menu-toggle {
      display: none;
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      z-index: 1001;
      position: relative;
    }

    .hamburger {
      width: 24px;
      height: 18px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .hamburger span {
      display: block;
      height: 2px;
      width: 100%;
      background: var(--color-text);
      border-radius: 1px;
      transition: var(--transition);
      transform-origin: center;
    }

    .mobile-menu-open .hamburger span:first-child {
      transform: rotate(45deg) translate(6px, 6px);
    }

    .mobile-menu-open .hamburger span:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }

    .mobile-menu-open .hamburger span:last-child {
      transform: rotate(-45deg) translate(6px, -6px);
    }

    .mobile-nav {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transform: translateY(-100%);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    }

    .mobile-nav.open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    .mobile-nav-content {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      max-width: 400px;
      margin: 0 auto;
    }

    .mobile-nav-link {
      font-size: 18px;
      font-weight: 500;
      color: var(--color-text);
      text-decoration: none;
      padding: 0.75rem 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      transition: var(--transition);
      display: block;
    }

    .mobile-nav-link:hover,
    .mobile-nav-link.active {
      color: var(--color-primary);
      padding-left: 1rem;
    }

    .mobile-nav-link:last-of-type {
      border-bottom: none;
    }

    .mobile-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      z-index: 999;
      opacity: 0;
      animation: fadeIn 0.3s ease forwards;
    }

    @keyframes fadeIn {
      to {
        opacity: 1;
      }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .desktop-nav {
        display: none;
      }

      .mobile-menu-toggle {
        display: block;
      }

      .mobile-nav {
        display: block;
      }

      .brand-name {
        display: none;
      }

      .nav-content {
        padding: 0.75rem 0;
        min-height: 60px;
      }
    }

    @media (max-width: 480px) {
      .mobile-nav-content {
        padding: 1.5rem;
      }

      .mobile-nav-link {
        font-size: 16px;
      }
    }

    /* Hide navigation during print */
    @media print {
      .navigation {
        display: none;
      }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .navigation {
        background: white;
        border-bottom: 2px solid var(--color-text);
      }

      .navigation.scrolled {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      }
    }
  `]
})
export class NavigationComponent implements OnInit {
  protected readonly navItems = signal<NavigationItem[] | null>(null);
  protected readonly personalInfo = signal<PersonalInfo | null>(null);
  protected readonly isScrolled = signal<boolean>(false);
  protected readonly isMobileMenuOpen = signal<boolean>(false);
  protected readonly activeSection = signal<string>('');

  private intersectionObserver?: IntersectionObserver;
  
  constructor(
    protected portfolioService: PortfolioService,
    private router: Router
  ) {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.innerWidth > 768) {
      this.closeMobileMenu();
    }
  }

  ngOnInit(): void {
    this.loadData();
    this.setupSectionObserver();
    this.isScrolled.set(window.scrollY > 20);
    this.subscribeToDataChanges();
  }

  private loadData(): void {
    const data = this.portfolioService.data();
    if (data) {
      this.navItems.set(data.navigation);
      this.personalInfo.set(data.personal);
    }
  }
  
  private subscribeToDataChanges(): void {
    const checkInterval = setInterval(() => {
      const data = this.portfolioService.data();
      if (data && data.navigation) {
        this.navItems.set(data.navigation);
        this.personalInfo.set(data.personal);
        clearInterval(checkInterval);
      }
    }, 100);
    setTimeout(() => clearInterval(checkInterval), 10000);
  }

  private setupSectionObserver(): void {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id || 'home';
            this.activeSection.set(sectionId);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
      }
    );

    // Wait for DOM to be ready and observe sections
    setTimeout(() => {
      const sections = ['hero', 'about', 'projects', 'contact'];
      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element && this.intersectionObserver) {
          this.intersectionObserver.observe(element);
        }
      });
    }, 500);
  }

  protected getInitials(): string {
    const info = this.personalInfo();
    if (!info) return 'AP';
    
    return info.name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  }

  protected getFirstName(): string {
    const info = this.personalInfo();
    if (!info) return 'Portfolio';
    
    return info.name.split(' ')[0];
  }

  protected isActiveSection(section: string): boolean {
    // If we're not on the home page, no section is active
    if (this.router.url !== '/') {
      return false;
    }
    
    return this.activeSection() === section || 
           (this.activeSection() === '' && section === 'about');
  }

  protected goToHome(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    });
    this.closeMobileMenu();
  }

  protected navigateToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    
    // If we're already on the home page, just scroll to section
    if (this.router.url === '/') {
      this.scrollToSection(sectionId);
    } else {
      // Navigate to home first, then scroll to section
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.scrollToSection(sectionId);
        }, 100);
      });
    }
  }

  private scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 70; // Navigation height
      const elementPosition = element.offsetTop - navHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  protected closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
}