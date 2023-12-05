/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { RemoveCartEvent } from '@spartacus/cart/base/root';
import { CheckoutQueryResetEvent } from '@spartacus/checkout/base/root';
import { ReplenishmentOrderScheduledEvent } from '@spartacus/order/root';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class CheckoutScheduledReplenishmentEventListener {
    constructor(eventService) {
        this.eventService = eventService;
        this.subscriptions = new Subscription();
        this.onReplenishmentOrder();
    }
    onReplenishmentOrder() {
        this.subscriptions.add(this.eventService
            .get(ReplenishmentOrderScheduledEvent)
            .subscribe(({ userId, cartId, cartCode }) => {
            this.eventService.dispatch({
                userId,
                cartId,
                cartCode,
            }, RemoveCartEvent);
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CheckoutScheduledReplenishmentEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentEventListener, deps: [{ token: i1.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutScheduledReplenishmentEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtc2NoZWR1bGVkLXJlcGxlbmlzaG1lbnQtZXZlbnQubGlzdGVuZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvc2NoZWR1bGVkLXJlcGxlbmlzaG1lbnQvcm9vdC9ldmVudHMvY2hlY2tvdXQtc2NoZWR1bGVkLXJlcGxlbmlzaG1lbnQtZXZlbnQubGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRXhFLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQUtwQyxNQUFNLE9BQU8sMkNBQTJDO0lBR3RELFlBQXNCLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBRnRDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUczQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRVMsb0JBQW9CO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsWUFBWTthQUNkLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQzthQUNyQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtZQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FDeEI7Z0JBQ0UsTUFBTTtnQkFDTixNQUFNO2dCQUNOLFFBQVE7YUFDVCxFQUNELGVBQWUsQ0FDaEIsQ0FBQztZQUVGLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7d0lBNUJVLDJDQUEyQzs0SUFBM0MsMkNBQTJDLGNBRjFDLE1BQU07MkZBRVAsMkNBQTJDO2tCQUh2RCxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVtb3ZlQ2FydEV2ZW50IH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBDaGVja291dFF1ZXJ5UmVzZXRFdmVudCB9IGZyb20gJ0BzcGFydGFjdXMvY2hlY2tvdXQvYmFzZS9yb290JztcbmltcG9ydCB7IEV2ZW50U2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBSZXBsZW5pc2htZW50T3JkZXJTY2hlZHVsZWRFdmVudCB9IGZyb20gJ0BzcGFydGFjdXMvb3JkZXIvcm9vdCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0U2NoZWR1bGVkUmVwbGVuaXNobWVudEV2ZW50TGlzdGVuZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2UpIHtcbiAgICB0aGlzLm9uUmVwbGVuaXNobWVudE9yZGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25SZXBsZW5pc2htZW50T3JkZXIoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlXG4gICAgICAgIC5nZXQoUmVwbGVuaXNobWVudE9yZGVyU2NoZWR1bGVkRXZlbnQpXG4gICAgICAgIC5zdWJzY3JpYmUoKHsgdXNlcklkLCBjYXJ0SWQsIGNhcnRDb2RlIH0pID0+IHtcbiAgICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5kaXNwYXRjaChcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgICBjYXJ0SWQsXG4gICAgICAgICAgICAgIGNhcnRDb2RlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFJlbW92ZUNhcnRFdmVudFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5kaXNwYXRjaCh7fSwgQ2hlY2tvdXRRdWVyeVJlc2V0RXZlbnQpO1xuICAgICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19