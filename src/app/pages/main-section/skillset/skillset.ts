import { Component, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-skillset',
  imports: [TranslatePipe],
  templateUrl: './skillset.html',
  styleUrl: './skillset.scss',
})
export class Skillset {
  readonly translate = inject(TranslateService);

  changeLanguage(event: Event): void {
    const isGerman = (event.target as HTMLInputElement).checked;
    const language = isGerman ? 'de' : 'en';

    this.translate.use(language);
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }

  icons = [
    {
      name:'HTML',
      img:'icons/html.svg'
    },
    {
      name:'CSS',
      img:'icons/css.svg'
    },
    {
      name:'JavaScript',
      img:'icons/javascript.svg'
    },
    {
      name:'TypeScript',
      img:'icons/typescript.svg'
    },
    {
      name:'Angular',
      img:'icons/angular.svg'
    },
    {
      name:'Git',
      img:'icons/git.svg'
    },
    {
      name:'SQL',
      img:'icons/SQL.svg'
    },
    {
      name:'Firebase',
      img:'icons/Firebase.png'
    },
    {
      name:'Python',
      img:'icons/Python.png'
    },
    {
      name:'C#',
      img:'icons/csharp-logo.png'
    },
    {
      name:'Growth Mindset',
      img:'icons/Growth.svg',
      isLearningInterest: true
    }
  ];

  learningInterests = [
    {
      name: 'React',
      img: 'icons/React.png'
    },
    {
      name: 'Django',
      img: 'icons/Django.png'
    }
  ];
}
