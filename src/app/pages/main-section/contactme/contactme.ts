import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contactme',
  imports: [TranslatePipe],
  templateUrl: './contactme.html',
  styleUrl: './contactme.scss',
})
export class Contactme {
  readonly translate = inject(TranslateService);
  private readonly http = inject(HttpClient);

  isSending = false;
  submitState: 'idle' | 'success' | 'error' = 'idle';

  changeLanguage(event: Event): void {
    const isGerman = (event.target as HTMLInputElement).checked;
    const language = isGerman ? 'de' : 'en';

    this.translate.use(language);
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }

  sendMessage(event: SubmitEvent): void {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;

    if (!form.reportValidity() || this.isSending) {
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

    this.isSending = true;
    this.submitState = 'idle';

    this.http.post<{ success: boolean }>('/api/contact.php', payload).subscribe({
      next: () => {
        form.reset();
        this.isSending = false;
        this.submitState = 'success';
      },
      error: () => {
        this.isSending = false;
        this.submitState = 'error';
      },
    });
  }
}
