import { Injectable } from '@angular/core';
import {
  createFrom,
  EventService,
  ProductSearchService,
  ProductService,
} from '@spartacus/core';
import { EMPTY, Observable } from 'rxjs';
import { filter, map, skip, switchMap, take } from 'rxjs/operators';
import { PageEvent } from '../page/page.events';
import {
  CategoryPageResultsEvent,
  ProductDetailsPageEvent,
  SearchPageResultsEvent,
} from './product-page.events';

@Injectable({
  providedIn: 'root',
})
export class ProductPageEventBuilder {
  constructor(
    protected eventService: EventService,
    protected productService: ProductService,
    protected productSearchService: ProductSearchService
  ) {
    this.register();
  }

  protected register(): void {
    this.eventService.register(
      SearchPageResultsEvent,
      this.buildSearchPageResultsEvent()
    );
    this.eventService.register(
      ProductDetailsPageEvent,
      this.buildProductDetailsPageEvent()
    );
    this.eventService.register(
      CategoryPageResultsEvent,
      this.buildCategoryResultsPageEvent()
    );
  }

  protected buildProductDetailsPageEvent(): Observable<
    ProductDetailsPageEvent
  > {
    return this.eventService.get(PageEvent).pipe(
      filter((pageEvent) => pageEvent.semanticRoute === 'product'),
      map((pageEvent) => pageEvent.context.id),
      switchMap((productId) =>
        this.productService.get(productId).pipe(
          filter((product) => Boolean(product)),
          take(1),
          map((product) =>
            createFrom(ProductDetailsPageEvent, {
              categories: product.categories,
              code: product.code,
              name: product.name,
              price: product.price,
            })
          )
        )
      )
    );
  }

  protected buildCategoryResultsPageEvent(): Observable<
    CategoryPageResultsEvent
  > {
    const searchResults$ = this.productSearchService.getResults().pipe(
      // skipping the initial value, and preventing emission of the previous search state
      skip(1)
    );

    const categoryPageEvent$ = this.eventService.get(PageEvent).pipe(
      map((pageEvent) => ({
        isCategoryPage: pageEvent.semanticRoute === 'category',
        categoryCode: pageEvent.context.id,
      }))
    );

    return categoryPageEvent$.pipe(
      switchMap((pageEvent) => {
        if (!pageEvent.isCategoryPage) {
          return EMPTY;
        }

        return searchResults$.pipe(
          map((searchResults) => ({
            categoryCode: pageEvent.categoryCode,
            categoryName: searchResults.breadcrumbs[0].facetValueName,
          })),
          map((categoryPage) =>
            createFrom(CategoryPageResultsEvent, categoryPage)
          )
        );
      })
    );
  }

  protected buildSearchPageResultsEvent(): Observable<SearchPageResultsEvent> {
    const searchResults$ = this.productSearchService.getResults().pipe(
      // skipping the initial value, and preventing emission of the previous search state
      skip(1),
      map((searchResults) => ({
        searchTerm: searchResults.freeTextSearch,
        numberOfResults: searchResults.pagination.totalResults,
      })),
      map((searchPage) => createFrom(SearchPageResultsEvent, searchPage))
    );

    const searchPageEvent$ = this.eventService
      .get(PageEvent)
      .pipe(map((pageEvent) => pageEvent.semanticRoute === 'search'));

    return searchPageEvent$.pipe(
      switchMap((isSearchPage) => (isSearchPage ? searchResults$ : EMPTY))
    );
  }
}
