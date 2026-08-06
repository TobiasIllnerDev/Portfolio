import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { finalize, timeout } from 'rxjs';

type ContactField = 'name' | 'email' | 'message';

@Component({
  selector: 'app-contactme',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './contactme.html',
  styleUrl: './contactme.scss',
})
export class Contactme {
  readonly translate = inject(TranslateService);
  private readonly http = inject(HttpClient);

  readonly isSending = signal(false);
  readonly submitState = signal<'idle' | 'success' | 'error'>('idle');
  readonly invalidField = signal<ContactField | null>(null);
  readonly emailDomainInvalid = signal(false);
  readonly isFormValid = signal(false);
  readonly touchedFields = signal<Record<ContactField, boolean>>({
    name: false,
    email: false,
    message: false,
  });
  readonly privacyTouched = signal(false);

  @ViewChild('successDialog')
  private successDialog?: ElementRef<HTMLDialogElement>;

  changeLanguage(event: Event): void {
    const isGerman = (event.target as HTMLInputElement).checked;
    const language = isGerman ? 'de' : 'en';

    this.translate.use(language);
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }

  sendMessage(event: SubmitEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget as HTMLFormElement;

    if (!form.checkValidity() || this.isSending()) {
      this.markAllFieldsTouched();
      return;
    }

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
      privacyPolicy: formData.get('privacyPolicy') === 'on',
      website: String(formData.get('website') ?? ''),
    };

    this.isSending.set(true);
    this.submitState.set('idle');
    this.invalidField.set(null);
    this.emailDomainInvalid.set(false);

    this.http
      .post<{ success: boolean }>('/api/contact.php', payload)
      .pipe(
        timeout(20_000),
        finalize(() => this.isSending.set(false)),
      )
      .subscribe({
        next: (response) => {
          if (!response.success) {
            this.submitState.set('error');
            return;
          }

          form.reset();
          this.isFormValid.set(false);
          this.resetTouchedFields();
          this.submitState.set('success');
          this.successDialog?.nativeElement.showModal();
        },
        error: (error: HttpErrorResponse) => {
          const field = error.error?.field;

          if (error.status === 422 && ['name', 'email', 'message'].includes(field)) {
            this.invalidField.set(field);
            this.emailDomainInvalid.set(field === 'email' && error.error?.reason === 'domain');
            return;
          }

          this.submitState.set('error');
        },
      });
  }

  updateFormValidity(form: HTMLFormElement): void {
    this.isFormValid.set(form.checkValidity());
  }

  markFieldTouched(field: ContactField): void {
    this.touchedFields.update((fields) => ({ ...fields, [field]: true }));
  }

  markPrivacyTouched(): void {
    this.privacyTouched.set(true);
  }

  isFieldInvalid(
    field: ContactField,
    control: HTMLInputElement | HTMLTextAreaElement,
  ): boolean {
    return (
      this.invalidField() === field ||
      (this.touchedFields()[field] && !control.validity.valid)
    );
  }

  clearFieldError(field: ContactField): void {
    if (this.invalidField() === field) {
      this.invalidField.set(null);
    }

    if (field === 'email') {
      this.emailDomainInvalid.set(false);
    }
  }

  private markAllFieldsTouched(): void {
    this.touchedFields.set({ name: true, email: true, message: true });
    this.privacyTouched.set(true);
  }

  private resetTouchedFields(): void {
    this.touchedFields.set({ name: false, email: false, message: false });
    this.privacyTouched.set(false);
  }
}
