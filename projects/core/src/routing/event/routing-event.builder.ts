import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { RouterNavigatedAction, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { ProductSearchService } from '../../product/facade/product-search.service';
import { ProductService } from '../../product/facade/product.service';
import { createFrom } from '../../util/create-from';
import { SemanticPathService } from '../configurable-routes';
import { PageContext } from '../models/page-context.model';
import { ActivatedRouterStateSnapshot } from '../store/routing-state';
import {
  CartPageVisited,
  CategoryPageVisited,
  HomePageVisited,
  KeywordSearchPageVisited,
  OrderConfirmationPageVisited,
  PageVisited,
  ProductDetailsPageVisited,
} from './routing.events';

@Injectable({
  providedIn: 'root',
})
export class RoutingEventBuilder {
  constructor(
    protected actions: ActionsSubject,
    protected eventService: EventService,
    protected productService: ProductService,
    protected productSearchService: ProductSearchService,
    protected semanticPathService: SemanticPathService
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

  protected buildPageVisitedEvent(): Observable<PageVisited> {
    return this.getNavigatedEvent().pipe(
      map((state) => createFrom(PageVisited, state))
    );
  }

  protected buildHomePageVisitedEvent(): Observable<HomePageVisited> {
    return this.getCurrentPageContextFor('home').pipe(
      map((pageContext) => createFrom(HomePageVisited, pageContext))
    );
  }

  protected buildProductDetailsPageVisitedEvent(): Observable<
    ProductDetailsPageVisited
  > {
    return this.getCurrentPageContextFor('product').pipe(
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

  protected buildCartVisitedEvent(): Observable<CartPageVisited> {
    return this.getCurrentPageContextFor('cart').pipe(
      map((pageContext) => createFrom(CartPageVisited, pageContext))
    );
  }

  protected orderConfirmationPageVisitedEvent(): Observable<
    OrderConfirmationPageVisited
  > {
    return this.getCurrentPageContextFor('orderConfirmation').pipe(
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
      withLatestFrom(this.getCurrentPageContextFor('category')),
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
      withLatestFrom(this.getCurrentPageContextFor('search')),
      map(([productSearchPage, _pageContext]) => ({
        searchTerm: productSearchPage.freeTextSearch,
        numberOfResults: productSearchPage.pagination.totalResults,
      })),
      map((searchResults) =>
        createFrom(KeywordSearchPageVisited, searchResults)
      )
    );
  }

  private getNavigatedEvent(): Observable<ActivatedRouterStateSnapshot> {
    return this.actions.pipe(
      ofType<RouterNavigatedAction>(ROUTER_NAVIGATED),
      map(
        (event) =>
          (event.payload.routerState as unknown) as ActivatedRouterStateSnapshot
      )
    );
  }

  private getCurrentPageContextFor(
    semanticRoute: string
  ): Observable<PageContext> {
    return this.getNavigatedEvent().pipe(
      filter(
        (state) =>
          state.semanticRoute === semanticRoute ||
          state.context.id === this.semanticPathService.get(semanticRoute) ||
          // a special case, see https://github.com/SAP/spartacus/blob/9945c046fe11a9ef4940af82a7219f840bcbd73a/projects/core/src/routing/store/reducers/router.reducer.ts#L141
          (semanticRoute === 'home' && state.context.id === 'homepage')
      ),
      map((state) => state.context)
    );
  }
}
