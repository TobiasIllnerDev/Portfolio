import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-projects',
  imports: [TranslatePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})

export class Projects {
  readonly translate = inject(TranslateService);

  changeLanguage(event: Event): void {
    const isGerman = (event.target as HTMLInputElement).checked;
    const language = isGerman ? 'de' : 'en';

    this.translate.use(language);
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }

  @ViewChild('projectDialog')
  projectDialog!: ElementRef<HTMLDialogElement>;

  readonly projects = {
    pokedex: {
      number: '01',
      title: 'Pokedex',
      descriptionKey: 'app.projects.items.pokedex.description',
      image: 'images/Pokedex.png',
      githubUrl: 'https://github.com/TobiasIllnerDev/pokedex',
      liveUrl: 'https://tobiasillner.developerakademie.net/pokedex/index.html',
      technologies: [
        { name: 'JavaScript', icon: 'icons/javascript.svg' },
        { name: 'HTML', icon: 'icons/html.svg' },
        { name: 'CSS', icon: 'icons/css.svg' },
      ],
    },
    sharkie: {
      number: '02',
      title: 'Sharkie',
      descriptionKey: 'app.projects.items.sharkie.description',
      image: 'images/Sharki-projekt.png',
      githubUrl: 'https://github.com/TobiasIllnerDev/Sharkie',
      liveUrl: 'https://tobiasillner.developerakademie.net/sharkie/index.html',
      technologies: [
        { name: 'JavaScript', icon: 'icons/javascript.svg' },
        { name: 'HTML', icon: 'icons/html.svg' },
        { name: 'CSS', icon: 'icons/css.svg' },
      ],
    },
  };

  selectedProject = this.projects.pokedex;

  openProject(project: keyof typeof this.projects) {
    this.selectedProject = this.projects[project];
    this.projectDialog.nativeElement.showModal();
  }

  closeProject() {
    this.projectDialog.nativeElement.close();
  }

  showNextProject() {
    this.selectedProject =
      this.selectedProject === this.projects.pokedex
        ? this.projects.sharkie
        : this.projects.pokedex;
  }

  closeOnBackdrop(event: MouseEvent) {
    if (event.target === this.projectDialog.nativeElement) {
      this.closeProject();
    }
  }
}
