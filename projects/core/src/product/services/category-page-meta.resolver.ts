import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { RoutingService } from '../../routing/facade/routing.service';
import { CmsService } from '../../cms/facade/cms.service';
import { Page, PageMeta } from '../../cms/model/page.model';

import { PageType, ProductSearchPage } from '../../occ/occ-models/occ.models';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import { ProductSearchService } from '../facade/product-search.service';
import { PageTitleResolver } from '../../cms/page/page.resolvers';

@Injectable({
  providedIn: 'root'
})
export class CategoryPageMetaResolver extends PageMetaResolver
  implements PageTitleResolver {
  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService,
    protected cms: CmsService
  ) {
    super();
    this.pageType = PageType.CATEGORY_PAGE;
  }

  resolve(): Observable<PageMeta> {
    return this.cms.getCurrentPage().pipe(
      filter(Boolean),
      switchMap(page => {
        // only the existence of a plp component tells us if products
        // are rendered or if this is an ordinary content page
        if (this.hasProductListComponent(page)) {
          return this.productSearchService.getSearchResults().pipe(
            map(data => {
              if (data.breadcrumbs && data.breadcrumbs.length > 0) {
                return {
                  title: this.resolveTitle(data)
                };
              }
            })
          );
        } else {
          return of({
            title: page.title || page.name
          });
        }
      })
    );
  }

  resolveTitle(data: ProductSearchPage) {
    return `${data.pagination.totalResults} results for ${
      data.breadcrumbs[0].facetValueName
    }`;
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
