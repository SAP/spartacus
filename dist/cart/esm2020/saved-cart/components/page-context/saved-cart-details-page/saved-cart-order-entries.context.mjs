/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { OrderEntriesSource, } from '@spartacus/cart/base/root';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, map, switchMap, take, tap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/core";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/cart/base/root";
import * as i4 from "@spartacus/cart/saved-cart/root";
export class SavedCartOrderEntriesContext {
    constructor(importInfoService, userIdService, multiCartService, savedCartService, routingService) {
        this.importInfoService = importInfoService;
        this.userIdService = userIdService;
        this.multiCartService = multiCartService;
        this.savedCartService = savedCartService;
        this.routingService = routingService;
        this.type = OrderEntriesSource.SAVED_CART;
        this.savedCartId$ = this.routingService.getRouterState().pipe(map((routingData) => routingData.state.params.savedCartId), distinctUntilChanged());
    }
    addEntries(products) {
        return this.add(products).pipe(switchMap((cartId) => this.importInfoService.getResults(cartId)), take(products.length));
    }
    getEntries() {
        return this.savedCartId$.pipe(switchMap((cartId) => this.savedCartService.get(cartId)), map((cart) => cart?.entries ?? []));
    }
    add(products) {
        return combineLatest([
            this.userIdService.takeUserId(),
            this.savedCartId$,
        ]).pipe(tap(([userId, cartId]) => this.multiCartService.addEntries(userId, cartId, products)), map(([_userId, cartId]) => cartId));
    }
}
SavedCartOrderEntriesContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartOrderEntriesContext, deps: [{ token: i1.ProductImportInfoService }, { token: i2.UserIdService }, { token: i3.MultiCartFacade }, { token: i4.SavedCartFacade }, { token: i2.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
SavedCartOrderEntriesContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartOrderEntriesContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartOrderEntriesContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ProductImportInfoService }, { type: i2.UserIdService }, { type: i3.MultiCartFacade }, { type: i4.SavedCartFacade }, { type: i2.RoutingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZWQtY2FydC1vcmRlci1lbnRyaWVzLmNvbnRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9zYXZlZC1jYXJ0L2NvbXBvbmVudHMvcGFnZS1jb250ZXh0L3NhdmVkLWNhcnQtZGV0YWlscy1wYWdlL3NhdmVkLWNhcnQtb3JkZXItZW50cmllcy5jb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFLTCxrQkFBa0IsR0FJbkIsTUFBTSwyQkFBMkIsQ0FBQztBQUduQyxPQUFPLEVBQUUsYUFBYSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ2pELE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsR0FBRyxFQUNILFNBQVMsRUFDVCxJQUFJLEVBQ0osR0FBRyxHQUNKLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQUt4QixNQUFNLE9BQU8sNEJBQTRCO0lBS3ZDLFlBQ1ksaUJBQTJDLEVBQzNDLGFBQTRCLEVBQzVCLGdCQUFpQyxFQUNqQyxnQkFBaUMsRUFDakMsY0FBOEI7UUFKOUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUEwQjtRQUMzQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFDakMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBUGpDLFNBQUksR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLENBQUM7UUFVcEMsaUJBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FDaEUsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFDMUQsb0JBQW9CLEVBQUUsQ0FDdkIsQ0FBQztJQUxDLENBQUM7SUFPSixVQUFVLENBQUMsUUFBdUI7UUFDaEMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FDNUIsU0FBUyxDQUFDLENBQUMsTUFBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQ3hFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQ3RCLENBQUM7SUFDSixDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQzNCLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUN4RCxHQUFHLENBQUMsQ0FBQyxJQUFzQixFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxJQUFLLEVBQW1CLENBQUMsQ0FDdkUsQ0FBQztJQUNKLENBQUM7SUFFUyxHQUFHLENBQUMsUUFBdUI7UUFDbkMsT0FBTyxhQUFhLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFlBQVk7U0FDbEIsQ0FBQyxDQUFDLElBQUksQ0FDTCxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FDM0QsRUFDRCxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQ25DLENBQUM7SUFDSixDQUFDOzt5SEExQ1UsNEJBQTRCOzZIQUE1Qiw0QkFBNEIsY0FGM0IsTUFBTTsyRkFFUCw0QkFBNEI7a0JBSHhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvZHVjdEltcG9ydEluZm9TZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2UvY29yZSc7XG5pbXBvcnQge1xuICBBZGRPcmRlckVudHJpZXNDb250ZXh0LFxuICBDYXJ0LFxuICBHZXRPcmRlckVudHJpZXNDb250ZXh0LFxuICBNdWx0aUNhcnRGYWNhZGUsXG4gIE9yZGVyRW50cmllc1NvdXJjZSxcbiAgT3JkZXJFbnRyeSxcbiAgUHJvZHVjdERhdGEsXG4gIFByb2R1Y3RJbXBvcnRJbmZvLFxufSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IFNhdmVkQ2FydEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9zYXZlZC1jYXJ0L3Jvb3QnO1xuaW1wb3J0IHsgUm91dGluZ1NlcnZpY2UsIFVzZXJJZFNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIG1hcCxcbiAgc3dpdGNoTWFwLFxuICB0YWtlLFxuICB0YXAsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFNhdmVkQ2FydE9yZGVyRW50cmllc0NvbnRleHRcbiAgaW1wbGVtZW50cyBBZGRPcmRlckVudHJpZXNDb250ZXh0LCBHZXRPcmRlckVudHJpZXNDb250ZXh0XG57XG4gIHJlYWRvbmx5IHR5cGUgPSBPcmRlckVudHJpZXNTb3VyY2UuU0FWRURfQ0FSVDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaW1wb3J0SW5mb1NlcnZpY2U6IFByb2R1Y3RJbXBvcnRJbmZvU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdXNlcklkU2VydmljZTogVXNlcklkU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgbXVsdGlDYXJ0U2VydmljZTogTXVsdGlDYXJ0RmFjYWRlLFxuICAgIHByb3RlY3RlZCBzYXZlZENhcnRTZXJ2aWNlOiBTYXZlZENhcnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZVxuICApIHt9XG5cbiAgcHJvdGVjdGVkIHNhdmVkQ2FydElkJCA9IHRoaXMucm91dGluZ1NlcnZpY2UuZ2V0Um91dGVyU3RhdGUoKS5waXBlKFxuICAgIG1hcCgocm91dGluZ0RhdGEpID0+IHJvdXRpbmdEYXRhLnN0YXRlLnBhcmFtcy5zYXZlZENhcnRJZCksXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICApO1xuXG4gIGFkZEVudHJpZXMocHJvZHVjdHM6IFByb2R1Y3REYXRhW10pOiBPYnNlcnZhYmxlPFByb2R1Y3RJbXBvcnRJbmZvPiB7XG4gICAgcmV0dXJuIHRoaXMuYWRkKHByb2R1Y3RzKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChjYXJ0SWQ6IHN0cmluZykgPT4gdGhpcy5pbXBvcnRJbmZvU2VydmljZS5nZXRSZXN1bHRzKGNhcnRJZCkpLFxuICAgICAgdGFrZShwcm9kdWN0cy5sZW5ndGgpXG4gICAgKTtcbiAgfVxuXG4gIGdldEVudHJpZXMoKTogT2JzZXJ2YWJsZTxPcmRlckVudHJ5W10+IHtcbiAgICByZXR1cm4gdGhpcy5zYXZlZENhcnRJZCQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoY2FydElkKSA9PiB0aGlzLnNhdmVkQ2FydFNlcnZpY2UuZ2V0KGNhcnRJZCkpLFxuICAgICAgbWFwKChjYXJ0OiBDYXJ0IHwgdW5kZWZpbmVkKSA9PiBjYXJ0Py5lbnRyaWVzID8/IChbXSBhcyBPcmRlckVudHJ5W10pKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWRkKHByb2R1Y3RzOiBQcm9kdWN0RGF0YVtdKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnVzZXJJZFNlcnZpY2UudGFrZVVzZXJJZCgpLFxuICAgICAgdGhpcy5zYXZlZENhcnRJZCQsXG4gICAgXSkucGlwZShcbiAgICAgIHRhcCgoW3VzZXJJZCwgY2FydElkXSkgPT5cbiAgICAgICAgdGhpcy5tdWx0aUNhcnRTZXJ2aWNlLmFkZEVudHJpZXModXNlcklkLCBjYXJ0SWQsIHByb2R1Y3RzKVxuICAgICAgKSxcbiAgICAgIG1hcCgoW191c2VySWQsIGNhcnRJZF0pID0+IGNhcnRJZClcbiAgICApO1xuICB9XG59XG4iXX0=