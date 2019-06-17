import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ProductSearchService,
  RoutingService,
  SearchConfig,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { SearchResults } from '../../../navigation';

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
  protected defaultPageSize = 10;

  protected sub: Subscription;

  protected readonly RELEVANCE_CATEGORY = ':relevance:category:';
  protected readonly RELEVANCE_BRAND = ':relevance:brand:';

  constructor(
    protected productSearchService: ProductSearchService,
    protected routing: RoutingService,
    protected router: Router
  ) {}

  onInit() {
    this.productSearchService.clearResults();

    this.sub = this.routing
      .getRouterState()
      .pipe(
        distinctUntilChanged((x, y) => {
          // router emits new value also when the anticipated `nextState` changes
          // but we want to perform search only when current url changes
          return x.state.url === y.state.url;
        })
      )
      .subscribe(({ state }) => {
        const criteria = this.getCriteriaFromRoute(
          state.params,
          state.queryParams
        );
        this.search(criteria);
      });
  }

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
      return this.RELEVANCE_CATEGORY + categoryCode;
    }
    if (brandCode) {
      return this.RELEVANCE_BRAND + brandCode;
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
    Object.keys(result).forEach(key => !result[key] && delete result[key]);

    return result;
  }

  setQuery(query: string) {
    this.setQueryParams({ query });
  }

  viewPage(pageNumber: number): void {
    this.setQueryParams({ currentPage: pageNumber });
  }

  sort(sortCode: string): void {
    this.setQueryParams({ sortCode });
  }

  getSearchResults(): Observable<SearchResults> {
    return this.productSearchService
      .getResults()
      .pipe(filter(searchResult => Object.keys(searchResult).length > 0));
  }

  protected setQueryParams(queryParams: SearchCriteria): void {
    this.router.navigateByUrl(
      this.router.createUrlTree([], {
        queryParams,
        queryParamsHandling: 'merge',
      })
    );
  }

  onDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
