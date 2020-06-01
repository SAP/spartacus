import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ActivatedRouterStateSnapshot,
  CurrencyService,
  LanguageService,
  ProductSearchPage,
  ProductSearchService,
  RoutingService,
  SearchConfig,
} from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  pluck,
  shareReplay,
  tap,
} from 'rxjs/operators';

interface ProductListRouteParams {
  brandCode?: string;
  categoryCode?: string;
  query?: string;
}

interface SearchCriteria {
  currentPage?: number;
  pageSize?: number;
  sortCode?: string;
  query?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductListComponentService {
  // TODO: make it configurable
  protected defaultPageSize = 10;

  protected sub: Subscription;

  protected readonly RELEVANCE_ALLCATEGORIES = ':relevance:allCategories:';

  constructor(
    protected productSearchService: ProductSearchService,
    protected routing: RoutingService,
    protected activatedRoute: ActivatedRoute,
    protected currencyService: CurrencyService,
    protected languageService: LanguageService,
    protected router: Router
  ) {}

  private searchResults$: Observable<
    ProductSearchPage
  > = this.productSearchService
    .getResults()
    .pipe(filter((searchResult) => Object.keys(searchResult).length > 0));

  private searchByRouting$: Observable<
    ActivatedRouterStateSnapshot
  > = combineLatest([
    this.routing.getRouterState().pipe(
      distinctUntilChanged((x, y) => {
        // router emits new value also when the anticipated `nextState` changes
        // but we want to perform search only when current url changes
        return x.state.url === y.state.url;
      })
    ),
    // also trigger search on site context changes
    this.languageService.getActive(),
    this.currencyService.getActive(),
  ]).pipe(
    pluck(0, 'state'),
    tap((state: ActivatedRouterStateSnapshot) => {
      const criteria = this.getCriteriaFromRoute(
        state.params,
        state.queryParams
      );
      this.search(criteria);
    })
  );

  /**
   * This stream should be used only on the Product Listing Page.
   *
   * It not only emits search results, but also performs a search on every change
   * of the route (i.e. route params or query params).
   *
   * When a user leaves the PLP route, the PLP component unsubscribes from this stream
   * so no longer the search is performed on route change.
   */
  readonly model$: Observable<ProductSearchPage> = combineLatest([
    this.searchResults$,
    this.searchByRouting$,
  ]).pipe(pluck(0), shareReplay({ bufferSize: 1, refCount: true }));

  private getCriteriaFromRoute(
    routeParams: ProductListRouteParams,
    queryParams: SearchCriteria
  ): SearchCriteria {
    return {
      query: queryParams.query || this.getQueryFromRouteParams(routeParams),
      pageSize: queryParams.pageSize || this.defaultPageSize,
      currentPage: queryParams.currentPage,
      sortCode: queryParams.sortCode,
    };
  }

  private getQueryFromRouteParams({
    brandCode,
    categoryCode,
    query,
  }: ProductListRouteParams) {
    if (query) {
      return query;
    }
    if (categoryCode) {
      return this.RELEVANCE_ALLCATEGORIES + categoryCode;
    }
    if (brandCode) {
      return this.RELEVANCE_ALLCATEGORIES + brandCode;
    }
  }

  private search(criteria: SearchCriteria): void {
    const query = criteria.query;
    const searchConfig = this.getSearchConfig(criteria);

    this.productSearchService.search(query, searchConfig);
  }

  private getSearchConfig(criteria: SearchCriteria): SearchConfig {
    const result: SearchConfig = {
      currentPage: criteria.currentPage,
      pageSize: criteria.pageSize,
      sortCode: criteria.sortCode,
    };

    // drop empty keys
    Object.keys(result).forEach((key) => !result[key] && delete result[key]);

    return result;
  }

  setQuery(query: string): void {
    this.setQueryParams({ query, currentPage: undefined });
  }

  viewPage(pageNumber: number): void {
    this.setQueryParams({ currentPage: pageNumber });
  }

  /**
   * Get items from a given page without using navigation
   */
  getPageItems(pageNumber: number): void {
    this.routing
      .getRouterState()
      .subscribe((route) => {
        const routeCriteria = this.getCriteriaFromRoute(
          route.state.params,
          route.state.queryParams
        );
        const criteria = {
          ...routeCriteria,
          currentPage: pageNumber,
        };
        this.search(criteria);
      })
      .unsubscribe();
  }

  sort(sortCode: string): void {
    this.setQueryParams({ sortCode });
  }

  private setQueryParams(queryParams: SearchCriteria): void {
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge',
      relativeTo: this.activatedRoute,
    });
  }
}
