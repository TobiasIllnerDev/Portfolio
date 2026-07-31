import { Component } from '@angular/core';

interface Comment {
  id: number;
  text: string;
  author: string;
  role: string;
}

@Component({
  selector: 'app-comments',
  imports: [],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
})
export class Comments {
  comments: Comment[] = [
    {
      id: 1,
      text: 'Lukas has proven to be a reliable group partner.',
      author: 'H. Janisch',
      role: 'Team Partner',
    },
    {
      id: 2,
      text: 'Working with Lukas was a great experience.',
      author: 'T. Schulz',
      role: 'Frontend Developer',
    },
    {
      id: 3,
      text: 'He always stayed calm, focused and solution-oriented.',
      author: 'M. Example',
      role: 'Developer',
    },
  ];

  activeIndex = 0;

  showPreviousComment(): void {
    this.activeIndex =
      (this.activeIndex - 1 + this.comments.length) % this.comments.length;
  }

  showNextComment(): void {
    this.activeIndex =
      (this.activeIndex + 1) % this.comments.length;
  }

  showComment(index: number): void {
    this.activeIndex = index;
  }
}
