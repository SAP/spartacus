import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Page, PageMeta } from '../model/page.model';
import { PageMetaResolver } from '../page/page-meta.resolver';
import { CmsService } from './cms.service';

@Injectable({
  providedIn: 'root',
})
export class PageMetaService {
  constructor(
    @Optional()
    @Inject(PageMetaResolver)
    protected resolvers: PageMetaResolver[],
    protected cms: CmsService
  ) {
    this.resolvers = this.resolvers || [];
  }

  getMeta(): Observable<PageMeta> {
    return this.cms.getCurrentPage().pipe(
      filter(Boolean),
      switchMap((page: Page) => {
        const metaResolver = this.getMetaResolver(page);
        if (metaResolver) {
          return metaResolver.resolve();
        } else {
          // we do not have a page resolver
          return of(null);
        }
      })
    );
  }

  /**
   * return the title resolver with the best match
   * title resovers can by default match on PageType and page template
   * but custom match comparisors can be implemented.
   */
  protected getMetaResolver(page: Page): PageMetaResolver {
    const matchingResolvers = this.resolvers.filter(
      resolver => resolver.getScore(page) > 0
    );
    matchingResolvers.sort(function(a, b) {
      return b.getScore(page) - a.getScore(page);
    });
    return matchingResolvers[0];
  }
}
