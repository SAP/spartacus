import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CmsService } from '../../cms/facade/cms.service';
import { Page, PageMeta } from '../../cms/model/page.model';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import { PageTitleResolver } from '../../cms/page/page.resolvers';
import { RoutingService } from '../../routing/facade/routing.service';
import { ProductSearchService } from '../facade/product-search.service';
import { ProductSearchPage } from '../../model/product-search.model';
import { PageType } from '../../model/cms.model';

@Injectable({
  providedIn: 'root',
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
            filter(data => data.breadcrumbs && data.breadcrumbs.length > 0),
            switchMap(data =>
              combineLatest([
                this.resolveTitle(data),
                this.resolveBreadcrumbs(data),
              ])
            ),
            map(([title, breadcrumbs]) => ({ title, breadcrumbs }))
          );
        } else {
          return of({
            title: page.title || page.name,
          });
        }
      })
    );
  }

  resolveTitle(data: ProductSearchPage): Observable<string> {
    return of(
      `${data.pagination.totalResults} results for ${
        data.breadcrumbs[0].facetValueName
      }`
    );
  }

  resolveBreadcrumbs(data: ProductSearchPage): Observable<any[]> {
    const breadcrumbs = [];
    breadcrumbs.push({ label: 'Home', link: '/' });
    for (const br of data.breadcrumbs) {
      breadcrumbs.push({
        label: br.facetValueName,
        link: '/c/' + br.facetValueCode,
      });
    }
    return of(breadcrumbs);
  }

  private hasProductListComponent(page: Page): boolean {
    // ProductListComponent
    return !!Object.keys(page.slots).find(
      key =>
        !!page.slots[key].components.find(
          comp => comp.typeCode === 'CMSProductListComponent'
        )
    );
  }
}
