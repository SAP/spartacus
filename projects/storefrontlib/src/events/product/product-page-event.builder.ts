import { Injectable } from '@angular/core';
import {
  createFrom,
  EventService,
  ProductSearchService,
  ProductService,
} from '@spartacus/core';
import { EMPTY, Observable } from 'rxjs';
import { filter, map, skip, switchMap, take } from 'rxjs/operators';
import { PageVisitedEvent } from '../page/page.events';
import {
  CategoryPageResultsVisitedEvent,
  ProductDetailsPageVisitedEvent,
  SearchPageResultsVisitedEvent,
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
      SearchPageResultsVisitedEvent,
      this.buildSearchPageResultsVisitedEvent()
    );
    this.eventService.register(
      ProductDetailsPageVisitedEvent,
      this.buildProductDetailsPageVisitedEvent()
    );
    this.eventService.register(
      CategoryPageResultsVisitedEvent,
      this.buildCategoryResultsPageVisitedEvent()
    );
  }

  protected buildProductDetailsPageVisitedEvent(): Observable<
    ProductDetailsPageVisitedEvent
  > {
    return this.eventService.get(PageVisitedEvent).pipe(
      filter(
        (pageVisitedEvent) => pageVisitedEvent.semanticRoute === 'product'
      ),
      map((pageVisitedEvent) => pageVisitedEvent.context.id),
      switchMap((productId) =>
        this.productService.get(productId).pipe(
          filter((product) => Boolean(product)),
          take(1),
          map((product) =>
            createFrom(ProductDetailsPageVisitedEvent, {
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

  protected buildCategoryResultsPageVisitedEvent(): Observable<
    CategoryPageResultsVisitedEvent
  > {
    const searchResults$ = this.productSearchService.getResults().pipe(
      // skipping the initial value, and preventing emission of the previous search state
      skip(1)
    );

    const categoryPageVisitedEvent$ = this.eventService
      .get(PageVisitedEvent)
      .pipe(
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
          map((categoryPage) =>
            createFrom(CategoryPageResultsVisitedEvent, categoryPage)
          )
        );
      })
    );
  }

  protected buildSearchPageResultsVisitedEvent(): Observable<
    SearchPageResultsVisitedEvent
  > {
    const searchResults$ = this.productSearchService.getResults().pipe(
      // skipping the initial value, and preventing emission of the previous search state
      skip(1),
      map((searchResults) => ({
        searchTerm: searchResults.freeTextSearch,
        numberOfResults: searchResults.pagination.totalResults,
      })),
      map((searchPage) => createFrom(SearchPageResultsVisitedEvent, searchPage))
    );

    const searchPageVisitedEvent$ = this.eventService
      .get(PageVisitedEvent)
      .pipe(
        map((pageVisitedEvent) => pageVisitedEvent.semanticRoute === 'search')
      );

    return searchPageVisitedEvent$.pipe(
      switchMap((isSearchPage) => (isSearchPage ? searchResults$ : EMPTY))
    );
  }
}
