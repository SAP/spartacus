/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { inject, Injectable } from '@angular/core';
import { FeatureConfigService, } from '@spartacus/core';
import { combineLatest, using } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, shareReplay, take, tap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@angular/router";
import * as i3 from "../../../../shared/config/view-config";
/**
 * The `ProductListComponentService` is used to search products. The service is used
 * on the Product Listing Page, for listing products and the facet navigation.
 *
 * The service exposes the product search results based on the category and search
 * route parameters. The route parameters are used to query products by the help of
 * the `ProductSearchService`.
 */
export class ProductListComponentService {
    constructor(productSearchService, routing, activatedRoute, currencyService, languageService, router, config) {
        this.productSearchService = productSearchService;
        this.routing = routing;
        this.activatedRoute = activatedRoute;
        this.currencyService = currencyService;
        this.languageService = languageService;
        this.router = router;
        this.config = config;
        this.RELEVANCE_ALLCATEGORIES = ':relevance:allCategories:';
        // TODO: Remove in 7.0
        this.featureConfigService = inject(FeatureConfigService, {
            optional: true,
        });
        /**
         * Emits the search results for the current search query.
         *
         * The `searchResults$` is _not_ concerned with querying, it only observes the
         * `productSearchService.getResults()`
         */
        this.searchResults$ = this.productSearchService
            .getResults()
            .pipe(filter((searchResult) => Object.keys(searchResult).length > 0));
        /**
         * Observes the route and performs a search on each route change.
         *
         * Context changes, such as language and currencies are also taken
         * into account, so that the search is performed again.
         */
        this.searchByRouting$ = combineLatest([
            this.routing.getRouterState().pipe(distinctUntilChanged((x, y) => {
                // router emits new value also when the anticipated `nextState` changes
                // but we want to perform search only when current url changes
                return x.state.url === y.state.url;
            })),
            ...this.siteContext,
        ]).pipe(debounceTime(0), map(([routerState, ..._context]) => routerState.state), tap((state) => {
            const criteria = this.getCriteriaFromRoute(state.params, state.queryParams);
            // TODO: Remove featureLevel condition in 7.0
            if (this.featureConfigService?.isLevel('6.7')) {
                this.searchIfCriteriaHasChanged(criteria);
            }
            else {
                this.search(criteria);
            }
        }));
        /**
         * This stream is used for the Product Listing and Product Facets.
         *
         * It not only emits search results, but also performs a search on every change
         * of the route (i.e. route params or query params).
         *
         * When a user leaves the PLP route, the PLP component unsubscribes from this stream
         * so no longer the search is performed on route change.
         */
        this.model$ = using(() => this.searchByRouting$.subscribe(), () => this.searchResults$).pipe(shareReplay({ bufferSize: 1, refCount: true }));
    }
    /**
     * Search only if the previous search criteria does NOT match the new one.
     * This prevents repeating product search calls for queries that already have loaded data.
     */
    searchIfCriteriaHasChanged(criteria) {
        this.productSearchService
            .getResults()
            .pipe(take(1))
            .subscribe((results) => {
            const previous = {
                query: results?.currentQuery?.query?.value,
                currentPage: results?.pagination?.currentPage,
                pageSize: results?.pagination?.pageSize,
                sortCode: results?.pagination?.sort,
            };
            if (checkQueriesDiffer() ||
                checkCurrentPagesDiffer() ||
                checkPageSizesDiffer() ||
                checkSortCodesDiffer()) {
                this.search(criteria);
            }
            function checkQueriesDiffer() {
                const previousQuery = sanitizeQuery(previous.query, previous.sortCode);
                const currentQuery = sanitizeQuery(criteria.query, criteria.sortCode);
                return previousQuery !== currentQuery;
                // Remove sortCode portion from queries.
                function sanitizeQuery(query, sortCode) {
                    const DEFAULT_SORT_CODE = 'relevance';
                    query = query
                        ?.replace(':' + DEFAULT_SORT_CODE, '')
                        .replace(DEFAULT_SORT_CODE, '');
                    if (sortCode) {
                        query = query?.replace(':' + sortCode, '').replace(sortCode, '');
                    }
                    return query;
                }
            }
            function checkCurrentPagesDiffer() {
                // Can be stored as zero for previousCriteria but undefined as new criteria.
                // We need to set these to the zero-values to perform the equivalency check.
                const previousPage = previous.currentPage && previous.currentPage > 0
                    ? previous.currentPage
                    : undefined;
                return previousPage?.toString() !== criteria.currentPage?.toString();
            }
            function checkPageSizesDiffer() {
                return (previous.pageSize?.toString() !== criteria.pageSize?.toString());
            }
            function checkSortCodesDiffer() {
                // Only check "sortCode" if it is defined in criteria as sortCode is often an undefined queryParam
                // but it will always get defined as a string in previousCriteria if a search was made.
                const previousCode = criteria.sortCode
                    ? previous?.sortCode
                    : undefined;
                return previousCode?.toString() !== criteria.sortCode?.toString();
            }
        });
    }
    /**
     * Expose the `SearchCriteria`. The search criteria are driven by the route parameters.
     *
     * This search route configuration is not yet configurable
     * (see https://github.com/SAP/spartacus/issues/7191).
     */
    getCriteriaFromRoute(routeParams, queryParams) {
        return {
            query: queryParams.query || this.getQueryFromRouteParams(routeParams),
            pageSize: queryParams.pageSize || this.config.view?.defaultPageSize,
            currentPage: queryParams.currentPage,
            sortCode: queryParams.sortCode,
        };
    }
    /**
     * Resolves the search query from the given `ProductListRouteParams`.
     */
    getQueryFromRouteParams({ query, categoryCode, brandCode, }) {
        if (query) {
            return query;
        }
        if (categoryCode) {
            return this.RELEVANCE_ALLCATEGORIES + categoryCode;
        }
        // TODO: drop support for brands as they should be treated
        // similarly as any category.
        if (brandCode) {
            return this.RELEVANCE_ALLCATEGORIES + brandCode;
        }
    }
    /**
     * Performs a search based on the given search criteria.
     *
     * The search is delegated to the `ProductSearchService`.
     */
    search(criteria) {
        const currentPage = criteria.currentPage;
        const pageSize = criteria.pageSize;
        const sort = criteria.sortCode;
        this.productSearchService.search(criteria.query, 
        // TODO: consider dropping this complex passing of cleaned object
        Object.assign({}, currentPage && { currentPage }, pageSize && { pageSize }, sort && { sort }));
    }
    /**
     * Get items from a given page without using navigation
     */
    getPageItems(pageNumber) {
        this.routing
            .getRouterState()
            .subscribe((route) => {
            const routeCriteria = this.getCriteriaFromRoute(route.state.params, route.state.queryParams);
            const criteria = {
                ...routeCriteria,
                currentPage: pageNumber,
            };
            this.search(criteria);
        })
            .unsubscribe();
    }
    /**
     * Sort the search results by the given sort code.
     */
    sort(sortCode) {
        this.route({ sortCode });
    }
    /**
     * Routes to the next product listing page, using the given `queryParams`. The
     * `queryParams` support sorting, pagination and querying.
     *
     * The `queryParams` are delegated to the Angular router `NavigationExtras`.
     */
    route(queryParams) {
        this.router.navigate([], {
            queryParams,
            queryParamsHandling: 'merge',
            relativeTo: this.activatedRoute,
        });
    }
    /**
     * The site context is used to update the search query in case of a
     * changing context. The context will typically influence the search data.
     *
     * We keep this private for now, as we're likely refactoring this in the next
     * major version.
     */
    get siteContext() {
        // TODO: we should refactor this so that custom context will be taken
        // into account automatically. Ideally, we drop the specific context
        // from the constructor, and query a ContextService for all contexts.
        return [this.languageService.getActive(), this.currencyService.getActive()];
    }
}
ProductListComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductListComponentService, deps: [{ token: i1.ProductSearchService }, { token: i1.RoutingService }, { token: i2.ActivatedRoute }, { token: i1.CurrencyService }, { token: i1.LanguageService }, { token: i2.Router }, { token: i3.ViewConfig }], target: i0.ɵɵFactoryTarget.Injectable });
ProductListComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductListComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductListComponentService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ProductSearchService }, { type: i1.RoutingService }, { type: i2.ActivatedRoute }, { type: i1.CurrencyService }, { type: i1.LanguageService }, { type: i2.Router }, { type: i3.ViewConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1saXN0LWNvbXBvbmVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9wcm9kdWN0L3Byb2R1Y3QtbGlzdC9jb250YWluZXIvcHJvZHVjdC1saXN0LWNvbXBvbmVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBR0wsb0JBQW9CLEdBTXJCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLGFBQWEsRUFBYyxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDeEQsT0FBTyxFQUNMLFlBQVksRUFDWixvQkFBb0IsRUFDcEIsTUFBTSxFQUNOLEdBQUcsRUFDSCxXQUFXLEVBQ1gsSUFBSSxFQUNKLEdBQUcsR0FDSixNQUFNLGdCQUFnQixDQUFDOzs7OztBQUl4Qjs7Ozs7OztHQU9HO0FBRUgsTUFBTSxPQUFPLDJCQUEyQjtJQVF0QyxZQUNZLG9CQUEwQyxFQUMxQyxPQUF1QixFQUN2QixjQUE4QixFQUM5QixlQUFnQyxFQUNoQyxlQUFnQyxFQUNoQyxNQUFjLEVBQ2QsTUFBa0I7UUFObEIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUN2QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQWRYLDRCQUF1QixHQUFHLDJCQUEyQixDQUFDO1FBRXpFLHNCQUFzQjtRQUNaLHlCQUFvQixHQUFHLE1BQU0sQ0FBQyxvQkFBb0Is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VztRQUNyQixxRUFBcUU7UUFDckUsb0VBQW9FO1FBQ3BFLHFFQUFxRTtRQUVyRSxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDOUUsQ0FBQzs7d0hBaFJVLDJCQUEyQjs0SEFBM0IsMkJBQTJCLGNBRGQsTUFBTTsyRkFDbkIsMkJBQTJCO2tCQUR2QyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IGluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBBY3RpdmF0ZWRSb3V0ZXJTdGF0ZVNuYXBzaG90LFxuICBDdXJyZW5jeVNlcnZpY2UsXG4gIEZlYXR1cmVDb25maWdTZXJ2aWNlLFxuICBMYW5ndWFnZVNlcnZpY2UsXG4gIFByb2R1Y3RTZWFyY2hQYWdlLFxuICBQcm9kdWN0U2VhcmNoU2VydmljZSxcbiAgUm91dGVyU3RhdGUsXG4gIFJvdXRpbmdTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgdXNpbmcgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGRlYm91bmNlVGltZSxcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBzaGFyZVJlcGxheSxcbiAgdGFrZSxcbiAgdGFwLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBWaWV3Q29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2NvbmZpZy92aWV3LWNvbmZpZyc7XG5pbXBvcnQgeyBQcm9kdWN0TGlzdFJvdXRlUGFyYW1zLCBTZWFyY2hDcml0ZXJpYSB9IGZyb20gJy4vcHJvZHVjdC1saXN0Lm1vZGVsJztcblxuLyoqXG4gKiBUaGUgYFByb2R1Y3RMaXN0Q29tcG9uZW50U2VydmljZWAgaXMgdXNlZCB0byBzZWFyY2ggcHJvZHVjdHMuIFRoZSBzZXJ2aWNlIGlzIHVzZWRcbiAqIG9uIHRoZSBQcm9kdWN0IExpc3RpbmcgUGFnZSwgZm9yIGxpc3RpbmcgcHJvZHVjdHMgYW5kIHRoZSBmYWNldCBuYXZpZ2F0aW9uLlxuICpcbiAqIFRoZSBzZXJ2aWNlIGV4cG9zZXMgdGhlIHByb2R1Y3Qgc2VhcmNoIHJlc3VsdHMgYmFzZWQgb24gdGhlIGNhdGVnb3J5IGFuZCBzZWFyY2hcbiAqIHJvdXRlIHBhcmFtZXRlcnMuIFRoZSByb3V0ZSBwYXJhbWV0ZXJzIGFyZSB1c2VkIHRvIHF1ZXJ5IHByb2R1Y3RzIGJ5IHRoZSBoZWxwIG9mXG4gKiB0aGUgYFByb2R1Y3RTZWFyY2hTZXJ2aWNlYC5cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0TGlzdENvbXBvbmVudFNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgUkVMRVZBTkNFX0FMTENBVEVHT1JJRVMgPSAnOnJlbGV2YW5jZTphbGxDYXRlZ29yaWVzOic7XG5cbiAgLy8gVE9ETzogUmVtb3ZlIGluIDcuMFxuICBwcm90ZWN0ZWQgZmVhdHVyZUNvbmZpZ1NlcnZpY2UgPSBpbmplY3QoRmVhdHVyZUNvbmZpZ1NlcnZpY2UsIHtcbiAgICBvcHRpb25hbDogdHJ1ZSxcbiAgfSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHByb2R1Y3RTZWFyY2hTZXJ2aWNlOiBQcm9kdWN0U2VhcmNoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZzogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcm90ZWN0ZWQgY3VycmVuY3lTZXJ2aWNlOiBDdXJyZW5jeVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcbiAgICBwcm90ZWN0ZWQgY29uZmlnOiBWaWV3Q29uZmlnXG4gICkge31cblxuICAvKipcbiAgICogRW1pdHMgdGhlIHNlYXJjaCByZXN1bHRzIGZvciB0aGUgY3VycmVudCBzZWFyY2ggcXVlcnkuXG4gICAqXG4gICAqIFRoZSBgc2VhcmNoUmVzdWx0cyRgIGlzIF9ub3RfIGNvbmNlcm5lZCB3aXRoIHF1ZXJ5aW5nLCBpdCBvbmx5IG9ic2VydmVzIHRoZVxuICAgKiBgcHJvZHVjdFNlYXJjaFNlcnZpY2UuZ2V0UmVzdWx0cygpYFxuICAgKi9cbiAgcHJvdGVjdGVkIHNlYXJjaFJlc3VsdHMkOiBPYnNlcnZhYmxlPFByb2R1Y3RTZWFyY2hQYWdlPiA9XG4gICAgdGhpcy5wcm9kdWN0U2VhcmNoU2VydmljZVxuICAgICAgLmdldFJlc3VsdHMoKVxuICAgICAgLnBpcGUoZmlsdGVyKChzZWFyY2hSZXN1bHQpID0+IE9iamVjdC5rZXlzKHNlYXJjaFJlc3VsdCkubGVuZ3RoID4gMCkpO1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlcyB0aGUgcm91dGUgYW5kIHBlcmZvcm1zIGEgc2VhcmNoIG9uIGVhY2ggcm91dGUgY2hhbmdlLlxuICAgKlxuICAgKiBDb250ZXh0IGNoYW5nZXMsIHN1Y2ggYXMgbGFuZ3VhZ2UgYW5kIGN1cnJlbmNpZXMgYXJlIGFsc28gdGFrZW5cbiAgICogaW50byBhY2NvdW50LCBzbyB0aGF0IHRoZSBzZWFyY2ggaXMgcGVyZm9ybWVkIGFnYWluLlxuICAgKi9cbiAgcHJvdGVjdGVkIHNlYXJjaEJ5Um91dGluZyQ6IE9ic2VydmFibGU8QWN0aXZhdGVkUm91dGVyU3RhdGVTbmFwc2hvdD4gPVxuICAgIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5yb3V0aW5nLmdldFJvdXRlclN0YXRlKCkucGlwZShcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKHgsIHkpID0+IHtcbiAgICAgICAgICAvLyByb3V0ZXIgZW1pdHMgbmV3IHZhbHVlIGFsc28gd2hlbiB0aGUgYW50aWNpcGF0ZWQgYG5leHRTdGF0ZWAgY2hhbmdlc1xuICAgICAgICAgIC8vIGJ1dCB3ZSB3YW50IHRvIHBlcmZvcm0gc2VhcmNoIG9ubHkgd2hlbiBjdXJyZW50IHVybCBjaGFuZ2VzXG4gICAgICAgICAgcmV0dXJuIHguc3RhdGUudXJsID09PSB5LnN0YXRlLnVybDtcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICAuLi50aGlzLnNpdGVDb250ZXh0LFxuICAgIF0pLnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWUoMCksXG4gICAgICBtYXAoKFtyb3V0ZXJTdGF0ZSwgLi4uX2NvbnRleHRdKSA9PiAocm91dGVyU3RhdGUgYXMgUm91dGVyU3RhdGUpLnN0YXRlKSxcbiAgICAgIHRhcCgoc3RhdGU6IEFjdGl2YXRlZFJvdXRlclN0YXRlU25hcHNob3QpID0+IHtcbiAgICAgICAgY29uc3QgY3JpdGVyaWEgPSB0aGlzLmdldENyaXRlcmlhRnJvbVJvdXRlKFxuICAgICAgICAgIHN0YXRlLnBhcmFtcyxcbiAgICAgICAgICBzdGF0ZS5xdWVyeVBhcmFtc1xuICAgICAgICApO1xuXG4gICAgICAgIC8vIFRPRE86IFJlbW92ZSBmZWF0dXJlTGV2ZWwgY29uZGl0aW9uIGluIDcuMFxuICAgICAgICBpZiAodGhpcy5mZWF0dXJlQ29uZmlnU2VydmljZT8uaXNMZXZlbCgnNi43JykpIHtcbiAgICAgICAgICB0aGlzLnNlYXJjaElmQ3JpdGVyaWFIYXNDaGFuZ2VkKGNyaXRlcmlhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNlYXJjaChjcml0ZXJpYSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAvKipcbiAgICogU2VhcmNoIG9ubHkgaWYgdGhlIHByZXZpb3VzIHNlYXJjaCBjcml0ZXJpYSBkb2VzIE5PVCBtYXRjaCB0aGUgbmV3IG9uZS5cbiAgICogVGhpcyBwcmV2ZW50cyByZXBlYXRpbmcgcHJvZHVjdCBzZWFyY2ggY2FsbHMgZm9yIHF1ZXJpZXMgdGhhdCBhbHJlYWR5IGhhdmUgbG9hZGVkIGRhdGEuXG4gICAqL1xuICBwcm90ZWN0ZWQgc2VhcmNoSWZDcml0ZXJpYUhhc0NoYW5nZWQoY3JpdGVyaWE6IFNlYXJjaENyaXRlcmlhKSB7XG4gICAgdGhpcy5wcm9kdWN0U2VhcmNoU2VydmljZVxuICAgICAgLmdldFJlc3VsdHMoKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdHMpID0+IHtcbiAgICAgICAgY29uc3QgcHJldmlvdXM6IFNlYXJjaENyaXRlcmlhID0ge1xuICAgICAgICAgIHF1ZXJ5OiByZXN1bHRzPy5jdXJyZW50UXVlcnk/LnF1ZXJ5Py52YWx1ZSxcbiAgICAgICAgICBjdXJyZW50UGFnZTogcmVzdWx0cz8ucGFnaW5hdGlvbj8uY3VycmVudFBhZ2UsXG4gICAgICAgICAgcGFnZVNpemU6IHJlc3VsdHM/LnBhZ2luYXRpb24/LnBhZ2VTaXplLFxuICAgICAgICAgIHNvcnRDb2RlOiByZXN1bHRzPy5wYWdpbmF0aW9uPy5zb3J0LFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBjaGVja1F1ZXJpZXNEaWZmZXIoKSB8fFxuICAgICAgICAgIGNoZWNrQ3VycmVudFBhZ2VzRGlmZmVyKCkgfHxcbiAgICAgICAgICBjaGVja1BhZ2VTaXplc0RpZmZlcigpIHx8XG4gICAgICAgICAgY2hlY2tTb3J0Q29kZXNEaWZmZXIoKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnNlYXJjaChjcml0ZXJpYSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjaGVja1F1ZXJpZXNEaWZmZXIoKTogYm9vbGVhbiB7XG4gICAgICAgICAgY29uc3QgcHJldmlvdXNRdWVyeSA9IHNhbml0aXplUXVlcnkoXG4gICAgICAgICAgICBwcmV2aW91cy5xdWVyeSxcbiAgICAgICAgICAgIHByZXZpb3VzLnNvcnRDb2RlXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBjdXJyZW50UXVlcnkgPSBzYW5pdGl6ZVF1ZXJ5KGNyaXRlcmlhLnF1ZXJ5LCBjcml0ZXJpYS5zb3J0Q29kZSk7XG4gICAgICAgICAgcmV0dXJuIHByZXZpb3VzUXVlcnkgIT09IGN1cnJlbnRRdWVyeTtcblxuICAgICAgICAgIC8vIFJlbW92ZSBzb3J0Q29kZSBwb3J0aW9uIGZyb20gcXVlcmllcy5cbiAgICAgICAgICBmdW5jdGlvbiBzYW5pdGl6ZVF1ZXJ5KFxuICAgICAgICAgICAgcXVlcnk/OiBzdHJpbmcsXG4gICAgICAgICAgICBzb3J0Q29kZT86IHN0cmluZ1xuICAgICAgICAgICk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgICAgICBjb25zdCBERUZBVUxUX1NPUlRfQ09ERSA9ICdyZWxldmFuY2UnO1xuXG4gICAgICAgICAgICBxdWVyeSA9IHF1ZXJ5XG4gICAgICAgICAgICAgID8ucmVwbGFjZSgnOicgKyBERUZBVUxUX1NPUlRfQ09ERSwgJycpXG4gICAgICAgICAgICAgIC5yZXBsYWNlKERFRkFVTFRfU09SVF9DT0RFLCAnJyk7XG5cbiAgICAgICAgICAgIGlmIChzb3J0Q29kZSkge1xuICAgICAgICAgICAgICBxdWVyeSA9IHF1ZXJ5Py5yZXBsYWNlKCc6JyArIHNvcnRDb2RlLCAnJykucmVwbGFjZShzb3J0Q29kZSwgJycpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcXVlcnk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tDdXJyZW50UGFnZXNEaWZmZXIoKSB7XG4gICAgICAgICAgLy8gQ2FuIGJlIHN0b3JlZCBhcyB6ZXJvIGZvciBwcmV2aW91c0NyaXRlcmlhIGJ1dCB1bmRlZmluZWQgYXMgbmV3IGNyaXRlcmlhLlxuICAgICAgICAgIC8vIFdlIG5lZWQgdG8gc2V0IHRoZXNlIHRvIHRoZSB6ZXJvLXZhbHVlcyB0byBwZXJmb3JtIHRoZSBlcXVpdmFsZW5jeSBjaGVjay5cbiAgICAgICAgICBjb25zdCBwcmV2aW91c1BhZ2UgPVxuICAgICAgICAgICAgcHJldmlvdXMuY3VycmVudFBhZ2UgJiYgcHJldmlvdXMuY3VycmVudFBhZ2UgPiAwXG4gICAgICAgICAgICAgID8gcHJldmlvdXMuY3VycmVudFBhZ2VcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgcmV0dXJuIHByZXZpb3VzUGFnZT8udG9TdHJpbmcoKSAhPT0gY3JpdGVyaWEuY3VycmVudFBhZ2U/LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjaGVja1BhZ2VTaXplc0RpZmZlcigpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgcHJldmlvdXMucGFnZVNpemU/LnRvU3RyaW5nKCkgIT09IGNyaXRlcmlhLnBhZ2VTaXplPy50b1N0cmluZygpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrU29ydENvZGVzRGlmZmVyKCkge1xuICAgICAgICAgIC8vIE9ubHkgY2hlY2sgXCJzb3J0Q29kZVwiIGlmIGl0IGlzIGRlZmluZWQgaW4gY3JpdGVyaWEgYXMgc29ydENvZGUgaXMgb2Z0ZW4gYW4gdW5kZWZpbmVkIHF1ZXJ5UGFyYW1cbiAgICAgICAgICAvLyBidXQgaXQgd2lsbCBhbHdheXMgZ2V0IGRlZmluZWQgYXMgYSBzdHJpbmcgaW4gcHJldmlvdXNDcml0ZXJpYSBpZiBhIHNlYXJjaCB3YXMgbWFkZS5cbiAgICAgICAgICBjb25zdCBwcmV2aW91c0NvZGUgPSBjcml0ZXJpYS5zb3J0Q29kZVxuICAgICAgICAgICAgPyBwcmV2aW91cz8uc29ydENvZGVcbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgIHJldHVybiBwcmV2aW91c0NvZGU/LnRvU3RyaW5nKCkgIT09IGNyaXRlcmlhLnNvcnRDb2RlPy50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIHN0cmVhbSBpcyB1c2VkIGZvciB0aGUgUHJvZHVjdCBMaXN0aW5nIGFuZCBQcm9kdWN0IEZhY2V0cy5cbiAgICpcbiAgICogSXQgbm90IG9ubHkgZW1pdHMgc2VhcmNoIHJlc3VsdHMsIGJ1dCBhbHNvIHBlcmZvcm1zIGEgc2VhcmNoIG9uIGV2ZXJ5IGNoYW5nZVxuICAgKiBvZiB0aGUgcm91dGUgKGkuZS4gcm91dGUgcGFyYW1zIG9yIHF1ZXJ5IHBhcmFtcykuXG4gICAqXG4gICAqIFdoZW4gYSB1c2VyIGxlYXZlcyB0aGUgUExQIHJvdXRlLCB0aGUgUExQIGNvbXBvbmVudCB1bnN1YnNjcmliZXMgZnJvbSB0aGlzIHN0cmVhbVxuICAgKiBzbyBubyBsb25nZXIgdGhlIHNlYXJjaCBpcyBwZXJmb3JtZWQgb24gcm91dGUgY2hhbmdlLlxuICAgKi9cbiAgcmVhZG9ubHkgbW9kZWwkOiBPYnNlcnZhYmxlPFByb2R1Y3RTZWFyY2hQYWdlPiA9IHVzaW5nKFxuICAgICgpID0+IHRoaXMuc2VhcmNoQnlSb3V0aW5nJC5zdWJzY3JpYmUoKSxcbiAgICAoKSA9PiB0aGlzLnNlYXJjaFJlc3VsdHMkXG4gICkucGlwZShzaGFyZVJlcGxheSh7IGJ1ZmZlclNpemU6IDEsIHJlZkNvdW50OiB0cnVlIH0pKTtcblxuICAvKipcbiAgICogRXhwb3NlIHRoZSBgU2VhcmNoQ3JpdGVyaWFgLiBUaGUgc2VhcmNoIGNyaXRlcmlhIGFyZSBkcml2ZW4gYnkgdGhlIHJvdXRlIHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIFRoaXMgc2VhcmNoIHJvdXRlIGNvbmZpZ3VyYXRpb24gaXMgbm90IHlldCBjb25maWd1cmFibGVcbiAgICogKHNlZSBodHRwczovL2dpdGh1Yi5jb20vU0FQL3NwYXJ0YWN1cy9pc3N1ZXMvNzE5MSkuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Q3JpdGVyaWFGcm9tUm91dGUoXG4gICAgcm91dGVQYXJhbXM6IFByb2R1Y3RMaXN0Um91dGVQYXJhbXMsXG4gICAgcXVlcnlQYXJhbXM6IFNlYXJjaENyaXRlcmlhXG4gICk6IFNlYXJjaENyaXRlcmlhIHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVlcnk6IHF1ZXJ5UGFyYW1zLnF1ZXJ5IHx8IHRoaXMuZ2V0UXVlcnlGcm9tUm91dGVQYXJhbXMocm91dGVQYXJhbXMpLFxuICAgICAgcGFnZVNpemU6IHF1ZXJ5UGFyYW1zLnBhZ2VTaXplIHx8IHRoaXMuY29uZmlnLnZpZXc/LmRlZmF1bHRQYWdlU2l6ZSxcbiAgICAgIGN1cnJlbnRQYWdlOiBxdWVyeVBhcmFtcy5jdXJyZW50UGFnZSxcbiAgICAgIHNvcnRDb2RlOiBxdWVyeVBhcmFtcy5zb3J0Q29kZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmVzIHRoZSBzZWFyY2ggcXVlcnkgZnJvbSB0aGUgZ2l2ZW4gYFByb2R1Y3RMaXN0Um91dGVQYXJhbXNgLlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFF1ZXJ5RnJvbVJvdXRlUGFyYW1zKHtcbiAgICBxdWVyeSxcbiAgICBjYXRlZ29yeUNvZGUsXG4gICAgYnJhbmRDb2RlLFxuICB9OiBQcm9kdWN0TGlzdFJvdXRlUGFyYW1zKSB7XG4gICAgaWYgKHF1ZXJ5KSB7XG4gICAgICByZXR1cm4gcXVlcnk7XG4gICAgfVxuICAgIGlmIChjYXRlZ29yeUNvZGUpIHtcbiAgICAgIHJldHVybiB0aGlzLlJFTEVWQU5DRV9BTExDQVRFR09SSUVTICsgY2F0ZWdvcnlDb2RlO1xuICAgIH1cblxuICAgIC8vIFRPRE86IGRyb3Agc3VwcG9ydCBmb3IgYnJhbmRzIGFzIHRoZXkgc2hvdWxkIGJlIHRyZWF0ZWRcbiAgICAvLyBzaW1pbGFybHkgYXMgYW55IGNhdGVnb3J5LlxuICAgIGlmIChicmFuZENvZGUpIHtcbiAgICAgIHJldHVybiB0aGlzLlJFTEVWQU5DRV9BTExDQVRFR09SSUVTICsgYnJhbmRDb2RlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIHNlYXJjaCBiYXNlZCBvbiB0aGUgZ2l2ZW4gc2VhcmNoIGNyaXRlcmlhLlxuICAgKlxuICAgKiBUaGUgc2VhcmNoIGlzIGRlbGVnYXRlZCB0byB0aGUgYFByb2R1Y3RTZWFyY2hTZXJ2aWNlYC5cbiAgICovXG4gIHByb3RlY3RlZCBzZWFyY2goY3JpdGVyaWE6IFNlYXJjaENyaXRlcmlhKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFBhZ2UgPSBjcml0ZXJpYS5jdXJyZW50UGFnZTtcbiAgICBjb25zdCBwYWdlU2l6ZSA9IGNyaXRlcmlhLnBhZ2VTaXplO1xuICAgIGNvbnN0IHNvcnQgPSBjcml0ZXJpYS5zb3J0Q29kZTtcblxuICAgIHRoaXMucHJvZHVjdFNlYXJjaFNlcnZpY2Uuc2VhcmNoKFxuICAgICAgY3JpdGVyaWEucXVlcnksXG4gICAgICAvLyBUT0RPOiBjb25zaWRlciBkcm9wcGluZyB0aGlzIGNvbXBsZXggcGFzc2luZyBvZiBjbGVhbmVkIG9iamVjdFxuICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAge30sXG4gICAgICAgIGN1cnJlbnRQYWdlICYmIHsgY3VycmVudFBhZ2UgfSxcbiAgICAgICAgcGFnZVNpemUgJiYgeyBwYWdlU2l6ZSB9LFxuICAgICAgICBzb3J0ICYmIHsgc29ydCB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaXRlbXMgZnJvbSBhIGdpdmVuIHBhZ2Ugd2l0aG91dCB1c2luZyBuYXZpZ2F0aW9uXG4gICAqL1xuICBnZXRQYWdlSXRlbXMocGFnZU51bWJlcjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5yb3V0aW5nXG4gICAgICAuZ2V0Um91dGVyU3RhdGUoKVxuICAgICAgLnN1YnNjcmliZSgocm91dGUpID0+IHtcbiAgICAgICAgY29uc3Qgcm91dGVDcml0ZXJpYSA9IHRoaXMuZ2V0Q3JpdGVyaWFGcm9tUm91dGUoXG4gICAgICAgICAgcm91dGUuc3RhdGUucGFyYW1zLFxuICAgICAgICAgIHJvdXRlLnN0YXRlLnF1ZXJ5UGFyYW1zXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGNyaXRlcmlhID0ge1xuICAgICAgICAgIC4uLnJvdXRlQ3JpdGVyaWEsXG4gICAgICAgICAgY3VycmVudFBhZ2U6IHBhZ2VOdW1iZXIsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2VhcmNoKGNyaXRlcmlhKTtcbiAgICAgIH0pXG4gICAgICAudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTb3J0IHRoZSBzZWFyY2ggcmVzdWx0cyBieSB0aGUgZ2l2ZW4gc29ydCBjb2RlLlxuICAgKi9cbiAgc29ydChzb3J0Q29kZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5yb3V0ZSh7IHNvcnRDb2RlIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvdXRlcyB0byB0aGUgbmV4dCBwcm9kdWN0IGxpc3RpbmcgcGFnZSwgdXNpbmcgdGhlIGdpdmVuIGBxdWVyeVBhcmFtc2AuIFRoZVxuICAgKiBgcXVlcnlQYXJhbXNgIHN1cHBvcnQgc29ydGluZywgcGFnaW5hdGlvbiBhbmQgcXVlcnlpbmcuXG4gICAqXG4gICAqIFRoZSBgcXVlcnlQYXJhbXNgIGFyZSBkZWxlZ2F0ZWQgdG8gdGhlIEFuZ3VsYXIgcm91dGVyIGBOYXZpZ2F0aW9uRXh0cmFzYC5cbiAgICovXG4gIHByb3RlY3RlZCByb3V0ZShxdWVyeVBhcmFtczogU2VhcmNoQ3JpdGVyaWEpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXSwge1xuICAgICAgcXVlcnlQYXJhbXMsXG4gICAgICBxdWVyeVBhcmFtc0hhbmRsaW5nOiAnbWVyZ2UnLFxuICAgICAgcmVsYXRpdmVUbzogdGhpcy5hY3RpdmF0ZWRSb3V0ZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgc2l0ZSBjb250ZXh0IGlzIHVzZWQgdG8gdXBkYXRlIHRoZSBzZWFyY2ggcXVlcnkgaW4gY2FzZSBvZiBhXG4gICAqIGNoYW5naW5nIGNvbnRleHQuIFRoZSBjb250ZXh0IHdpbGwgdHlwaWNhbGx5IGluZmx1ZW5jZSB0aGUgc2VhcmNoIGRhdGEuXG4gICAqXG4gICAqIFdlIGtlZXAgdGhpcyBwcml2YXRlIGZvciBub3csIGFzIHdlJ3JlIGxpa2VseSByZWZhY3RvcmluZyB0aGlzIGluIHRoZSBuZXh0XG4gICAqIG1ham9yIHZlcnNpb24uXG4gICAqL1xuICBwcml2YXRlIGdldCBzaXRlQ29udGV4dCgpOiBPYnNlcnZhYmxlPHN0cmluZz5bXSB7XG4gICAgLy8gVE9ETzogd2Ugc2hvdWxkIHJlZmFjdG9yIHRoaXMgc28gdGhhdCBjdXN0b20gY29udGV4dCB3aWxsIGJlIHRha2VuXG4gICAgLy8gaW50byBhY2NvdW50IGF1dG9tYXRpY2FsbHkuIElkZWFsbHksIHdlIGRyb3AgdGhlIHNwZWNpZmljIGNvbnRleHRcbiAgICAvLyBmcm9tIHRoZSBjb25zdHJ1Y3RvciwgYW5kIHF1ZXJ5IGEgQ29udGV4dFNlcnZpY2UgZm9yIGFsbCBjb250ZXh0cy5cblxuICAgIHJldHVybiBbdGhpcy5sYW5ndWFnZVNlcnZpY2UuZ2V0QWN0aXZlKCksIHRoaXMuY3VycmVuY3lTZXJ2aWNlLmdldEFjdGl2ZSgpXTtcbiAgfVxufVxuIl19