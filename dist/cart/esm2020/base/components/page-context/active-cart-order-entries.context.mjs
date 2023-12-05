/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { OrderEntriesSource, } from '@spartacus/cart/base/root';
import { switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/core";
import * as i2 from "@spartacus/cart/base/root";
export class ActiveCartOrderEntriesContext {
    constructor(importInfoService, activeCartFacade) {
        this.importInfoService = importInfoService;
        this.activeCartFacade = activeCartFacade;
        this.type = OrderEntriesSource.ACTIVE_CART;
    }
    addEntries(products) {
        return this.add(products).pipe(switchMap((cartId) => this.importInfoService.getResults(cartId)), take(products.length));
    }
    getEntries() {
        return this.activeCartFacade.getEntries();
    }
    add(products) {
        this.activeCartFacade.addEntries(this.mapProductsToOrderEntries(products));
        return this.activeCartFacade.getActiveCartId();
    }
    mapProductsToOrderEntries(products) {
        return products.map((product) => ({
            product: { code: product.productCode },
            quantity: product.quantity,
        }));
    }
}
ActiveCartOrderEntriesContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveCartOrderEntriesContext, deps: [{ token: i1.ProductImportInfoService }, { token: i2.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
ActiveCartOrderEntriesContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveCartOrderEntriesContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveCartOrderEntriesContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ProductImportInfoService }, { type: i2.ActiveCartFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLWNhcnQtb3JkZXItZW50cmllcy5jb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb21wb25lbnRzL3BhZ2UtY29udGV4dC9hY3RpdmUtY2FydC1vcmRlci1lbnRyaWVzLmNvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUlMLGtCQUFrQixHQUluQixNQUFNLDJCQUEyQixDQUFDO0FBRW5DLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFLakQsTUFBTSxPQUFPLDZCQUE2QjtJQUt4QyxZQUNZLGlCQUEyQyxFQUMzQyxnQkFBa0M7UUFEbEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUEwQjtRQUMzQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBSnJDLFNBQUksR0FBRyxrQkFBa0IsQ0FBQyxXQUFXLENBQUM7SUFLNUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxRQUF1QjtRQUNoQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUM1QixTQUFTLENBQUMsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFDeEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FDdEIsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVTLEdBQUcsQ0FBQyxRQUF1QjtRQUNuQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzNFLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFUyx5QkFBeUIsQ0FBQyxRQUF1QjtRQUN6RCxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQ2pCLENBQUMsT0FBa0QsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2RCxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUN0QyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7U0FDM0IsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOzswSEFqQ1UsNkJBQTZCOzhIQUE3Qiw2QkFBNkIsY0FGNUIsTUFBTTsyRkFFUCw2QkFBNkI7a0JBSHpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvZHVjdEltcG9ydEluZm9TZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2UvY29yZSc7XG5pbXBvcnQge1xuICBBY3RpdmVDYXJ0RmFjYWRlLFxuICBBZGRPcmRlckVudHJpZXNDb250ZXh0LFxuICBHZXRPcmRlckVudHJpZXNDb250ZXh0LFxuICBPcmRlckVudHJpZXNTb3VyY2UsXG4gIE9yZGVyRW50cnksXG4gIFByb2R1Y3REYXRhLFxuICBQcm9kdWN0SW1wb3J0SW5mbyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBY3RpdmVDYXJ0T3JkZXJFbnRyaWVzQ29udGV4dFxuICBpbXBsZW1lbnRzIEFkZE9yZGVyRW50cmllc0NvbnRleHQsIEdldE9yZGVyRW50cmllc0NvbnRleHRcbntcbiAgcmVhZG9ubHkgdHlwZSA9IE9yZGVyRW50cmllc1NvdXJjZS5BQ1RJVkVfQ0FSVDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaW1wb3J0SW5mb1NlcnZpY2U6IFByb2R1Y3RJbXBvcnRJbmZvU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZVxuICApIHt9XG5cbiAgYWRkRW50cmllcyhwcm9kdWN0czogUHJvZHVjdERhdGFbXSk6IE9ic2VydmFibGU8UHJvZHVjdEltcG9ydEluZm8+IHtcbiAgICByZXR1cm4gdGhpcy5hZGQocHJvZHVjdHMpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGNhcnRJZDogc3RyaW5nKSA9PiB0aGlzLmltcG9ydEluZm9TZXJ2aWNlLmdldFJlc3VsdHMoY2FydElkKSksXG4gICAgICB0YWtlKHByb2R1Y3RzLmxlbmd0aClcbiAgICApO1xuICB9XG5cbiAgZ2V0RW50cmllcygpOiBPYnNlcnZhYmxlPE9yZGVyRW50cnlbXT4ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUNhcnRGYWNhZGUuZ2V0RW50cmllcygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFkZChwcm9kdWN0czogUHJvZHVjdERhdGFbXSk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgdGhpcy5hY3RpdmVDYXJ0RmFjYWRlLmFkZEVudHJpZXModGhpcy5tYXBQcm9kdWN0c1RvT3JkZXJFbnRyaWVzKHByb2R1Y3RzKSk7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlQ2FydEZhY2FkZS5nZXRBY3RpdmVDYXJ0SWQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBtYXBQcm9kdWN0c1RvT3JkZXJFbnRyaWVzKHByb2R1Y3RzOiBQcm9kdWN0RGF0YVtdKTogT3JkZXJFbnRyeVtdIHtcbiAgICByZXR1cm4gcHJvZHVjdHMubWFwKFxuICAgICAgKHByb2R1Y3Q6IHsgcHJvZHVjdENvZGU6IHN0cmluZzsgcXVhbnRpdHk6IG51bWJlciB9KSA9PiAoe1xuICAgICAgICBwcm9kdWN0OiB7IGNvZGU6IHByb2R1Y3QucHJvZHVjdENvZGUgfSxcbiAgICAgICAgcXVhbnRpdHk6IHByb2R1Y3QucXVhbnRpdHksXG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==