import { Injectable } from '@angular/core';
import { CmsService } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { SkipLinkConfig } from './config/index';

@Injectable({
  providedIn: 'root',
})
export class SkipLinkService {
  skippers = new BehaviorSubject([]);

  private lastPageTemplate$ = this.cms.getCurrentPage().pipe(
    filter(p => !!p),
    map(p => p),
    distinctUntilChanged()
  );

  constructor(protected config: SkipLinkConfig, protected cms: CmsService) {
    this.lastPageTemplate$
      .pipe(
        tap(_template => {
          console.log(_template);
          // this.removeInvalidSkippers(_template);
          // this.hideExcludedSkippers(_template);
        })
      )
      .subscribe();
  }

  add(key: string, target: HTMLElement) {
    const found = this.config.skipLinks ? this.config.skipLinks[key] : null;

    if (found) {
      const existing = this.skippers.value;
      existing.push({
        target: target,
        title: found.i18nKey,
        position: found.position,
      });
      this.skippers.next(existing);
    }
  }

  // removeInvalidSkippers(page: Page) {
  //   let existing = this.skippers.value;
  //   const pageSlotKeys = Object.keys(page.slots);

  //   existing.forEach(skipLink => {
  //     const targetSlotClass = skipLink.target.classList[0];

  //     if (!pageSlotKeys.includes(targetSlotClass)) {
  //       existing = existing.filter(link => link !== skipLink);
  //     }
  //   });

  //   this.skippers.next(existing);
  // }

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
