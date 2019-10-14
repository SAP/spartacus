import { Inject, Injectable, Optional } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import {
  Page,
  PageMeta,
  PageRobotsMeta,
  USE_SEPARATE_RESOLVERS,
} from '../model/page.model';
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
  resolverMethods: any[] = [
    'resolveTitle',
    'resolveHeading',
    'resolveDescription',
    'resolveBreadcrumbs',
    'resolveImage',
    'resolveRobots',
  ];

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
      const methods = [];
      this.resolverMethods.forEach(method => {
        if (metaResolver[method]) {
          methods.push(metaResolver[method]());
        }
      });

      return combineLatest(methods).pipe(
        map(
          // TODO: in 2.0 we'll do:
          // const result = Object.assign({}, ...data);
          (data: any[]) => this.resolveFor1x(data)
        )
      );
    }
  }

  /**
   * During release 1.x, we cannot simply return all assigned data
   * since some (custom) data streams still respond string values
   */
  private resolveFor1x(data: any[]): {} {
    const result = {};
    data.forEach((d, index) => {
      if (typeof d === 'string') {
        // find type
        switch (this.resolverMethods[index]) {
          case 'resolveTitle':
            result['title'] = d;
            break;
          case 'resolveHeading':
            result['heading'] = d;
            break;
          case 'resolveDescription':
            result['description'] = d;
            break;
          case 'resolveImage':
            result['image'] = d;
            break;
        }
      } else if (d && d.constructor === Array) {
        if (
          d.includes(PageRobotsMeta.FOLLOW) ||
          d.includes(PageRobotsMeta.NOFOLLOW) ||
          d.includes(PageRobotsMeta.INDEX) ||
          d.includes(PageRobotsMeta.NOINDEX)
        ) {
          result['robots'] = d;
        } else {
          result['breadcrumbs'] = d;
        }
      } else {
        Object.assign(result, d);
      }
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
