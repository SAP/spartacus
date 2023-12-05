/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { distinctUntilChanged, filter, map, shareReplay, switchMap, tap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/cart/saved-cart/root";
export class SavedCartDetailsService {
    constructor(routingService, savedCartService) {
        this.routingService = routingService;
        this.savedCartService = savedCartService;
        this.savedCartId$ = this.routingService.getRouterState().pipe(map((routingData) => routingData.state.params.savedCartId), distinctUntilChanged());
        this.savedCart$ = this.savedCartId$.pipe(filter((cartId) => Boolean(cartId)), tap((savedCartId) => this.savedCartService.loadSavedCart(savedCartId)), switchMap((savedCartId) => this.savedCartService.get(savedCartId)), shareReplay({ bufferSize: 1, refCount: true }));
    }
    getSavedCartId() {
        return this.savedCartId$;
    }
    getCartDetails() {
        return this.savedCart$;
    }
}
SavedCartDetailsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartDetailsService, deps: [{ token: i1.RoutingService }, { token: i2.SavedCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
SavedCartDetailsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartDetailsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartDetailsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.SavedCartFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZWQtY2FydC1kZXRhaWxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9zYXZlZC1jYXJ0L2NvbXBvbmVudHMvZGV0YWlscy9zYXZlZC1jYXJ0LWRldGFpbHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUszQyxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixHQUFHLEVBQ0gsV0FBVyxFQUNYLFNBQVMsRUFDVCxHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUt4QixNQUFNLE9BQU8sdUJBQXVCO0lBZWxDLFlBQ1ksY0FBOEIsRUFDOUIsZ0JBQWlDO1FBRGpDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBaEJuQyxpQkFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUNoRSxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUMxRCxvQkFBb0IsRUFBRSxDQUN2QixDQUFDO1FBRVEsZUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUMzQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUNuQyxHQUFHLENBQUMsQ0FBQyxXQUFtQixFQUFFLEVBQUUsQ0FDMUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FDakQsRUFDRCxTQUFTLENBQUMsQ0FBQyxXQUFtQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQzFFLFdBQVcsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQy9DLENBQUM7SUFLQyxDQUFDO0lBRUosY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRUQsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDOztvSEExQlUsdUJBQXVCO3dIQUF2Qix1QkFBdUIsY0FGdEIsTUFBTTsyRkFFUCx1QkFBdUI7a0JBSG5DLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FydCB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgU2F2ZWRDYXJ0RmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L3NhdmVkLWNhcnQvcm9vdCc7XG5pbXBvcnQgeyBSb3V0aW5nU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHNoYXJlUmVwbGF5LFxuICBzd2l0Y2hNYXAsXG4gIHRhcCxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU2F2ZWRDYXJ0RGV0YWlsc1NlcnZpY2Uge1xuICBwcm90ZWN0ZWQgc2F2ZWRDYXJ0SWQkID0gdGhpcy5yb3V0aW5nU2VydmljZS5nZXRSb3V0ZXJTdGF0ZSgpLnBpcGUoXG4gICAgbWFwKChyb3V0aW5nRGF0YSkgPT4gcm91dGluZ0RhdGEuc3RhdGUucGFyYW1zLnNhdmVkQ2FydElkKSxcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICk7XG5cbiAgcHJvdGVjdGVkIHNhdmVkQ2FydCQgPSB0aGlzLnNhdmVkQ2FydElkJC5waXBlKFxuICAgIGZpbHRlcigoY2FydElkKSA9PiBCb29sZWFuKGNhcnRJZCkpLFxuICAgIHRhcCgoc2F2ZWRDYXJ0SWQ6IHN0cmluZykgPT5cbiAgICAgIHRoaXMuc2F2ZWRDYXJ0U2VydmljZS5sb2FkU2F2ZWRDYXJ0KHNhdmVkQ2FydElkKVxuICAgICksXG4gICAgc3dpdGNoTWFwKChzYXZlZENhcnRJZDogc3RyaW5nKSA9PiB0aGlzLnNhdmVkQ2FydFNlcnZpY2UuZ2V0KHNhdmVkQ2FydElkKSksXG4gICAgc2hhcmVSZXBsYXkoeyBidWZmZXJTaXplOiAxLCByZWZDb3VudDogdHJ1ZSB9KVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHNhdmVkQ2FydFNlcnZpY2U6IFNhdmVkQ2FydEZhY2FkZVxuICApIHt9XG5cbiAgZ2V0U2F2ZWRDYXJ0SWQoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5zYXZlZENhcnRJZCQ7XG4gIH1cblxuICBnZXRDYXJ0RGV0YWlscygpOiBPYnNlcnZhYmxlPENhcnQgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5zYXZlZENhcnQkO1xuICB9XG59XG4iXX0=