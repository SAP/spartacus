/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CheckoutQueryResetEvent, CheckoutSupportedDeliveryModesQueryResetEvent, } from '@spartacus/checkout/base/root';
import { Subscription } from 'rxjs';
import { CheckoutCostCenterSetEvent } from './checkout-b2b.events';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class CheckoutCostCenterEventListener {
    constructor(eventService) {
        this.eventService = eventService;
        this.subscriptions = new Subscription();
        this.onCostCenterSet();
    }
    onCostCenterSet() {
        this.subscriptions.add(this.eventService
            .get(CheckoutCostCenterSetEvent)
            .subscribe(({ cartId, userId }) => {
            this.eventService.dispatch({ cartId, userId }, CheckoutSupportedDeliveryModesQueryResetEvent);
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CheckoutCostCenterEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterEventListener, deps: [{ token: i1.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutCostCenterEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtY29zdC1jZW50ZXItZXZlbnQubGlzdGVuZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYjJiL3Jvb3QvZXZlbnRzL2NoZWNrb3V0LWNvc3QtY2VudGVyLWV2ZW50Lmxpc3RlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsNkNBQTZDLEdBQzlDLE1BQU0sK0JBQStCLENBQUM7QUFFdkMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7O0FBS25FLE1BQU0sT0FBTywrQkFBK0I7SUFHMUMsWUFBc0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFGdEMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRzNDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRVMsZUFBZTtRQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLFlBQVk7YUFDZCxHQUFHLENBQUMsMEJBQTBCLENBQUM7YUFDL0IsU0FBUyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FDeEIsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQ2xCLDZDQUE2QyxDQUM5QyxDQUFDO1lBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDMUQsQ0FBQyxDQUFDLENBQ0wsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzs0SEF2QlUsK0JBQStCO2dJQUEvQiwrQkFBK0IsY0FGOUIsTUFBTTsyRkFFUCwrQkFBK0I7a0JBSDNDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDaGVja291dFF1ZXJ5UmVzZXRFdmVudCxcbiAgQ2hlY2tvdXRTdXBwb3J0ZWREZWxpdmVyeU1vZGVzUXVlcnlSZXNldEV2ZW50LFxufSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBFdmVudFNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDaGVja291dENvc3RDZW50ZXJTZXRFdmVudCB9IGZyb20gJy4vY2hlY2tvdXQtYjJiLmV2ZW50cyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dENvc3RDZW50ZXJFdmVudExpc3RlbmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGV2ZW50U2VydmljZTogRXZlbnRTZXJ2aWNlKSB7XG4gICAgdGhpcy5vbkNvc3RDZW50ZXJTZXQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkNvc3RDZW50ZXJTZXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlXG4gICAgICAgIC5nZXQoQ2hlY2tvdXRDb3N0Q2VudGVyU2V0RXZlbnQpXG4gICAgICAgIC5zdWJzY3JpYmUoKHsgY2FydElkLCB1c2VySWQgfSkgPT4ge1xuICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKFxuICAgICAgICAgICAgeyBjYXJ0SWQsIHVzZXJJZCB9LFxuICAgICAgICAgICAgQ2hlY2tvdXRTdXBwb3J0ZWREZWxpdmVyeU1vZGVzUXVlcnlSZXNldEV2ZW50XG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5kaXNwYXRjaCh7fSwgQ2hlY2tvdXRRdWVyeVJlc2V0RXZlbnQpO1xuICAgICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19