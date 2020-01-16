import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { CmsService } from '../facade/cms.service';
import { Page, PageMeta } from '../model/page.model';
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
   * @deprecated since version 1.3
   *
   * The resolve method is no longer preferred and will be removed with release 2.0.
   * The caller `PageMetaService` service is improved to expect all individual resolvers
   * instead, so that the code is easier extensible.
   */
  resolve(): Observable<PageMeta> | any {
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

  resolveTitle(): Observable<string>;
  /**
   * @deprecated since version 1.3
   * With 2.0, the argument(s) will be removed and the return type will change. Use `resolveTitle()` instead
   */
  // tslint:disable-next-line: unified-signatures
  resolveTitle(page: Page): Observable<string>;
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

  resolveBreadcrumbs(): Observable<any[]>;
  /**
   * @deprecated since version 1.3
   * With 2.0, the argument(s) will be removed and the return type will change. Use `resolveBreadcrumbs()` instead
   */
  // tslint:disable-next-line: unified-signatures
  resolveBreadcrumbs(_page: Page, breadcrumbLabel: string): Observable<any[]>;
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
