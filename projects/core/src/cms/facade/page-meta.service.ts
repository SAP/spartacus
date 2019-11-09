import { Inject, Injectable, Optional } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { FeatureConfigService } from '../../features-config/services/feature-config.service';
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
    protected cms: CmsService,
    protected featureConfigService?: FeatureConfigService
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
    heading: 'resolveHeading',
    description: 'resolveDescription',
    breadcrumbs: 'resolveBreadcrumbs',
    image: 'resolveImage',
    robots: 'resolveRobots',
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
      (!this.featureConfigService || !this.featureConfigService.isLevel('1.3'))
    ) {
      return metaResolver.resolve();
    } else {
      // resolve individual resolvers to make the extension mechanism more flexible
      const resolveMethods: any[] = Object.keys(this.resolverMethods)
        .filter(key => metaResolver[this.resolverMethods[key]])
        .map(key =>
          metaResolver[this.resolverMethods[key]]().pipe(
            map(data => ({
              [key]: data,
            }))
          )
        );

      return combineLatest(resolveMethods).pipe(
        map(data => Object.assign({}, ...data))
      );
    }
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
