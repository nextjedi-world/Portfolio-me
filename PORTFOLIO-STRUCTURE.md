# Portfolio Data Structure Documentation

This document provides a comprehensive guide to the `portfolio.json` file structure used in this Angular portfolio application.

## Table of Contents

- [Overview](#overview)
- [Reference Resolution System](#reference-resolution-system)
- [Data Structure](#data-structure)
  - [Shared Section](#shared-section)
  - [Personal Information](#personal-information)
  - [Metrics](#metrics)
  - [Story Section](#story-section)
  - [Project Categories](#project-categories)
  - [Skills](#skills)
  - [Achievements](#achievements)
  - [Contact](#contact)
  - [Navigation](#navigation)

## Overview

The `portfolio.json` file is the central data source for the entire portfolio application. It uses a hierarchical structure with a sophisticated reference resolution system to eliminate data duplication and maintain consistency across the application.

## Reference Resolution System

The portfolio uses a reference system to avoid data duplication:

```json
{
  "shared": {
    "contact": {
      "email": "user@example.com",
      "resume": "assets/resume/Resume.pdf"
    }
  },
  "personal": {
    "email": "@shared.contact.email",
    "resumeUrl": "@shared.contact.resume"
  }
}
```

- References start with `@` followed by the path to the shared data
- Supports nested references like `@shared.level1.level2.value`
- Automatically resolved by `PortfolioService.resolveReferences()`

## Data Structure

### Shared Section

Contains reusable data referenced throughout the portfolio:

```json
{
  "shared": {
    "contact": {
      "email": "string",
      "resume": "string (path to resume file)"
    },
    "social": {
      "platform_name": {
        "url": "string",
        "icon": "string (icon name)",
        "platform": "string (display name)"
      }
    }
  }
}
```

**Supported social platforms:**

- `github`, `linkedin`, `medium`, `calendly`

### Personal Information

Core personal details and contact information:

```json
{
  "personal": {
    "name": "string (full name in caps)",
    "title": "string (professional title with experience)",
    "tagline": "string (professional summary/passion statement)",
    "email": "string (contact email)",
    "location": "string (city, country)",
    "availability": {
      "status": "string (available|unavailable)",
      "message": "string (availability description)",
      "type": "string (remote-only|hybrid|onsite)"
    },
    "profileImage": "string (path to profile image)",
    "resumeUrl": "string (path to resume file)"
  }
}
```

### Metrics

Professional achievement metrics displayed in the hero section:

```json
{
  "metrics": [
    {
      "id": "string (unique identifier)",
      "value": "string (metric value with units)",
      "label": "string (metric description)",
      "description": "string (detailed explanation)"
    }
  ]
}
```

**Common metric types:**

- Revenue impact, team leadership, code contributions, user metrics

### Story Section

Personal narrative and career highlights:

```json
{
  "story": {
    "title": "string (section title)",
    "paragraphs": ["string (paragraph content)"],
    "highlight": "string (HTML content with career highlights)"
  }
}
```

**Highlight format:**

- Uses HTML structure: `<strong>Title:</strong><ul><li>Item</li></ul>`
- Rendered with Material Design icons in the UI
- Supports justified text alignment

### Project Categories

Hierarchical project organization:

```json
{
  "projectCategories": {
    "category_id": {
      "label": "string (display name)",
      "description": "string (category description)",
      "icon": "string (Material Design icon)",
      "featured": ["array of featured project IDs"],
      "projects": {
        "project_id": {
          "id": "string (unique identifier)",
          "title": "string (project name)",
          "description": "string (brief description)",
          "image": "string (project image URL)",
          "category": "string (matches category_id)",
          "company": "string (company name)",
          "duration": "string (time period)",
          "metrics": {
            "key": "value (project-specific metrics)"
          },
          "techStack": ["array of technologies"],
          "caseStudyUrl": "string (optional detailed case study path)",
          "highlights": ["array of key achievements"],
          "impact": "string (business/technical impact)",
          "architecture": "string (technical architecture description)",
          "challenges": ["array of challenges overcome"]
        }
      }
    }
  }
}
```

**Project categories:**

- `professional`: Enterprise/corporate projects
- `side-projects`: Personal/open-source projects
- `freelance`: Client work

### Skills

Technical skills organized by categories:

```json
{
  "skills": {
    "categories": [
      {
        "name": "string (category name)",
        "icon": "string (Material Design icon)",
        "skills": [
          {
            "name": "string (skill name)",
            "level": "number (1-5 proficiency)",
            "years": "number (years of experience)"
          }
        ]
      }
    ]
  }
}
```

**Skill levels:**

- 1: Beginner, 2: Intermediate, 3: Advanced, 4: Expert, 5: Master

### Achievements

Professional achievements and certifications:

```json
{
  "achievements": [
    {
      "title": "string (achievement title)",
      "description": "string (detailed description)",
      "year": "string (year or year range)",
      "type": "string (competition|speaking|certification|academic)",
      "certificateUrl": "string (optional path to certificate image)"
    }
  ]
}
```

**Achievement types:**

- `competition`: Coding contests, hackathons
- `speaking`: Conference talks, presentations
- `certification`: Professional certificates
- `academic`: Academic achievements

**Certificate integration:**

- Local assets stored in `public/assets/certificates/`
- Displayed in modal dialog with image viewer
- Supports various image formats (JPG, PNG, PDF)

### Contact

Contact section configuration:

```json
{
  "contact": {
    "title": "string (section title)",
    "subtitle": "string (section subtitle)",
    "email": "string (contact email)",
    "cta": [
      {
        "text": "string (button text)",
        "url": "string (action URL)",
        "type": "string (primary|secondary)"
      }
    ]
  }
}
```

### Navigation

Application navigation configuration:

```json
{
  "navigation": [
    {
      "label": "string (nav item text)",
      "href": "string (section anchor)",
      "section": "string (section identifier)"
    }
  ]
}
```

## File Management Guidelines

### Adding New Content

1. **Projects**: Add to appropriate category in `projectCategories`
2. **Skills**: Add to relevant category in `skills.categories`
3. **Achievements**: Add to `achievements` array with proper type
4. **Certificates**: Store images in `public/assets/certificates/`

### Reference Management

1. **Shared Data**: Add common values to `shared` section
2. **References**: Use `@shared.path.to.value` format
3. **Validation**: Ensure all references resolve correctly

### Best Practices

1. **Consistency**: Use consistent naming conventions
2. **Validation**: Validate JSON syntax before deployment
3. **Assets**: Store all media assets in appropriate `public/assets/` subdirectories
4. **Performance**: Optimize images before adding to assets
5. **Accessibility**: Include alt text and descriptions where applicable

## Component Integration

The portfolio data is consumed by these main components:

- **HeroComponent**: Uses `personal`, `metrics`
- **StoryComponent**: Uses `story` section
- **ProjectsComponent**: Uses `projectCategories`
- **SkillsComponent**: Uses `skills`
- **AchievementsComponent**: Uses `achievements`
- **ContactComponent**: Uses `contact`
- **NavigationComponent**: Uses `navigation`

## Development Notes

- All components use Angular signals for reactive state management
- Data is loaded via `PortfolioService` with automatic reference resolution
- Components support loading states and error handling
- Intersection Observer used for scroll-based animations
- Material Design icons used throughout for consistency
