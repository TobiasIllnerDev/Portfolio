import { Component,inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly translate = inject(TranslateService);
  readonly currentYear = new Date().getFullYear();

  changeLanguage(event: Event): void {
    const isGerman = (event.target as HTMLInputElement).checked;
    const language = isGerman ? 'de' : 'en';

    this.translate.use(language);
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }
}
