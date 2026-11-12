import { Component, input, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnalyticsService } from '../services/analytics.service';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="form-card">
      @if (status() === 'sent') {
        <div class="form-sent" role="status">
          <h3>Message sent</h3>
          <p>Thanks for reaching out. I'll reply to the email you gave me.</p>
          <button type="button" class="btn btn-secondary" (click)="reset()">
            Send another message
          </button>
        </div>
      } @else {
        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <div class="form-row">
            <div class="form-field">
              <label for="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                formControlName="name"
                autocomplete="name"
                maxlength="100"
                [attr.aria-invalid]="showError('name')"
                [attr.aria-describedby]="showError('name') ? 'contact-name-error' : null"
              />
              @if (showError('name')) {
                <p class="field-error" id="contact-name-error">Please enter your name.</p>
              }
            </div>

            <div class="form-field">
              <label for="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                formControlName="email"
                autocomplete="email"
                maxlength="254"
                [attr.aria-invalid]="showError('email')"
                [attr.aria-describedby]="showError('email') ? 'contact-email-error' : null"
              />
              @if (showError('email')) {
                <p class="field-error" id="contact-email-error">
                  Please enter a valid email address.
                </p>
              }
            </div>
          </div>

          <div class="form-field">
            <label for="contact-message">Message</label>
            <textarea
              id="contact-message"
              rows="5"
              formControlName="message"
              maxlength="5000"
              [attr.aria-invalid]="showError('message')"
              [attr.aria-describedby]="showError('message') ? 'contact-message-error' : null"
            ></textarea>
            @if (showError('message')) {
              <p class="field-error" id="contact-message-error">Please write a message.</p>
            }
          </div>

          <!-- Hidden from people. Bots that fill it in are ignored by the script. -->
          <div class="form-trap" aria-hidden="true">
            <label for="contact-website">Website</label>
            <input
              id="contact-website"
              type="text"
              formControlName="website"
              tabindex="-1"
              autocomplete="off"
            />
          </div>

          @if (status() === 'error') {
            <p class="form-error" role="alert">
              Your message couldn't be sent. Please try again, or email me at
              <a [href]="'mailto:' + fallbackEmail()">{{ fallbackEmail() }}</a>.
            </p>
          }

          <button
            type="submit"
            class="btn btn-primary form-submit"
            [disabled]="status() === 'sending'"
          >
            {{ status() === 'sending' ? 'Sending...' : 'Send Message' }}
          </button>
        </form>
      }
    </div>
  `,
  styles: [
    `
      .form-card {
        max-width: 640px;
        margin: 0 auto;
        padding: 2rem;
        background: white;
        border-radius: var(--border-radius);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        color: var(--color-text);
        text-align: left;
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      .form-field {
        margin-bottom: 1.25rem;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 14px;
        font-weight: 600;
      }

      input,
      textarea {
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding: 12px 14px;
        border: 1px solid #94a3b8;
        border-radius: 8px;
        background: white;
        color: var(--color-text);
        font: inherit;
        font-size: 16px;
      }

      textarea {
        resize: vertical;
      }

      input:focus,
      textarea:focus {
        outline: 2px solid var(--color-primary);
        outline-offset: 1px;
      }

      [aria-invalid='true'] {
        border-color: #c0392b;
      }

      .field-error,
      .form-error {
        margin: 0.5rem 0 0;
        color: #b03a2e;
        font-size: 14px;
      }

      .form-error {
        margin: 0 0 1.25rem;
      }

      .form-error a {
        color: inherit;
        text-decoration: underline;
      }

      .form-trap {
        position: absolute;
        left: -9999px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }

      .form-submit {
        width: 100%;
      }

      .form-submit:disabled {
        opacity: 0.7;
        cursor: wait;
      }

      .form-sent {
        text-align: center;
      }

      .form-sent p {
        margin-bottom: 1.5rem;
        color: var(--color-text-secondary);
      }

      @media (max-width: 600px) {
        .form-card {
          padding: 1.5rem;
        }

        .form-row {
          grid-template-columns: 1fr;
          gap: 0;
        }
      }
    `,
  ],
})
export class ContactFormComponent {
  readonly endpoint = input.required<string>();
  readonly fallbackEmail = input.required<string>();

  protected readonly status = signal<FormStatus>('idle');
  protected readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/\S/), Validators.maxLength(100)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.maxLength(254)],
    }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/\S/), Validators.maxLength(5000)],
    }),
    website: new FormControl('', { nonNullable: true }),
  });

  constructor(
    private http: HttpClient,
    private analyticsService: AnalyticsService,
  ) {}

  protected showError(field: 'name' | 'email' | 'message'): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  protected submit(): void {
    if (this.status() === 'sending') {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('sending');

    // text/plain keeps this a simple request, which Apps Script accepts without a CORS preflight.
    this.http
      .post<{ ok: boolean }>(this.endpoint(), JSON.stringify(this.form.getRawValue()), {
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      })
      .subscribe({
        next: (response) => {
          if (response?.ok) {
            this.status.set('sent');
            this.analyticsService.trackContactInteraction('Form');
          } else {
            this.status.set('error');
          }
        },
        error: () => this.status.set('error'),
      });
  }

  protected reset(): void {
    this.form.reset();
    this.status.set('idle');
  }
}
