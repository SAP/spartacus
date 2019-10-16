import { Inject, Injectable, Optional } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Page, PageMeta, USE_SEPARATE_RESOLVERS } from '../model/page.model';
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

  /**
   * The list of resolver interfaces will be evaluated for the pageResolvers.
   *
   * TOOD: optimize browser vs SSR resolvers; image, robots and description
   *       aren't needed during browsing.
   * TODO: we can make the list of resolver types configurable
   */
  resolverMethods = {
    title: 'resolveTitle',
    // heading: 'resolveHeading',
    // description: 'resolveDescription',
    // breadcrumbs: 'resolveBreadcrumbs',
    // image: 'resolveImage',
    // robots: 'resolveRobots',
  };

  getMeta(): Observable<PageMeta> {
    return this.cms.getCurrentPage().pipe(
      filter(Boolean),
      switchMap((page: Page) => {
        const metaResolver = this.getMetaResolver(page);
        if (metaResolver) {
          return this.resolve(metaResolver);
        } else {
          // we do not have a page resolver
          return of(null);
        }
      })
    );
  }

  /**
   * If a pageResolver has implemented a resolver interface, the resolved data
   * is merged into the `PageMeta` object.
   * @param metaResolver
   */
  private resolve(metaResolver): Observable<PageMeta> {
    if (
      metaResolver.resolve &&
      metaResolver.resolve(true) !== USE_SEPARATE_RESOLVERS
    ) {
      // resolve backwards compatibility, will only be used in case
      // customers have extended from the Resolvers
      return metaResolver.resolve();
    } else {
      // resolve individual resolvers to make the extension mechanism more flexible

      const methods2: any[] = Object.keys(this.resolverMethods)
        .filter(key => metaResolver[this.resolverMethods[key]])
        .map(key => ({
          prop: key,
          fn: metaResolver[this.resolverMethods[key]](),
        }));

      return combineLatest(methods2.map(m => m.fn)).pipe(
        map((data: any[]) =>
          this.storeDataInProperty(data, methods2.map(m => m.prop))
        )
      );
    }
  }

  private storeDataInProperty(data: any[], properties): {} {
    const result = {};
    data.forEach((d, index) => {
      result[properties[index]] = d;
    });
    return result;
  }

  /**
   * return the resolver with the best match
   * resovers can by default match on PageType and page template
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
