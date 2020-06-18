import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { ProductSearchService } from '../../product/facade/product-search.service';
import { ProductService } from '../../product/facade/product.service';
import { createFrom } from '../../util/create-from';
import { SemanticPathService } from '../configurable-routes';
import { RoutingService } from '../facade/routing.service';
import { PageContext } from '../models/page-context.model';
import { RouterState } from '../store/routing-state';
import {
  CartPageVisited,
  CategoryPageVisited,
  HomePageVisited,
  KeywordSearchPageVisited,
  OrderConfirmationPageVisited,
  PageVisited,
  ProductDetailsPageVisited,
} from './routing.events';

enum CmsRoute {
  HOME_PAGE = 'homepage',
  SEARCH = 'search',
  CART_PAGE = '/cart',
  ORDER_CONFIRMATION = '/checkout/review-order',
}
enum RouteConfigKey {
  HOME_PAGE = 'home',
  CART_PAGE = 'cart',
  SEARCH = 'search',
  ORDER_CONFIRMATION = 'orderConfirmation',
  CATEGORY_PAGE = 'category',
  PRODUCT_DETAILS = 'product',
}

@Injectable({
  providedIn: 'root',
})
export class RoutingEventBuilder {
  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService,
    protected eventService: EventService,
    protected productService: ProductService,
    protected store: Store<RouterState>,
    protected semanticPathService: SemanticPathService,
    protected router: Router
  ) {
    this.register();
  }

  protected register(): void {
    this.eventService.register(
      KeywordSearchPageVisited,
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
      HomePageVisited,
      this.buildHomePageVisitedEvent()
    );
    this.eventService.register(CartPageVisited, this.buildCartVisitedEvent());
    this.eventService.register(PageVisited, this.buildPageVisitedEvent());
    this.eventService.register(
      OrderConfirmationPageVisited,
      this.orderConfirmationPageVisitedEvent()
    );
  }

  protected buildProductDetailsPageVisitedEvent(): Observable<
    ProductDetailsPageVisited
  > {
    return this.getCurrentPageContextFor(RouteConfigKey.PRODUCT_DETAILS).pipe(
      tap((x) => {
        console.log('pdp from the builder: ', x);
      }),
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

  protected buildHomePageVisitedEvent(): Observable<HomePageVisited> {
    return this.getCurrentPageContextFor(
      RouteConfigKey.HOME_PAGE,
      CmsRoute.HOME_PAGE
    ).pipe(map((pageContext) => createFrom(HomePageVisited, pageContext)));
  }

  protected buildPageVisitedEvent(): Observable<PageVisited> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => createFrom(PageVisited, event))
    );
  }

  protected buildCartVisitedEvent(): Observable<CartPageVisited> {
    return this.getCurrentPageContextFor(RouteConfigKey.CART_PAGE).pipe(
      map((pageContext) => createFrom(CartPageVisited, pageContext))
    );
  }

  protected orderConfirmationPageVisitedEvent(): Observable<
    OrderConfirmationPageVisited
  > {
    return this.getCurrentPageContextFor(
      RouteConfigKey.ORDER_CONFIRMATION,
      CmsRoute.ORDER_CONFIRMATION
    ).pipe(
      map((pageContext) =>
        createFrom(OrderConfirmationPageVisited, pageContext)
      )
    );
  }

  //FIXME: see https://github.com/SAP/spartacus/issues/7991
  protected buildCategoryPageVisitedEvent(): Observable<CategoryPageVisited> {
    return this.productSearchService.getResults().pipe(
      filter((searchResults) => {
        return (
          searchResults.breadcrumbs && searchResults.breadcrumbs.length > 0
        );
      }),
      withLatestFrom(
        this.getCurrentPageContextFor(RouteConfigKey.CATEGORY_PAGE)
      ),
      tap(([pageContext, _searchResults]) => {
        console.log(_searchResults);
        console.log(pageContext);
      }),
      filter(
        ([searchResults, _pageContext]) =>
          searchResults.breadcrumbs && searchResults.breadcrumbs.length > 0
      ),
      map(([searchResults, pageContext]) => ({
        categoryCode: pageContext.id,
        categoryName: searchResults.breadcrumbs[0].facetValueName,
      })),
      map((categoryPage) => createFrom(CategoryPageVisited, categoryPage))
    );
  }

  protected searchResultPageVisited(): Observable<KeywordSearchPageVisited> {
    return this.productSearchService.getResults().pipe(
      filter((searchResults) => Boolean(searchResults.breadcrumbs)),
      withLatestFrom(
        this.getCurrentPageContextFor(RouteConfigKey.SEARCH, CmsRoute.SEARCH)
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

  private getCurrentPageContextFor(
    routeName: string,
    cmsRouteValue?: string
  ): Observable<PageContext> {
    return this.routingService.isCurrentRoute(routeName, cmsRouteValue).pipe(
      filter((isRoute) => isRoute),
      withLatestFrom(this.routingService.getPageContext()),
      map(([_, pageContext]) => pageContext)
    );
  }
}
