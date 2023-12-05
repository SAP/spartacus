import { Params } from '@angular/router';
import { ActivatedRouterStateSnapshot, Breadcrumb, ProductSearchPage, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ProductListComponentService } from '../../container/product-list-component.service';
import { FacetList } from '../facet.model';
import * as i0 from "@angular/core";
/**
 * Provides access to all the facets and active facets for the Product Listing Page.
 */
export declare class ProductFacetService {
    protected routing: RoutingService;
    protected productListComponentService: ProductListComponentService;
    constructor(routing: RoutingService, productListComponentService: ProductListComponentService);
    protected readonly routeState$: Observable<ActivatedRouterStateSnapshot>;
    /**
     * Returns the search results for the current page.
     */
    protected readonly searchResult$: Observable<ProductSearchPage>;
    /**
     * Observes the facets and active facets for the given page. The facet data
     * is provided in a `FacetList`.
     */
    readonly facetList$: Observable<FacetList>;
    /**
     * Filters the current result by verifying if the result is related to the page.
     * This is done to avoid a combination of the next page and the current search results.
     */
    protected filterForPage(state: ActivatedRouterStateSnapshot, page: ProductSearchPage): boolean;
    /**
     * Filter breadcrumbs which are not actively selected but coming from
     * the route navigation.
     *
     * The breadcrumbs might include the active category page code, which is not actively
     * selected by the user.
     */
    protected filterBreadcrumbs(breadcrumbs: Breadcrumb[], params: Params): Breadcrumb[];
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductFacetService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductFacetService>;
}
