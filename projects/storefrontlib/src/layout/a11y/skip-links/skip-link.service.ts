import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SkipLinkConfig } from './config/index';

@Injectable({
  providedIn: 'root',
})
export class SkipLinkService {
  skippers = new BehaviorSubject([]);

  constructor(protected config: SkipLinkConfig) {}

  add(key: string, target: HTMLElement) {
    const found = this.config.skipLinks ? this.config.skipLinks[key] : null;

    if (found) {
      const existing = this.skippers.value;
      existing.push({
        target: target,
        title: found.i18nKey,
        position: found.position,
        key: key,
      });
      this.skippers.next(existing);
    }
  }

  remove(key: string) {
    const found = this.config.skipLinks ? this.config.skipLinks[key] : null;

    if (found) {
      let existing = this.skippers.value;
      existing = existing.filter(skipper => skipper.key !== key);
      this.skippers.next(existing);
    }
  }
}
