/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadCartEvent, RemoveCartEvent } from './cart.events';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../facade/multi-cart.facade";
export class MultiCartEventListener {
    constructor(eventService, multiCartFacade) {
        this.eventService = eventService;
        this.multiCartFacade = multiCartFacade;
        this.subscriptions = new Subscription();
        this.onCartBaseAction();
    }
    /**
     * Registers events for the cart base actions.
     */
    onCartBaseAction() {
        this.subscriptions.add(this.eventService.get(LoadCartEvent).subscribe(({ userId, cartId }) => {
            if (userId && cartId) {
                this.multiCartFacade.loadCart({ userId, cartId });
            }
        }));
        this.subscriptions.add(this.eventService.get(RemoveCartEvent).subscribe(({ cartId }) => {
            this.multiCartFacade.removeCart(cartId);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
MultiCartEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartEventListener, deps: [{ token: i1.EventService }, { token: i2.MultiCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
MultiCartEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i2.MultiCartFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktY2FydC1ldmVudC5saXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2Uvcm9vdC9ldmVudHMvbXVsdGktY2FydC1ldmVudC5saXN0ZW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUV0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBDLE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBSy9ELE1BQU0sT0FBTyxzQkFBc0I7SUFHakMsWUFDWSxZQUEwQixFQUMxQixlQUFnQztRQURoQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFKbEMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBTTNDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRDs7T0FFRztJQUNPLGdCQUFnQjtRQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUNwRSxJQUFJLE1BQU0sSUFBSSxNQUFNLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7YUFDbkQ7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUM5RCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7O21IQS9CVSxzQkFBc0I7dUhBQXRCLHNCQUFzQixjQUZyQixNQUFNOzJGQUVQLHNCQUFzQjtrQkFIbEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV2ZW50U2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE11bHRpQ2FydEZhY2FkZSB9IGZyb20gJy4uL2ZhY2FkZS9tdWx0aS1jYXJ0LmZhY2FkZSc7XG5pbXBvcnQgeyBMb2FkQ2FydEV2ZW50LCBSZW1vdmVDYXJ0RXZlbnQgfSBmcm9tICcuL2NhcnQuZXZlbnRzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpQ2FydEV2ZW50TGlzdGVuZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIG11bHRpQ2FydEZhY2FkZTogTXVsdGlDYXJ0RmFjYWRlXG4gICkge1xuICAgIHRoaXMub25DYXJ0QmFzZUFjdGlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBldmVudHMgZm9yIHRoZSBjYXJ0IGJhc2UgYWN0aW9ucy5cbiAgICovXG4gIHByb3RlY3RlZCBvbkNhcnRCYXNlQWN0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmV2ZW50U2VydmljZS5nZXQoTG9hZENhcnRFdmVudCkuc3Vic2NyaWJlKCh7IHVzZXJJZCwgY2FydElkIH0pID0+IHtcbiAgICAgICAgaWYgKHVzZXJJZCAmJiBjYXJ0SWQpIHtcbiAgICAgICAgICB0aGlzLm11bHRpQ2FydEZhY2FkZS5sb2FkQ2FydCh7IHVzZXJJZCwgY2FydElkIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZ2V0KFJlbW92ZUNhcnRFdmVudCkuc3Vic2NyaWJlKCh7IGNhcnRJZCB9KSA9PiB7XG4gICAgICAgIHRoaXMubXVsdGlDYXJ0RmFjYWRlLnJlbW92ZUNhcnQoY2FydElkKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=