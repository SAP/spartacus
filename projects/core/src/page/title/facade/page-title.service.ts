import { Injectable, Inject } from '@angular/core';

import { CmsService, Page } from '../../../cms/index';
import { switchMap, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { PageTitleResolver } from './page-title.resolver';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  constructor(
    @Inject(PageTitleResolver) private resolvers: PageTitleResolver[],
    protected cms: CmsService
  ) {
    resolvers.reverse();
  }

  resolve(): Observable<string> {
    return this.cms.getCurrentPage().pipe(
      filter(Boolean),
      switchMap(page => {
        const pageTitleResolver = this.getResolver(page);
        if (pageTitleResolver) {
          return pageTitleResolver.resolve();
        } else {
          // we do not have a page resolver
          return of('');
        }
      })
    );
  }

  // we iterate over the reversed list of multi-provided title resolvers
  // and try to find a match
  protected getResolver(page: Page) {
    return this.resolvers.find(r => r.hasMatch(page));
  }
}
