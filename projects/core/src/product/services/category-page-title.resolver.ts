import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RoutingService } from '../../routing';
import { Page, CmsService } from '../../cms';

import { PageType } from '../../occ';
import { PageTitleResolver } from '../../cms/page/page-title.resolver';
import { ProductSearchService } from '../facade';

@Injectable({
  providedIn: 'root'
})
export class CategoryPageTitleResolver extends PageTitleResolver {
  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService,
    protected cms: CmsService
  ) {
    super(PageType.CATEGORY_PAGE);
  }

  resolve(): Observable<string> {
    return this.cms.getCurrentPage().pipe(
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
          comp => comp.uid === 'ProductListComponent'
        )
    );
  }
}
