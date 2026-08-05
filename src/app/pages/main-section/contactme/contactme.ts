import { Component,inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contactme',
  imports: [TranslatePipe],
  templateUrl: './contactme.html',
  styleUrl: './contactme.scss',
})
export class Contactme {
  readonly translate = inject(TranslateService);

  changeLanguage(event: Event): void {
    const isGerman = (event.target as HTMLInputElement).checked;
    const language = isGerman ? 'de' : 'en';

    this.translate.use(language);
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }
}
