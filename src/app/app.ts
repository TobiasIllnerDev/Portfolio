import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Hero } from './pages/main-section/hero/hero';
import { Aboutme } from './pages/main-section/aboutme/aboutme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,Hero, Aboutme],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');
}
