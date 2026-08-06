import { Component, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly translate = inject(TranslateService);

  changeLanguage(event: Event): void {
    const isGerman = (event.target as HTMLInputElement).checked;
    const language = isGerman ? 'de' : 'en';

    this.translate.use(language);
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }
}
