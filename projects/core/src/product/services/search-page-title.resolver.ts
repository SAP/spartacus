import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { RoutingService } from '../../routing';
import { PageType } from '../../occ';
import { ProductSearchService } from '../facade';
import { PageTitleResolver } from '../../cms/page/page-title.resolver';

@Injectable({
  providedIn: 'root'
})
export class SearchPageTitleResolver extends PageTitleResolver {
  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService
  ) {
    super(PageType.CONTENT_PAGE, 'SearchResultsListPageTemplate');
  }

  resolve(): Observable<string> {
    return combineLatest(
      this.productSearchService.getSearchResults().pipe(
        filter(data => !!(data && data.pagination)),
        map(results => results.pagination.totalResults)
      ),
      this.routingService.getRouterState().pipe(
        map(state => state.state.params['query']),
        filter(Boolean)
      )
    ).pipe(map(([t, q]: [number, string]) => this.getSearchResultTitle(t, q)));
  }

  protected getSearchResultTitle(total: number, part: string) {
    return `${total} results for "${part}"`;
  }
}
