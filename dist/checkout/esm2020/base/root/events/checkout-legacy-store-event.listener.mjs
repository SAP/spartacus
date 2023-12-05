/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { LoadUserAddressesEvent, LoadUserPaymentMethodsEvent, UserActions, } from '@spartacus/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@ngrx/store";
/**
 * The event listener which dispatches legacy store actions.
 * It will be removed as soon as the legacy store is removed.
 */
// TODO:#deprecation-checkout remove once all the features using store are switched to c&q
export class CheckoutLegacyStoreEventListener {
    constructor(eventService, store) {
        this.eventService = eventService;
        this.store = store;
        this.subscriptions = new Subscription();
        this.onUserAddressAction();
        this.onUserPaymentAction();
    }
    /**
     * Registers events for the user address actions.
     */
    onUserAddressAction() {
        this.subscriptions.add(this.eventService.get(LoadUserAddressesEvent).subscribe(({ userId }) => {
            /**
             * TODO:#deprecation-checkout We have to keep this here, since the user address feature is still ngrx-based.
             * Remove once it is switched from ngrx to c&q.
             * We should dispatch an event, which will reload the userAddress$ query.
             */
            this.store.dispatch(new UserActions.LoadUserAddresses(userId));
        }));
    }
    /**
     * Registers events for the user payment actions.
     */
    onUserPaymentAction() {
        this.subscriptions.add(this.eventService
            .get(LoadUserPaymentMethodsEvent)
            .subscribe(({ userId }) => {
            this.store.dispatch(
            /**
             * TODO:#deprecation-checkout We have to keep this here, since the user payment feature is still ngrx-based.
             * Remove once it is switched from ngrx to c&q.
             * We should dispatch an event, which will load the userPayment$ query.
             */
            new UserActions.LoadUserPaymentMethods(userId));
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CheckoutLegacyStoreEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutLegacyStoreEventListener, deps: [{ token: i1.EventService }, { token: i2.Store }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutLegacyStoreEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutLegacyStoreEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutLegacyStoreEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i2.Store }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtbGVnYWN5LXN0b3JlLWV2ZW50Lmxpc3RlbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2Jhc2Uvcm9vdC9ldmVudHMvY2hlY2tvdXQtbGVnYWN5LXN0b3JlLWV2ZW50Lmxpc3RlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRXRELE9BQU8sRUFFTCxzQkFBc0IsRUFDdEIsMkJBQTJCLEVBQzNCLFdBQVcsR0FDWixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFFcEM7OztHQUdHO0FBQ0gsMEZBQTBGO0FBSTFGLE1BQU0sT0FBTyxnQ0FBZ0M7SUFHM0MsWUFDWSxZQUEwQixFQUMxQixLQUFxQjtRQURyQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUp2QixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFNM0MsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVEOztPQUVHO0lBQ08sbUJBQW1CO1FBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUNyRTs7OztlQUlHO1lBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxXQUFXLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ08sbUJBQW1CO1FBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsWUFBWTthQUNkLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQzthQUNoQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQ2pCOzs7O2VBSUc7WUFDSCxJQUFJLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FDL0MsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7NkhBakRVLGdDQUFnQztpSUFBaEMsZ0NBQWdDLGNBRi9CLE1BQU07MkZBRVAsZ0NBQWdDO2tCQUg1QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQge1xuICBFdmVudFNlcnZpY2UsXG4gIExvYWRVc2VyQWRkcmVzc2VzRXZlbnQsXG4gIExvYWRVc2VyUGF5bWVudE1ldGhvZHNFdmVudCxcbiAgVXNlckFjdGlvbnMsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBUaGUgZXZlbnQgbGlzdGVuZXIgd2hpY2ggZGlzcGF0Y2hlcyBsZWdhY3kgc3RvcmUgYWN0aW9ucy5cbiAqIEl0IHdpbGwgYmUgcmVtb3ZlZCBhcyBzb29uIGFzIHRoZSBsZWdhY3kgc3RvcmUgaXMgcmVtb3ZlZC5cbiAqL1xuLy8gVE9ETzojZGVwcmVjYXRpb24tY2hlY2tvdXQgcmVtb3ZlIG9uY2UgYWxsIHRoZSBmZWF0dXJlcyB1c2luZyBzdG9yZSBhcmUgc3dpdGNoZWQgdG8gYyZxXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRMZWdhY3lTdG9yZUV2ZW50TGlzdGVuZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHN0b3JlOiBTdG9yZTx1bmtub3duPlxuICApIHtcbiAgICB0aGlzLm9uVXNlckFkZHJlc3NBY3Rpb24oKTtcbiAgICB0aGlzLm9uVXNlclBheW1lbnRBY3Rpb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgZXZlbnRzIGZvciB0aGUgdXNlciBhZGRyZXNzIGFjdGlvbnMuXG4gICAqL1xuICBwcm90ZWN0ZWQgb25Vc2VyQWRkcmVzc0FjdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZ2V0KExvYWRVc2VyQWRkcmVzc2VzRXZlbnQpLnN1YnNjcmliZSgoeyB1c2VySWQgfSkgPT4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogVE9ETzojZGVwcmVjYXRpb24tY2hlY2tvdXQgV2UgaGF2ZSB0byBrZWVwIHRoaXMgaGVyZSwgc2luY2UgdGhlIHVzZXIgYWRkcmVzcyBmZWF0dXJlIGlzIHN0aWxsIG5ncngtYmFzZWQuXG4gICAgICAgICAqIFJlbW92ZSBvbmNlIGl0IGlzIHN3aXRjaGVkIGZyb20gbmdyeCB0byBjJnEuXG4gICAgICAgICAqIFdlIHNob3VsZCBkaXNwYXRjaCBhbiBldmVudCwgd2hpY2ggd2lsbCByZWxvYWQgdGhlIHVzZXJBZGRyZXNzJCBxdWVyeS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IFVzZXJBY3Rpb25zLkxvYWRVc2VyQWRkcmVzc2VzKHVzZXJJZCkpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBldmVudHMgZm9yIHRoZSB1c2VyIHBheW1lbnQgYWN0aW9ucy5cbiAgICovXG4gIHByb3RlY3RlZCBvblVzZXJQYXltZW50QWN0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmV2ZW50U2VydmljZVxuICAgICAgICAuZ2V0KExvYWRVc2VyUGF5bWVudE1ldGhvZHNFdmVudClcbiAgICAgICAgLnN1YnNjcmliZSgoeyB1c2VySWQgfSkgPT4ge1xuICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRPRE86I2RlcHJlY2F0aW9uLWNoZWNrb3V0IFdlIGhhdmUgdG8ga2VlcCB0aGlzIGhlcmUsIHNpbmNlIHRoZSB1c2VyIHBheW1lbnQgZmVhdHVyZSBpcyBzdGlsbCBuZ3J4LWJhc2VkLlxuICAgICAgICAgICAgICogUmVtb3ZlIG9uY2UgaXQgaXMgc3dpdGNoZWQgZnJvbSBuZ3J4IHRvIGMmcS5cbiAgICAgICAgICAgICAqIFdlIHNob3VsZCBkaXNwYXRjaCBhbiBldmVudCwgd2hpY2ggd2lsbCBsb2FkIHRoZSB1c2VyUGF5bWVudCQgcXVlcnkuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG5ldyBVc2VyQWN0aW9ucy5Mb2FkVXNlclBheW1lbnRNZXRob2RzKHVzZXJJZClcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19