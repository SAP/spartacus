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
export class OrderConfirmationOrderEntriesContext {
    constructor(orderFacade) {
        this.orderFacade = orderFacade;
        this.type = OrderEntriesSource.ORDER_CONFIRMATION;
    }
    getEntries() {
        return this.orderFacade
            .getOrderDetails()
            .pipe(map((order) => order?.entries ?? []));
    }
}
OrderConfirmationOrderEntriesContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationOrderEntriesContext, deps: [{ token: i1.OrderFacade }], target: i0.ɵɵFactoryTarget.Injectable });
OrderConfirmationOrderEntriesContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationOrderEntriesContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConfirmationOrderEntriesContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.OrderFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItY29uZmlybWF0aW9uLW9yZGVyLWVudHJpZXMuY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb21wb25lbnRzL3BhZ2UtY29udGV4dC9vcmRlci1jb25maXJtYXRpb24tb3JkZXItZW50cmllcy5jb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFFTCxrQkFBa0IsR0FFbkIsTUFBTSwyQkFBMkIsQ0FBQztBQUduQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUtyQyxNQUFNLE9BQU8sb0NBQW9DO0lBSy9DLFlBQXNCLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBRnJDLFNBQUksR0FBRyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQztJQUVMLENBQUM7SUFFbEQsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLFdBQVc7YUFDcEIsZUFBZSxFQUFFO2FBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDOztpSUFYVSxvQ0FBb0M7cUlBQXBDLG9DQUFvQyxjQUZuQyxNQUFNOzJGQUVQLG9DQUFvQztrQkFIaEQsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBHZXRPcmRlckVudHJpZXNDb250ZXh0LFxuICBPcmRlckVudHJpZXNTb3VyY2UsXG4gIE9yZGVyRW50cnksXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgT3JkZXJGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJDb25maXJtYXRpb25PcmRlckVudHJpZXNDb250ZXh0XG4gIGltcGxlbWVudHMgR2V0T3JkZXJFbnRyaWVzQ29udGV4dFxue1xuICByZWFkb25seSB0eXBlID0gT3JkZXJFbnRyaWVzU291cmNlLk9SREVSX0NPTkZJUk1BVElPTjtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgb3JkZXJGYWNhZGU6IE9yZGVyRmFjYWRlKSB7fVxuXG4gIGdldEVudHJpZXMoKTogT2JzZXJ2YWJsZTxPcmRlckVudHJ5W10+IHtcbiAgICByZXR1cm4gdGhpcy5vcmRlckZhY2FkZVxuICAgICAgLmdldE9yZGVyRGV0YWlscygpXG4gICAgICAucGlwZShtYXAoKG9yZGVyKSA9PiBvcmRlcj8uZW50cmllcyA/PyBbXSkpO1xuICB9XG59XG4iXX0=