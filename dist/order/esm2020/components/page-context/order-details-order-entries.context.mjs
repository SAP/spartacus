/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { OrderEntriesSource, } from '@spartacus/cart/base/root';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/order/root";
export class OrderDetailsOrderEntriesContext {
    constructor(orderHistoryFacade) {
        this.orderHistoryFacade = orderHistoryFacade;
        this.type = OrderEntriesSource.ORDER_DETAILS;
    }
    getEntries() {
        return this.orderHistoryFacade
            .getOrderDetails()
            .pipe(map((order) => order?.entries ?? []));
    }
}
OrderDetailsOrderEntriesContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailsOrderEntriesContext, deps: [{ token: i1.OrderHistoryFacade }], target: i0.ɵɵFactoryTarget.Injectable });
OrderDetailsOrderEntriesContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailsOrderEntriesContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailsOrderEntriesContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.OrderHistoryFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItZGV0YWlscy1vcmRlci1lbnRyaWVzLmNvbnRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9wYWdlLWNvbnRleHQvb3JkZXItZGV0YWlscy1vcmRlci1lbnRyaWVzLmNvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLGtCQUFrQixHQUVuQixNQUFNLDJCQUEyQixDQUFDO0FBR25DLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBS3JDLE1BQU0sT0FBTywrQkFBK0I7SUFHMUMsWUFBc0Isa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFGbkQsU0FBSSxHQUFHLGtCQUFrQixDQUFDLGFBQWEsQ0FBQztJQUVjLENBQUM7SUFFaEUsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLGtCQUFrQjthQUMzQixlQUFlLEVBQUU7YUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7OzRIQVRVLCtCQUErQjtnSUFBL0IsK0JBQStCLGNBRjlCLE1BQU07MkZBRVAsK0JBQStCO2tCQUgzQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEdldE9yZGVyRW50cmllc0NvbnRleHQsXG4gIE9yZGVyRW50cmllc1NvdXJjZSxcbiAgT3JkZXJFbnRyeSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBPcmRlciwgT3JkZXJIaXN0b3J5RmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyRGV0YWlsc09yZGVyRW50cmllc0NvbnRleHQgaW1wbGVtZW50cyBHZXRPcmRlckVudHJpZXNDb250ZXh0IHtcbiAgcmVhZG9ubHkgdHlwZSA9IE9yZGVyRW50cmllc1NvdXJjZS5PUkRFUl9ERVRBSUxTO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBvcmRlckhpc3RvcnlGYWNhZGU6IE9yZGVySGlzdG9yeUZhY2FkZSkge31cblxuICBnZXRFbnRyaWVzKCk6IE9ic2VydmFibGU8T3JkZXJFbnRyeVtdPiB7XG4gICAgcmV0dXJuIHRoaXMub3JkZXJIaXN0b3J5RmFjYWRlXG4gICAgICAuZ2V0T3JkZXJEZXRhaWxzKClcbiAgICAgIC5waXBlKG1hcCgob3JkZXI6IE9yZGVyKSA9PiBvcmRlcj8uZW50cmllcyA/PyBbXSkpO1xuICB9XG59XG4iXX0=