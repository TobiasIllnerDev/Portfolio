import { Component, DestroyRef, inject, signal } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Header } from './layout/header/header';
import { Hero } from './pages/main-section/hero/hero';
import { Aboutme } from './pages/main-section/aboutme/aboutme';
import { Skillset } from './pages/main-section/skillset/skillset';
import { Projects } from './pages/main-section/projects/projects';
import { Comments } from './pages/main-section/comments/comments';
import { Contactme } from './pages/main-section/contactme/contactme';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,Hero, Aboutme, Skillset,Projects,Comments,Contactme,Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly translate = inject(TranslateService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly isLegalNotice = signal(this.router.url.startsWith('/impressum'));

  constructor() {
    const savedLanguage = localStorage.getItem('language');
    const language = savedLanguage === 'de' || savedLanguage === 'en'
      ? savedLanguage
      : 'en';

    this.translate.use(language);
    document.documentElement.lang = language;

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        this.isLegalNotice.set(event.urlAfterRedirects.startsWith('/impressum'));
      });
  }
}
