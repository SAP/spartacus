import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { PageType, ProductSearchPage } from '../../model';
import { ProductSearchService } from '../../product/facade/product-search.service';
import { ProductService } from '../../product/facade/product.service';
import { createFrom } from '../../util';
import { RoutingService } from '../facade/routing.service';
import { PageContext } from '../models/page-context.model';
import {
  CategoryPageVisitedEvent,
  ProductDetailsPageVisitedEvent,
  SearchResultsChangeEvent,
} from './routing.events';

// const CATEGORY_FACET_CODE = 'category';
// const BRAND_FACET_CODE = 'brand';

@Injectable({
  providedIn: 'root',
})
export class RoutingEventBuilder {
  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService,
    protected eventService: EventService,
    protected productService: ProductService
  ) {
    this.register();
  }

  protected register() {
    this.eventService.register(
      SearchResultsChangeEvent,
      this.searchResultChangeEvent()
    );
    this.eventService.register(
      ProductDetailsPageVisitedEvent,
      this.buildProductDetailsPageVisitEvent()
    );
    this.eventService.register(
      CategoryPageVisitedEvent,
      this.buildCategoryPageVisitEvent()
    );
    // this.eventService.register(
    //   CategoryFacetChangeEvent,
    //   this.buildCategoryFacetChangeEvent()
    // );
    // this.eventService.register(
    //   BrandFacetChangeEvent,
    //   this.buildBrandFacetChangeEvent()
    // );
  }

  buildProductDetailsPageVisitEvent(): Observable<
    ProductDetailsPageVisitedEvent
  > {
    return this.routerEvents(PageType.PRODUCT_PAGE).pipe(
      map((context) => context.id),
      switchMap((productId) => {
        return this.productService.get(productId).pipe(
          filter(Boolean),
          map((product) => {
            console.log(product);
            return createFrom(ProductDetailsPageVisitedEvent, product);
          })
        );
      })
    );
  }

  buildCategoryPageVisitEvent(): Observable<CategoryPageVisitedEvent> {
    return this.routerEvents(PageType.CATEGORY_PAGE).pipe(
      tap((context) => {
        console.log(context);
      }),
      map((context) => context.id),
      switchMap((categoryId) => {
        console.log('code: ', categoryId);
        return this.productService.get(categoryId).pipe(
          filter(Boolean),
          map((product) => {
            console.log(product);
            return createFrom(CategoryPageVisitedEvent, product);
          })
        );
      })
    );
  }

  // buildCategoryFacetChangeEvent(): Observable<Breadcrumb[]> {
  //   return this.searchResultChangeEvent().pipe(
  //     withLatestFrom(this.routingService.getPageContext()),
  //     filter(([_facets, pageContext]) => this.isFacetPage(pageContext)),
  //     map(([facets, _pageContext]) =>
  //       facets.filter((facet) => this.isCategoryFacet(facet))
  //     ),
  //     distinctUntilKeyChanged('length')
  //   );
  // }

  // buildBrandFacetChangeEvent(): Observable<Breadcrumb[]> {
  //   return this.searchResultChangeEvent().pipe(
  //     withLatestFrom(this.routingService.getPageContext()),
  //     filter(([_facets, pageContext]) => this.isFacetPage(pageContext)),
  //     map(([facets, _pageContext]) =>
  //       facets.filter((facet) => this.isBrandFacet(facet))
  //     ),
  //     distinctUntilKeyChanged('length')
  //   );
  // }

  // private isFacetPage(pageContext: PageContext): boolean {
  //   return (
  //     pageContext.type === PageType.CATEGORY_PAGE || pageContext.id === 'search'
  //   );
  // }

  private searchResultChangeEvent(): Observable<SearchResultsChangeEvent> {
    return this.productSearchService.getResults().pipe(
      filter((searchResults) => Boolean(searchResults.breadcrumbs)),
      map((productSearchPage: ProductSearchPage) => ({
        searchTerm: productSearchPage.freeTextSearch,
        numberOfResults: productSearchPage.pagination.totalResults,
      })),
      map((searchResults) =>
        createFrom(SearchResultsChangeEvent, searchResults)
      )
    );
  }

  // private isBrandFacet(breadcrumb: Breadcrumb): boolean {
  //   return breadcrumb ? breadcrumb.facetCode === BRAND_FACET_CODE : false;
  // }

  // private isCategoryFacet(breadcrumb: Breadcrumb): boolean {
  //   return breadcrumb ? breadcrumb.facetCode === CATEGORY_FACET_CODE : false;
  // }

  private routerEvents(pageType: PageType): Observable<PageContext> {
    return this.routingService
      .getPageContext()
      .pipe(filter((context) => context.type === pageType));
  }
}
