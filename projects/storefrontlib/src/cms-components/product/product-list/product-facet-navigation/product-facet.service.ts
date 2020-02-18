import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import {
  ActivatedRouterStateSnapshot,
  Breadcrumb,
  Facet,
  PageType,
  ProductSearchPage,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, pluck, switchMap } from 'rxjs/operators';
import { ProductListComponentService } from '../container/product-list-component.service';

@Injectable({
  providedIn: 'root',
})
export class ProductFacetService {
  constructor(
    protected routing: RoutingService,
    protected productListComponentService: ProductListComponentService
  ) {}

  readonly routeState$ = this.routing.getRouterState().pipe(pluck('state'));

  private readonly searchResult$: Observable<
    ProductSearchPage
  > = this.routeState$.pipe(
    switchMap(state =>
      this.productListComponentService.model$.pipe(
        filter(page => this.filterForPage(state, page)),
        map(page => this.mapResults(state, page))
      )
    )
  );

  readonly facets$: Observable<Facet[]> = this.searchResult$.pipe(
    pluck('facets'),
    filter(facets => Boolean(facets)),
    map(facets => (facets ? facets.filter(facet => facet.visible) : [])),
    map(facets => facets.map(facet => Object.assign({}, facet)))
  );

  readonly breadcrumbs$: Observable<any> = this.searchResult$.pipe(
    pluck('breadcrumbs')
  );

  /**
   * Filters the current result by verifying if the result is related to the page.
   * This is done to avoid a combination of the next page and the current search results.
   */
  private filterForPage(
    state: ActivatedRouterStateSnapshot,
    page: ProductSearchPage
  ): boolean {
    if (state.context.type === PageType.CATEGORY_PAGE) {
      return (
        // TODO: prepare for a lack of the currentQuery
        page.currentQuery.query.value.indexOf(
          `allCategories:${state.context.id}`
        ) > -1
      );
    }

    if (
      state.context.type === PageType.CONTENT_PAGE &&
      state.context.id === 'search'
    ) {
      return page.currentQuery.query.value.startsWith(`${state.params.query}:`);
    }
    return true;
  }

  private mapResults(
    state: ActivatedRouterStateSnapshot,
    page: ProductSearchPage
  ) {
    return {
      ...page,
      ...{
        breadcrumbs: this.filterBreadcrumbs(page.breadcrumbs, state.params),
      },
    };
  }

  /**
   * filter breadcrumbs which are not actively selected
   * but coming from the route navigation
   */
  private filterBreadcrumbs(
    breadcrumbs: Breadcrumb[],
    params: Params
  ): Breadcrumb[] {
    return breadcrumbs
      ? breadcrumbs.filter(
          breadcrumb => !this.hasBreadcrumb(breadcrumb, params)
        )
      : [];
  }

  /**
   * Indicates whether the breadcrumb is releated navigation parameters,
   * since either the category or brand code should match those codes.
   */
  private hasBreadcrumb(breadcrumb: Breadcrumb, params: Params): boolean {
    // console.log('hasB', breadcrumb, params);
    return (
      // breadcrumb.facetCode === 'category' ||
      breadcrumb.facetCode === 'allCategories' &&
      breadcrumb.facetValueCode === params.categoryCode
      // (breadcrumb.facetCode === 'brand' &&
      //   breadcrumb.facetValueCode === params.brandCode)
    );
  }
}
