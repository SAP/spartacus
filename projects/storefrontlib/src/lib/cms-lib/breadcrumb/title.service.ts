import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  CmsService,
  PageType,
  Page,
  ProductService,
  ProductSearchService,
  RoutingService,
  ProductSearchPage
} from '@spartacus/core';
import { switchMap, filter, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  constructor(
    protected cms: CmsService,
    protected routingService: RoutingService,
    protected productService: ProductService,
    protected productSearchService: ProductSearchService
  ) {}

  get title$(): Observable<string> {
    // content page: take what we have
    // search page: "171 results for eos"
    // prod list / category page: show: "4 results for Webcams"
    // pdp: product title
    return this.page$.pipe(
      switchMap((page: Page) => {
        switch (page.type) {
          case PageType.PRODUCT_PAGE:
            return this.findProductTitle();
          case PageType.CATEGORY_PAGE:
            return this.findCategoryTitle();
          default:
            return of(page.title);
        }
      })
    );
  }

  protected get page$() {
    return this.cms.getCurrentPage().pipe(filter(Boolean));
  }

  protected findProductTitle(): Observable<string> {
    return this.routingService.getRouterState().pipe(
      map(state => state.state.params['productCode']),
      switchMap(code =>
        this.productService.get(code).pipe(
          filter(Boolean),
          map(p => p.name)
        )
      )
    );
  }

  protected findCategoryTitle(): Observable<string> {
    return this.productSearchService
      .getSearchResults()
      .pipe(map((r: ProductSearchPage) => this.getCategoryTitle(r)));
  }

  protected getCategoryTitle(data: ProductSearchPage): string {
    let title = '';
    if (data.breadcrumbs && data.breadcrumbs.length > 0) {
      title = data.breadcrumbs[0].facetValueName;
    }
    // else if (!this.query.includes(':relevance:')) {
    //   title = this.query;
    // }
    if (title) {
      title = data.pagination.totalResults + ' results for ' + title;
    }

    return title;
  }
}
