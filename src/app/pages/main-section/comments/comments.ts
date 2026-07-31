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
  trackIndex = this.comments.length > 1 ? 2 : 0;
  isAnimating = false;
  isTransitionEnabled = true;

  get sliderComments(): Comment[] {
    if (this.comments.length <= 1) {
      return this.comments;
    }

    const commentCount = this.comments.length;
    const leadingComments = [
      this.comments[(commentCount - 2 + commentCount) % commentCount],
      this.comments[commentCount - 1],
    ];
    const trailingComments = [this.comments[0], this.comments[1 % commentCount]];

    return [...leadingComments, ...this.comments, ...trailingComments];
  }

  isVisibleSlide(index: number): boolean {
    return Math.abs(index - this.trackIndex) <= 1;
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
    this.trackIndex = index + 2;
  }

  handleTransitionEnd(event: TransitionEvent): void {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') {
      return;
    }

    const firstCloneIndex = 1;
    const lastCloneIndex = this.comments.length + 2;

    if (this.trackIndex === firstCloneIndex) {
      this.isTransitionEnabled = false;
      this.trackIndex = this.comments.length + 1;
    } else if (this.trackIndex === lastCloneIndex) {
      this.isTransitionEnabled = false;
      this.trackIndex = 2;
    }

    this.isAnimating = false;
  }
}
