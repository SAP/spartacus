import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { PageType } from '../../model';
import { ProductSearchService } from '../../product/facade/product-search.service';
import { ProductService } from '../../product/facade/product.service';
import { createFrom } from '../../util';
import { RoutingService } from '../facade/routing.service';
import { PageContext } from '../models/page-context.model';
import {
  CategoryPageVisitedEvent,
  HomePageVisitedEvent,
  KeywordSearchEvent,
  PageVisitedEvent,
  ProductDetailsPageVisitedEvent,
} from './routing.events';

enum PageId {
  HOME_PAGE = 'homepage',
  SERCH = 'search',
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
      KeywordSearchEvent,
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
    this.eventService.register(
      HomePageVisitedEvent,
      this.buildHomePageVisitedEvent()
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

  buildHomePageVisitedEvent(): Observable<HomePageVisitedEvent> {
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
    ).pipe(
      tap((pageContext) => {
        console.log(pageContext);
      })
    );
  }

  buildCategoryPageVisitEvent(): Observable<CategoryPageVisitedEvent> {
    return this.productSearchService.getResults().pipe(
      withLatestFrom(this.routingService.getPageContext()),
      filter(
        ([_searchResults, pageContext]) =>
          pageContext.type === PageType.CATEGORY_PAGE &&
          !this.isSearchPage(pageContext)
      ),
      tap(([_searchResults, _pageContext]) => {
        console.log(_pageContext);
        console.log(_searchResults);
      }),
      map(([searchResults, pageContext]) => ({
        categoryCode: pageContext.id,
        categoryName: searchResults.breadcrumbs[0].facetValueName,
      }))
    );
  }
  private isSearchPage(pageContext: PageContext): boolean {
    return pageContext.id === PageId.SERCH;
  }

  private searchResultChangeEvent(): Observable<KeywordSearchEvent> {
    return this.productSearchService.getResults().pipe(
      filter((searchResults) => Boolean(searchResults.breadcrumbs)),
      withLatestFrom(this.routingService.getPageContext()),
      filter(([_productSearchPage, pageContext]) =>
        this.isSearchPage(pageContext)
      ),
      tap(([productSearchPage, _pageContext]) => {
        console.log(productSearchPage);
      }),
      map(([productSearchPage, _pageContext]) => ({
        searchTerm: productSearchPage.freeTextSearch,
        numberOfResults: productSearchPage.pagination.totalResults,
      })),
      map((searchResults) => createFrom(KeywordSearchEvent, searchResults))
    );
  }

  private routerEvents(pageType: PageType): Observable<PageContext> {
    return this.routingService
      .getPageContext()
      .pipe(filter((context) => context.type === pageType));
  }
}
