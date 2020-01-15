import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CmsService } from '../../cms/facade/cms.service';
import { Page, PageMeta } from '../../cms/model/page.model';
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

/**
 * Resolves the page data for the Product Listing Page
 * based on the `PageType.CATEGORY_PAGE`.
 *
 * The page title, and breadcrumbs are resolved in this implementation only.
 */
@Injectable({
  providedIn: 'root',
})
export class CategoryPageMetaResolver extends PageMetaResolver
  implements PageTitleResolver, PageBreadcrumbResolver {
  // reusable observable for search page data
  private searchPage$: Observable<
    ProductSearchPage | Page
  > = this.cms.getCurrentPage().pipe(
    filter(Boolean),
    switchMap((page: Page) =>
      // only the existence of a plp component tells us if products
      // are rendered or if this is an ordinary content page
      this.hasProductListComponent(page)
        ? this.productSearchService.getResults().pipe(filter(Boolean))
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
   * @deprecated since version 1.3
   *
   * The resolve method is no longer preferred and will be removed with release 2.0.
   * The caller `PageMetaService` service is improved to expect all individual resolvers
   * instead, so that the code is easier extensible.
   */
  resolve(): Observable<PageMeta> | any {
    return this.cms.getCurrentPage().pipe(
      filter(Boolean),
      switchMap((page: Page) => {
        // only the existence of a plp component tells us if products
        // are rendered or if this is an ordinary content page
        if (this.hasProductListComponent(page)) {
          return this.productSearchService.getResults().pipe(
            filter(data => data.breadcrumbs && data.breadcrumbs.length > 0),
            switchMap(data =>
              combineLatest([
                this.resolveTitle(data),
                this.resolveBreadcrumbLabel().pipe(
                  switchMap(label => this.resolveBreadcrumbs(data, label))
                ),
              ])
            ),
            map(([title, breadcrumbs]) => ({ title, breadcrumbs }))
          );
        } else {
          return of({
            title: page.title || page.name,
          });
        }
      })
    );
  }
  resolveTitle(): Observable<string>;
  /**
   * @deprecated since version 1.3
   * With 2.0, the argument(s) will be removed and the return type will change. Use `resolveTitle()` instead
   */
  // tslint:disable-next-line: unified-signatures
  resolveTitle(searchPage: ProductSearchPage): Observable<string>;
  resolveTitle(searchPage?: ProductSearchPage): Observable<string> {
    const searchPage$ = searchPage ? of(searchPage) : this.searchPage$;

    return searchPage$.pipe(
      filter((page: ProductSearchPage) => !!page.pagination),
      switchMap(p =>
        this.translation.translate('pageMetaResolver.category.title', {
          count: (<ProductSearchPage>p).pagination.totalResults,
          query: (<ProductSearchPage>p).breadcrumbs[0].facetValueName,
        })
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

  resolveBreadcrumbs(): Observable<any[]>;
  /**
   * @deprecated since version 1.3
   * With 2.0, the argument(s) will be removed and the return type will change. Use `resolveTitle()` instead
   */
  // tslint:disable-next-line: unified-signatures
  resolveBreadcrumbs(
    searchPage: ProductSearchPage,
    breadcrumbLabel: string
  ): Observable<any[]>;
  resolveBreadcrumbs(
    searchPage?: ProductSearchPage,
    breadcrumbLabel?: string
  ): Observable<any[]> {
    const sources =
      searchPage && breadcrumbLabel
        ? [of(searchPage), of(breadcrumbLabel)]
        : [this.searchPage$.pipe(), this.translation.translate('common.home')];

    return combineLatest(sources).pipe(
      map(([p, label]: [ProductSearchPage, string]) =>
        p.breadcrumbs
          ? this.resolveBreadcrumbData(<ProductSearchPage>p, label)
          : null
      )
    );
  }

  private resolveBreadcrumbData(page: ProductSearchPage, label: string): any[] {
    const breadcrumbs = [];
    breadcrumbs.push({ label: label, link: '/' });

    for (const br of page.breadcrumbs) {
      if (br.facetCode === 'category' || br.facetCode === 'allCategories') {
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
          comp =>
            comp.typeCode === 'CMSProductListComponent' ||
            comp.typeCode === 'ProductGridComponent'
        )
    );
  }
}
