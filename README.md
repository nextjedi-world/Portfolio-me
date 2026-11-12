# Arunabh Priyadarshi - Portfolio Website

> Modern Angular 20 portfolio showcasing 9 years of Senior Software Engineer (SDE-III) experience with intelligent design, interactive certificate integration, and optimal performance.

![Portfolio Preview](https://img.shields.io/badge/Angular-20-red) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Material Design](https://img.shields.io/badge/Material-Design-green) ![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)

## 🌟 Live Portfolio

**Visit: [arunabh.me](https://arunabh.me)**

## 🚀 Features

### 🎯 Core Functionality

- **Professional Showcase**: Comprehensive portfolio with projects, achievements, and 9 years of experience
- **Interactive Certificates**: Local certificate integration with modal viewing for achievements
- **Expandable Achievements**: Show/hide functionality with initial display of 6 achievements
- **Dynamic Project Details**: Dedicated pages for each project with SEO-friendly URLs
- **Smart Navigation**: Intelligent routing and smooth scrolling across all pages
- **Responsive Design**: Mobile-first approach with Material Design integration
- **Legal Compliance**: GDPR/CCPA compliant Privacy Policy and Terms of Use

### 🏗️ Technical Architecture

- **Angular 20 Standalone Components**: Modern component architecture without NgModules
- **Signal-Based State Management**: Reactive programming with Angular signals
- **Zero Data Duplication**: Hierarchical JSON structure with reference resolution system
- **Lazy Loading**: Optimized performance with route-based code splitting
- **SEO Optimized**: Dynamic meta tags, structured data, and sitemap generation

### 🎨 User Experience

- **Professional Achievements**: Reward-style badges with local certificate integration and modal viewing
- **Career Highlights**: Justified text with Material Design arrow icons for enhanced readability
- **Smart Project Categorization**: Dynamic tabs with intelligent display logic
- **Expand/Collapse Functionality**: Progressive disclosure with View More/Less buttons
- **Interactive Elements**: Loading states, smooth animations, and hover effects
- **Accessibility Focused**: WCAG compliant design with keyboard navigation support

## 📋 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 20+

### Development Setup

```bash
# Clone repository
git clone https://github.com/nextjedi/Portfolio-me.git
cd Portfolio-me

# Install dependencies
npm install

# Start development server
npm start
# Or: ng serve

# Open browser to http://localhost:4200
```

### Build & Deploy

```bash
# Build for production
npm run build
# Or: ng build

# Test production build locally
npx serve dist/portfolio-redesign

# Deploy to Vercel (via GitHub Actions)
git push origin master
```

## 🏗️ Project Structure

### Core Architecture

```
src/
├── app/
│   ├── app.ts                 # Root component with theme integration
│   ├── app.routes.ts          # Lazy-loaded routing configuration
│   └── app.config.ts          # Application providers
├── components/
│   ├── home.component.ts      # Main portfolio container
│   ├── navigation.component.ts # Smart navigation system
│   ├── hero.component.ts      # Professional hero section
│   ├── achievements.component.ts # Reward-style achievements
│   ├── projects.component.ts  # Categorized project showcase
│   ├── project-detail.component.ts # Dynamic project pages
│   ├── footer.component.ts    # Professional footer
│   ├── privacy-policy.component.ts # Legal compliance
│   └── terms-of-use.component.ts   # Community standards
├── services/
│   ├── portfolio.service.ts   # Central data service
│   ├── seo.service.ts         # Dynamic SEO management
│   └── theme.service.ts       # Theme and preferences
└── models/
    └── portfolio.interface.ts # TypeScript interfaces
```

### Data Architecture

```
public/
├── data/
│   └── portfolio.json         # Single source of truth
├── assets/
│   ├── images/               # Project images and logos
│   ├── resume/               # Professional documents
│   └── certificates/         # Achievement certificates (JPG/PNG/PDF)
├── sitemap.xml               # SEO site structure
└── robots.txt                # Search engine directives
```

## 📋 Portfolio Data Structure

### Comprehensive Documentation

For detailed information about the `portfolio.json` structure, reference system, and data management, see:

**📖 [PORTFOLIO-STRUCTURE.md](PORTFOLIO-STRUCTURE.md)**

### Key Features

- **Reference Resolution System**: Eliminates data duplication with `@shared.path.to.value` references
- **Hierarchical Organization**: Structured categories for projects, skills, and achievements
- **Certificate Integration**: Local asset management with modal viewing capabilities
- **Type Safety**: Full TypeScript interface support for all data structures

### Recent Updates

- ✨ **Enhanced Hero Section**: Updated with SDE-III title and passionate tagline
- 🏆 **Certificate Integration**: Local certificate assets with modal viewing
- 📊 **Expandable Achievements**: Progressive disclosure with show/hide functionality
- 🎯 **Career Highlights**: HTML-formatted career highlights with Material Design icons
- 📱 **Responsive Improvements**: Justified text and improved mobile experience

## 🔧 Key Technologies

### Frontend Stack

- **Angular 20**: Latest framework with standalone components
- **TypeScript 5.0**: Type-safe development
- **Angular Material**: Professional UI components
- **RxJS**: Reactive programming patterns
- **CSS Custom Properties**: Dynamic theming system

### Development Tools

- **Angular CLI**: Project scaffolding and build system
- **Jasmine & Karma**: Unit testing framework
- **ESLint**: Code quality and consistency
- **Vercel**: Production deployment platform
- **GitHub Actions**: CI/CD automation

## 📊 Performance Metrics

### Target Benchmarks

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Optimization Features

- Lazy loading with intersection observers
- Optimized images with responsive sizing
- Minimal bundle splitting
- Service worker ready
- SEO-optimized meta tags

## 🚀 Deployment

### Automatic Deployment

Every push to `master` branch automatically deploys to Vercel via GitHub Actions.

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Environment Setup

Configure these environment variables in Vercel:

```
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
CONTACT_EMAIL=arunabhmaster@gmail.com
```

## 📈 SEO & Analytics

### Built-in SEO Features

- Dynamic meta tags for all pages
- JSON-LD structured data
- Automatic sitemap generation
- Open Graph and Twitter Cards
- Canonical URL management

### Analytics Integration

- Google Analytics 4 ready
- Custom event tracking
- Performance monitoring
- User engagement metrics

## 🎯 Professional Highlights

### Technical Achievements

- **Enterprise Architecture**: Scalable component design patterns
- **Performance Optimization**: Sub-2 second loading times
- **Accessibility Compliance**: WCAG 2.1 AA standards
- **SEO Excellence**: Structured data and meta optimization

### Featured Projects

- **Cybersecurity Platform**: Enterprise security solution
- **Fintech API**: High-performance financial services
- **E-commerce Platform**: Full-stack retail solution
- **Open Source Contributions**: Community development work

## 🤝 Contributing

This is a personal portfolio project. However, suggestions and feedback are welcome:

1. **Issues**: Report bugs or suggest features
2. **Discussions**: Share ideas for improvements
3. **Code Quality**: Follow existing patterns and conventions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About the Developer

**Arunabh Priyadarshi**  
Senior Software Engineer SDE-III with 9 years of experience  
_Developer, coder, hacker, passionate to learn and build stuff that impacts and improves the way we do things for good_

### 🏆 Key Achievements

- **Gartner Innovation Tools Team**: Senior developer defining best practices and managing shared code libraries
- **Microservices & AI**: Architected applications integrating with deep learning models
- **Code Gladiators**: 3x National Finalist (Top 300 out of 250,000+ developers)
- **Microsoft Research**: Certified in Design & Analysis of Algorithms

### 📞 Connect

- **Email**: arunabhmaster@gmail.com
- **LinkedIn**: [linkedin.com/in/arunabhpriyadarshi](https://linkedin.com/in/arunabhpriyadarshi)
- **GitHub**: [github.com/nextjedi](https://github.com/nextjedi)
- **Portfolio**: [arunabh.me](https://arunabh.me)

---

**Built with ❤️ using Angular 20 and deployed on Vercel**
