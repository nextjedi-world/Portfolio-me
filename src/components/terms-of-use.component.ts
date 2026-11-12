import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-terms-of-use',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="legal-page">
      <div class="container">
        <div class="legal-header">
          <h1>Terms of Use</h1>
          <p class="last-updated">Last Updated: {{ lastUpdated }}</p>
        </div>

        <div class="legal-content">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website (arunabh.me), you accept and agree to be bound by
              the terms and provision of this agreement. If you do not agree to abide by the above,
              please do not use this service. These terms apply to all visitors, users, and others
              who access or use the website.
            </p>
          </section>

          <section>
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on this
              website for personal, non-commercial transitory viewing only. This is the grant of a
              license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>
                Use the materials for any commercial purpose or for any public display (commercial
                or non-commercial)
              </li>
              <li>
                Attempt to decompile or reverse engineer any software contained on this website
              </li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>
                Transfer the materials to another person or "mirror" the materials on any other
                server
              </li>
            </ul>
            <p>
              This license shall automatically terminate if you violate any of these restrictions
              and may be terminated by us at any time. Upon terminating your viewing of these
              materials or upon the termination of this license, you must destroy any downloaded
              materials in your possession whether in electronic or printed format.
            </p>
          </section>

          <section>
            <h2>3. Intellectual Property Rights</h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos,
              images, audio clips, video clips, data compilations, and software, is the property of
              Arunabh Priyadarshi or its content suppliers and is protected by international
              copyright laws.
            </p>
            <p>
              The compilation of all content on this website is the exclusive property of Arunabh
              Priyadarshi and is protected by international copyright laws. All software used on
              this website is the property of Arunabh Priyadarshi or its software suppliers and is
              protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2>4. Acceptable Use</h2>
            <p>You agree to use this website only for lawful purposes and in a manner that:</p>
            <ul>
              <li>
                Does not infringe the rights of, restrict, or inhibit anyone else's use and
                enjoyment of the website
              </li>
              <li>Does not violate any applicable laws or regulations</li>
              <li>
                Does not involve transmitting any unlawful, threatening, abusive, defamatory,
                obscene, or otherwise objectionable material
              </li>
              <li>
                Does not involve transmitting any material that contains viruses, trojan horses,
                worms, or any other harmful programs
              </li>
              <li>
                Does not involve unauthorized access to our systems or attempting to interfere with
                the proper working of our website
              </li>
              <li>
                Does not involve collecting or harvesting any personally identifiable information
                from the website
              </li>
              <li>
                Does not involve using any automated system or software to extract data from this
                website for commercial purposes
              </li>
            </ul>
          </section>

          <section>
            <h2>5. User Content and Communications</h2>
            <p>
              Any content you submit, post, or transmit to us through the website (including
              feedback, comments, suggestions, or questions) becomes our property and may be used by
              us for any purpose. By submitting content, you:
            </p>
            <ul>
              <li>
                Grant us a perpetual, irrevocable, worldwide, royalty-free license to use,
                reproduce, modify, adapt, publish, translate, distribute, and display such content
              </li>
              <li>Warrant that you own or control all rights to the content you submit</li>
              <li>
                Warrant that the content is accurate, not defamatory, and does not violate any laws
                or rights of any third party
              </li>
              <li>Agree to indemnify us against any claims arising from your submitted content</li>
            </ul>
          </section>

          <section>
            <h2>6. Disclaimer of Warranties</h2>
            <p>
              The information on this website is provided on an "as is" basis. To the fullest extent
              permitted by law, we:
            </p>
            <ul>
              <li>
                Exclude all representations and warranties relating to this website and its contents
              </li>
              <li>
                Do not warrant that the website will be available at any particular time or location
              </li>
              <li>Do not warrant that the website will be uninterrupted, secure, or error-free</li>
              <li>Do not warrant that any defects or errors will be corrected</li>
              <li>
                Do not warrant that the website or servers are free of viruses or other harmful
                components
              </li>
              <li>
                Do not warrant the accuracy, completeness, or usefulness of any information on this
                website
              </li>
            </ul>
            <p>
              Your use of any information or materials on this website is entirely at your own risk,
              for which we shall not be liable. It is your responsibility to ensure that any
              products, services, or information available through this website meet your specific
              requirements.
            </p>
          </section>

          <section>
            <h2>7. Limitation of Liability</h2>
            <p>
              In no event shall Arunabh Priyadarshi, nor its directors, employees, partners, agents,
              suppliers, or affiliates, be liable for any indirect, incidental, special,
              consequential, or punitive damages, including without limitation, loss of profits,
              data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul>
              <li>Your use or inability to use the website</li>
              <li>
                Any unauthorized access to or use of our servers and/or any personal information
                stored therein
              </li>
              <li>Any interruption or cessation of transmission to or from the website</li>
              <li>
                Any bugs, viruses, trojan horses, or the like that may be transmitted to or through
                our website by any third party
              </li>
              <li>
                Any errors or omissions in any content or for any loss or damage incurred as a
                result of your use of any content
              </li>
              <li>The defamatory, offensive, or illegal conduct of any third party</li>
            </ul>
          </section>

          <section>
            <h2>8. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Arunabh Priyadarshi and its
              affiliates, licensors, and service providers, and its and their respective officers,
              directors, employees, contractors, agents, licensors, suppliers, successors, and
              assigns from and against any claims, liabilities, damages, judgments, awards, losses,
              costs, expenses, or fees (including reasonable attorneys' fees) arising out of or
              relating to:
            </p>
            <ul>
              <li>Your violation of these Terms of Use</li>
              <li>Your use of the website</li>
              <li>Your violation of any rights of another party</li>
              <li>Your violation of any applicable laws, rules, or regulations</li>
            </ul>
          </section>

          <section>
            <h2>9. Third-Party Links and Content</h2>
            <p>
              This website may contain links to third-party websites or services that are not owned
              or controlled by us. We have no control over, and assume no responsibility for, the
              content, privacy policies, or practices of any third-party websites or services.
            </p>
            <p>
              You acknowledge and agree that we shall not be responsible or liable, directly or
              indirectly, for any damage or loss caused or alleged to be caused by or in connection
              with the use of or reliance on any such content, goods, or services available on or
              through any such websites or services.
            </p>
          </section>

          <section>
            <h2>10. Privacy Policy</h2>
            <p>
              Your use of this website is also governed by our Privacy Policy. Please review our
              <a routerLink="/privacy">Privacy Policy</a>, which also governs the site and informs
              users of our data collection practices.
            </p>
          </section>

          <section>
            <h2>11. Termination</h2>
            <p>
              We may terminate or suspend your access to the website immediately, without prior
              notice or liability, for any reason whatsoever, including without limitation if you
              breach the Terms of Use.
            </p>
            <p>
              Upon termination, your right to use the website will cease immediately. All provisions
              of the Terms of Use which by their nature should survive termination shall survive
              termination.
            </p>
          </section>

          <section>
            <h2>12. Governing Law and Jurisdiction</h2>
            <p>
              These Terms of Use and any dispute or claim arising out of or related to them, their
              subject matter, or their formation (in each case, including non-contractual disputes
              or claims) shall be governed by and construed in accordance with the laws of India.
            </p>
            <p>
              Any legal action or proceeding arising under these Terms of Use will be brought
              exclusively in the courts located in Patna, India, and you hereby consent to personal
              jurisdiction and venue therein.
            </p>
          </section>

          <section>
            <h2>13. Severability</h2>
            <p>
              If any provision of these Terms of Use is held to be unenforceable or invalid, such
              provision will be changed and interpreted to accomplish the objectives of such
              provision to the greatest extent possible under applicable law, and the remaining
              provisions will continue in full force and effect.
            </p>
          </section>

          <section>
            <h2>14. Waiver</h2>
            <p>
              No waiver by us of any term or condition set forth in these Terms of Use shall be
              deemed a further or continuing waiver of such term or condition or a waiver of any
              other term or condition, and any failure by us to assert a right or provision under
              these Terms of Use shall not constitute a waiver of such right or provision.
            </p>
          </section>

          <section>
            <h2>15. Entire Agreement</h2>
            <p>
              These Terms of Use, together with our Privacy Policy, constitute the sole and entire
              agreement between you and Arunabh Priyadarshi with respect to the website and
              supersede all prior and contemporaneous understandings, agreements, representations,
              and warranties, both written and oral, with respect to the website.
            </p>
          </section>

          <section>
            <h2>16. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms of Use
              at any time. If a revision is material, we will provide at least 30 days' notice prior
              to any new terms taking effect.
            </p>
            <p>
              By continuing to access or use our website after those revisions become effective, you
              agree to be bound by the revised terms.
            </p>
          </section>

          <section>
            <h2>17. Contact Information</h2>
            <p>If you have any questions about these Terms of Use, please contact us at:</p>
            <div class="contact-info">
              <p><strong>Email:</strong> arunabhmaster&#64;gmail.com</p>
              <p><strong>Website:</strong> <a href="/">https://arunabh.me</a></p>
              <p><strong>Location:</strong> Patna, India</p>
            </div>
          </section>
        </div>

        <div class="legal-footer">
          <a routerLink="/" class="back-link">
            <span>← Back to Home</span>
          </a>
          <a routerLink="/privacy" class="related-link">
            <span>Privacy Policy →</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
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

      a {
        color: var(--color-primary);
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
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

      .legal-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid #dee2e6;
      }

      .back-link,
      .related-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--color-primary);
        text-decoration: none;
        font-weight: 500;
        transition: all 0.3s ease;
      }

      .back-link:hover,
      .related-link:hover {
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
    `,
  ],
})
export class TermsOfUseComponent implements OnInit {
  lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  constructor(private seoService: SEOService) {}

  ngOnInit(): void {
    this.seoService.updateSEO({
      title: 'Terms of Use - Arunabh Priyadarshi',
      description:
        'Terms of Use for Arunabh Priyadarshi portfolio website. Read our terms and conditions for using this website.',
      keywords: 'terms of use, terms and conditions, website terms, legal agreement, usage policy',
      canonicalUrl: 'https://arunabh.me/terms',
    });
  }
}
