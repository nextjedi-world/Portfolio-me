import { Injectable, signal, effect } from '@angular/core';
import { Theme, ThemeColors } from '../models/portfolio.interface';

export type ColorScheme = 'enterprise' | 'techBlue' | 'creative' | 'executive';
export type TypographyMode = 'compact' | 'standard' | 'large' | 'display';
export type LayoutMode = 'compact' | 'standard' | 'spacious' | 'mobile';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme = signal<Theme | null>(null);
  private colorScheme = signal<ColorScheme>('enterprise');
  private typographyMode = signal<TypographyMode>('standard');
  private layoutMode = signal<LayoutMode>('standard');

  // Color schemes from THEME-SERVICE-DESIGN.md
  private readonly colorSchemes: Record<ColorScheme, ThemeColors> = {
    enterprise: {
      primary: '#1a472a',
      primaryLight: '#2c5f3d',
      accent: '#e74c3c',
      success: '#27ae60',
      neutral: '#95a5a6',
      light: '#f8f9fa',
      text: '#2c3e50',
      textSecondary: '#6c757d',
    },
    techBlue: {
      primary: '#2563eb',
      primaryLight: '#3b82f6',
      accent: '#f59e0b',
      success: '#10b981',
      neutral: '#6b7280',
      light: '#f3f4f6',
      text: '#1f2937',
      textSecondary: '#6b7280',
    },
    creative: {
      primary: '#6366f1',
      primaryLight: '#8b5cf6',
      accent: '#f59e0b',
      success: '#10b981',
      neutral: '#6b7280',
      light: '#f9fafb',
      text: '#1f2937',
      textSecondary: '#6b7280',
    },
    executive: {
      primary: '#1f2937',
      primaryLight: '#374151',
      accent: '#3b82f6',
      success: '#10b981',
      neutral: '#9ca3af',
      light: '#f9fafb',
      text: '#111827',
      textSecondary: '#6b7280',
    },
  };

  private readonly typographyModes = {
    compact: {
      heroTitle: '48px',
      sectionTitle: '32px',
      cardTitle: '20px',
      body: '14px',
      small: '12px',
    },
    standard: {
      heroTitle: '52px',
      sectionTitle: '36px',
      cardTitle: '22px',
      body: '16px',
      small: '14px',
    },
    large: {
      heroTitle: '64px',
      sectionTitle: '44px',
      cardTitle: '28px',
      body: '20px',
      small: '16px',
    },
    display: {
      heroTitle: '72px',
      sectionTitle: '48px',
      cardTitle: '32px',
      body: '22px',
      small: '18px',
    },
  };

  private readonly layoutModes = {
    compact: {
      sectionPadding: '60px',
      cardPadding: '20px',
      gap: '16px',
    },
    standard: {
      sectionPadding: '80px',
      cardPadding: '30px',
      gap: '20px',
    },
    spacious: {
      sectionPadding: '120px',
      cardPadding: '40px',
      gap: '32px',
    },
    mobile: {
      sectionPadding: '40px',
      cardPadding: '20px',
      gap: '16px',
    },
  };

  constructor() {
    // Auto-detect system preferences
    this.detectSystemPreferences();

    // Update theme when components change
    effect(() => {
      this.updateTheme();
    });

    // Apply theme to document
    effect(() => {
      this.applyThemeToDocument();
    });
  }

  get theme() {
    return this.currentTheme.asReadonly();
  }

  get currentColorScheme() {
    return this.colorScheme.asReadonly();
  }

  get currentTypographyMode() {
    return this.typographyMode.asReadonly();
  }

  get currentLayoutMode() {
    return this.layoutMode.asReadonly();
  }

  setColorScheme(scheme: ColorScheme): void {
    this.colorScheme.set(scheme);
  }

  setTypographyMode(mode: TypographyMode): void {
    this.typographyMode.set(mode);
  }

  setLayoutMode(mode: LayoutMode): void {
    this.layoutMode.set(mode);
  }

  private detectSystemPreferences(): void {
    // Detect system color scheme preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setColorScheme('executive');
    }

    // Detect reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Could adjust animations here
    }

    // Detect device type for layout optimization
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      this.setLayoutMode('mobile');
    }
  }

  private updateTheme(): void {
    const colors = this.colorSchemes[this.colorScheme()];
    const typography = this.typographyModes[this.typographyMode()];
    const spacing = this.layoutModes[this.layoutMode()];

    const theme: Theme = {
      colors,
      fonts: {
        primary: "Inter, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        heading:
          "Inter Tight, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      },
      typography,
      spacing,
    };

    this.currentTheme.set(theme);
  }

  private applyThemeToDocument(): void {
    const theme = this.currentTheme();
    if (!theme) return;

    const root = document.documentElement;

    // Apply color variables
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-primary-light', theme.colors.primaryLight);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-success', theme.colors.success);
    root.style.setProperty('--color-neutral', theme.colors.neutral);
    root.style.setProperty('--color-light', theme.colors.light);
    root.style.setProperty('--color-text', theme.colors.text);
    root.style.setProperty('--color-text-secondary', theme.colors.textSecondary);

    // Apply typography variables
    root.style.setProperty('--font-primary', theme.fonts.primary);
    root.style.setProperty('--font-heading', theme.fonts.heading);
    root.style.setProperty('--font-size-hero', theme.typography.heroTitle);
    root.style.setProperty('--font-size-section', theme.typography.sectionTitle);
    root.style.setProperty('--font-size-card', theme.typography.cardTitle);
    root.style.setProperty('--font-size-body', theme.typography.body);
    root.style.setProperty('--font-size-small', theme.typography.small);

    // Apply spacing variables
    root.style.setProperty('--spacing-section', theme.spacing.sectionPadding);
    root.style.setProperty('--spacing-card', theme.spacing.cardPadding);
    root.style.setProperty('--spacing-gap', theme.spacing.gap);
  }

  // Industry-specific theme presets
  applyIndustryTheme(industry: 'finance' | 'startup' | 'enterprise' | 'consulting'): void {
    switch (industry) {
      case 'finance':
        this.setColorScheme('executive');
        this.setTypographyMode('compact');
        this.setLayoutMode('standard');
        break;
      case 'startup':
        this.setColorScheme('creative');
        this.setTypographyMode('large');
        this.setLayoutMode('spacious');
        break;
      case 'enterprise':
        this.setColorScheme('enterprise');
        this.setTypographyMode('standard');
        this.setLayoutMode('standard');
        break;
      case 'consulting':
        this.setColorScheme('techBlue');
        this.setTypographyMode('standard');
        this.setLayoutMode('spacious');
        break;
    }
  }

  // Reset to default theme
  resetTheme(): void {
    this.setColorScheme('enterprise');
    this.setTypographyMode('standard');
    this.setLayoutMode('standard');
  }
}
