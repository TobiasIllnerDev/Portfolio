import { Component } from '@angular/core';

@Component({
  selector: 'app-skillset',
  imports: [],
  templateUrl: './skillset.html',
  styleUrl: './skillset.scss',
})
export class Skillset {
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
