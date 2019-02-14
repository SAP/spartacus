import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import {
  CmsService,
  PageType,
  Page,
  ProductService,
  ProductSearchService,
  RoutingService
} from '@spartacus/core';
import { switchMap, filter, map } from 'rxjs/operators';

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
    return this.page$.pipe(
      switchMap((page: Page) => {
        switch (page.type) {
          case PageType.PRODUCT_PAGE:
            return this.productTitle$;
          case PageType.CATEGORY_PAGE:
            return this.categoryTitle$;
          case PageType.CONTENT_PAGE:
            if (page.template === 'SearchResultsListPageTemplate') {
              return this.searchResultTitle$;
            } else {
              return of(page.title);
            }
        }
      })
    );
  }

  protected get page$() {
    return this.cms.getCurrentPage().pipe(filter(Boolean));
  }

  protected get productTitle$(): Observable<string> {
    return this.routingService.getRouterState().pipe(
      map(state => state.state.params['productCode']),
      filter(Boolean),
      switchMap(code =>
        this.productService.get(code).pipe(
          filter(Boolean),
          map(p => p.name)
        )
      )
    );
  }

  protected get categoryTitle$(): Observable<string> {
    return this.productSearchService.getSearchResults().pipe(
      filter(data => !!(data.breadcrumbs && data.breadcrumbs.length > 0)),
      map(data => {
        return [data.pagination.totalPages, data.breadcrumbs[0].facetValueName];
      }),
      map(([count, query]: [number, string]) =>
        this.getSearchResultTitle(count, query)
      )
    );
  }

  protected get searchResultTitle$(): Observable<string> {
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
