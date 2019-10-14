import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CmsService } from '../../cms/facade/cms.service';
import {
  Page,
  PageMeta,
  USE_SEPARATE_RESOLVERS,
} from '../../cms/model/page.model';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageBreadcrumbResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { ProductSearchPage } from '../../model/product-search.model';
import { RoutingService } from '../../routing/facade/routing.service';
import { ProductSearchService } from '../facade/product-search.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryPageMetaResolver extends PageMetaResolver
  implements PageTitleResolver, PageBreadcrumbResolver {
  /**
   * Backwards compatibility is quarenteed with this flag during
   * the 1.x releases. Customers who have extended this resolver
   * can keep relying on the `resolve()` class.
   */
  version_1_only = true;

  private searchPage$: Observable<
    ProductSearchPage | Page
  > = this.cms.getCurrentPage().pipe(
    filter(Boolean),
    switchMap((page: Page) =>
      // only the existence of a plp component tells us if products
      // are rendered or if this is an ordinary content page
      this.hasProductListComponent(page)
        ? this.productSearchService.getResults()
        : of(page)
    )
  );

  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService,
    protected cms: CmsService,
    protected translation: TranslationService
  ) {
    super();
    this.pageType = PageType.CATEGORY_PAGE;
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
    return combineLatest([this.resolveTitle(), this.resolveBreadcrumbs()]).pipe(
      map(([title, breadcrumbs]) => ({
        title,
        breadcrumbs,
      }))
    );
  }

  resolveTitle(_data?: ProductSearchPage): Observable<string> {
    return this.searchPage$.pipe(
      switchMap(page =>
        !!(<ProductSearchPage>page).pagination &&
        !!(<ProductSearchPage>page).breadcrumbs
          ? this.translation.translate('pageMetaResolver.category.title', {
              count: (<ProductSearchPage>page).pagination.totalResults,
              query: (<ProductSearchPage>page).breadcrumbs[0].facetValueName,
            })
          : of((<Page>page).title)
      )
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
   * @deprecated since version 1.3
   * The arguments will get removed with 2.0. They've already made optional in 1.3.
   * The `product` and `breadcrumbLabel` argument will be removed with 2.0. They've already
   * become optional in 1.2.
   */
  resolveBreadcrumbs(
    _data?: ProductSearchPage,
    _breadcrumbLabel?: string
  ): Observable<any[]> {
    return combineLatest([
      this.searchPage$.pipe(),
      this.translation.translate('common.home'),
    ]).pipe(
      switchMap(page =>
        !!(<ProductSearchPage>page).breadcrumbs
          ? this.translation
              .translate('common.home')
              .pipe(
                map(label =>
                  this.resolveBreadcrumbData(<ProductSearchPage>page, label)
                )
              )
          : of(null)
      )
    );
  }

  private resolveBreadcrumbData(page: ProductSearchPage, label: string): any[] {
    const breadcrumbs = [];
    breadcrumbs.push({ label: label, link: '/' });

    for (const br of page.breadcrumbs) {
      if (br.facetCode === 'category') {
        breadcrumbs.push({
          label: br.facetValueName,
          link: `/c/${br.facetValueCode}`,
        });
      }
      if (br.facetCode === 'brand') {
        breadcrumbs.push({
          label: br.facetValueName,
          link: `/Brands/${br.facetValueName}/c/${br.facetValueCode}`,
        });
      }
    }
    return breadcrumbs;
  }

  private hasProductListComponent(page: Page): boolean {
    return !!Object.keys(page.slots).find(
      key =>
        !!page.slots[key].components.find(
          comp => comp.typeCode === 'CMSProductListComponent'
        )
    );
  }
}
