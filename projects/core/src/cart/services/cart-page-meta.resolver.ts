import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CmsService } from '../../cms/facade/cms.service';
import { Page, PageRobotsMeta } from '../../cms/model/page.model';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageRobotsResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { PageType } from '../../model/cms.model';

/**
 * Resolves the page metadata for the Cart page (Using the `PageType.CONTENT_PAGE`
 * and the `CartPageTemplate`). If the cart page matches this template, the more
 * generic `ContentPageMetaResolver` is overridden by this resolver.
 *
 * The page title and robots are resolved in this implementation only.
 *
 * @deprecated since 3.1, in future versions we'll drop this service as the logic
 * is no longer specific since we introduce backend driven robots.
 */
// TODO(#10467): Remove implementation
@Injectable({
  providedIn: 'root',
})
export class CartPageMetaResolver
  extends PageMetaResolver
  implements PageTitleResolver, PageRobotsResolver {
  constructor(protected cms: CmsService) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'CartPageTemplate';
  }

  protected cms$: Observable<Page> = this.cms
    .getCurrentPage()
    .pipe(filter((page) => !!page));

  /**
   * Resolves the page title, which is driven by the backend.
   */
  resolveTitle(): Observable<string> {
    return this.cms$.pipe(map((p) => p.title));
  }

  /**
   * @Override Returns robots for the cart pages, which default to NOINDEX/NOFOLLOW.
   */
  resolveRobots(): Observable<PageRobotsMeta[]> {
    return of([PageRobotsMeta.NOFOLLOW, PageRobotsMeta.NOINDEX]);
  }
}
