import { Injectable } from '@angular/core';
import {
  Breadcrumb,
  ConverterService,
  PageContext,
  PageType,
  ProductSearchService,
  RoutingService,
} from '@spartacus/core';
import { merge, Observable } from 'rxjs';
import {
  distinctUntilKeyChanged,
  filter,
  map,
  withLatestFrom,
} from 'rxjs/operators';
import {
  MERCHANDISING_FACET_NORMALIZER,
  MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER,
} from '../connectors/strategy/converters';
import { MerchandisingUserContext } from '../model/merchandising-user-context.model';

const CATEGORY_FACET_CODE = 'category';
const BRAND_FACET_CODE = 'brand';

@Injectable({
  providedIn: 'root',
})
export class CdsMerchandisingUserContextService {
  constructor(
    private routingService: RoutingService,
    private productSearchService: ProductSearchService,
    private converterService: ConverterService
  ) {}

  getUserContext(): Observable<MerchandisingUserContext> {
    return merge(
      this.getProductNavigationContext(),
      this.getCategoryNavigationContext(),
      this.getFacets()
    );
  }

  private getProductNavigationContext(): Observable<MerchandisingUserContext> {
    return this.routingService.getPageContext().pipe(
      filter(pageContext => pageContext.type === PageType.PRODUCT_PAGE),
      map(context => context.id),
      map(productId => ({
        products: [productId],
      }))
    );
  }

  private getCategoryNavigationContext(): Observable<MerchandisingUserContext> {
    return this.routingService.getPageContext().pipe(
      filter(pageContext => pageContext.type === PageType.CATEGORY_PAGE),
      map(context => context.id),
      map(category => ({
        category,
      }))
    );
  }

  private isFacetPage(pageContext: PageContext): boolean {
    return (
      pageContext.type === PageType.CATEGORY_PAGE || pageContext.id === 'search'
    );
  }

  private searchResultChangeEvent(): Observable<Breadcrumb[]> {
    return this.productSearchService.getResults().pipe(
      map(searchResults =>
        searchResults.breadcrumbs ? searchResults.breadcrumbs : []
      ),
      filter(facets => !!facets)
    );
  }

  private isBrandFacet(breadcrumb: Breadcrumb): boolean {
    return breadcrumb ? breadcrumb.facetCode === BRAND_FACET_CODE : false;
  }

  private isCategoryFacet(breadcrumb: Breadcrumb): boolean {
    return breadcrumb ? breadcrumb.facetCode === CATEGORY_FACET_CODE : false;
  }

  private filterFacetByCurrentPage(
    facet: Breadcrumb,
    currentPageContext: PageContext
  ): boolean {
    if (currentPageContext.type !== PageType.CATEGORY_PAGE) {
      return false;
    }
    return facet.facetValueCode !== currentPageContext.id;
  }

  private getFacets(): Observable<MerchandisingUserContext> {
    return this.searchResultChangeEvent().pipe(
      withLatestFrom(this.routingService.getPageContext()),
      filter(([_facets, pageContext]) => this.isFacetPage(pageContext)),
      map(([facets, pageContext]) =>
        facets
          .filter(
            facet => this.isCategoryFacet(facet) || this.isBrandFacet(facet)
          )
          .filter(facet => this.filterFacetByCurrentPage(facet, pageContext))
      ),
      distinctUntilKeyChanged('length'),
      this.converterService.pipeable(MERCHANDISING_FACET_NORMALIZER),
      this.converterService.pipeable(
        MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER
      ),
      map(facets => ({
        facets,
      }))
    );
  }
}
