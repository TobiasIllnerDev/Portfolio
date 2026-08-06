import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

interface Comment {
  id: number;
  textKey: string;
  author: string;
  roleKey: string;
}

@Component({
  selector: 'app-comments',
  imports: [TranslatePipe],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
})
export class Comments {
  readonly translate = inject(TranslateService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  changeLanguage(event: Event): void {
    const isGerman = (event.target as HTMLInputElement).checked;
    const language = isGerman ? 'de' : 'en';

    this.translate.use(language);
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }

  comments: Comment[] = [
    {
      id: 1,
      textKey: 'app.comments.entries.first.text',
      author: 'H. Janisch',
      roleKey: 'app.comments.entries.first.role',
    },
    {
      id: 2,
      textKey: 'app.comments.entries.second.text',
      author: 'T. Schulz',
      roleKey: 'app.comments.entries.second.role',
    },
    {
      id: 3,
      textKey: 'app.comments.entries.third.text',
      author: 'M. Example',
      roleKey: 'app.comments.entries.third.role',
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

    const commentCount = this.comments.length;
    const forwardDistance =
      (index - this.activeIndex + commentCount) % commentCount;
    const backwardDistance = forwardDistance - commentCount;
    const shortestDistance =
      forwardDistance <= Math.abs(backwardDistance)
        ? forwardDistance
        : backwardDistance;

    this.isAnimating = true;
    this.isTransitionEnabled = true;
    this.activeIndex = index;
    this.trackIndex += shortestDistance;
  }

  handleTransitionEnd(event: TransitionEvent): void {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') {
      return;
    }

    const firstCloneIndex = 1;
    const lastCloneIndex = this.comments.length + 2;
    let resetIndex: number | null = null;

    if (this.trackIndex === firstCloneIndex) {
      resetIndex = this.comments.length + 1;
    } else if (this.trackIndex === lastCloneIndex) {
      resetIndex = 2;
    }

    if (resetIndex !== null) {
      this.isTransitionEnabled = false;
      this.trackIndex = resetIndex;
      this.changeDetectorRef.detectChanges();

      // Commit the transition-free clone reset before enabling the next slide.
      void (event.currentTarget as HTMLElement).offsetWidth;

      this.isTransitionEnabled = true;
      this.changeDetectorRef.detectChanges();
    }

    this.isAnimating = false;
  }
}
