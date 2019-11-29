import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SkipLinkConfig } from './config/index';

@Injectable({
  providedIn: 'root',
})
export class SkipLinkService {
  skippers = new BehaviorSubject([]);

  constructor(protected config: SkipLinkConfig) {}

  add(key: string, tpl: TemplateRef<any>) {
    const found = this.config.skipLinks ? this.config.skipLinks[key] : null;

    if (found) {
      const existing = this.skippers.value;
      existing.push({
        target: tpl,
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

  // hideExcludedSkippers(page: Page) {
  //   const existing = this.skippers.value;
  //   const template = page.name;

  //   existing.forEach(skipLink => {
  //     const targetSlotClass = skipLink.target.classList[0];
  //     const targetSlotConfig = this.config.skipLinks.find(
  //       linkConfig => linkConfig.slot === targetSlotClass
  //     );
  //     skipLink.hidden =
  //       targetSlotConfig.excludeOnTemplate &&
  //       targetSlotConfig.excludeOnTemplate.includes(template);
  //   });
  // }
}
