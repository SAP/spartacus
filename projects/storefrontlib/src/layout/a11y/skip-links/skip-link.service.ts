import { Injectable } from '@angular/core';
import { CmsService } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { SkipLink, SkipLinkConfig } from './config/index';

@Injectable({
  providedIn: 'root',
})
export class SkipLinkService {
  // TODO: not the best structure yet
  // we need to add/remove skippers based on the page or the existence of the elements on the page
  skippers = new BehaviorSubject([]);

  private lastPageTemplate$ = this.cms.getCurrentPage().pipe(
    filter(p => !!p),
    map(p => p.template),
    distinctUntilChanged()
  );

  constructor(protected config: SkipLinkConfig, protected cms: CmsService) {
    this.lastPageTemplate$
      .pipe(
        tap(_template => {
          // TODO: cleanup skipppers that do not belong to current template
        })
      )
      .subscribe();
  }

  add(slotPosition: string, target: HTMLElement) {
    if (!this.config.skipLinks) {
      return;
    }
    const found: SkipLink = this.config.skipLinks.find(
      linkConfig => linkConfig.slot === slotPosition
    );
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
}
