import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';
import { BlogPost } from '../models/portfolio.interface';

interface MediumRSSResponse {
  status: string;
  items: MediumRSSItem[];
}

interface MediumRSSItem {
  title: string;
  link: string;
  description?: string;
  content?: string;
  pubDate: string;
  thumbnail?: string;
  categories?: string[];
  author?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MediumService {
  private readonly RSS_TO_JSON_API = 'https://api.rss2json.com/v1/api.json';
  private readonly REQUEST_TIMEOUT = 10000; // 10 seconds

  constructor(private http: HttpClient) {}

  getBlogPosts(mediumRssUrl: string, fallbackPosts: BlogPost[] = []): Observable<BlogPost[]> {
    const url = `${this.RSS_TO_JSON_API}?rss_url=${encodeURIComponent(mediumRssUrl)}`;

    return this.http.get<MediumRSSResponse>(url).pipe(
      timeout(this.REQUEST_TIMEOUT),
      map((response) => {
        if (response.status === 'ok' && response.items?.length > 0) {
          return response.items.slice(0, 6).map((item) => this.transformMediumItem(item));
        }
        // Return fallback posts if API response is empty
        return fallbackPosts;
      }),
      catchError((error: HttpErrorResponse) => {
        console.warn('Medium RSS feed failed, using fallback posts:', error.message);
        // Return fallback posts on error
        return of(fallbackPosts);
      }),
    );
  }

  private transformMediumItem(item: MediumRSSItem): BlogPost {
    return {
      title: item.title,
      excerpt: this.cleanDescription(item.description || item.content || ''),
      readTime: this.estimateReadTime(item.content || item.description || ''),
      publishedDate: this.formatDate(item.pubDate),
      url: item.link,
      thumbnail:
        item.thumbnail ||
        this.extractImageFromContent(item.content || '') ||
        'assets/images/blog-placeholder.jpg',
    };
  }

  private cleanDescription(description: string): string {
    // Remove HTML tags and limit length
    const div = document.createElement('div');
    div.innerHTML = description;
    const text = div.textContent || div.innerText || '';
    return text.length > 150 ? text.substring(0, 150).trim() + '...' : text;
  }

  private extractImageFromContent(content: string): string | null {
    // Extract first image from Medium content
    const imgRegex = /<img[^>]+src="([^">]+)"/i;
    const match = content.match(imgRegex);
    return match ? match[1] : null;
  }

  private estimateReadTime(content: string): string {
    // Remove HTML and estimate reading time
    const div = document.createElement('div');
    div.innerHTML = content;
    const text = div.textContent || div.innerText || '';
    const words = text.trim().split(/\s+/).length;
    const wordsPerMinute = 200;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  }

  private formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      return dateString;
    }
  }

  // Method to validate Medium RSS URL
  validateMediumRSSUrl(url: string): boolean {
    const mediumRSSPattern = /^https:\/\/medium\.com\/@[\w\-\.]+\/feed$/;
    return mediumRSSPattern.test(url);
  }

  // Get Medium profile URL from RSS URL
  getProfileUrlFromRSS(rssUrl: string): string {
    return rssUrl.replace('/feed', '');
  }
}
