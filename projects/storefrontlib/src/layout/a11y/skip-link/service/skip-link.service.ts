import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SkipLinkConfig, SkipLinkScrollPosition } from '../config/index';

@Injectable({
  providedIn: 'root',
})
export class SkipLinkService {
  skippers = new BehaviorSubject([]);

  constructor(protected config: SkipLinkConfig) {}

  add(key: string, target: HTMLElement) {
    const found = this.config.skipLinks.find(skipLink => skipLink.key === key);

    if (found) {
      const existing = this.skippers.value;
      existing.splice(this.getSkipperIndexInArray(key), 0, {
        target: target,
        title: found.i18nKey,
        position: found.position,
        key: key,
      });
      this.skippers.next(existing);
    }
  }

  remove(key: string) {
    const found = this.config.skipLinks.find(skipLink => skipLink.key === key);

    if (found) {
      let existing = this.skippers.value;
      existing = existing.filter(skipLink => skipLink.key !== key);
      this.skippers.next(existing);
    }
  }

  go(target: HTMLElement, position: SkipLinkScrollPosition, event: MouseEvent) {
    target = <HTMLElement>target.parentNode;
    (<HTMLElement>event.target).blur();
    const options: ScrollIntoViewOptions =
      position === SkipLinkScrollPosition.AFTER ? { inline: 'end' } : {};

    target.scrollIntoView(options);
  }

  protected getSkipperIndexInArray(key: string) {
    let index = this.config.skipLinks.findIndex(
      skipLink => skipLink.key === key
    );

    while (index > 0) {
      index--;
      const previous = this.config.skipLinks[index];
      if (previous) {
        const existing = this.skippers.value;
        const found = existing.findIndex(
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
