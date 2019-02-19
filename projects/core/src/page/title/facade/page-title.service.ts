import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { CmsService, Page } from '../../../cms/index';
import { PageTitleResolver } from '../resolvers/page-title.resolver';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  constructor(
    @Inject(PageTitleResolver) private resolvers: PageTitleResolver[],
    protected cms: CmsService
  ) {}

  getTitle(): Observable<string> {
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

  /**
   * return the title resolver with the best match
   * title resovers can by default match on PageType and page template
   * but custom match comparisors can be implemented.
   */
  protected getResolver(page: Page) {
    const matchingResolvers = this.resolvers.filter(
      resolver => resolver.getScore(page) > 0
    );
    matchingResolvers.sort(function(a, b) {
      return b.getScore(page) - a.getScore(page);
    });
    return matchingResolvers[0];
  }
}
