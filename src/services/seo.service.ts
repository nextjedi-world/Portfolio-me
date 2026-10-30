import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PortfolioService } from './portfolio.service';

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private meta = inject(Meta);
  private title = inject(Title);
  private portfolioService = inject(PortfolioService);

  updateSEO(pageData: {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogType?: string;
    canonicalUrl?: string;
  }) {
    const data = this.portfolioService.data();
    const defaultSEO = data?.seo;
    
    if (!defaultSEO) return;

    // Set title
    const pageTitle = pageData.title 
      ? `${pageData.title} | ${defaultSEO.author}` 
      : defaultSEO.title;
    this.title.setTitle(pageTitle);

    // Basic meta tags
    this.meta.updateTag({ 
      name: 'description', 
      content: pageData.description || defaultSEO.description 
    });
    
    this.meta.updateTag({ 
      name: 'keywords', 
      content: pageData.keywords || defaultSEO.keywords 
    });
    
    this.meta.updateTag({ 
      name: 'author', 
      content: defaultSEO.author 
    });

    // Open Graph tags
    this.meta.updateTag({ 
      property: 'og:title', 
      content: pageTitle 
    });
    
    this.meta.updateTag({ 
      property: 'og:description', 
      content: pageData.description || defaultSEO.description 
    });
    
    this.meta.updateTag({ 
      property: 'og:image', 
      content: pageData.ogImage || defaultSEO.ogImage 
    });
    
    this.meta.updateTag({ 
      property: 'og:type', 
      content: pageData.ogType || 'website' 
    });
    
    this.meta.updateTag({ 
      property: 'og:url', 
      content: pageData.canonicalUrl || defaultSEO.canonicalUrl 
    });

    // Twitter Card tags
    this.meta.updateTag({ 
      name: 'twitter:card', 
      content: 'summary_large_image' 
    });
    
    this.meta.updateTag({ 
      name: 'twitter:title', 
      content: pageTitle 
    });
    
    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: pageData.description || defaultSEO.description 
    });
    
    this.meta.updateTag({ 
      name: 'twitter:image', 
      content: pageData.ogImage || defaultSEO.ogImage 
    });

    // Canonical URL
    this.updateCanonicalUrl(pageData.canonicalUrl || defaultSEO.canonicalUrl);

    // Additional SEO tags
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
    this.meta.updateTag({ 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' });
  }

  updateProjectSEO(project: any) {
    this.updateSEO({
      title: project.title,
      description: project.description + ' | Professional project showcase by Arunabh Priyadarshi',
      keywords: `${project.title}, ${project.techStack?.join(', ')}, software engineering, portfolio`,
      ogType: 'article',
      canonicalUrl: `https://arunabhpriyadarshi.com/${this.generateSlug(project.title)}/detail`
    });
  }

  private updateCanonicalUrl(url: string) {
    // Remove existing canonical link
    const existingLink = document.querySelector('link[rel="canonical"]');
    if (existingLink) {
      existingLink.remove();
    }

    // Add new canonical link
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = url;
    document.head.appendChild(link);
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  addStructuredData(data: any) {
    // Remove existing structured data
    const existingScript = document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'structured-data';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  addPersonStructuredData() {
    const data = this.portfolioService.data();
    if (!data) return;

    const personSchema = {
      '@context': 'https://schema.org/',
      '@type': 'Person',
      name: data.personal.name,
      jobTitle: data.personal.title,
      description: data.personal.tagline,
      email: data.personal.email,
      url: 'https://arunabh.me',
      image: data.personal.profileImage,
      sameAs: [
        'https://linkedin.com/in/arunabhpriyadarshi',
        'https://github.com/nextjedi',
        'https://medium.com/@ap2'
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Gartner'
      },
      alumniOf: {
        '@type': 'Event',
        name: 'Code Gladiators',
        description: '3x National Finalist - Top 300 of 250,000+ developers'
      },
      knowsAbout: [
        'Software Engineering',
        'Enterprise Architecture', 
        'AI Integration',
        'Blockchain Technology',
        'Technical Leadership',
        'Competitive Programming'
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Senior Software Architect',
        occupationalCategory: 'Software Engineering',
        skills: 'Java, Spring Boot, React, Angular, Python, AWS, Docker, Kubernetes'
      }
    };

    this.addStructuredData(personSchema);
  }

  addProjectStructuredData(project: any) {
    const projectSchema = {
      '@context': 'https://schema.org/',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.description,
      author: {
        '@type': 'Person',
        name: 'Arunabh Priyadarshi'
      },
      url: `https://arunabh.me/${this.generateSlug(project.title)}/detail`,
      image: project.image,
      dateCreated: project.duration?.split(' - ')[0] || '2023',
      genre: 'Software Engineering',
      keywords: project.techStack?.join(', '),
      about: project.category === 'professional' ? 'Professional Software Development' : 'Personal Project'
    };

    this.addStructuredData(projectSchema);
  }
}