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

@Injectable({
  providedIn: 'root',
})
export class CartPageMetaResolver extends PageMetaResolver
  implements PageTitleResolver, PageRobotsResolver {
  cms$: Observable<Page> = this.cms
    .getCurrentPage()
    .pipe(filter(page => !!page));

  skipResolver: boolean;

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
      this.skipResolver = true;
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
   * The `page` argument will be removed with 2.0, the argument is optional since 1.3.
   */
  resolveTitle(page?: Page): Observable<{ title: string } | any> {
    if (page) {
      return of(page.title);
    } else {
      return this.cms$.pipe(map(p => ({ title: p.title })));
    }
  }

  /**
   * @deprecated since version 1.3
   * The response will change with version 2 to `Observable<{ robots: PageRobotsMeta[] }>`.
   */
  resolveRobots(): Observable<{ robots: PageRobotsMeta[] } | any> {
    const robots: PageRobotsMeta[] = [
      PageRobotsMeta.NOFOLLOW,
      PageRobotsMeta.NOINDEX,
    ];
    return !this.skipResolver ? of(robots) : of({ robots: robots });
  }
}
