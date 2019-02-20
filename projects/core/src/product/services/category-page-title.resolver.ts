import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { RoutingService } from '../../routing/facade/routing.service';
import { CmsService } from '../../cms/facade/cms.service';
import { Page } from '../../cms/model/page.model';

import { PageType } from '../../occ/occ-models/occ.models';
import { PageTitleResolver } from '../../cms/page/page-title.resolver';
import { ProductSearchService } from '../facade/product-search.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryPageTitleResolver extends PageTitleResolver {
  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService,
    protected cms: CmsService
  ) {
    super();
    this.pageType = PageType.CATEGORY_PAGE;
  }

  resolve(): Observable<string> {
    return this.cms.getCurrentPage().pipe(
      filter(Boolean),
      switchMap(page => {
        // only the existence of a plp component tells us if products
        // are rendered or if this is an ordinary content page
        if (this.hasProductListComponent(page)) {
          return this.productSearchService.getSearchResults().pipe(
            map(data => {
              if (data.breadcrumbs && data.breadcrumbs.length > 0) {
                return `${data.pagination.totalResults} results for ${
                  data.breadcrumbs[0].facetValueName
                }`;
              }
            })
          );
        } else {
          return of(page.title || page.name);
        }
      })
    );
  }

  protected hasProductListComponent(page: Page): boolean {
    // ProductListComponent
    return !!Object.keys(page.slots).find(
      key =>
        !!page.slots[key].components.find(
          comp => comp.typeCode === 'CMSProductListComponent'
        )
    );
  }
}
