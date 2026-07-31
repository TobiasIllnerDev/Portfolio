import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  readonly tickerItems = [
    'Available for remote work',
    'Fullstack Developer',
    'Based in Brunswick',
    'Open to work',
  ];

  readonly tickerGroups = [0, 1, 2];
  readonly tickerCopies = [0, 1];
}
