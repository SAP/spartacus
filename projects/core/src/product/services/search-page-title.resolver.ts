import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { RoutingService } from '../../routing/facade/routing.service';
import { PageType } from '../../occ/occ-models/occ.models';
import { ProductSearchService } from '../facade/product-search.service';
import { PageTitleResolver } from '../../cms/page/page-title.resolver';

@Injectable({
  providedIn: 'root'
})
export class SearchPageTitleResolver extends PageTitleResolver {
  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'SearchResultsListPageTemplate';
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
