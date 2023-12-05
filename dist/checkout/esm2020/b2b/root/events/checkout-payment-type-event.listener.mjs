/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CheckoutQueryResetEvent, CheckoutSupportedDeliveryModesQueryResetEvent, } from '@spartacus/checkout/base/root';
import { CurrencySetEvent, LanguageSetEvent, LoginEvent, LogoutEvent, } from '@spartacus/core';
import { merge, Subscription } from 'rxjs';
import { CheckoutPaymentTypeSetEvent, CheckoutPaymentTypesQueryReloadEvent, CheckoutPaymentTypesQueryResetEvent, } from './checkout-b2b.events';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class CheckoutPaymentTypeEventListener {
    constructor(eventService) {
        this.eventService = eventService;
        this.subscriptions = new Subscription();
        this.onPaymentTypeSet();
        this.onGetPaymentTypesQueryReload();
        this.onGetPaymentTypesQueryReset();
    }
    onPaymentTypeSet() {
        this.subscriptions.add(this.eventService
            .get(CheckoutPaymentTypeSetEvent)
            .subscribe(({ userId, cartId }) => {
            this.eventService.dispatch({ userId, cartId }, CheckoutSupportedDeliveryModesQueryResetEvent);
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
        }));
    }
    onGetPaymentTypesQueryReload() {
        this.subscriptions.add(merge(this.eventService.get(LanguageSetEvent), this.eventService.get(CurrencySetEvent)).subscribe(() => {
            this.eventService.dispatch({}, CheckoutPaymentTypesQueryReloadEvent);
        }));
    }
    onGetPaymentTypesQueryReset() {
        this.subscriptions.add(merge(this.eventService.get(LogoutEvent), this.eventService.get(LoginEvent)).subscribe(() => {
            this.eventService.dispatch({}, CheckoutPaymentTypesQueryResetEvent);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CheckoutPaymentTypeEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeEventListener, deps: [{ token: i1.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutPaymentTypeEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcGF5bWVudC10eXBlLWV2ZW50Lmxpc3RlbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2IyYi9yb290L2V2ZW50cy9jaGVja291dC1wYXltZW50LXR5cGUtZXZlbnQubGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUNMLHVCQUF1QixFQUN2Qiw2Q0FBNkMsR0FDOUMsTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLEVBQ0wsZ0JBQWdCLEVBRWhCLGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsV0FBVyxHQUNaLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUNMLDJCQUEyQixFQUMzQixvQ0FBb0MsRUFDcEMsbUNBQW1DLEdBQ3BDLE1BQU0sdUJBQXVCLENBQUM7OztBQUsvQixNQUFNLE9BQU8sZ0NBQWdDO0lBRzNDLFlBQXNCLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBRnRDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUczQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRVMsZ0JBQWdCO1FBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsWUFBWTthQUNkLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQzthQUNoQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUN4QixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFDbEIsNkNBQTZDLENBQzlDLENBQUM7WUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ0osQ0FBQztJQUVTLDRCQUE0QjtRQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsS0FBSyxDQUNILElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLEVBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQ3hDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxvQ0FBb0MsQ0FBQyxDQUFDO1FBQ3ZFLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRVMsMkJBQTJCO1FBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixLQUFLLENBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUNsQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDZixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztRQUN0RSxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7OzZIQWhEVSxnQ0FBZ0M7aUlBQWhDLGdDQUFnQyxjQUYvQixNQUFNOzJGQUVQLGdDQUFnQztrQkFINUMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENoZWNrb3V0UXVlcnlSZXNldEV2ZW50LFxuICBDaGVja291dFN1cHBvcnRlZERlbGl2ZXJ5TW9kZXNRdWVyeVJlc2V0RXZlbnQsXG59IGZyb20gJ0BzcGFydGFjdXMvY2hlY2tvdXQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIEN1cnJlbmN5U2V0RXZlbnQsXG4gIEV2ZW50U2VydmljZSxcbiAgTGFuZ3VhZ2VTZXRFdmVudCxcbiAgTG9naW5FdmVudCxcbiAgTG9nb3V0RXZlbnQsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBDaGVja291dFBheW1lbnRUeXBlU2V0RXZlbnQsXG4gIENoZWNrb3V0UGF5bWVudFR5cGVzUXVlcnlSZWxvYWRFdmVudCxcbiAgQ2hlY2tvdXRQYXltZW50VHlwZXNRdWVyeVJlc2V0RXZlbnQsXG59IGZyb20gJy4vY2hlY2tvdXQtYjJiLmV2ZW50cyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dFBheW1lbnRUeXBlRXZlbnRMaXN0ZW5lciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZSkge1xuICAgIHRoaXMub25QYXltZW50VHlwZVNldCgpO1xuXG4gICAgdGhpcy5vbkdldFBheW1lbnRUeXBlc1F1ZXJ5UmVsb2FkKCk7XG4gICAgdGhpcy5vbkdldFBheW1lbnRUeXBlc1F1ZXJ5UmVzZXQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvblBheW1lbnRUeXBlU2V0KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmV2ZW50U2VydmljZVxuICAgICAgICAuZ2V0KENoZWNrb3V0UGF5bWVudFR5cGVTZXRFdmVudClcbiAgICAgICAgLnN1YnNjcmliZSgoeyB1c2VySWQsIGNhcnRJZCB9KSA9PiB7XG4gICAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2goXG4gICAgICAgICAgICB7IHVzZXJJZCwgY2FydElkIH0sXG4gICAgICAgICAgICBDaGVja291dFN1cHBvcnRlZERlbGl2ZXJ5TW9kZXNRdWVyeVJlc2V0RXZlbnRcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKHt9LCBDaGVja291dFF1ZXJ5UmVzZXRFdmVudCk7XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkdldFBheW1lbnRUeXBlc1F1ZXJ5UmVsb2FkKCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBtZXJnZShcbiAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZ2V0KExhbmd1YWdlU2V0RXZlbnQpLFxuICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5nZXQoQ3VycmVuY3lTZXRFdmVudClcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2goe30sIENoZWNrb3V0UGF5bWVudFR5cGVzUXVlcnlSZWxvYWRFdmVudCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25HZXRQYXltZW50VHlwZXNRdWVyeVJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBtZXJnZShcbiAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZ2V0KExvZ291dEV2ZW50KSxcbiAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZ2V0KExvZ2luRXZlbnQpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKHt9LCBDaGVja291dFBheW1lbnRUeXBlc1F1ZXJ5UmVzZXRFdmVudCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19