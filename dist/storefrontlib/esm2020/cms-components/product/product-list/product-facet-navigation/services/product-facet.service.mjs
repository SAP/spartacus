/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { PageType, } from '@spartacus/core';
import { filter, map, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../../container/product-list-component.service";
/**
 * Provides access to all the facets and active facets for the Product Listing Page.
 */
export class ProductFacetService {
    constructor(routing, productListComponentService) {
        this.routing = routing;
        this.productListComponentService = productListComponentService;
        this.routeState$ = this.routing
            .getRouterState()
            .pipe(map((routerState) => routerState.state));
        /**
         * Returns the search results for the current page.
         */
        this.searchResult$ = this.routeState$.pipe(switchMap((state) => this.productListComponentService.model$.pipe(filter((page) => this.filterForPage(state, page)), map((page) => ({
            ...page,
            breadcrumbs: this.filterBreadcrumbs(page?.breadcrumbs ?? [], state.params),
        })))));
        /**
         * Observes the facets and active facets for the given page. The facet data
         * is provided in a `FacetList`.
         */
        this.facetList$ = this.searchResult$.pipe(map((result) => ({
            facets: result.facets,
            activeFacets: result.breadcrumbs,
        })));
    }
    /**
     * Filters the current result by verifying if the result is related to the page.
     * This is done to avoid a combination of the next page and the current search results.
     */
    filterForPage(state, page) {
        if (!page.currentQuery?.query?.value) {
            return false;
        }
        if (state.context.type === PageType.CATEGORY_PAGE) {
            return (page.currentQuery.query.value.indexOf(`allCategories:${state.context.id}`) > -1);
        }
        if (state.context.type === PageType.CONTENT_PAGE &&
            state.context.id === 'search') {
            return page.freeTextSearch === state.params.query.split(':')[0];
        }
        return false;
    }
    /**
     * Filter breadcrumbs which are not actively selected but coming from
     * the route navigation.
     *
     * The breadcrumbs might include the active category page code, which is not actively
     * selected by the user.
     */
    filterBreadcrumbs(breadcrumbs, params) {
        return breadcrumbs
            ? breadcrumbs.filter((breadcrumb) => !(breadcrumb.facetCode === 'allCategories' &&
                (breadcrumb.facetValueCode === params.categoryCode ||
                    breadcrumb.facetValueCode === params.brandCode)))
            : [];
    }
}
ProductFacetService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductFacetService, deps: [{ token: i1.RoutingService }, { token: i2.ProductListComponentService }], target: i0.ɵɵFactoryTarget.Injectable });
ProductFacetService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductFacetService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductFacetService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.ProductListComponentService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1mYWNldC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9wcm9kdWN0L3Byb2R1Y3QtbGlzdC9wcm9kdWN0LWZhY2V0LW5hdmlnYXRpb24vc2VydmljZXMvcHJvZHVjdC1mYWNldC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFHTCxRQUFRLEdBR1QsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUl4RDs7R0FFRztBQUlILE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsWUFDWSxPQUF1QixFQUN2QiwyQkFBd0Q7UUFEeEQsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsZ0NBQTJCLEdBQTNCLDJCQUEyQixDQUE2QjtRQUdqRCxnQkFBVyxHQUFHLElBQUksQ0FBQyxPQUFPO2FBQzFDLGNBQWMsRUFBRTthQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUVqRDs7V0FFRztRQUNnQixrQkFBYSxHQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDbkIsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDbEIsSUFBSSxDQUFDLDJCQUEyQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQzFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFDakQsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2IsR0FBRyxJQUFJO1lBQ1AsV0FBVyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FDakMsSUFBSSxFQUFFLFdBQVcsSUFBSSxFQUFFLEVBQ3ZCLEtBQUssQ0FBQyxNQUFNLENBQ2I7U0FDRixDQUFDLENBQUMsQ0FDSixDQUNGLENBQ0YsQ0FBQztRQUVKOzs7V0FHRztRQUNNLGVBQVUsR0FBMEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ2xFLEdBQUcsQ0FDRCxDQUFDLE1BQXlCLEVBQUUsRUFBRSxDQUM1QixDQUFDO1lBQ0MsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3JCLFlBQVksRUFBRSxNQUFNLENBQUMsV0FBVztTQUNuQixDQUFBLENBQ2xCLENBQ0YsQ0FBQztJQXJDQyxDQUFDO0lBdUNKOzs7T0FHRztJQUNPLGFBQWEsQ0FDckIsS0FBbUMsRUFDbkMsSUFBdUI7UUFFdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtZQUNwQyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsYUFBYSxFQUFFO1lBQ2pELE9BQU8sQ0FDTCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUNuQyxpQkFBaUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FDcEMsR0FBRyxDQUFDLENBQUMsQ0FDUCxDQUFDO1NBQ0g7UUFFRCxJQUNFLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxZQUFZO1lBQzVDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLFFBQVEsRUFDN0I7WUFDQSxPQUFPLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pFO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ08saUJBQWlCLENBQ3pCLFdBQXlCLEVBQ3pCLE1BQWM7UUFFZCxPQUFPLFdBQVc7WUFDaEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQ2hCLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FDYixDQUFDLENBQ0MsVUFBVSxDQUFDLFNBQVMsS0FBSyxlQUFlO2dCQUN4QyxDQUFDLFVBQVUsQ0FBQyxjQUFjLEtBQUssTUFBTSxDQUFDLFlBQVk7b0JBQ2hELFVBQVUsQ0FBQyxjQUFjLEtBQUssTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUNsRCxDQUNKO1lBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNULENBQUM7O2dIQTVGVSxtQkFBbUI7b0hBQW5CLG1CQUFtQixjQUZsQixNQUFNOzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQWN0aXZhdGVkUm91dGVyU3RhdGVTbmFwc2hvdCxcbiAgQnJlYWRjcnVtYixcbiAgUGFnZVR5cGUsXG4gIFByb2R1Y3RTZWFyY2hQYWdlLFxuICBSb3V0aW5nU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBQcm9kdWN0TGlzdENvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb250YWluZXIvcHJvZHVjdC1saXN0LWNvbXBvbmVudC5zZXJ2aWNlJztcbmltcG9ydCB7IEZhY2V0TGlzdCB9IGZyb20gJy4uL2ZhY2V0Lm1vZGVsJztcblxuLyoqXG4gKiBQcm92aWRlcyBhY2Nlc3MgdG8gYWxsIHRoZSBmYWNldHMgYW5kIGFjdGl2ZSBmYWNldHMgZm9yIHRoZSBQcm9kdWN0IExpc3RpbmcgUGFnZS5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RGYWNldFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcm91dGluZzogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHByb2R1Y3RMaXN0Q29tcG9uZW50U2VydmljZTogUHJvZHVjdExpc3RDb21wb25lbnRTZXJ2aWNlXG4gICkge31cblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgcm91dGVTdGF0ZSQgPSB0aGlzLnJvdXRpbmdcbiAgICAuZ2V0Um91dGVyU3RhdGUoKVxuICAgIC5waXBlKG1hcCgocm91dGVyU3RhdGUpID0+IHJvdXRlclN0YXRlLnN0YXRlKSk7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHNlYXJjaCByZXN1bHRzIGZvciB0aGUgY3VycmVudCBwYWdlLlxuICAgKi9cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHNlYXJjaFJlc3VsdCQ6IE9ic2VydmFibGU8UHJvZHVjdFNlYXJjaFBhZ2U+ID1cbiAgICB0aGlzLnJvdXRlU3RhdGUkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKHN0YXRlKSA9PlxuICAgICAgICB0aGlzLnByb2R1Y3RMaXN0Q29tcG9uZW50U2VydmljZS5tb2RlbCQucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKHBhZ2UpID0+IHRoaXMuZmlsdGVyRm9yUGFnZShzdGF0ZSwgcGFnZSkpLFxuICAgICAgICAgIG1hcCgocGFnZSkgPT4gKHtcbiAgICAgICAgICAgIC4uLnBhZ2UsXG4gICAgICAgICAgICBicmVhZGNydW1iczogdGhpcy5maWx0ZXJCcmVhZGNydW1icyhcbiAgICAgICAgICAgICAgcGFnZT8uYnJlYWRjcnVtYnMgPz8gW10sXG4gICAgICAgICAgICAgIHN0YXRlLnBhcmFtc1xuICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG5cbiAgLyoqXG4gICAqIE9ic2VydmVzIHRoZSBmYWNldHMgYW5kIGFjdGl2ZSBmYWNldHMgZm9yIHRoZSBnaXZlbiBwYWdlLiBUaGUgZmFjZXQgZGF0YVxuICAgKiBpcyBwcm92aWRlZCBpbiBhIGBGYWNldExpc3RgLlxuICAgKi9cbiAgcmVhZG9ubHkgZmFjZXRMaXN0JDogT2JzZXJ2YWJsZTxGYWNldExpc3Q+ID0gdGhpcy5zZWFyY2hSZXN1bHQkLnBpcGUoXG4gICAgbWFwKFxuICAgICAgKHJlc3VsdDogUHJvZHVjdFNlYXJjaFBhZ2UpID0+XG4gICAgICAgICh7XG4gICAgICAgICAgZmFjZXRzOiByZXN1bHQuZmFjZXRzLFxuICAgICAgICAgIGFjdGl2ZUZhY2V0czogcmVzdWx0LmJyZWFkY3J1bWJzLFxuICAgICAgICB9IGFzIEZhY2V0TGlzdClcbiAgICApXG4gICk7XG5cbiAgLyoqXG4gICAqIEZpbHRlcnMgdGhlIGN1cnJlbnQgcmVzdWx0IGJ5IHZlcmlmeWluZyBpZiB0aGUgcmVzdWx0IGlzIHJlbGF0ZWQgdG8gdGhlIHBhZ2UuXG4gICAqIFRoaXMgaXMgZG9uZSB0byBhdm9pZCBhIGNvbWJpbmF0aW9uIG9mIHRoZSBuZXh0IHBhZ2UgYW5kIHRoZSBjdXJyZW50IHNlYXJjaCByZXN1bHRzLlxuICAgKi9cbiAgcHJvdGVjdGVkIGZpbHRlckZvclBhZ2UoXG4gICAgc3RhdGU6IEFjdGl2YXRlZFJvdXRlclN0YXRlU25hcHNob3QsXG4gICAgcGFnZTogUHJvZHVjdFNlYXJjaFBhZ2VcbiAgKTogYm9vbGVhbiB7XG4gICAgaWYgKCFwYWdlLmN1cnJlbnRRdWVyeT8ucXVlcnk/LnZhbHVlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzdGF0ZS5jb250ZXh0LnR5cGUgPT09IFBhZ2VUeXBlLkNBVEVHT1JZX1BBR0UpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHBhZ2UuY3VycmVudFF1ZXJ5LnF1ZXJ5LnZhbHVlLmluZGV4T2YoXG4gICAgICAgICAgYGFsbENhdGVnb3JpZXM6JHtzdGF0ZS5jb250ZXh0LmlkfWBcbiAgICAgICAgKSA+IC0xXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHN0YXRlLmNvbnRleHQudHlwZSA9PT0gUGFnZVR5cGUuQ09OVEVOVF9QQUdFICYmXG4gICAgICBzdGF0ZS5jb250ZXh0LmlkID09PSAnc2VhcmNoJ1xuICAgICkge1xuICAgICAgcmV0dXJuIHBhZ2UuZnJlZVRleHRTZWFyY2ggPT09IHN0YXRlLnBhcmFtcy5xdWVyeS5zcGxpdCgnOicpWzBdO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogRmlsdGVyIGJyZWFkY3J1bWJzIHdoaWNoIGFyZSBub3QgYWN0aXZlbHkgc2VsZWN0ZWQgYnV0IGNvbWluZyBmcm9tXG4gICAqIHRoZSByb3V0ZSBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiBUaGUgYnJlYWRjcnVtYnMgbWlnaHQgaW5jbHVkZSB0aGUgYWN0aXZlIGNhdGVnb3J5IHBhZ2UgY29kZSwgd2hpY2ggaXMgbm90IGFjdGl2ZWx5XG4gICAqIHNlbGVjdGVkIGJ5IHRoZSB1c2VyLlxuICAgKi9cbiAgcHJvdGVjdGVkIGZpbHRlckJyZWFkY3J1bWJzKFxuICAgIGJyZWFkY3J1bWJzOiBCcmVhZGNydW1iW10sXG4gICAgcGFyYW1zOiBQYXJhbXNcbiAgKTogQnJlYWRjcnVtYltdIHtcbiAgICByZXR1cm4gYnJlYWRjcnVtYnNcbiAgICAgID8gYnJlYWRjcnVtYnMuZmlsdGVyKFxuICAgICAgICAgIChicmVhZGNydW1iKSA9PlxuICAgICAgICAgICAgIShcbiAgICAgICAgICAgICAgYnJlYWRjcnVtYi5mYWNldENvZGUgPT09ICdhbGxDYXRlZ29yaWVzJyAmJlxuICAgICAgICAgICAgICAoYnJlYWRjcnVtYi5mYWNldFZhbHVlQ29kZSA9PT0gcGFyYW1zLmNhdGVnb3J5Q29kZSB8fFxuICAgICAgICAgICAgICAgIGJyZWFkY3J1bWIuZmFjZXRWYWx1ZUNvZGUgPT09IHBhcmFtcy5icmFuZENvZGUpXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIDogW107XG4gIH1cbn1cbiJdfQ==