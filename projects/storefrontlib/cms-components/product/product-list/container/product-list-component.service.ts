import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ActivatedRouterStateSnapshot,
  CurrencyService,
  LanguageService,
  ProductSearchPage,
  ProductSearchService,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { combineLatest, Observable, using } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  tap,
} from 'rxjs/operators';
import { ProductListRouteParams, SearchCriteria } from './product-list.model';
import { ViewConfig } from '../../../../shared/config/view-config';

/**
 * The `ProductListComponentService` is used to search products. The service is used
 * on the Product Listing Page, for listing products and the facet navigation.
 *
 * The service exposes the product search results based on the category and search
 * route parameters. The route parameters are used to query products by the help of
 * the `ProductSearchService`.
 */
@Injectable({ providedIn: 'root' })
export class ProductListComponentService {
  protected readonly RELEVANCE_ALLCATEGORIES = ':relevance:allCategories:';

  constructor(
    protected productSearchService: ProductSearchService,
    protected routing: RoutingService,
    protected activatedRoute: ActivatedRoute,
    protected currencyService: CurrencyService,
    protected languageService: LanguageService,
    protected router: Router,
    protected config: ViewConfig
  ) {}

  /**
   * Emits the search results for the current search query.
   *
   * The `searchResults$` is _not_ concerned with querying, it only observes the
   * `productSearchService.getResults()`
   */
  protected searchResults$: Observable<ProductSearchPage> =
    this.productSearchService
      .getResults()
      .pipe(filter((searchResult) => Object.keys(searchResult).length > 0));

  /**
   * Observes the route and performs a search on each route change.
   *
   * Context changes, such as language and currencies are also taken
   * into account, so that the search is performed again.
   */
  protected searchByRouting$: Observable<ActivatedRouterStateSnapshot> =
    combineLatest([
      this.routing.getRouterState().pipe(
        distinctUntilChanged((x, y) => {
          // router emits new value also when the anticipated `nextState` changes
          // but we want to perform search only when current url changes
          return x.state.url === y.state.url;
        })
      ),
      ...this.siteContext,
    ]).pipe(
      debounceTime(0),
      map(([routerState, ..._context]) => (routerState as RouterState).state),
      tap((state: ActivatedRouterStateSnapshot) => {
        const criteria = this.getCriteriaFromRoute(
          state.params,
          state.queryParams
        );
        this.search(criteria);
      })
    );

  /**
   * This stream is used for the Product Listing and Product Facets.
   *
   * It not only emits search results, but also performs a search on every change
   * of the route (i.e. route params or query params).
   *
   * When a user leaves the PLP route, the PLP component unsubscribes from this stream
   * so no longer the search is performed on route change.
   */
  readonly model$: Observable<ProductSearchPage> = using(
    () => this.searchByRouting$.subscribe(),
    () => this.searchResults$
  ).pipe(shareReplay({ bufferSize: 1, refCount: true }));

  /**
   * Expose the `SearchCriteria`. The search criteria are driven by the route parameters.
   *
   * This search route configuration is not yet configurable
   * (see https://github.com/SAP/spartacus/issues/7191).
   */
  protected getCriteriaFromRoute(
    routeParams: ProductListRouteParams,
    queryParams: SearchCriteria
  ): SearchCriteria {
    return {
      query: queryParams.query || this.getQueryFromRouteParams(routeParams),
      pageSize: queryParams.pageSize || this.config.view?.defaultPageSize,
      currentPage: queryParams.currentPage,
      sortCode: queryParams.sortCode,
    };
  }

  /**
   * Resolves the search query from the given `ProductListRouteParams`.
   */
  protected getQueryFromRouteParams({
    query,
    categoryCode,
    brandCode,
  }: ProductListRouteParams) {
    if (query) {
      return query;
    }
    if (categoryCode) {
      return this.RELEVANCE_ALLCATEGORIES + categoryCode;
    }

    // TODO: drop support for brands as they should be treated
    // similarly as any category.
    if (brandCode) {
      return this.RELEVANCE_ALLCATEGORIES + brandCode;
    }
  }

  /**
   * Performs a search based on the given search criteria.
   *
   * The search is delegated to the `ProductSearchService`.
   */
  protected search(criteria: SearchCriteria): void {
    const currentPage = criteria.currentPage;
    const pageSize = criteria.pageSize;
    const sort = criteria.sortCode;

    this.productSearchService.search(
      criteria.query,
      // TODO: consider dropping this complex passing of cleaned object
      Object.assign(
        {},
        currentPage && { currentPage },
        pageSize && { pageSize },
        sort && { sort }
      )
    );
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

  /**
   * Sort the search results by the given sort code.
   */
  sort(sortCode: string): void {
    this.route({ sortCode });
  }

  /**
   * Routes to the next product listing page, using the given `queryParams`. The
   * `queryParams` support sorting, pagination and querying.
   *
   * The `queryParams` are delegated to the Angular router `NavigationExtras`.
   */
  protected route(queryParams: SearchCriteria): void {
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge',
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * The site context is used to update the search query in case of a
   * changing context. The context will typically influence the search data.
   *
   * We keep this private for now, as we're likely refactoring this in the next
   * major version.
   */
  private get siteContext(): Observable<string>[] {
    // TODO: we should refactor this so that custom context will be taken
    // into account automatically. Ideally, we drop the specific context
    // from the constructor, and query a ContextService for all contexts.

    return [this.languageService.getActive(), this.currencyService.getActive()];
  }
}
