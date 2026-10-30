import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="legal-page">
      <div class="container">
        <div class="legal-header">
          <h1>Privacy Policy</h1>
          <p class="last-updated">Last Updated: {{ lastUpdated }}</p>
        </div>

        <div class="legal-content">
          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to Arunabh Priyadarshi's portfolio website ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we handle your information when you visit our website.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <h3>2.1 Information You Provide</h3>
            <p>We may collect information that you voluntarily provide when you:</p>
            <ul>
              <li>Contact us through our contact form (your name, email address and message are stored in a private Google Sheet)</li>
              <li>Subscribe to our newsletter (if applicable)</li>
            </ul>

            <h3>2.2 Information Automatically Collected</h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>IP address (anonymized)</li>
              <li>Pages visited and time spent</li>
              <li>Referral source</li>
              <li>Device information</li>
            </ul>

            <h3>2.3 Cookies and Tracking Technologies</h3>
            <p>
              We use minimal cookies and similar tracking technologies to enhance your experience. These may include:
            </p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website (Google Analytics with IP anonymization)</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences (theme, language)</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>To respond to your inquiries and communication</li>
              <li>To improve our website and user experience</li>
              <li>To analyze website traffic and usage patterns</li>
              <li>To send you relevant information (only with your consent)</li>
              <li>To comply with legal obligations</li>
              <li>To protect against fraudulent or illegal activity</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> With trusted third-party services that help us operate our website (e.g., hosting providers, analytics services, Google for contact form messages)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent:</strong> When you explicitly agree to such sharing</li>
            </ul>
          </section>

          <section>
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. 
              These measures include:
            </p>
            <ul>
              <li>SSL/TLS encryption for data transmission</li>
              <li>Regular security assessments</li>
              <li>Limited access to personal information</li>
              <li>Secure hosting infrastructure</li>
            </ul>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2>6. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law. 
              Contact form submissions are typically retained for up to 12 months unless ongoing communication requires longer retention.
            </p>
          </section>

          <section>
            <h2>7. Your Rights and Choices</h2>
            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Objection:</strong> Object to certain processing of your data</li>
              <li><strong>Withdrawal of Consent:</strong> Withdraw previously given consent</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the information provided below.
            </p>
          </section>

          <section>
            <h2>8. Children's Privacy</h2>
            <p>
              Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. 
              If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2>9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of residence. 
              These countries may have data protection laws different from those in your country. 
              We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy.
            </p>
          </section>

          <section>
            <h2>10. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites or services (GitHub, LinkedIn, Medium, etc.). 
              We are not responsible for the privacy practices of these third parties. 
              We encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          <section>
            <h2>11. California Privacy Rights (CCPA)</h2>
            <p>
              If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA), including:
            </p>
            <ul>
              <li>The right to know what personal information we collect</li>
              <li>The right to delete your personal information</li>
              <li>The right to opt-out of the sale of personal information (we do not sell personal information)</li>
              <li>The right to non-discrimination for exercising your privacy rights</li>
            </ul>
          </section>

          <section>
            <h2>12. EU/UK Privacy Rights (GDPR)</h2>
            <p>
              If you are located in the European Union or United Kingdom, you have additional rights under the General Data Protection Regulation (GDPR), including:
            </p>
            <ul>
              <li>The right to be informed about data collection</li>
              <li>The right to rectification of inaccurate data</li>
              <li>The right to erasure ("right to be forgotten")</li>
              <li>The right to restrict processing</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
              <li>Rights related to automated decision-making</li>
            </ul>
          </section>

          <section>
            <h2>13. Changes to This Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. 
              We will notify you of any material changes by posting the new privacy policy on this page with an updated "Last Updated" date.
            </p>
          </section>

          <section>
            <h2>14. Contact Information</h2>
            <p>
              If you have any questions, concerns, or requests regarding this privacy policy or our privacy practices, please contact us at:
            </p>
            <div class="contact-info">
              <p><strong>Email:</strong> arunabhmaster&#64;gmail.com</p>
              <p><strong>Website:</strong> <a href="/">https://arunabh.me</a></p>
              <p><strong>Location:</strong> Patna, India</p>
            </div>
          </section>

          <section>
            <h2>15. Consent</h2>
            <p>
              By using our website, you consent to our privacy policy and agree to its terms. 
              If you do not agree with this policy, please do not use our website.
            </p>
          </section>
        </div>

        <div class="legal-footer">
          <a routerLink="/" class="back-link">
            <span>← Back to Home</span>
          </a>
          <a routerLink="/terms" class="related-link">
            <span>Terms of Use →</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .legal-page {
      min-height: 100vh;
      padding: 80px 0 40px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .legal-header {
      text-align: center;
      margin-bottom: 3rem;
      padding-bottom: 2rem;
      border-bottom: 2px solid #dee2e6;
    }

    .legal-header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--color-text);
      margin-bottom: 0.5rem;
    }

    .last-updated {
      color: var(--color-text-secondary);
      font-size: 0.95rem;
    }

    .legal-content {
      background: white;
      border-radius: 12px;
      padding: 3rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    section {
      margin-bottom: 2.5rem;
    }

    section:last-child {
      margin-bottom: 0;
    }

    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-primary);
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #e9ecef;
    }

    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--color-text);
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
    }

    p {
      line-height: 1.7;
      color: var(--color-text-secondary);
      margin-bottom: 1rem;
    }

    ul {
      margin: 1rem 0;
      padding-left: 2rem;
    }

    li {
      line-height: 1.7;
      color: var(--color-text-secondary);
      margin-bottom: 0.5rem;
    }

    li strong {
      color: var(--color-text);
    }

    .contact-info {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      margin-top: 1rem;
    }

    .contact-info p {
      margin-bottom: 0.5rem;
    }

    .contact-info p:last-child {
      margin-bottom: 0;
    }

    .contact-info a {
      color: var(--color-primary);
      text-decoration: none;
    }

    .contact-info a:hover {
      text-decoration: underline;
    }

    .legal-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid #dee2e6;
    }

    .back-link, .related-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--color-primary);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .back-link:hover, .related-link:hover {
      transform: translateX(-4px);
    }

    .related-link:hover {
      transform: translateX(4px);
    }

    @media (max-width: 768px) {
      .legal-content {
        padding: 2rem 1.5rem;
      }

      .legal-header h1 {
        font-size: 2rem;
      }

      h2 {
        font-size: 1.25rem;
      }

      .legal-footer {
        flex-direction: column;
        gap: 1rem;
      }
    }

    @media (max-width: 480px) {
      .legal-content {
        padding: 1.5rem 1rem;
      }

      .legal-header h1 {
        font-size: 1.75rem;
      }
    }
  `]
})
export class PrivacyPolicyComponent implements OnInit {
  lastUpdated = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  constructor(private seoService: SEOService) {}

  ngOnInit(): void {
    this.seoService.updateSEO({
      title: 'Privacy Policy - Arunabh Priyadarshi',
      description: 'Privacy policy for Arunabh Priyadarshi portfolio website. Learn how we collect, use, and protect your personal information.',
      keywords: 'privacy policy, data protection, personal information, cookies, GDPR, CCPA',
      canonicalUrl: 'https://arunabh.me/privacy'
    });
  }
}