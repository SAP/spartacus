/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { createFrom, } from '@spartacus/core';
import { EMPTY } from 'rxjs';
import { filter, map, skip, switchMap, take } from 'rxjs/operators';
import { NavigationEvent } from '../navigation/navigation.event';
import { CategoryPageResultsEvent, ProductDetailsPageEvent, SearchPageResultsEvent, } from './product-page.events';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class ProductPageEventBuilder {
    constructor(eventService, productService, productSearchService) {
        this.eventService = eventService;
        this.productService = productService;
        this.productSearchService = productSearchService;
        this.register();
    }
    register() {
        this.eventService.register(SearchPageResultsEvent, this.buildSearchPageResultsEvent());
        this.eventService.register(ProductDetailsPageEvent, this.buildProductDetailsPageEvent());
        this.eventService.register(CategoryPageResultsEvent, this.buildCategoryResultsPageEvent());
    }
    buildProductDetailsPageEvent() {
        return this.eventService.get(NavigationEvent).pipe(filter((navigationEvent) => navigationEvent.semanticRoute === 'product'), switchMap((navigationEvent) => this.productService.get(navigationEvent.context.id).pipe(filter((product) => Boolean(product)), take(1), map((product) => createFrom(ProductDetailsPageEvent, {
            navigation: navigationEvent,
            categories: product?.categories,
            code: product?.code,
            name: product?.name,
            price: product?.price,
        })))));
    }
    buildCategoryResultsPageEvent() {
        const searchResults$ = this.productSearchService.getResults().pipe(
        // skipping the initial value, and preventing emission of the previous search state
        skip(1));
        return this.eventService.get(NavigationEvent).pipe(switchMap((navigationEvent) => {
            if (navigationEvent?.semanticRoute !== 'category') {
                return EMPTY;
            }
            return searchResults$.pipe(map((searchResults) => createFrom(CategoryPageResultsEvent, {
                navigation: navigationEvent,
                ...{
                    categoryCode: navigationEvent?.context?.id,
                    numberOfResults: searchResults?.pagination?.totalResults ?? 0,
                    categoryName: searchResults.breadcrumbs?.[0].facetValueName,
                },
            })));
        }));
    }
    buildSearchPageResultsEvent() {
        const searchResults$ = this.productSearchService.getResults().pipe(
        // skipping the initial value, and preventing emission of the previous search state
        skip(1));
        return this.eventService.get(NavigationEvent).pipe(switchMap((navigationEvent) => {
            if (navigationEvent?.semanticRoute !== 'search') {
                return EMPTY;
            }
            return searchResults$.pipe(map((searchResults) => createFrom(SearchPageResultsEvent, {
                navigation: navigationEvent,
                ...{
                    searchTerm: searchResults?.freeTextSearch ?? '',
                    numberOfResults: searchResults?.pagination?.totalResults ?? 0,
                },
            })));
        }));
    }
}
ProductPageEventBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductPageEventBuilder, deps: [{ token: i1.EventService }, { token: i1.ProductService }, { token: i1.ProductSearchService }], target: i0.ɵɵFactoryTarget.Injectable });
ProductPageEventBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductPageEventBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductPageEventBuilder, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i1.ProductService }, { type: i1.ProductSearchService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1wYWdlLWV2ZW50LmJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2V2ZW50cy9wcm9kdWN0L3Byb2R1Y3QtcGFnZS1ldmVudC5idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFDTCxVQUFVLEdBSVgsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsS0FBSyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2pFLE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsdUJBQXVCLEVBQ3ZCLHNCQUFzQixHQUN2QixNQUFNLHVCQUF1QixDQUFDOzs7QUFLL0IsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQyxZQUNZLFlBQTBCLEVBQzFCLGNBQThCLEVBQzlCLG9CQUEwQztRQUYxQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUVwRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVTLFFBQVE7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQ3hCLHNCQUFzQixFQUN0QixJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FDbkMsQ0FBQztRQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUN4Qix1QkFBdUIsRUFDdkIsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQ3BDLENBQUM7UUFDRixJ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QUFVLEVBQUUsWUFBWSxJQUFJLENBQUM7aUJBQzlEO2FBQ0YsQ0FBQyxDQUNILENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOztvSEFsR1UsdUJBQXVCO3dIQUF2Qix1QkFBdUIsY0FGdEIsTUFBTTsyRkFFUCx1QkFBdUI7a0JBSG5DLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRnJvbSxcbiAgRXZlbnRTZXJ2aWNlLFxuICBQcm9kdWN0U2VhcmNoU2VydmljZSxcbiAgUHJvZHVjdFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHNraXAsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5hdmlnYXRpb25FdmVudCB9IGZyb20gJy4uL25hdmlnYXRpb24vbmF2aWdhdGlvbi5ldmVudCc7XG5pbXBvcnQge1xuICBDYXRlZ29yeVBhZ2VSZXN1bHRzRXZlbnQsXG4gIFByb2R1Y3REZXRhaWxzUGFnZUV2ZW50LFxuICBTZWFyY2hQYWdlUmVzdWx0c0V2ZW50LFxufSBmcm9tICcuL3Byb2R1Y3QtcGFnZS5ldmVudHMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdFBhZ2VFdmVudEJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHByb2R1Y3RTZXJ2aWNlOiBQcm9kdWN0U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdFNlYXJjaFNlcnZpY2U6IFByb2R1Y3RTZWFyY2hTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMucmVnaXN0ZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZWdpc3RlcigpOiB2b2lkIHtcbiAgICB0aGlzLmV2ZW50U2VydmljZS5yZWdpc3RlcihcbiAgICAgIFNlYXJjaFBhZ2VSZXN1bHRzRXZlbnQsXG4gICAgICB0aGlzLmJ1aWxkU2VhcmNoUGFnZVJlc3VsdHNFdmVudCgpXG4gICAgKTtcbiAgICB0aGlzLmV2ZW50U2VydmljZS5yZWdpc3RlcihcbiAgICAgIFByb2R1Y3REZXRhaWxzUGFnZUV2ZW50LFxuICAgICAgdGhpcy5idWlsZFByb2R1Y3REZXRhaWxzUGFnZUV2ZW50KClcbiAgICApO1xuICAgIHRoaXMuZXZlbnRTZXJ2aWNlLnJlZ2lzdGVyKFxuICAgICAgQ2F0ZWdvcnlQYWdlUmVzdWx0c0V2ZW50LFxuICAgICAgdGhpcy5idWlsZENhdGVnb3J5UmVzdWx0c1BhZ2VFdmVudCgpXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBidWlsZFByb2R1Y3REZXRhaWxzUGFnZUV2ZW50KCk6IE9ic2VydmFibGU8UHJvZHVjdERldGFpbHNQYWdlRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5ldmVudFNlcnZpY2UuZ2V0KE5hdmlnYXRpb25FdmVudCkucGlwZShcbiAgICAgIGZpbHRlcigobmF2aWdhdGlvbkV2ZW50KSA9PiBuYXZpZ2F0aW9uRXZlbnQuc2VtYW50aWNSb3V0ZSA9PT0gJ3Byb2R1Y3QnKSxcbiAgICAgIHN3aXRjaE1hcCgobmF2aWdhdGlvbkV2ZW50KSA9PlxuICAgICAgICB0aGlzLnByb2R1Y3RTZXJ2aWNlLmdldChuYXZpZ2F0aW9uRXZlbnQuY29udGV4dC5pZCkucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKHByb2R1Y3QpID0+IEJvb2xlYW4ocHJvZHVjdCkpLFxuICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgbWFwKChwcm9kdWN0KSA9PlxuICAgICAgICAgICAgY3JlYXRlRnJvbShQcm9kdWN0RGV0YWlsc1BhZ2VFdmVudCwge1xuICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiBuYXZpZ2F0aW9uRXZlbnQsXG4gICAgICAgICAgICAgIGNhdGVnb3JpZXM6IHByb2R1Y3Q/LmNhdGVnb3JpZXMsXG4gICAgICAgICAgICAgIGNvZGU6IHByb2R1Y3Q/LmNvZGUsXG4gICAgICAgICAgICAgIG5hbWU6IHByb2R1Y3Q/Lm5hbWUsXG4gICAgICAgICAgICAgIHByaWNlOiBwcm9kdWN0Py5wcmljZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBidWlsZENhdGVnb3J5UmVzdWx0c1BhZ2VFdmVudCgpOiBPYnNlcnZhYmxlPENhdGVnb3J5UGFnZVJlc3VsdHNFdmVudD4ge1xuICAgIGNvbnN0IHNlYXJjaFJlc3VsdHMkID0gdGhpcy5wcm9kdWN0U2VhcmNoU2VydmljZS5nZXRSZXN1bHRzKCkucGlwZShcbiAgICAgIC8vIHNraXBwaW5nIHRoZSBpbml0aWFsIHZhbHVlLCBhbmQgcHJldmVudGluZyBlbWlzc2lvbiBvZiB0aGUgcHJldmlvdXMgc2VhcmNoIHN0YXRlXG4gICAgICBza2lwKDEpXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLmV2ZW50U2VydmljZS5nZXQoTmF2aWdhdGlvbkV2ZW50KS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChuYXZpZ2F0aW9uRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKG5hdmlnYXRpb25FdmVudD8uc2VtYW50aWNSb3V0ZSAhPT0gJ2NhdGVnb3J5Jykge1xuICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWFyY2hSZXN1bHRzJC5waXBlKFxuICAgICAgICAgIG1hcCgoc2VhcmNoUmVzdWx0cykgPT5cbiAgICAgICAgICAgIGNyZWF0ZUZyb20oQ2F0ZWdvcnlQYWdlUmVzdWx0c0V2ZW50LCB7XG4gICAgICAgICAgICAgIG5hdmlnYXRpb246IG5hdmlnYXRpb25FdmVudCxcbiAgICAgICAgICAgICAgLi4ue1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5Q29kZTogbmF2aWdhdGlvbkV2ZW50Py5jb250ZXh0Py5pZCxcbiAgICAgICAgICAgICAgICBudW1iZXJPZlJlc3VsdHM6IHNlYXJjaFJlc3VsdHM/LnBhZ2luYXRpb24/LnRvdGFsUmVzdWx0cyA/PyAwLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5TmFtZTogc2VhcmNoUmVzdWx0cy5icmVhZGNydW1icz8uWzBdLmZhY2V0VmFsdWVOYW1lLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYnVpbGRTZWFyY2hQYWdlUmVzdWx0c0V2ZW50KCk6IE9ic2VydmFibGU8U2VhcmNoUGFnZVJlc3VsdHNFdmVudD4ge1xuICAgIGNvbnN0IHNlYXJjaFJlc3VsdHMkID0gdGhpcy5wcm9kdWN0U2VhcmNoU2VydmljZS5nZXRSZXN1bHRzKCkucGlwZShcbiAgICAgIC8vIHNraXBwaW5nIHRoZSBpbml0aWFsIHZhbHVlLCBhbmQgcHJldmVudGluZyBlbWlzc2lvbiBvZiB0aGUgcHJldmlvdXMgc2VhcmNoIHN0YXRlXG4gICAgICBza2lwKDEpXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLmV2ZW50U2VydmljZS5nZXQoTmF2aWdhdGlvbkV2ZW50KS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChuYXZpZ2F0aW9uRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKG5hdmlnYXRpb25FdmVudD8uc2VtYW50aWNSb3V0ZSAhPT0gJ3NlYXJjaCcpIHtcbiAgICAgICAgICByZXR1cm4gRU1QVFk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VhcmNoUmVzdWx0cyQucGlwZShcbiAgICAgICAgICBtYXAoKHNlYXJjaFJlc3VsdHMpID0+XG4gICAgICAgICAgICBjcmVhdGVGcm9tKFNlYXJjaFBhZ2VSZXN1bHRzRXZlbnQsIHtcbiAgICAgICAgICAgICAgbmF2aWdhdGlvbjogbmF2aWdhdGlvbkV2ZW50LFxuICAgICAgICAgICAgICAuLi57XG4gICAgICAgICAgICAgICAgc2VhcmNoVGVybTogc2VhcmNoUmVzdWx0cz8uZnJlZVRleHRTZWFyY2ggPz8gJycsXG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZSZXN1bHRzOiBzZWFyY2hSZXN1bHRzPy5wYWdpbmF0aW9uPy50b3RhbFJlc3VsdHMgPz8gMCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=