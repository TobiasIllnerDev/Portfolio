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
  trackIndex = this.comments.length > 1 ? 1 : 0;
  isAnimating = false;
  isTransitionEnabled = true;

  get sliderComments(): Comment[] {
    if (this.comments.length <= 1) {
      return this.comments;
    }

    const firstComment = this.comments[0];
    const lastComment = this.comments[this.comments.length - 1];

    return [lastComment, ...this.comments, firstComment];
  }

  showPreviousComment(): void {
    if (this.comments.length <= 1 || this.isAnimating) {
      return;
    }

    this.isAnimating = true;
    this.isTransitionEnabled = true;
    this.trackIndex--;
    this.activeIndex =
      (this.activeIndex - 1 + this.comments.length) % this.comments.length;
  }

  showNextComment(): void {
    if (this.comments.length <= 1 || this.isAnimating) {
      return;
    }

    this.isAnimating = true;
    this.isTransitionEnabled = true;
    this.trackIndex++;
    this.activeIndex = (this.activeIndex + 1) % this.comments.length;
  }

  showComment(index: number): void {
    if (this.isAnimating || index === this.activeIndex) {
      return;
    }

    this.isAnimating = true;
    this.isTransitionEnabled = true;
    this.activeIndex = index;
    this.trackIndex = index + 1;
  }

  handleTransitionEnd(event: TransitionEvent): void {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') {
      return;
    }

    const lastTrackIndex = this.comments.length + 1;

    if (this.trackIndex === 0) {
      this.isTransitionEnabled = false;
      this.trackIndex = this.comments.length;
    } else if (this.trackIndex === lastTrackIndex) {
      this.isTransitionEnabled = false;
      this.trackIndex = 1;
    }

    this.isAnimating = false;
  }
}
