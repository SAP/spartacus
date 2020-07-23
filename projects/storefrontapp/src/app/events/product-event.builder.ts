import { Injectable } from '@angular/core';
import {
  createFrom,
  EventService,
  ProductSearchService,
  ProductService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
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

  // TODO:#events - fires twice when switching between categories
  // TODO:#events - applying facets change emit twice
  //FIXME: see https://github.com/SAP/spartacus/issues/7991
  protected buildCategoryPageVisitedEvent(): Observable<CategoryPageVisited> {
    const pageVisitedEvent$ = this.eventService
      .get(PageVisited)
      .pipe(
        filter(
          (pageVisitedEvent) => pageVisitedEvent.semanticRoute === 'category'
        )
      );

    const search$ = this.productSearchService.getResults().pipe(
      filter((searchResults) => Boolean(searchResults.breadcrumbs)),
      map((searchResults) => searchResults.breadcrumbs[0]),
      tap((x) => console.log(`before distinct: '${x.facetValueCode}'`)),
      distinctUntilKeyChanged('facetValueCode'),
      tap((x) => console.log(`after distinct: '${x.facetValueCode}'`))
    );

    return pageVisitedEvent$.pipe(
      switchMap((pageVisitedEvent) =>
        search$.pipe(
          map((breadCrumb) => ({
            categoryCode: pageVisitedEvent.context.id,
            categoryName: breadCrumb.facetValueName,
          })),
          map((categoryPage) => createFrom(CategoryPageVisited, categoryPage))
        )
      )
    );
  }

  // TODO:#events - fires twice when switching between brands
  // TODO:#events - applying facets change emit twice
  //FIXME: see https://github.com/SAP/spartacus/issues/7991
  protected buildBrandPageVisitedEvent(): Observable<BrandPageVisited> {
    const pageVisitedEvent$ = this.eventService
      .get(PageVisited)
      .pipe(
        filter((pageVisitedEvent) => pageVisitedEvent.semanticRoute === 'brand')
      );

    const search$ = this.productSearchService.getResults().pipe(
      filter((searchResults) => Boolean(searchResults.breadcrumbs)),
      map((searchResults) => searchResults.breadcrumbs[0]),
      tap((x) => console.log(`before distinct: '${x.facetValueCode}'`)),
      distinctUntilKeyChanged('facetValueCode'),
      tap((x) => console.log(`after distinct: '${x.facetValueCode}'`))
    );

    return pageVisitedEvent$.pipe(
      switchMap((pageVisitedEvent) =>
        search$.pipe(
          map((breadCrumb) => ({
            brandCode: pageVisitedEvent.context.id,
            brandName: breadCrumb.facetValueName,
          })),
          map((brandPage) => createFrom(BrandPageVisited, brandPage))
        )
      )
    );
  }

  protected searchResultPageVisited(): Observable<SearchPageVisited> {
    const pageVisitedEvent$ = this.eventService
      .get(PageVisited)
      .pipe(
        filter(
          (pageVisitedEvent) => pageVisitedEvent.semanticRoute === 'search'
        )
      );

    const search$ = this.productSearchService
      .getResults()
      .pipe(filter((searchResults) => Boolean(searchResults.breadcrumbs)));

    return combineLatest([pageVisitedEvent$, search$]).pipe(
      switchMap(() => search$),
      distinctUntilChanged(
        (prev, curr) => prev.currentQuery.url === curr.currentQuery.url
      ),
      map((searchResults) => ({
        searchTerm: searchResults.freeTextSearch,
        numberOfResults: searchResults.pagination.totalResults,
      })),
      map((searchPage) => createFrom(SearchPageVisited, searchPage))
    );
  }
}
