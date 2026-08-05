import { Component, inject } from '@angular/core';
import { TranslatePipe, TranslateService  } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  imports: [TranslatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  readonly translate = inject(TranslateService);

  changeLanguage(event: Event): void {
    const isGerman = (event.target as HTMLInputElement).checked;
    const language = isGerman ? 'de' : 'en';

    this.translate.use(language);
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }
  
  readonly tickerItems = [
    'app.hero.ticker.remote',
    'app.hero.ticker.developer',
    'app.hero.ticker.location',
    'app.hero.ticker.available',
  ];

  readonly tickerGroups = [0, 1, 2];
  readonly tickerCopies = [0, 1];
}
