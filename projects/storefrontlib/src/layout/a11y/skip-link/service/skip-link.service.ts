import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SkipLink, SkipLinkConfig } from '../config/skip-link.config';

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

  scrollToTarget(skipLink: SkipLink): void {
    const target =
      skipLink.target instanceof HTMLElement
        ? skipLink.target
        : (skipLink.target as Element).parentElement;

    // we force a tabindex if not available, to ensure we can focus into the element
    const currentTabIndex = target.getAttribute('tabindex');
    if (!currentTabIndex) {
      target.setAttribute('tabindex', '-1');
    }

    (target as HTMLElement).focus();

    // drop the tmp tabindex
    if (!currentTabIndex) {
      target.removeAttribute('tabindex');
    }
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
