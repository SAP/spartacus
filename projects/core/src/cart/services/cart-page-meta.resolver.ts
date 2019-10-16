import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CmsService } from '../../cms/facade/cms.service';
import {
  Page,
  PageMeta,
  PageRobotsMeta,
  USE_SEPARATE_RESOLVERS,
} from '../../cms/model/page.model';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageRobotsResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { PageType } from '../../model/cms.model';

/**
 * Resolves the page data for all Content Pages based on the `PageType.CONTENT_PAGE`
 * and the `CartPageTemplate`. If the cart page matches this template, the more generic
 * `ContentPageMetaResolver` is overriden by this resolver.
 *
 * The page title and robots are resolved in this implementation only.
 */
@Injectable({
  providedIn: 'root',
})
export class CartPageMetaResolver extends PageMetaResolver
  implements PageTitleResolver, PageRobotsResolver {
  cms$: Observable<Page> = this.cms
    .getCurrentPage()
    .pipe(filter(page => !!page));

  constructor(protected cms: CmsService) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'CartPageTemplate';
  }

  /**
   * The resolve method is no longer preferred and will be removed with release 2.0.
   * The caller `PageMetaService` service is improved to expect all individual resolvers
   * instead, so that the code is easier extensible.
   *
   * @param skip indicates that this method is not used. While this flag is used by the
   * calling `PageMetaService`, it is not used by custom subclasses when they call their `super`.
   *
   * @deprecated since version 1.3
   */
  resolve(skip?: boolean): Observable<PageMeta> | any {
    if (skip) {
      return USE_SEPARATE_RESOLVERS;
    }
    return this.cms$.pipe(
      switchMap(page =>
        combineLatest([this.resolveTitle(page), this.resolveRobots()])
      ),
      map(([title, robots]: [string, any[]]) => ({ title, robots }))
    );
  }

  /**
   * @deprecated since version 1.3
   * With 2.0, the argument(s) will be removed and the return type will change.
   */
  resolveTitle(page?: Page): Observable<string> {
    return page ? of(page.title) : this.cms$.pipe(map(p => p.title));
  }

  /**
   * @deprecated since version 1.3
   * With 2.0, the argument(s) will be removed and the return type will change.
   */
  resolveRobots(): Observable<PageRobotsMeta[]> {
    return of([PageRobotsMeta.NOFOLLOW, PageRobotsMeta.NOINDEX]);
  }
}
