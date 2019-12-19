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
  distinctUntilChanged,
  filter,
  map,
  withLatestFrom,
} from 'rxjs/operators';
import {
  MERCHANDISING_FACET_NORMALIZER,
  MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER,
} from '../connectors/strategy/converters';
import { MerchandisingUserContext } from '../model/merchandising-user-context.model';

@Injectable({
  providedIn: 'root',
})
export class CdsMerchandisingUserContextService {
  constructor(
    private routingService: RoutingService,
    private productSearchService: ProductSearchService,
    private converterService: ConverterService
  ) {}

  getUserContext$: Observable<MerchandisingUserContext> = merge(
    this.getProductNavigationContext(),
    this.getCategoryNavigationContextAndFacets()
  );

  private getCategoryNavigationContextAndFacets(): Observable<
    MerchandisingUserContext
  > {
    return this.searchResultChangeEvent().pipe(
      // TODO: check this
      // filter(x => Object.keys(x).length === 0),
      withLatestFrom(this.routingService.getPageContext()),
      filter(([_facets, pageContext]) => this.isFacetPage(pageContext)),
      map(([facets, pageContext]) =>
        facets.filter(facet =>
          this.filterFacetByCurrentPage(facet, pageContext)
        )
      ),
      this.converterService.pipeable(MERCHANDISING_FACET_NORMALIZER),
      this.converterService.pipeable(
        MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER
      ),
      // TODO: check this
      // distinctUntilChanged(),
      withLatestFrom(this.getCategoryNavigationContext()),
      // TODO: if category is not present, then don't add it
      map(([facets, category]) => ({
        facets,
        category,
      })),
      // TODO: nasty
      distinctUntilChanged(
        (prev, next) =>
          prev.category === next.category && prev.facets === next.facets
      )
    );
  }

  private searchResultChangeEvent(): Observable<Breadcrumb[]> {
    return this.productSearchService.getResults().pipe(
      map(searchResults =>
        searchResults.breadcrumbs ? searchResults.breadcrumbs : []
      ),
      filter(facets => !!facets)
      // TODO: check this
      // debounceTime(0)
    );
  }

  private isFacetPage(pageContext: PageContext): boolean {
    return (
      pageContext.type === PageType.CATEGORY_PAGE || pageContext.id === 'search'
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

  private getCategoryNavigationContext(): Observable<string> {
    return this.routingService.getPageContext().pipe(
      map(context =>
        context.type === PageType.CATEGORY_PAGE ? context.id : undefined
      ),
      // TODO: check this
      distinctUntilChanged()
    );
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
}
