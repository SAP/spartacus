/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BundleService } from '@spartacus/cart/bundle/core';
import {
  ActivatedRouterStateSnapshot,
  CurrencyService,
  LanguageService,
  ProductSearchPage,
  ProductSearchService,
  RoutingService,
} from '@spartacus/core';
import { SearchCriteria, ViewConfig } from '@spartacus/storefront';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  shareReplay,
  take,
  tap,
  using,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BundleProductListComponentService {
  constructor(
    protected config: ViewConfig,
    protected routing: RoutingService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected currencyService: CurrencyService,
    protected languageService: LanguageService,
    protected bundleService: BundleService,
    protected productSearchService: ProductSearchService
  ) {}

  readonly model$: Observable<ProductSearchPage> = using(
    () => this.searchByRouting$.subscribe(),
    () => this.searchResults$
  ).pipe(shareReplay({ bufferSize: 1, refCount: true }));

  protected searchResults$: Observable<ProductSearchPage> =
    this.productSearchService
      .getResults()
      .pipe(filter((searchResult) => Object.keys(searchResult).length > 0));

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
      map(([routerState, ..._context]) => routerState.state),
      tap((state: ActivatedRouterStateSnapshot) => {
        if (state.params['entryGroupNumber']) {
          const criteria = this.getCriteriaFromRoute(
            state.params,
            state.queryParams
          );
          this.searchIfCriteriaHasChanged(
            state.params['entryGroupNumber'],
            criteria
          );
        }
      })
    );

  /**
   * Search only if the previous search criteria does NOT match the new one.
   * This prevents repeating product search calls for queries that already have loaded data.
   */
  protected searchIfCriteriaHasChanged(
    entryGroupNumber: number,
    criteria: SearchCriteria
  ) {
    this.productSearchService
      .getResults()
      .pipe(take(1))
      .subscribe((results) => {
        const previous: SearchCriteria = {
          query: results?.currentQuery?.query?.value,
          currentPage: results?.pagination?.currentPage,
          pageSize: results?.pagination?.pageSize,
          sortCode: results?.pagination?.sort,
        };

        if (
          checkQueriesDiffer() ||
          checkCurrentPagesDiffer() ||
          checkPageSizesDiffer() ||
          checkSortCodesDiffer()
        ) {
          this.search(entryGroupNumber, criteria);
        }

        function checkQueriesDiffer(): boolean {
          const previousQuery = sanitizeQuery(
            previous.query,
            previous.sortCode
          );
          const currentQuery = sanitizeQuery(criteria.query, criteria.sortCode);
          return previousQuery !== currentQuery;

          // Remove sortCode portion from queries.
          function sanitizeQuery(
            query?: string,
            sortCode?: string
          ): string | undefined {
            const DEFAULT_SORT_CODE = 'relevance';

            query = query
              ?.replace(':' + DEFAULT_SORT_CODE, '')
              .replace(DEFAULT_SORT_CODE, '');

            if (sortCode) {
              query = query?.replace(':' + sortCode, '').replace(sortCode, '');
            }

            return query;
          }
        }

        function checkCurrentPagesDiffer() {
          // Can be stored as zero for previousCriteria but undefined as new criteria.
          // We need to set these to the zero-values to perform the equivalency check.
          const previousPage =
            previous.currentPage && previous.currentPage > 0
              ? previous.currentPage
              : undefined;
          return previousPage?.toString() !== criteria.currentPage?.toString();
        }

        function checkPageSizesDiffer() {
          return (
            previous.pageSize?.toString() !== criteria.pageSize?.toString()
          );
        }

        function checkSortCodesDiffer() {
          // Only check "sortCode" if it is defined in criteria as sortCode is often an undefined queryParam
          // but it will always get defined as a string in previousCriteria if a search was made.
          const previousCode = criteria.sortCode
            ? previous?.sortCode
            : undefined;
          return previousCode?.toString() !== criteria.sortCode?.toString();
        }
      });
  }

  /**
   * Performs a search based on the given search criteria.
   *
   * The search is delegated to the `ProductSearchService`.
   */
  protected search(entryGroupNumber: number, criteria: SearchCriteria): void {
    const currentPage = criteria.currentPage;
    const pageSize = criteria.pageSize;
    const sort = criteria.sortCode;

    this.bundleService.getAllowedProducts(entryGroupNumber, criteria.query, {
      pageSize,
      currentPage,
      sort,
    });
  }

  /**
   * Expose the `SearchCriteria`. The search criteria are driven by the route parameters.
   *
   * This search route configuration is not yet configurable
   * (see https://github.com/SAP/spartacus/issues/7191).
   */
  protected getCriteriaFromRoute(
    routeParams: any,
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
  protected getQueryFromRouteParams({ query }: any) {
    if (query) {
      return query;
    }
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
}
