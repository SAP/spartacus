/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { DeleteCartEvent } from '@spartacus/cart/base/root';
import { DeleteUserAddressEvent, GlobalMessageType, LoadUserAddressesEvent, OCC_USER_ID_ANONYMOUS, UpdateUserAddressEvent, UserAddressEvent, } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CheckoutDeliveryAddressClearedEvent, CheckoutDeliveryAddressCreatedEvent, CheckoutDeliveryAddressSetEvent, CheckoutQueryResetEvent, CheckoutSupportedDeliveryModesQueryResetEvent, } from './checkout.events';
import * as i0 from "@angular/core";
import * as i1 from "../facade/checkout-delivery-address.facade";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/cart/base/root";
/**
 * Checkout delivery address event listener.
 */
export class CheckoutDeliveryAddressEventListener {
    constructor(checkoutDeliveryAddressFacade, eventService, globalMessageService, activeCartFacade) {
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.eventService = eventService;
        this.globalMessageService = globalMessageService;
        this.activeCartFacade = activeCartFacade;
        this.subscriptions = new Subscription();
        this.onDeliveryAddressCreated();
        this.onDeliveryAddressSet();
        this.onDeliveryAddressCleared();
        this.onUserAddressChange();
        this.onCartDeleted();
    }
    /**
     * Registers listeners for the User address events.
     */
    onUserAddressChange() {
        this.subscriptions.add(this.eventService
            .get(UserAddressEvent)
            .pipe(filter((event) => event instanceof UpdateUserAddressEvent ||
            event instanceof DeleteUserAddressEvent), switchMap(({ userId }) => this.activeCartFacade
            .takeActiveCartId()
            .pipe(map((cartId) => ({ cartId, userId })))))
            .subscribe(({ cartId, userId }) => {
            // we want to LL the checkout (if not already loaded), in order to clear the checkout data that's potentially set on the back-end
            this.checkoutDeliveryAddressFacade.clearCheckoutDeliveryAddress();
            this.eventService.dispatch({ cartId, userId }, CheckoutSupportedDeliveryModesQueryResetEvent);
        }));
    }
    onDeliveryAddressCreated() {
        this.subscriptions.add(this.eventService
            .get(CheckoutDeliveryAddressCreatedEvent)
            .subscribe(({ cartId, userId }) => {
            if (userId !== OCC_USER_ID_ANONYMOUS) {
                this.eventService.dispatch({ userId }, LoadUserAddressesEvent);
            }
            this.globalMessageService.add({ key: 'addressForm.userAddressAddSuccess' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
            this.eventService.dispatch({ userId, cartId }, CheckoutSupportedDeliveryModesQueryResetEvent);
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
        }));
    }
    onDeliveryAddressSet() {
        this.subscriptions.add(this.eventService
            .get(CheckoutDeliveryAddressSetEvent)
            .subscribe(({ userId, cartId }) => {
            this.eventService.dispatch({ userId, cartId }, CheckoutSupportedDeliveryModesQueryResetEvent);
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
        }));
    }
    onDeliveryAddressCleared() {
        this.subscriptions.add(this.eventService
            .get(CheckoutDeliveryAddressClearedEvent)
            .subscribe(() => this.eventService.dispatch({}, CheckoutQueryResetEvent)));
    }
    onCartDeleted() {
        this.subscriptions.add(this.eventService
            .get(DeleteCartEvent)
            .subscribe(() => this.eventService.dispatch({}, CheckoutQueryResetEvent)));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CheckoutDeliveryAddressEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressEventListener, deps: [{ token: i1.CheckoutDeliveryAddressFacade }, { token: i2.EventService }, { token: i2.GlobalMessageService }, { token: i3.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutDeliveryAddressEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CheckoutDeliveryAddressFacade }, { type: i2.EventService }, { type: i2.GlobalMessageService }, { type: i3.ActiveCartFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy1ldmVudC5saXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iYXNlL3Jvb3QvZXZlbnRzL2NoZWNrb3V0LWRlbGl2ZXJ5LWFkZHJlc3MtZXZlbnQubGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFvQixlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RSxPQUFPLEVBQ0wsc0JBQXNCLEVBR3RCLGlCQUFpQixFQUNqQixzQkFBc0IsRUFDdEIscUJBQXFCLEVBQ3JCLHNCQUFzQixFQUN0QixnQkFBZ0IsR0FDakIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhELE9BQU8sRUFDTCxtQ0FBbUMsRUFDbkMsbUNBQW1DLEVBQ25DLCtCQUErQixFQUMvQix1QkFBdUIsRUFDdkIsNkNBQTZDLEdBQzlDLE1BQU0sbUJBQW1CLENBQUM7Ozs7O0FBRTNCOztHQUVHO0FBSUgsTUFBTSxPQUFPLG9DQUFvQztJQUcvQyxZQUNZLDZCQUE0RCxFQUM1RCxZQUEwQixFQUMxQixvQkFBMEMsRUFDMUMsZ0JBQWtDO1FBSGxDLGtDQUE2QixHQUE3Qiw2QkFBNkIsQ0FBK0I7UUFDNUQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBTnBDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVEzQyxJQUFJLENBQUMs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LFFBQVEsQ0FBQyxFQUFFLEVBQUUsdUJBQXVCLENBQUMsQ0FDeEQsQ0FDSixDQUFDO0lBQ0osQ0FBQztJQUVTLGFBQWE7UUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxZQUFZO2FBQ2QsR0FBRyxDQUFDLGVBQWUsQ0FBQzthQUNwQixTQUFTLENBQUMsR0FBRyxFQUFFLENBQ2QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLHVCQUF1QixDQUFDLENBQ3hELENBQ0osQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDOztpSUE5R1Usb0NBQW9DO3FJQUFwQyxvQ0FBb0MsY0FGbkMsTUFBTTsyRkFFUCxvQ0FBb0M7a0JBSGhELFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmVDYXJ0RmFjYWRlLCBEZWxldGVDYXJ0RXZlbnQgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIERlbGV0ZVVzZXJBZGRyZXNzRXZlbnQsXG4gIEV2ZW50U2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBMb2FkVXNlckFkZHJlc3Nlc0V2ZW50LFxuICBPQ0NfVVNFUl9JRF9BTk9OWU1PVVMsXG4gIFVwZGF0ZVVzZXJBZGRyZXNzRXZlbnQsXG4gIFVzZXJBZGRyZXNzRXZlbnQsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZSB9IGZyb20gJy4uL2ZhY2FkZS9jaGVja291dC1kZWxpdmVyeS1hZGRyZXNzLmZhY2FkZSc7XG5pbXBvcnQge1xuICBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0NsZWFyZWRFdmVudCxcbiAgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NDcmVhdGVkRXZlbnQsXG4gIENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzU2V0RXZlbnQsXG4gIENoZWNrb3V0UXVlcnlSZXNldEV2ZW50LFxuICBDaGVja291dFN1cHBvcnRlZERlbGl2ZXJ5TW9kZXNRdWVyeVJlc2V0RXZlbnQsXG59IGZyb20gJy4vY2hlY2tvdXQuZXZlbnRzJztcblxuLyoqXG4gKiBDaGVja291dCBkZWxpdmVyeSBhZGRyZXNzIGV2ZW50IGxpc3RlbmVyLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NFdmVudExpc3RlbmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0RGVsaXZlcnlBZGRyZXNzRmFjYWRlOiBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZVxuICApIHtcbiAgICB0aGlzLm9uRGVsaXZlcnlBZGRyZXNzQ3JlYXRlZCgpO1xuICAgIHRoaXMub25EZWxpdmVyeUFkZHJlc3NTZXQoKTtcbiAgICB0aGlzLm9uRGVsaXZlcnlBZGRyZXNzQ2xlYXJlZCgpO1xuXG4gICAgdGhpcy5vblVzZXJBZGRyZXNzQ2hhbmdlKCk7XG5cbiAgICB0aGlzLm9uQ2FydERlbGV0ZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgbGlzdGVuZXJzIGZvciB0aGUgVXNlciBhZGRyZXNzIGV2ZW50cy5cbiAgICovXG4gIHByb3RlY3RlZCBvblVzZXJBZGRyZXNzQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmV2ZW50U2VydmljZVxuICAgICAgICAuZ2V0KFVzZXJBZGRyZXNzRXZlbnQpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcihcbiAgICAgICAgICAgIChldmVudCkgPT5cbiAgICAgICAgICAgICAgZXZlbnQgaW5zdGFuY2VvZiBVcGRhdGVVc2VyQWRkcmVzc0V2ZW50IHx8XG4gICAgICAgICAgICAgIGV2ZW50IGluc3RhbmNlb2YgRGVsZXRlVXNlckFkZHJlc3NFdmVudFxuICAgICAgICAgICksXG4gICAgICAgICAgc3dpdGNoTWFwKCh7IHVzZXJJZCB9KSA9PlxuICAgICAgICAgICAgdGhpcy5hY3RpdmVDYXJ0RmFjYWRlXG4gICAgICAgICAgICAgIC50YWtlQWN0aXZlQ2FydElkKClcbiAgICAgICAgICAgICAgLnBpcGUobWFwKChjYXJ0SWQpID0+ICh7IGNhcnRJZCwgdXNlcklkIH0pKSlcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoeyBjYXJ0SWQsIHVzZXJJZCB9KSA9PiB7XG4gICAgICAgICAgLy8gd2Ugd2FudCB0byBMTCB0aGUgY2hlY2tvdXQgKGlmIG5vdCBhbHJlYWR5IGxvYWRlZCksIGluIG9yZGVyIHRvIGNsZWFyIHRoZSBjaGVja291dCBkYXRhIHRoYXQncyBwb3RlbnRpYWxseSBzZXQgb24gdGhlIGJhY2stZW5kXG4gICAgICAgICAgdGhpcy5jaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZS5jbGVhckNoZWNrb3V0RGVsaXZlcnlBZGRyZXNzKCk7XG5cbiAgICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5kaXNwYXRjaChcbiAgICAgICAgICAgIHsgY2FydElkLCB1c2VySWQgfSxcbiAgICAgICAgICAgIENoZWNrb3V0U3VwcG9ydGVkRGVsaXZlcnlNb2Rlc1F1ZXJ5UmVzZXRFdmVudFxuICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkRlbGl2ZXJ5QWRkcmVzc0NyZWF0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlXG4gICAgICAgIC5nZXQoQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NDcmVhdGVkRXZlbnQpXG4gICAgICAgIC5zdWJzY3JpYmUoKHsgY2FydElkLCB1c2VySWQgfSkgPT4ge1xuICAgICAgICAgIGlmICh1c2VySWQgIT09IE9DQ19VU0VSX0lEX0FOT05ZTU9VUykge1xuICAgICAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2goeyB1c2VySWQgfSwgTG9hZFVzZXJBZGRyZXNzZXNFdmVudCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgICAgICB7IGtleTogJ2FkZHJlc3NGb3JtLnVzZXJBZGRyZXNzQWRkU3VjY2VzcycgfSxcbiAgICAgICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0NPTkZJUk1BVElPTlxuICAgICAgICAgICk7XG5cbiAgICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5kaXNwYXRjaChcbiAgICAgICAgICAgIHsgdXNlcklkLCBjYXJ0SWQgfSxcbiAgICAgICAgICAgIENoZWNrb3V0U3VwcG9ydGVkRGVsaXZlcnlNb2Rlc1F1ZXJ5UmVzZXRFdmVudFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5kaXNwYXRjaCh7fSwgQ2hlY2tvdXRRdWVyeVJlc2V0RXZlbnQpO1xuICAgICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25EZWxpdmVyeUFkZHJlc3NTZXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlXG4gICAgICAgIC5nZXQoQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NTZXRFdmVudClcbiAgICAgICAgLnN1YnNjcmliZSgoeyB1c2VySWQsIGNhcnRJZCB9KSA9PiB7XG4gICAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2goXG4gICAgICAgICAgICB7IHVzZXJJZCwgY2FydElkIH0sXG4gICAgICAgICAgICBDaGVja291dFN1cHBvcnRlZERlbGl2ZXJ5TW9kZXNRdWVyeVJlc2V0RXZlbnRcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2goe30sIENoZWNrb3V0UXVlcnlSZXNldEV2ZW50KTtcbiAgICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uRGVsaXZlcnlBZGRyZXNzQ2xlYXJlZCgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5ldmVudFNlcnZpY2VcbiAgICAgICAgLmdldChDaGVja291dERlbGl2ZXJ5QWRkcmVzc0NsZWFyZWRFdmVudClcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PlxuICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKHt9LCBDaGVja291dFF1ZXJ5UmVzZXRFdmVudClcbiAgICAgICAgKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25DYXJ0RGVsZXRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5ldmVudFNlcnZpY2VcbiAgICAgICAgLmdldChEZWxldGVDYXJ0RXZlbnQpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT5cbiAgICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5kaXNwYXRjaCh7fSwgQ2hlY2tvdXRRdWVyeVJlc2V0RXZlbnQpXG4gICAgICAgIClcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==