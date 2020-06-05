import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  distinctUntilKeyChanged,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { Breadcrumb, PageType } from '../../model';
import { ProductSearchService } from '../../product/facade/product-search.service';
import { ProductService } from '../../product/facade/product.service';
import { createFrom } from '../../util';
import { RoutingService } from '../facade/routing.service';
import { PageContext } from '../models/page-context.model';
import {
  BrandFacetChangeEvent,
  CategoryFacetChangeEvent,
  CategoryPageVisitedEvent,
  ProductDetailsPageVisitedEvent,
} from './routing.events';

const CATEGORY_FACET_CODE = 'category';
const BRAND_FACET_CODE = 'brand';

@Injectable({
  providedIn: 'root',
})
export class RoutingEventBuilder {
  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService,
    protected eventService: EventService,
    protected productService: ProductService
  ) {
    this.register();
  }

  protected register() {
    this.eventService.register(
      ProductDetailsPageVisitedEvent,
      this.buildProductDetailsPageVisitEvent()
    );
    this.eventService.register(
      CategoryPageVisitedEvent,
      this.buildCategoryPageVisitEvent()
    );
    this.eventService.register(
      CategoryFacetChangeEvent,
      this.buildCategoryFacetChangeEvent()
    );
    this.eventService.register(
      BrandFacetChangeEvent,
      this.buildBrandFacetChangeEvent()
    );
  }

  buildProductDetailsPageVisitEvent(): Observable<
    ProductDetailsPageVisitedEvent
  > {
    return this.routerEvents(PageType.PRODUCT_PAGE).pipe(
      map((context) => context.id),
      switchMap((productId) =>
        this.productService
          .get(productId)
          .pipe(
            map((product) =>
              createFrom(ProductDetailsPageVisitedEvent, product)
            )
          )
      )
    );
  }

  buildCategoryPageVisitEvent(): Observable<string> {
    return this.routerEvents(PageType.CATEGORY_PAGE).pipe(
      map((context) => context.id)
    );
  }

  // TODO:#5687 - move to a separate 'product' builder?
  buildCategoryFacetChangeEvent(): Observable<Breadcrumb[]> {
    return this.searchResultChangeEvent().pipe(
      withLatestFrom(this.routingService.getPageContext()),
      filter(([_facets, pageContext]) => this.isFacetPage(pageContext)),
      map(([facets, _pageContext]) =>
        facets.filter((facet) => this.isCategoryFacet(facet))
      ),
      distinctUntilKeyChanged('length')
    );
  }

  // TODO:#5687 - move to a separate 'product' builder?
  buildBrandFacetChangeEvent(): Observable<Breadcrumb[]> {
    return this.searchResultChangeEvent().pipe(
      withLatestFrom(this.routingService.getPageContext()),
      filter(([_facets, pageContext]) => this.isFacetPage(pageContext)),
      map(([facets, _pageContext]) =>
        facets.filter((facet) => this.isBrandFacet(facet))
      ),
      distinctUntilKeyChanged('length')
    );
  }

  private isFacetPage(pageContext: PageContext): boolean {
    return (
      pageContext.type === PageType.CATEGORY_PAGE || pageContext.id === 'search'
    );
  }

  private searchResultChangeEvent(): Observable<Breadcrumb[]> {
    return this.productSearchService.getResults().pipe(
      map((searchResults) =>
        searchResults.breadcrumbs ? searchResults.breadcrumbs : []
      ),
      filter((facets) => !!facets)
    );
  }

  private isBrandFacet(breadcrumb: Breadcrumb): boolean {
    return breadcrumb ? breadcrumb.facetCode === BRAND_FACET_CODE : false;
  }

  private isCategoryFacet(breadcrumb: Breadcrumb): boolean {
    return breadcrumb ? breadcrumb.facetCode === CATEGORY_FACET_CODE : false;
  }

  private routerEvents(pageType: PageType): Observable<PageContext> {
    return this.routingService
      .getPageContext()
      .pipe(filter((context) => context.type === pageType));
  }
}
