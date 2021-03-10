import { Injectable, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CmsService } from '../../cms/facade/cms.service';
import { Page, PageRobotsMeta } from '../../cms/model/page.model';
import { BasePageMetaResolver } from '../../cms/page/base-page-meta.resolver';
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
  /**
   * @deprecated since 3.1, we'll use the BasePageMetaResolver in future versions and
   * drop the CmsService from the constructor as it will no longer be used.
   */
  // TODO(#10467): Remove deprecated constructors
  constructor(cms: CmsService);
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  constructor(cms: CmsService, basePageMetaResolver?: BasePageMetaResolver);
  constructor(
    protected cms: CmsService,
    @Optional() protected basePageMetaResolver?: BasePageMetaResolver
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'CartPageTemplate';
  }

  // TODO(#10467): remove the cms property as it's no longer needed when we use the `BasePageMetaResolver`
  /**
   * @deprecated since 3.1, we'll use the BasePageMetaResolver to resolve the page title
   */
  protected cms$: Observable<Page> = this.cms
    .getCurrentPage()
    .pipe(filter((page) => !!page));

  resolveTitle(): Observable<string> {
    // TODO(#10467): resolve the title from the `BasePageMetaResolver.resolveTitle()` only
    return this.basePageMetaResolver
      ? this.basePageMetaResolver.resolveTitle()
      : this.cms$.pipe(map((p) => p.title));
  }

  /**
   * @Override Returns robots for the cart pages, which default to NOINDEX/NOFOLLOW.
   */
  // TODO(#10467): resolve robots from `BasePageMetaResolver` instead
  resolveRobots(): Observable<PageRobotsMeta[]> {
    return of([PageRobotsMeta.NOFOLLOW, PageRobotsMeta.NOINDEX]);
  }
}
