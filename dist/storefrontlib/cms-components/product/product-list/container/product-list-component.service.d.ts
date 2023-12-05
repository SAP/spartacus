import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouterStateSnapshot, CurrencyService, FeatureConfigService, LanguageService, ProductSearchPage, ProductSearchService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ViewConfig } from '../../../../shared/config/view-config';
import { ProductListRouteParams, SearchCriteria } from './product-list.model';
import * as i0 from "@angular/core";
/**
 * The `ProductListComponentService` is used to search products. The service is used
 * on the Product Listing Page, for listing products and the facet navigation.
 *
 * The service exposes the product search results based on the category and search
 * route parameters. The route parameters are used to query products by the help of
 * the `ProductSearchService`.
 */
export declare class ProductListComponentService {
    protected productSearchService: ProductSearchService;
    protected routing: RoutingService;
    protected activatedRoute: ActivatedRoute;
    protected currencyService: CurrencyService;
    protected languageService: LanguageService;
    protected router: Router;
    protected config: ViewConfig;
    protected readonly RELEVANCE_ALLCATEGORIES = ":relevance:allCategories:";
    protected featureConfigService: FeatureConfigService | null;
    constructor(productSearchService: ProductSearchService, routing: RoutingService, activatedRoute: ActivatedRoute, currencyService: CurrencyService, languageService: LanguageService, router: Router, config: ViewConfig);
    /**
     * Emits the search results for the current search query.
     *
     * The `searchResults$` is _not_ concerned with querying, it only observes the
     * `productSearchService.getResults()`
     */
    protected searchResults$: Observable<ProductSearchPage>;
    /**
     * Observes the route and performs a search on each route change.
     *
     * Context changes, such as language and currencies are also taken
     * into account, so that the search is performed again.
     */
    protected searchByRouting$: Observable<ActivatedRouterStateSnapshot>;
    /**
     * Search only if the previous search criteria does NOT match the new one.
     * This prevents repeating product search calls for queries that already have loaded data.
     */
    protected searchIfCriteriaHasChanged(criteria: SearchCriteria): void;
    /**
     * This stream is used for the Product Listing and Product Facets.
     *
     * It not only emits search results, but also performs a search on every change
     * of the route (i.e. route params or query params).
     *
     * When a user leaves the PLP route, the PLP component unsubscribes from this stream
     * so no longer the search is performed on route change.
     */
    readonly model$: Observable<ProductSearchPage>;
    /**
     * Expose the `SearchCriteria`. The search criteria are driven by the route parameters.
     *
     * This search route configuration is not yet configurable
     * (see https://github.com/SAP/spartacus/issues/7191).
     */
    protected getCriteriaFromRoute(routeParams: ProductListRouteParams, queryParams: SearchCriteria): SearchCriteria;
    /**
     * Resolves the search query from the given `ProductListRouteParams`.
     */
    protected getQueryFromRouteParams({ query, categoryCode, brandCode, }: ProductListRouteParams): string | undefined;
    /**
     * Performs a search based on the given search criteria.
     *
     * The search is delegated to the `ProductSearchService`.
     */
    protected search(criteria: SearchCriteria): void;
    /**
     * Get items from a given page without using navigation
     */
    getPageItems(pageNumber: number): void;
    /**
     * Sort the search results by the given sort code.
     */
    sort(sortCode: string): void;
    /**
     * Routes to the next product listing page, using the given `queryParams`. The
     * `queryParams` support sorting, pagination and querying.
     *
     * The `queryParams` are delegated to the Angular router `NavigationExtras`.
     */
    protected route(queryParams: SearchCriteria): void;
    /**
     * The site context is used to update the search query in case of a
     * changing context. The context will typically influence the search data.
     *
     * We keep this private for now, as we're likely refactoring this in the next
     * major version.
     */
    private get siteContext();
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductListComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductListComponentService>;
}
