export interface PersonalInfo {
  name: string;
  title: string;
  company: Company;
  tagline: string;
  email: string;
  location: string;
  profileImage: string;
}

export interface Company {
  name: string;
  url: string;
}

export interface Metric {
  id: string;
  value: string;
  label: string;
  description: string;
}

export interface Story {
  title: string;
  paragraphs: string[];
  highlights: string[];
}

export interface Achievement {
  title: string;
  description: string;
  year: string;
  type: 'competition' | 'speaking' | 'certification';
  certificateUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'professional' | 'side-project' | 'freelance';
  metrics?: {
    [key: string]: string;
  };
  techStack?: string[];
  caseStudyUrl?: string;
  highlights?: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Skills {
  categories: SkillCategory[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface CTAButton {
  text: string;
  url: string;
  type: 'primary' | 'secondary';
}

export interface Contact {
  title: string;
  subtitle: string;
  email: string;
  formEndpoint: string;
  social: SocialLink[];
  cta: CTAButton[];
}

export interface NavigationItem {
  label: string;
  href: string;
  section: string;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  readTime: string;
  publishedDate: string;
  url: string;
  thumbnail: string;
}

export interface Blog {
  title: string;
  subtitle: string;
  mediumRssUrl: string;
  mediumProfileUrl: string;
  fallbackPosts: BlogPost[];
}

export interface SEO {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  author: string;
  canonicalUrl: string;
}

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  accent: string;
  success: string;
  neutral: string;
  light: string;
  text: string;
  textSecondary: string;
}

export interface ThemeFonts {
  primary: string;
  heading: string;
}

export interface ThemeTypography {
  heroTitle: string;
  sectionTitle: string;
  cardTitle: string;
  body: string;
  small: string;
}

export interface ThemeSpacing {
  sectionPadding: string;
  cardPadding: string;
  gap: string;
}

export interface Theme {
  colors: ThemeColors;
  fonts: ThemeFonts;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
}

export interface SharedData {
  contact: {
    email: string;
  };
  social: {
    [key: string]: {
      url: string;
      icon: string;
      platform?: string;
      cardEmbed?: string;
      buttonEmbed?: string;
    };
  };
}

export interface ProjectCategory {
  label: string;
  description: string;
  icon: string;
  featured: string[];
  projects: {
    [key: string]: Project;
  };
}

export interface ProjectCategories {
  [categoryKey: string]: ProjectCategory;
}

export interface PortfolioData {
  shared: SharedData;
  personal: PersonalInfo;
  metrics: Metric[];
  story: Story;
  achievements: Achievement[];
  projectCategories: ProjectCategories;
  skills: Skills;
  contact: Contact;
  navigation: NavigationItem[];
  blog: Blog;
  seo: SEO;
  theme: Theme;
}