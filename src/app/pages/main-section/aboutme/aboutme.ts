import { Component, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-aboutme',
  imports: [TranslatePipe],
  templateUrl: './aboutme.html',
  styleUrl: './aboutme.scss',
})
export class Aboutme {
  readonly translate = inject(TranslateService);

  changeLanguage(event: Event): void {
    const isGerman = (event.target as HTMLInputElement).checked;
    const language = isGerman ? 'de' : 'en';

    this.translate.use(language);
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }
}
