import { Injectable } from '@angular/core';
import {
  createFrom,
  EventService,
  ProductSearchService,
  ProductService,
} from '@spartacus/core';
import { EMPTY, Observable } from 'rxjs';
import { filter, map, skip, switchMap, take } from 'rxjs/operators';
import { NavigationEvent } from '../navigation/navigation.event';
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

  protected buildProductDetailsPageEvent(): Observable<ProductDetailsPageEvent> {
    return this.eventService.get(NavigationEvent).pipe(
      filter((navigationEvent) => navigationEvent.semanticRoute === 'product'),
      switchMap((navigationEvent) =>
        this.productService.get(navigationEvent.context.id).pipe(
          filter((product) => Boolean(product)),
          take(1),
          map((product) =>
            createFrom(ProductDetailsPageEvent, {
              navigation: navigationEvent,
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

  protected buildCategoryResultsPageEvent(): Observable<CategoryPageResultsEvent> {
    const searchResults$ = this.productSearchService.getResults().pipe(
      // skipping the initial value, and preventing emission of the previous search state
      skip(1)
    );

    return this.eventService.get(NavigationEvent).pipe(
      switchMap((navigationEvent) => {
        if (navigationEvent?.semanticRoute !== 'category') {
          return EMPTY;
        }

        return searchResults$.pipe(
          map((searchResults) =>
            createFrom(CategoryPageResultsEvent, {
              navigation: navigationEvent,
              ...{
                categoryCode: navigationEvent?.context?.id,
                numberOfResults: searchResults?.pagination?.totalResults ?? 0,
                categoryName: searchResults.breadcrumbs?.[0].facetValueName,
              },
            })
          )
        );
      })
    );
  }

  protected buildSearchPageResultsEvent(): Observable<SearchPageResultsEvent> {
    const searchResults$ = this.productSearchService.getResults().pipe(
      // skipping the initial value, and preventing emission of the previous search state
      skip(1)
    );

    return this.eventService.get(NavigationEvent).pipe(
      switchMap((navigationEvent) => {
        if (navigationEvent?.semanticRoute !== 'search') {
          return EMPTY;
        }

        return searchResults$.pipe(
          map((searchResults) =>
            createFrom(SearchPageResultsEvent, {
              navigation: navigationEvent,
              ...{
                searchTerm: searchResults?.freeTextSearch ?? '',
                numberOfResults: searchResults?.pagination?.totalResults ?? 0,
              },
            })
          )
        );
      })
    );
  }
}
