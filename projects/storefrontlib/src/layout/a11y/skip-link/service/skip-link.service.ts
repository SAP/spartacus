import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  SkipLink,
  SkipLinkConfig,
  SkipLinkScrollPosition,
} from '../config/skip-link.config';

@Injectable({
  providedIn: 'root',
})
export class SkipLinkService {
  private skipLinks$ = new BehaviorSubject<SkipLink[]>([]);

  constructor(protected config: SkipLinkConfig) {}

  getSkipLinks(): Observable<SkipLink[]> {
    return this.skipLinks$;
  }

  add(key: string, target: HTMLElement): void {
    const found: SkipLink = this.config.skipLinks.find(
      skipLink => skipLink.key === key
    );

    if (found) {
      const existing: SkipLink[] = this.skipLinks$.value;
      existing.splice(this.getSkipLinkIndexInArray(key), 0, {
        target: target,
        i18nKey: found.i18nKey,
        position: found.position,
        key: key,
      });
      this.skipLinks$.next(existing);
    }
  }

  remove(key: string): void {
    const found: SkipLink = this.config.skipLinks.find(
      skipLink => skipLink.key === key
    );

    if (found) {
      let existing: SkipLink[] = this.skipLinks$.value;
      existing = existing.filter(skipLink => skipLink.key !== key);
      this.skipLinks$.next(existing);
    }
  }

  scrollToTarget(
    target: HTMLElement,
    position: SkipLinkScrollPosition,
    event: MouseEvent
  ): void {
    target = <HTMLElement>target.parentNode;
    (<HTMLElement>event.target).blur();
    const options: ScrollIntoViewOptions =
      position === SkipLinkScrollPosition.AFTER ? { inline: 'end' } : {};

    target.scrollIntoView(options);
  }

  protected getSkipLinkIndexInArray(key: string): number {
    let index: number = this.config.skipLinks.findIndex(
      skipLink => skipLink.key === key
    );

    while (index > 0) {
      index--;
      const previous: SkipLink = this.config.skipLinks[index];
      if (previous) {
        const existing: SkipLink[] = this.skipLinks$.value;
        const found: number = existing.findIndex(
          skipLink => skipLink.key === previous.key
        );
        if (found > -1) {
          return found + 1;
        }
      }
    }
    return 0;
  }
}
