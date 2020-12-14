import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CmsConfig } from '../../cms/config/cms-config';
import { CmsService } from '../../cms/facade/cms.service';
import { BreadcrumbMeta, Page } from '../../cms/model/page.model';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageBreadcrumbResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { ConfigurationService } from '../../config/services/configuration.service';
import { TranslationService } from '../../i18n/translation.service';
import {
  CmsComponent,
  CmsProductListComponent,
  PageType,
} from '../../model/cms.model';
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
  implements PageTitleResolver, PageBreadcrumbResolver {
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

  constructor(
    productSearchService: ProductSearchService,
    cms: CmsService,
    translation: TranslationService,
    configurationService?: ConfigurationService
  );
  /**
   * @deprecated since 3.1
   */
  constructor(
    productSearchService: ProductSearchService,
    cms: CmsService,
    translation: TranslationService
  );
  constructor(
    protected productSearchService: ProductSearchService,
    protected cms: CmsService,
    protected translation: TranslationService,
    protected configurationService?: ConfigurationService
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

  /**
   * Indicates whether the page holds a component for the product listing.
   *
   * We used to base this on the component type code, but since 3.1 we use the
   * component configuration `isProductListing`.
   */
  protected hasProductListComponent(page: Page): boolean {
    return !!Object.keys(page.slots).find(
      (key) =>
        !!page.slots[key].components?.find((comp) =>
          this.isProductListComponent(comp)
        )
    );
  }

  /**
   * Indicates whether the component is a product listing component.
   */
  private isProductListComponent(comp: CmsComponent): boolean {
    return (
      this.cmsConfig.cmsComponents?.[comp.typeCode]?.data?.isProductListing ??
      (comp.typeCode === 'CMSProductListComponent' ||
        comp.typeCode === 'ProductGridComponent')
    );
  }

  // return empty config if it's not available (as we introduce this in a minor release)
  private get cmsConfig(): CmsConfig<CmsProductListComponent> {
    return this.configurationService?.config ?? {};
  }
}
