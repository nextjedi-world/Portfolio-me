import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private isInitialized = false;
  private measurementId: string;

  constructor() {
    this.measurementId = environment.analytics.measurementId;
    
    // Initialize Google Analytics only if measurement ID is provided and in browser environment
    if (this.measurementId && this.isBrowser() && this.isProd()) {
      this.initializeGA();
    }
  }

  private initializeGA(): void {
    // Add Google Analytics script
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    document.head.appendChild(gaScript);

    // Add GA configuration script
    const configScript = document.createElement('script');
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${this.measurementId}', {
        page_title: document.title,
        page_location: window.location.href
      });
    `;
    document.head.appendChild(configScript);

    this.isInitialized = true;
  }

  // Track page views
  trackPageView(url: string, title: string): void {
    if (this.isInitialized && typeof gtag !== 'undefined') {
      gtag('config', this.measurementId, {
        page_path: url,
        page_title: title
      });
    }
  }

  // Track custom events
  trackEvent(action: string, category: string, label?: string, value?: number): void {
    if (this.isInitialized && typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  }

  // Track project views
  trackProjectView(projectTitle: string, projectCategory: string): void {
    this.trackEvent('view_project', 'Projects', `${projectCategory}: ${projectTitle}`);
  }

  // Track contact interactions
  trackContactInteraction(method: string): void {
    this.trackEvent('contact_click', 'Contact', method);
  }

  // Track section scrolls (for engagement)
  trackSectionView(sectionName: string): void {
    this.trackEvent('view_section', 'Navigation', sectionName);
  }

  // Track external link clicks
  trackExternalLink(url: string, linkType: string): void {
    this.trackEvent('click_external_link', linkType, url);
  }

  private isProd(): boolean {
    return window.location.hostname !== 'localhost' && 
           window.location.hostname !== '127.0.0.1';
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }
}