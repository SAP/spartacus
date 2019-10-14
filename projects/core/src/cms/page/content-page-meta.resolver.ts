import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { CmsService } from '../facade/cms.service';
import { Page, PageMeta, USE_SEPARATE_RESOLVERS } from '../model/page.model';
import { PageMetaResolver } from './page-meta.resolver';
import { PageBreadcrumbResolver, PageTitleResolver } from './page.resolvers';

@Injectable({
  providedIn: 'root',
})
export class ContentPageMetaResolver extends PageMetaResolver
  implements PageTitleResolver, PageBreadcrumbResolver {
  /**
   * Backwards compatibility is quarenteed with this flag during
   * the 1.x releases. Customers who have extended this resolver
   * can keep relying on the `resolve()` class.
   */
  version_1_only = true;

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
   * calling `PageMetaService`, it is not ysed by custom subclasses when they call their `super`.
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
          this.resolveTitle(),
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
   * The `page` argument will be removed with 2.0. The argument is optional since 1.3.
   */
  resolveTitle(_page?: Page): Observable<{ title: string } | string> {
    return this.cms$.pipe(
      map(page => (_page ? page.title : { title: page.title }))
    );
  }

  /**
   * @deprecated since version 1.3
   * This method will removed with with 2.0
   */
  resolveBreadcrumbLabel(): Observable<string> {
    return this.translation.translate('common.home');
  }

  /**
   * @deprecated
   * since version 1.3. The arguments will get removed with 2.0.
   * They've already made optional in 1.3.
   * As long as we do not have CMSX-8689 in place we need specific
   * resolvers for nested pages.
   */
  resolveBreadcrumbs(
    _page: Page,
    _breadcrumbLabel: string
  ): Observable<{ breadcrumbs: any[] } | any[]> {
    return this.translation.translate('common.home').pipe(
      map(label => [{ label: label, link: '/' }]),
      map(breadcrumb =>
        _breadcrumbLabel ? { breadcrumbs: breadcrumb } : breadcrumb
      )
    );
  }
}
