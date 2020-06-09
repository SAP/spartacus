import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { PageType } from '../../model';
import { ProductSearchService } from '../../product/facade/product-search.service';
import { ProductService } from '../../product/facade/product.service';
import { createFrom } from '../../util';
import { RoutingService } from '../facade/routing.service';
import { PageContext } from '../models/page-context.model';
import {
  CartPageVisited,
  CategoryPageVisited,
  HomePageVisited,
  KeywordSearchPageVisited,
  OrderConfirmationPageVisited,
  PageVisited,
  ProductDetailsPageVisited,
} from './routing.events';

enum PageId {
  HOME_PAGE = 'homepage',
  SEARCH = 'search',
  CART_PAGE = '/cart',
  ORDER_CONFIRMATION = '/checkout/review-order',
}

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
      KeywordSearchPageVisited,
      this.searchResultChangeEvent()
    );
    this.eventService.register(
      ProductDetailsPageVisited,
      this.buildProductDetailsPageVisitEvent()
    );
    this.eventService.register(
      CategoryPageVisited,
      this.buildCategoryPageVisitEvent()
    );
    this.eventService.register(
      HomePageVisited,
      this.buildHomePageVisitedEvent()
    );
    this.eventService.register(CartPageVisited, this.buildCartVisitedEvent());
    this.eventService.register(PageVisited, this.buildPageViewEvent());
    this.eventService.register(
      OrderConfirmationPageVisited,
      this.orderConfirmationVisitedEvent()
    );
  }

  buildProductDetailsPageVisitEvent(): Observable<ProductDetailsPageVisited> {
    return this.routerEvents(PageType.PRODUCT_PAGE).pipe(
      map((context) => context.id),
      switchMap((productId) => {
        return this.productService.get(productId).pipe(
          filter(Boolean),
          map((product) => {
            return createFrom(ProductDetailsPageVisited, product);
          })
        );
      })
    );
  }

  buildHomePageVisitedEvent(): Observable<HomePageVisited> {
    return this.routerEvents(PageType.CONTENT_PAGE).pipe(
      filter((pageContext) => pageContext.id === PageId.HOME_PAGE)
    );
  }

  buildPageViewEvent(): Observable<PageContext> {
    return merge(
      this.routerEvents(PageType.CATALOG_PAGE),
      this.routerEvents(PageType.CATEGORY_PAGE),
      this.routerEvents(PageType.CONTENT_PAGE),
      this.routerEvents(PageType.PRODUCT_PAGE)
    );
  }

  buildCartVisitedEvent(): Observable<CartPageVisited> {
    return this.routerEvents(PageType.CONTENT_PAGE).pipe(
      filter((pageContext) => pageContext.id === PageId.CART_PAGE)
    );
  }

  orderConfirmationVisitedEvent(): Observable<OrderConfirmationPageVisited> {
    return this.routerEvents(PageType.CONTENT_PAGE).pipe(
      filter((pageContext) => pageContext.id === PageId.ORDER_CONFIRMATION)
    );
  }

  buildCategoryPageVisitEvent(): Observable<CategoryPageVisited> {
    return this.productSearchService.getResults().pipe(
      withLatestFrom(this.routingService.getPageContext()),
      filter(
        ([_searchResults, pageContext]) =>
          pageContext.type === PageType.CATEGORY_PAGE &&
          !this.isSearchPage(pageContext)
      ),
      map(([searchResults, pageContext]) => ({
        categoryCode: pageContext.id,
        categoryName: searchResults.breadcrumbs[0].facetValueName,
      }))
    );
  }
  private isSearchPage(pageContext: PageContext): boolean {
    return pageContext.id === PageId.SEARCH;
  }

  private searchResultChangeEvent(): Observable<KeywordSearchPageVisited> {
    return this.productSearchService.getResults().pipe(
      filter((searchResults) => Boolean(searchResults.breadcrumbs)),
      withLatestFrom(this.routingService.getPageContext()),
      filter(([_productSearchPage, pageContext]) =>
        this.isSearchPage(pageContext)
      ),
      map(([productSearchPage, _pageContext]) => ({
        searchTerm: productSearchPage.freeTextSearch,
        numberOfResults: productSearchPage.pagination.totalResults,
      })),
      map((searchResults) =>
        createFrom(KeywordSearchPageVisited, searchResults)
      )
    );
  }

  private routerEvents(pageType: PageType): Observable<PageContext> {
    return this.routingService
      .getPageContext()
      .pipe(filter((context) => context.type === pageType));
  }
}
