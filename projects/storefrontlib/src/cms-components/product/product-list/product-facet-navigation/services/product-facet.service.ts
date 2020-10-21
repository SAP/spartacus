import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import {
  ActivatedRouterStateSnapshot,
  Breadcrumb,
  PageType,
  ProductSearchPage,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, pluck, switchMap } from 'rxjs/operators';
import { ProductListComponentService } from '../../container/product-list-component.service';
import { FacetList } from '../facet.model';

/**
 * Provides access to all the facets and active facets for the Product Listing Page.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductFacetService {
  protected readonly routeState$ = this.routing
    .getRouterState()
    .pipe(pluck('state'));

  protected readonly searchResult$: Observable<
    ProductSearchPage
  > = this.routeState$.pipe(
    switchMap((state) =>
      this.productListComponentService.model$.pipe(
        filter((page) => this.filterForPage(state, page)),
        map((page) => this.mapResults(state, page))
      )
    )
  );

  constructor(
    protected routing: RoutingService,
    protected productListComponentService: ProductListComponentService
  ) {}

  /**
   * Observes the facets and active facets for the given page. The facet data
   * is provided in a `FacetList`.
   */
  readonly facetList$: Observable<FacetList> = this.searchResult$.pipe(
    map(
      (result: ProductSearchPage) =>
        ({
          facets: result.facets,
          activeFacets: result.breadcrumbs,
        } as FacetList)
    )
  );

  /**
   * Filters the current result by verifying if the result is related to the page.
   * This is done to avoid a combination of the next page and the current search results.
   */
  protected filterForPage(
    state: ActivatedRouterStateSnapshot,
    page: ProductSearchPage
  ): boolean {
    if (state.context.type === PageType.CATEGORY_PAGE) {
      return (
        page.currentQuery?.query?.value?.indexOf(
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
    return false;
  }

  private mapResults(
    state: ActivatedRouterStateSnapshot,
    page: ProductSearchPage
  ): ProductSearchPage {
    return {
      ...page,
      breadcrumbs: this.filterBreadcrumbs(page.breadcrumbs, state.params),
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
          (breadcrumb) => !this.hasBreadcrumb(breadcrumb, params)
        )
      : [];
  }

  /**
   * Indicates whether the breadcrumb is related to navigation parameters,
   * since either the category or brand code should match those codes.
   */
  private hasBreadcrumb(breadcrumb: Breadcrumb, params: Params): boolean {
    return (
      breadcrumb.facetCode === 'allCategories' &&
      (breadcrumb.facetValueCode === params.categoryCode ||
        breadcrumb.facetValueCode === params.brandCode)
    );
  }
}
