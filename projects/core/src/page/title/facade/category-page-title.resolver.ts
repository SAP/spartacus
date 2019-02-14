import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutingService } from 'projects/core/src/routing';
import { map, filter } from 'rxjs/operators';
import { ProductSearchService } from 'projects/core/src/product';

import { Page } from '../../../cms/model/page.model';
import { PageType, PaginationModel } from '../../../occ/occ-models/occ.models';
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
