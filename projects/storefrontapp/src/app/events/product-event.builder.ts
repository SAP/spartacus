import { Injectable } from '@angular/core';
import {
  createFrom,
  EventService,
  ProductSearchService,
  ProductService,
} from '@spartacus/core';
import { EMPTY, Observable } from 'rxjs';
import { filter, map, skip, switchMap } from 'rxjs/operators';
import {
  BrandPageVisited,
  CategoryPageVisited,
  ProductDetailsPageVisited,
  SearchPageVisited,
} from './product.events';
import { PageVisited } from './routing.events';

@Injectable({
  providedIn: 'root',
})
export class ProductEventBuilder {
  constructor(
    protected eventService: EventService,
    protected productService: ProductService,
    protected productSearchService: ProductSearchService
  ) {
    this.register();
  }

  protected register(): void {
    this.eventService.register(
      SearchPageVisited,
      this.searchResultPageVisited()
    );
    this.eventService.register(
      ProductDetailsPageVisited,
      this.buildProductDetailsPageVisitedEvent()
    );
    this.eventService.register(
      CategoryPageVisited,
      this.buildCategoryPageVisitedEvent()
    );
    this.eventService.register(
      BrandPageVisited,
      this.buildBrandPageVisitedEvent()
    );
  }

  protected buildProductDetailsPageVisitedEvent(): Observable<
    ProductDetailsPageVisited
  > {
    return this.eventService.get(PageVisited).pipe(
      filter(
        (pageVisitedEvent) => pageVisitedEvent.semanticRoute === 'product'
      ),
      map((pageVisitedEvent) => pageVisitedEvent.context.id),
      switchMap((productId) =>
        this.productService.get(productId).pipe(
          filter((product) => Boolean(product)),
          map((product) => createFrom(ProductDetailsPageVisited, product))
        )
      )
    );
  }

  protected buildCategoryPageVisitedEvent(): Observable<CategoryPageVisited> {
    const searchResults$ = this.productSearchService.getResults().pipe(
      // skipping the initial value, and preventing emission of the previous search state
      skip(1)
    );

    const categoryPageVisitedEvent$ = this.eventService.get(PageVisited).pipe(
      map((pageVisitedEvent) => ({
        isCategoryPage: pageVisitedEvent.semanticRoute === 'category',
        categoryCode: pageVisitedEvent.context.id,
      }))
    );

    return categoryPageVisitedEvent$.pipe(
      switchMap((pageEvent) => {
        if (!pageEvent.isCategoryPage) {
          return EMPTY;
        }

        return searchResults$.pipe(
          map((searchResults) => ({
            categoryCode: pageEvent.categoryCode,
            categoryName: searchResults.breadcrumbs[0].facetValueName,
          })),
          map((categoryPage) => createFrom(CategoryPageVisited, categoryPage))
        );
      })
    );
  }

  protected buildBrandPageVisitedEvent(): Observable<BrandPageVisited> {
    const searchResults$ = this.productSearchService.getResults().pipe(
      // skipping the initial value, and preventing emission of the previous search state
      skip(1)
    );

    const brandPageVisitedEvent$ = this.eventService.get(PageVisited).pipe(
      map((pageVisitedEvent) => ({
        isBrandPage: pageVisitedEvent.semanticRoute === 'brand',
        brandCode: pageVisitedEvent.context.id,
      }))
    );

    return brandPageVisitedEvent$.pipe(
      switchMap((pageEvent) => {
        if (!pageEvent.isBrandPage) {
          return EMPTY;
        }

        return searchResults$.pipe(
          map((searchResults) => ({
            brandCode: pageEvent.brandCode,
            brandName: searchResults.breadcrumbs[0].facetValueName,
          })),
          map((brandPage) => createFrom(BrandPageVisited, brandPage))
        );
      })
    );
  }

  protected searchResultPageVisited(): Observable<SearchPageVisited> {
    const searchResults$ = this.productSearchService.getResults().pipe(
      // skipping the initial value, and preventing emission of the previous search state
      skip(1),
      map((searchResults) => ({
        searchTerm: searchResults.freeTextSearch,
        numberOfResults: searchResults.pagination.totalResults,
      })),
      map((searchPage) => createFrom(SearchPageVisited, searchPage))
    );

    const searchPageVisitedEvent$ = this.eventService
      .get(PageVisited)
      .pipe(
        map((pageVisitedEvent) => pageVisitedEvent.semanticRoute === 'search')
      );

    return searchPageVisitedEvent$.pipe(
      switchMap((isSearchPage) => (isSearchPage ? searchResults$ : EMPTY))
    );
  }
}
