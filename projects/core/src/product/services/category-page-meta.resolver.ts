import { Injectable, Optional } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CmsService } from '../../cms/facade/cms.service';
import {
  BreadcrumbMeta,
  Page,
  PageRobotsMeta,
} from '../../cms/model/page.model';
import { BasePageMetaResolver } from '../../cms/page/base-page-meta.resolver';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageBreadcrumbResolver,
  PageRobotsResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { ProductSearchPage } from '../../model/product-search.model';
import { ProductSearchService } from '../facade/product-search.service';

/**
 * Resolves the page data for the Product Listing Page.
 *
 * The page title, and breadcrumbs are resolved in this implementation only.
 */
@Injectable({
  providedIn: 'root',
})
export class CategoryPageMetaResolver
  extends PageMetaResolver
  implements PageTitleResolver, PageBreadcrumbResolver, PageRobotsResolver {
  // reusable observable for search page data
  protected searchPage$: Observable<
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

  /**
   * @deprecated since 3.1, we'll use the BasePageMetaResolver in future versions
   */
  // TODO(#10467): Remove deprecated constructors
  constructor(
    productSearchService: ProductSearchService,
    cmsService: CmsService,
    translation: TranslationService
  );
  constructor(
    productSearchService: ProductSearchService,
    cmsService: CmsService,
    translation: TranslationService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    basePageMetaResolver?: BasePageMetaResolver
  );
  constructor(
    protected productSearchService: ProductSearchService,
    protected cms: CmsService,
    protected translation: TranslationService,
    @Optional() protected basePageMetaResolver?: BasePageMetaResolver
  ) {
    super();
    this.pageType = PageType.CATEGORY_PAGE;
  }

  resolveTitle(): Observable<string> {
    return this.searchPage$.pipe(
      filter((page: ProductSearchPage) => !!page.pagination),
      switchMap((p: ProductSearchPage) =>
        this.translation.translate('pageMetaResolver.category.title', {
          count: p.pagination.totalResults,
          query: p.breadcrumbs?.length
            ? p.breadcrumbs[0].facetValueName
            : undefined,
        })
      )
    );
  }

  resolveBreadcrumbs(): Observable<BreadcrumbMeta[]> {
    return combineLatest([
      this.searchPage$.pipe(),
      this.translation.translate('common.home'),
    ]).pipe(
      map(([p, label]: [ProductSearchPage, string]) =>
        p.breadcrumbs
          ? this.resolveBreadcrumbData(<ProductSearchPage>p, label)
          : null
      )
    );
  }

  protected resolveBreadcrumbData(
    page: ProductSearchPage,
    label: string
  ): BreadcrumbMeta[] {
    const breadcrumbs: BreadcrumbMeta[] = [];
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

  protected hasProductListComponent(page: Page): boolean {
    return !!Object.keys(page.slots).find(
      (key) =>
        !!page.slots[key].components?.find(
          (comp) =>
            comp.typeCode === 'CMSProductListComponent' ||
            comp.typeCode === 'ProductGridComponent'
        )
    );
  }

  /**
   * @override
   * This is added in 3.1 and will be ignored if the `BasePageMetaResolver` is not
   * available.
   */
  // TODO(#10467) drop the 3.1 note.
  resolveRobots(): Observable<PageRobotsMeta[]> {
    return this.basePageMetaResolver?.resolveRobots() ?? of([]);
  }

  /**
   * Resolves the canonical url for the category listing page.
   *
   * The default options will be used to resolve the url, which means that
   * the all query parameters are removed and https and www are added explicitly.
   */
  resolveCanonicalUrl(): Observable<string> {
    return this.basePageMetaResolver?.resolveCanonicalUrl() ?? of();
  }
}
