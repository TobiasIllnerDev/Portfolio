import { Component, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})

export class Projects {
  @ViewChild('projectDialog')
  projectDialog!: ElementRef<HTMLDialogElement>;

  readonly projects = {
    pokedex: {
      number: '01',
      title: 'Pokedex',
      description:
        'A responsive Pokédex that lets users search and explore Pokémon and their most important information.',
      image: 'images/Pokedex.png',
      technologies: [
        { name: 'JavaScript', icon: 'icons/javascript.svg' },
        { name: 'HTML', icon: 'icons/html.svg' },
        { name: 'CSS', icon: 'icons/css.svg' },
      ],
    },
    sharkie: {
      number: '02',
      title: 'Sharkie',
      description:
        'A browser-based jump-and-run game built with object-oriented JavaScript.',
      image: 'images/Sharki-projekt.png',
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
