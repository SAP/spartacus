/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CurrencySetEvent, GlobalMessageType, LanguageSetEvent, LoadUserPaymentMethodsEvent, OCC_USER_ID_ANONYMOUS, } from '@spartacus/core';
import { merge, Subscription } from 'rxjs';
import { CheckoutPaymentCardTypesQueryReloadEvent, CheckoutPaymentDetailsCreatedEvent, CheckoutPaymentDetailsSetEvent, CheckoutQueryResetEvent, } from './checkout.events';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
/**
 * Checkout payment event listener.
 */
export class CheckoutPaymentEventListener {
    constructor(eventService, globalMessageService) {
        this.eventService = eventService;
        this.globalMessageService = globalMessageService;
        this.subscriptions = new Subscription();
        this.onPaymentCreated();
        this.onPaymentSet();
        this.onGetCardTypesQueryReload();
    }
    onPaymentCreated() {
        this.subscriptions.add(this.eventService
            .get(CheckoutPaymentDetailsCreatedEvent)
            .subscribe(({ userId }) => {
            if (userId !== OCC_USER_ID_ANONYMOUS) {
                this.eventService.dispatch({ userId }, LoadUserPaymentMethodsEvent);
            }
            this.globalMessageService.add({ key: 'paymentForm.paymentAddedSuccessfully' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
        }));
    }
    onPaymentSet() {
        this.subscriptions.add(this.eventService.get(CheckoutPaymentDetailsSetEvent).subscribe(() => {
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
        }));
    }
    onGetCardTypesQueryReload() {
        this.subscriptions.add(merge(this.eventService.get(LanguageSetEvent), this.eventService.get(CurrencySetEvent)).subscribe(() => {
            this.eventService.dispatch({}, CheckoutPaymentCardTypesQueryReloadEvent);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CheckoutPaymentEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentEventListener, deps: [{ token: i1.EventService }, { token: i1.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutPaymentEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i1.GlobalMessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcGF5bWVudC1ldmVudC5saXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iYXNlL3Jvb3QvZXZlbnRzL2NoZWNrb3V0LXBheW1lbnQtZXZlbnQubGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUNMLGdCQUFnQixFQUdoQixpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLDJCQUEyQixFQUMzQixxQkFBcUIsR0FDdEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQ0wsd0NBQXdDLEVBQ3hDLGtDQUFrQyxFQUNsQyw4QkFBOEIsRUFDOUIsdUJBQXVCLEdBQ3hCLE1BQU0sbUJBQW1CLENBQUM7OztBQUUzQjs7R0FFRztBQUlILE1BQU0sT0FBTyw0QkFBNEI7SUFHdkMsWUFDWSxZQUEwQixFQUMxQixvQkFBMEM7UUFEMUMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUo1QyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFNM0MsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFUyxnQkFBZ0I7UUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxZQUFZO2FBQ2QsR0FBRyxDQUFDLGtDQUFrQyxDQUFDO2FBQ3ZDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUN4QixJQUFJLE1BQU0sS0FBSyxxQkFBcUIsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO2FBQ3JFO1lBRUQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDM0IsRUFBRSxHQUFHLEVBQUUsc0NBQXNDLEVBQUUsRUFDL0MsaUJBQWlCLENBQUMscUJBQXFCLENBQ3hDLENBQUM7WUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ0osQ0FBQztJQUVTLFlBQVk7UUFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNuRSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVTLHlCQUF5QjtRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsS0FBSyxDQUNILElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLEVBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQ3hDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUN4QixFQUFFLEVBQ0Ysd0NBQXdDLENBQ3pDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7O3lIQXZEVSw0QkFBNEI7NkhBQTVCLDRCQUE0QixjQUYzQixNQUFNOzJGQUVQLDRCQUE0QjtrQkFIeEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEN1cnJlbmN5U2V0RXZlbnQsXG4gIEV2ZW50U2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBMYW5ndWFnZVNldEV2ZW50LFxuICBMb2FkVXNlclBheW1lbnRNZXRob2RzRXZlbnQsXG4gIE9DQ19VU0VSX0lEX0FOT05ZTU9VUyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IG1lcmdlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIENoZWNrb3V0UGF5bWVudENhcmRUeXBlc1F1ZXJ5UmVsb2FkRXZlbnQsXG4gIENoZWNrb3V0UGF5bWVudERldGFpbHNDcmVhdGVkRXZlbnQsXG4gIENoZWNrb3V0UGF5bWVudERldGFpbHNTZXRFdmVudCxcbiAgQ2hlY2tvdXRRdWVyeVJlc2V0RXZlbnQsXG59IGZyb20gJy4vY2hlY2tvdXQuZXZlbnRzJztcblxuLyoqXG4gKiBDaGVja291dCBwYXltZW50IGV2ZW50IGxpc3RlbmVyLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRQYXltZW50RXZlbnRMaXN0ZW5lciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMub25QYXltZW50Q3JlYXRlZCgpO1xuICAgIHRoaXMub25QYXltZW50U2V0KCk7XG5cbiAgICB0aGlzLm9uR2V0Q2FyZFR5cGVzUXVlcnlSZWxvYWQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvblBheW1lbnRDcmVhdGVkKCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmV2ZW50U2VydmljZVxuICAgICAgICAuZ2V0KENoZWNrb3V0UGF5bWVudERldGFpbHNDcmVhdGVkRXZlbnQpXG4gICAgICAgIC5zdWJzY3JpYmUoKHsgdXNlcklkIH0pID0+IHtcbiAgICAgICAgICBpZiAodXNlcklkICE9PSBPQ0NfVVNFUl9JRF9BTk9OWU1PVVMpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKHsgdXNlcklkIH0sIExvYWRVc2VyUGF5bWVudE1ldGhvZHNFdmVudCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgICAgICB7IGtleTogJ3BheW1lbnRGb3JtLnBheW1lbnRBZGRlZFN1Y2Nlc3NmdWxseScgfSxcbiAgICAgICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0NPTkZJUk1BVElPTlxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2goe30sIENoZWNrb3V0UXVlcnlSZXNldEV2ZW50KTtcbiAgICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uUGF5bWVudFNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZ2V0KENoZWNrb3V0UGF5bWVudERldGFpbHNTZXRFdmVudCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2goe30sIENoZWNrb3V0UXVlcnlSZXNldEV2ZW50KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkdldENhcmRUeXBlc1F1ZXJ5UmVsb2FkKCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBtZXJnZShcbiAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZ2V0KExhbmd1YWdlU2V0RXZlbnQpLFxuICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5nZXQoQ3VycmVuY3lTZXRFdmVudClcbiAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2goXG4gICAgICAgICAge30sXG4gICAgICAgICAgQ2hlY2tvdXRQYXltZW50Q2FyZFR5cGVzUXVlcnlSZWxvYWRFdmVudFxuICAgICAgICApO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==