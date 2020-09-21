import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { CmsService } from '../facade/cms.service';
import { BreadcrumbMeta, Page } from '../model/page.model';
import { PageMetaResolver } from './page-meta.resolver';
import { PageBreadcrumbResolver, PageTitleResolver } from './page.resolvers';

/**
 * Resolves the page data for all Content Pages based on the `PageType.CONTENT_PAGE`.
 * More specific resolvers for content pages can be implemented by making them more
 * specific, for example by using the page template (see `CartPageMetaResolver`).
 *
 * The page title, and breadcrumbs are resolved in this implementation only.
 */
@Injectable({
  providedIn: 'root',
})
export class ContentPageMetaResolver
  extends PageMetaResolver
  implements PageTitleResolver, PageBreadcrumbResolver {
  /** helper to provie access to the current CMS page */
  protected cms$: Observable<Page> = this.cms
    .getCurrentPage()
    .pipe(filter((p) => Boolean(p)));

  constructor(
    protected cms: CmsService,
    protected translation: TranslationService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
  }

  /**
   * Resolves the page title for the ContentPage by taking the title
   * from the backend data.
   */
  resolveTitle(): Observable<string> {
    return this.cms$.pipe(map((p) => p.title));
  }

  /**
   * Resolves a single breacrumb item to the home page for each `ContentPage`.
   * The home page label is resolved from the translation service.
   */
  resolveBreadcrumbs(): Observable<BreadcrumbMeta[]> {
    return this.translation
      .translate('common.home')
      .pipe(map((label) => [{ label: label, link: '/' }] as BreadcrumbMeta[]));
  }
}
