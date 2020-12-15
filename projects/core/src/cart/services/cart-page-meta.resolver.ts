import { Injectable, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CmsService } from '../../cms/facade/cms.service';
import { Page, PageRobotsMeta } from '../../cms/model/page.model';
import { ContentPageMetaResolver } from '../../cms/page/content-page-meta.resolver';
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
 */
@Injectable({
  providedIn: 'root',
})
export class CartPageMetaResolver
  extends PageMetaResolver
  implements PageTitleResolver, PageRobotsResolver {
  /**
   * @deprecated since 3.1 we'll use the contentPageResolver in future versions
   */
  constructor(cms: CmsService);
  constructor(cms: CmsService, contentPageResolver: ContentPageMetaResolver);
  constructor(
    protected cms: CmsService,
    @Optional() protected contentPageResolver?: ContentPageMetaResolver
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'CartPageTemplate';
  }

  /**
   * @deprecated since 3.1, we'll use the `ContentPageMetaResolver` to resolve
   * common page meta data in future versions
   */
  protected cms$: Observable<Page> = this.cms
    .getCurrentPage()
    .pipe(filter((page) => !!page));

  /**
   * Resolves the page title, which is driven by the backend.
   */
  resolveTitle(): Observable<string> {
    // TODO: resolve from this.contentPageResolver.resolveTitle()
    return this.cms$.pipe(map((p) => p.title));
  }

  /**
   * @Override Returns robots for the cart pages, which default to NOINDEX/NOFOLLOW.
   *
   * @deprecated since 3.1, we'll remove the hard coded robot implementation in a future
   * major version as the Robot information can be resolved from the content.
   */
  resolveRobots(): Observable<PageRobotsMeta[]> {
    // TODO: resolve from this.contentPageResolver.resolveRobots()
    return of([PageRobotsMeta.NOFOLLOW, PageRobotsMeta.NOINDEX]);
  }
}
