import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { RoutingService } from 'projects/core/src/routing';
import { map, filter } from 'rxjs/operators';
import { ProductSearchService } from 'projects/core/src/product';

import { Page } from '../../../cms/model/page.model';
import { PageType } from '../../../occ/occ-models/occ.models';
import { PageTitleResolver } from './page-title.resolver';

@Injectable({
  providedIn: 'root'
})
export class SearchPageTitleResolver extends PageTitleResolver {
  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService
  ) {
    super();
  }

  hasMatch(page: Page) {
    return (
      page.type === PageType.CONTENT_PAGE &&
      page.template === 'SearchResultsListPageTemplate'
    );
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
