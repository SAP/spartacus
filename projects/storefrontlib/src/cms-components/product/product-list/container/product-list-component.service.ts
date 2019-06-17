import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ProductSearchService,
  RoutingService,
  SearchConfig,
} from '@spartacus/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { SearchResults } from '../../../navigation';

interface ProductListRouteParams {
  brandCode?: string;
  categoryCode?: string;
  query?: string;
}

interface ProductListQueryParams {
  currentPage?: number;
  pageSize?: number;
  sortCode?: string;
  query?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductListComponentService {
  protected defaultPageSize = 10;

  private sub: Subscription;

  private readonly RELEVANCE_CATEGORY = ':relevance:category:';
  private readonly RELEVANCE_BRAND = ':relevance:brand:';

  private currentPage$ = new BehaviorSubject<number>(undefined);
  private pageSize$ = new BehaviorSubject<number>(this.defaultPageSize);
  private sortCode$ = new BehaviorSubject<string>(undefined);
  private query$ = new BehaviorSubject<string>(undefined);

  constructor(
    protected productSearchService: ProductSearchService,
    protected routing: RoutingService,
    protected router: Router
  ) {}

  getSearchResults(): Observable<SearchResults> {
    return this.productSearchService.getResults().pipe(
      tap(searchResult => {
        if (Object.keys(searchResult).length === 0) {
          this.search();
        }
      }),
      filter(searchResult => Object.keys(searchResult).length > 0)
    );
  }

  private getSearchConfig() {
    const result: SearchConfig = {
      currentPage: this.currentPage$.value,
      pageSize: this.pageSize$.value,
      sortCode: this.sortCode$.value,
    };

    // drop empty keys
    Object.keys(result).forEach(key => !result[key] && delete result[key]);

    return result;
  }

  setQuery(query: string) {
    debugger;
    this.mergeQueryParams({ query });
  }

  viewPage(pageNumber: number): void {
    debugger;
    this.mergeQueryParams({ currentPage: pageNumber });
  }

  sort(sortCode: string): void {
    this.mergeQueryParams({ sortCode });
  }

  private mergeQueryParams(queryParams: ProductListQueryParams) {
    this.router.navigateByUrl(
      this.router.createUrlTree([], {
        queryParams,
        queryParamsHandling: 'merge',
      })
    );
  }

  private search(): void {
    const query = this.query$.value;
    const searchConfig = this.getSearchConfig();
    debugger;

    this.productSearchService.search(query, searchConfig);
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
      return this.RELEVANCE_CATEGORY + categoryCode;
    }
    if (brandCode) {
      return this.RELEVANCE_BRAND + brandCode;
    }
  }

  private getStateFromRouting(
    routeParams: ProductListRouteParams,
    queryParams: ProductListQueryParams
  ) {
    this.query$.next(
      queryParams.query || this.getQueryFromRouteParams(routeParams)
    );
    this.pageSize$.next(queryParams.pageSize || this.defaultPageSize);
    this.currentPage$.next(queryParams.currentPage);
    this.sortCode$.next(queryParams.sortCode);
  }

  private resetState() {
    this.query$.next(undefined);
    this.pageSize$.next(this.defaultPageSize);
    this.currentPage$.next(undefined);
    this.sortCode$.next(undefined);
  }

  // should register on PLP component mounted and unregister on component destroy
  onInit() {
    this.productSearchService.clearResults();

    // // spike todo: avoid changes on routing nextState (maybe use activatedRoute?)
    this.sub = this.routing
      .getRouterState()
      .pipe(distinctUntilChanged((x, y) => x.state.url === y.state.url))
      .subscribe(({ state }) => {
        this.getStateFromRouting(state.params, state.queryParams);

        debugger;

        this.search();
      });
  }

  onDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.resetState();
  }
}
