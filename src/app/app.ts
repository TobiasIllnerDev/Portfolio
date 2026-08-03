import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Hero } from './pages/main-section/hero/hero';
import { Aboutme } from './pages/main-section/aboutme/aboutme';
import { Skillset } from './pages/main-section/skillset/skillset';
import { Projects } from './pages/main-section/projects/projects';
import { Comments } from './pages/main-section/comments/comments';
import { Contactme } from './pages/main-section/contactme/contactme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,Hero, Aboutme, Skillset,Projects,Comments,Contactme],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');
}
