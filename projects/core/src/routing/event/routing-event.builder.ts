import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { PageType, ProductSearchPage } from '../../model';
import { ProductSearchService } from '../../product/facade/product-search.service';
import { ProductService } from '../../product/facade/product.service';
import { createFrom } from '../../util';
import { RoutingService } from '../facade/routing.service';
import { PageContext } from '../models/page-context.model';
import {
  CategoryPageVisitedEvent,
  PageVisitedEvent,
  ProductDetailsPageVisitedEvent,
  SearchResultsChangeEvent,
} from './routing.events';

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
    this.eventService.register(PageVisitedEvent, this.buildPageViewEvent());
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

  buildPageViewEvent(): Observable<PageContext> {
    return this.routerEvents(PageType.PRODUCT_PAGE);
  }

  buildCategoryPageVisitEvent(): Observable<CategoryPageVisitedEvent> {
    return this.routerEvents(PageType.CATEGORY_PAGE).pipe(
      map((context) => ({
        categoryCode: context.id,
        categoryName: 'fix-me',
      }))
    );
  }

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

  private routerEvents(pageType: PageType): Observable<PageContext> {
    return this.routingService
      .getPageContext()
      .pipe(filter((context) => context.type === pageType));
  }
}
