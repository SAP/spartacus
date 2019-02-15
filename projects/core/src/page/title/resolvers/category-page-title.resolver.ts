import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { RoutingService } from '../../../routing';
import { ProductSearchService } from '../../../product';
import { Page } from '../../../cms';

import { PageType, PaginationModel } from '../../../occ';
import { PageTitleResolver } from './page-title.resolver';

@Injectable({
  providedIn: 'root'
})
export class CategoryPageTitleResolver extends PageTitleResolver {
  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService
  ) {
    super();
  }

  hasMatch(page: Page) {
    return page.type === PageType.CATEGORY_PAGE;
  }

  resolve(): Observable<string> {
    return this.productSearchService.getSearchResults().pipe(
      filter(data => !!(data.breadcrumbs && data.breadcrumbs.length > 0)),
      map(data => {
        return [data.pagination, data.breadcrumbs[0].facetValueName];
      }),
      map(
        ([pagination, category]: [PaginationModel, string]) =>
          `${pagination.totalResults} results for ${category}`
      )
    );
  }
}
