import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { CmsService } from '../facade/cms.service';
import { Page, PageMeta, USE_SEPARATE_RESOLVERS } from '../model/page.model';
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
export class ContentPageMetaResolver extends PageMetaResolver
  implements PageTitleResolver, PageBreadcrumbResolver {
  private cms$: Observable<Page> = this.cms
    .getCurrentPage()
    .pipe(filter(p => !!p));

  constructor(
    protected cms: CmsService,
    protected translation: TranslationService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
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
      switchMap((page: Page) =>
        combineLatest([
          this.resolveTitle(page),
          this.resolveBreadcrumbLabel().pipe(
            switchMap(label => this.resolveBreadcrumbs(page, label))
          ),
        ])
      ),
      map(([title, breadcrumbs]: [string, any[]]) => ({ title, breadcrumbs }))
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
   * This method will removed with with 2.0
   */
  resolveBreadcrumbLabel(): Observable<string> {
    return this.translation.translate('common.home');
  }

  /**
   * Resolves breadcrumb data based on the content page.
   *
   * As long as we do not have CMSX-8689 in place we need specific
   * resolvers for nested pages.
   *
   * @deprecated since version 1.3
   * With 2.0, the argument(s) will be removed and the return type will change.
   *
   */
  resolveBreadcrumbs(
    _page?: Page,
    breadcrumbLabel?: string
  ): Observable<any[]> {
    if (breadcrumbLabel) {
      return of([{ label: breadcrumbLabel, link: '/' }]);
    } else {
      return this.translation
        .translate('common.home')
        .pipe(map(label => [{ label: label, link: '/' }]));
    }
  }
}
