# CLAUDE.md

Personal portfolio site for Arunabh Priyadarshi, Angular 20 standalone components, deployed to Vercel.
This repo is likely to be archived; only minimal platform adoption has been done (see Platform below).

## Platform (NextJedi)
Follows the repo contract in nextjedi-world/platform `docs/CONTRACTS.md`. `make verify` must pass before finishing.

| Command | What it does |
|---|---|
| `make setup` | `npm ci` and install lefthook hooks |
| `make dev` | `npm start` (ng serve) |
| `make verify` | typecheck + unit tests (Karma, headless Chrome) + production build |
| `make e2e` | no e2e suite here (no-op) |

No linter or formatter is configured; `make verify` has no lint step. Commits use conventional commits.
CI is `.github/workflows/ci.yml` (inline, because the platform repo is private); deploy is `.github/workflows/deploy.yml`.

## Project Overview

This is a personal portfolio website for Arunabh Priyadarshi (Senior Software Engineer) built with Angular 20. The project represents a modern Angular standalone components architecture showcasing enterprise software development experience.

The portfolio includes:
- Hero section with professional metrics and CTAs
- Personal story and background
- Featured projects with detailed case studies
- Blog integration (Medium RSS)
- Contact information and availability status

## Development Commands

```bash
# Start development server
npm start
ng serve

# Build for production
npm run build
ng build

# Run tests
npm test
ng test

# Watch build (development mode)
npm run watch
ng build --watch --configuration development

# Test single file (example)
ng test --include="**/hero.component.spec.ts"

# Build with specific configuration
ng build --configuration=production
```

## Architecture Overview

### Core Structure
- **Angular 20 Standalone Components**: No NgModule, uses standalone component architecture
- **Signal-based State Management**: Modern reactive patterns with Angular signals
- **Lazy Loading Routes**: Components loaded on-demand via dynamic imports
- **Material Design Integration**: Angular Material components for UI consistency

### Key Files and Patterns

**Application Core:**
- `src/app/app.ts` - Root component with theme service integration
- `src/app/app.routes.ts` - Route configuration with lazy loading
- `src/app/app.config.ts` - Application providers and configuration

**Data Architecture:**
- `public/data/portfolio.json` - Hierarchical data structure with zero repetition
- `src/services/portfolio.service.ts` - Central data service with reference resolution
- `src/models/portfolio.interface.ts` - TypeScript interfaces for type safety

**Component Structure:**
- `src/components/home.component.ts` - Main portfolio page container
- `src/components/navigation.component.ts` - Smart navigation with route awareness  
- `src/components/project-detail.component.ts` - Dynamic project detail pages
- Individual section components (hero, projects, story, contact, blog)

### Data Reference System

The portfolio uses a sophisticated reference resolution system to eliminate data duplication:

```json
{
  "shared": {
    "contact": { "email": "user@example.com" },
    "social": { "github": { "url": "..." } }
  },
  "personal": {
    "email": "@shared.contact.email",
    "resumeUrl": "@shared.contact.resume"
  }
}
```

References like `@shared.contact.email` are automatically resolved by `PortfolioService.resolveReferences()`.

### Routing Architecture

- **Home Route** (`/`): Loads `HomeComponent` with all portfolio sections
- **Project Detail Routes** (`/:projectSlug/detail`): Dynamic project showcase pages
- **Navigation System**: Smart navigation that works from any route, with smooth scrolling on home page and route navigation from project pages

### Component Communication

- **PortfolioService**: Central data provider using signals for reactivity
- **ThemeService**: Handles light/dark mode with system preference detection
- **Project Management**: Hierarchical categorization (Professional, Side Projects, Freelance) with smart tab display

## Development Guidelines

### Angular 20 Patterns
- Use standalone components exclusively
- Leverage Angular signals for reactive state
- Implement lazy loading for optimal performance
- Follow Material Design guidelines

### Data Management
- All content managed through `portfolio.json`
- Use reference system (`@shared.xxx`) to avoid duplication
- Service methods handle category-based filtering and project retrieval

### Styling Approach
- CSS custom properties for theming
- Mobile-first responsive design
- Material Design component customization
- Animation and intersection observers for enhanced UX

### Testing Strategy
- Jasmine + Karma for unit testing
- Component testing with Material Design mocks
- Service testing with HTTP interceptors

## Key Implementation Features

**Smart Project Categorization:**
- Dynamic tab display (hide tabs if single category)
- Category-based filtering with project counts
- Featured project highlighting within categories

**Professional Project Detail Pages:**
- SEO-friendly URL slugs (`/project-name/detail`)
- Comprehensive project information display
- Navigation between projects and back to home

**Reference Resolution System:**
- Eliminates data duplication across JSON structure
- Supports nested reference paths (`@shared.level1.level2.value`)
- Graceful handling of missing references

**Navigation Intelligence:**
- Route-aware navigation (scroll on home, navigate + scroll from other pages)
- Active section highlighting on home page only
- Mobile menu with proper state management

## Current State

The application is fully implemented with:
- ✅ Complete component architecture with Angular Material integration
- ✅ Hierarchical data structure with zero repetition
- ✅ Professional project detail routing
- ✅ Smart category management and filtering
- ✅ Mobile-responsive design with animations
- ✅ Reference resolution system for data management
- ✅ Navigation system that works across all routes

All major features are implemented and functional. The codebase follows modern Angular patterns and is ready for production deployment.