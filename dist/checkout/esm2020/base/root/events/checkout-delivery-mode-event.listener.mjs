/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { LoadCartEvent } from '@spartacus/cart/base/root';
import { CurrencySetEvent, LanguageSetEvent, LoginEvent, LogoutEvent, } from '@spartacus/core';
import { merge, Subscription } from 'rxjs';
import { CheckoutDeliveryModeClearedErrorEvent, CheckoutDeliveryModeClearedEvent, CheckoutDeliveryModeSetEvent, CheckoutQueryResetEvent, CheckoutSupportedDeliveryModesQueryReloadEvent, CheckoutSupportedDeliveryModesQueryResetEvent, } from './checkout.events';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
/**
 * Checkout delivery mode event listener.
 */
export class CheckoutDeliveryModeEventListener {
    constructor(eventService) {
        this.eventService = eventService;
        this.subscriptions = new Subscription();
        this.onDeliveryModeSet();
        this.onDeliveryModeCleared();
        this.onDeliveryModeClearedError();
        this.onDeliveryModeReset();
        this.onGetSupportedDeliveryModesQueryReload();
        this.onGetSupportedDeliveryModesQueryReset();
    }
    onDeliveryModeSet() {
        this.subscriptions.add(this.eventService
            .get(CheckoutDeliveryModeSetEvent)
            .subscribe(({ userId, cartId, cartCode }) => {
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
            this.eventService.dispatch({
                userId,
                cartId,
                cartCode,
            }, LoadCartEvent);
        }));
    }
    onDeliveryModeCleared() {
        this.subscriptions.add(this.eventService
            .get(CheckoutDeliveryModeClearedEvent)
            .subscribe(({ userId, cartId, cartCode }) => {
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
            this.eventService.dispatch({
                userId,
                cartId,
                cartCode,
            }, LoadCartEvent);
        }));
    }
    onDeliveryModeClearedError() {
        this.subscriptions.add(this.eventService
            .get(CheckoutDeliveryModeClearedErrorEvent)
            .subscribe(({ userId, cartId, cartCode }) => {
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
            this.eventService.dispatch({
                userId,
                cartId,
                cartCode,
            }, LoadCartEvent);
        }));
    }
    /**
     * Registers listeners for the delivery mode clear event.
     * This is needed for when `CheckoutSupportedDeliveryModesQueryResetEvent` is dispatched
     * as we need to update the user's cart when the delivery mode is cleared from the backend checkout details.
     */
    onDeliveryModeReset() {
        this.subscriptions.add(this.eventService
            .get(CheckoutSupportedDeliveryModesQueryResetEvent)
            .subscribe(({ userId, cartId }) => this.eventService.dispatch({
            userId,
            cartId,
            /**
             * As we know the cart is not anonymous (precondition checked),
             * we can safely use the cartId, which is actually the cart.code.
             */
            cartCode: cartId,
        }, LoadCartEvent)));
    }
    onGetSupportedDeliveryModesQueryReload() {
        this.subscriptions.add(merge(this.eventService.get(LanguageSetEvent), this.eventService.get(CurrencySetEvent)).subscribe(() => {
            this.eventService.dispatch({}, CheckoutSupportedDeliveryModesQueryReloadEvent);
        }));
    }
    onGetSupportedDeliveryModesQueryReset() {
        this.subscriptions.add(merge(this.eventService.get(LogoutEvent), this.eventService.get(LoginEvent)).subscribe(() => {
            this.eventService.dispatch({}, CheckoutSupportedDeliveryModesQueryResetEvent);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CheckoutDeliveryModeEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModeEventListener, deps: [{ token: i1.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutDeliveryModeEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModeEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModeEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtZGVsaXZlcnktbW9kZS1ldmVudC5saXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iYXNlL3Jvb3QvZXZlbnRzL2NoZWNrb3V0LWRlbGl2ZXJ5LW1vZGUtZXZlbnQubGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFDTCxnQkFBZ0IsRUFFaEIsZ0JBQWdCLEVBQ2hCLFVBQVUsRUFDVixXQUFXLEdBQ1osTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQ0wscUNBQXFDLEVBQ3JDLGdDQUFnQyxFQUNoQyw0QkFBNEIsRUFDNUIsdUJBQXVCLEVBQ3ZCLDhDQUE4QyxFQUM5Qyw2Q0FBNkMsR0FDOUMsTUFBTSxtQkFBbUIsQ0FBQzs7O0FBRTNCOztHQUVHO0FBSUgsTUFBTSxPQUFPLGlDQUFpQztJQUc1QyxZQUFzQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUZ0QyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFHM0MsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFM0IsSUFBSSxDQUFDLHNDQUFzQyxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLHFDQUFxQyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVTLGlCQUFpQjtRQUN6QixJQUFJ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QUMsUUFBUSxDQUN4QixFQUFFLEVBQ0YsNkNBQTZDLENBQzlDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7OzhIQTlIVSxpQ0FBaUM7a0lBQWpDLGlDQUFpQyxjQUZoQyxNQUFNOzJGQUVQLGlDQUFpQztrQkFIN0MsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvYWRDYXJ0RXZlbnQgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIEN1cnJlbmN5U2V0RXZlbnQsXG4gIEV2ZW50U2VydmljZSxcbiAgTGFuZ3VhZ2VTZXRFdmVudCxcbiAgTG9naW5FdmVudCxcbiAgTG9nb3V0RXZlbnQsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBDaGVja291dERlbGl2ZXJ5TW9kZUNsZWFyZWRFcnJvckV2ZW50LFxuICBDaGVja291dERlbGl2ZXJ5TW9kZUNsZWFyZWRFdmVudCxcbiAgQ2hlY2tvdXREZWxpdmVyeU1vZGVTZXRFdmVudCxcbiAgQ2hlY2tvdXRRdWVyeVJlc2V0RXZlbnQsXG4gIENoZWNrb3V0U3VwcG9ydGVkRGVsaXZlcnlNb2Rlc1F1ZXJ5UmVsb2FkRXZlbnQsXG4gIENoZWNrb3V0U3VwcG9ydGVkRGVsaXZlcnlNb2Rlc1F1ZXJ5UmVzZXRFdmVudCxcbn0gZnJvbSAnLi9jaGVja291dC5ldmVudHMnO1xuXG4vKipcbiAqIENoZWNrb3V0IGRlbGl2ZXJ5IG1vZGUgZXZlbnQgbGlzdGVuZXIuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dERlbGl2ZXJ5TW9kZUV2ZW50TGlzdGVuZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2UpIHtcbiAgICB0aGlzLm9uRGVsaXZlcnlNb2RlU2V0KCk7XG4gICAgdGhpcy5vbkRlbGl2ZXJ5TW9kZUNsZWFyZWQoKTtcbiAgICB0aGlzLm9uRGVsaXZlcnlNb2RlQ2xlYXJlZEVycm9yKCk7XG4gICAgdGhpcy5vbkRlbGl2ZXJ5TW9kZVJlc2V0KCk7XG5cbiAgICB0aGlzLm9uR2V0U3VwcG9ydGVkRGVsaXZlcnlNb2Rlc1F1ZXJ5UmVsb2FkKCk7XG4gICAgdGhpcy5vbkdldFN1cHBvcnRlZERlbGl2ZXJ5TW9kZXNRdWVyeVJlc2V0KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25EZWxpdmVyeU1vZGVTZXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlXG4gICAgICAgIC5nZXQoQ2hlY2tvdXREZWxpdmVyeU1vZGVTZXRFdmVudClcbiAgICAgICAgLnN1YnNjcmliZSgoeyB1c2VySWQsIGNhcnRJZCwgY2FydENvZGUgfSkgPT4ge1xuICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKHt9LCBDaGVja291dFF1ZXJ5UmVzZXRFdmVudCk7XG5cbiAgICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5kaXNwYXRjaChcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgICBjYXJ0SWQsXG4gICAgICAgICAgICAgIGNhcnRDb2RlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIExvYWRDYXJ0RXZlbnRcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25EZWxpdmVyeU1vZGVDbGVhcmVkKCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmV2ZW50U2VydmljZVxuICAgICAgICAuZ2V0KENoZWNrb3V0RGVsaXZlcnlNb2RlQ2xlYXJlZEV2ZW50KVxuICAgICAgICAuc3Vic2NyaWJlKCh7IHVzZXJJZCwgY2FydElkLCBjYXJ0Q29kZSB9KSA9PiB7XG4gICAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2goe30sIENoZWNrb3V0UXVlcnlSZXNldEV2ZW50KTtcblxuICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICAgIGNhcnRJZCxcbiAgICAgICAgICAgICAgY2FydENvZGUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgTG9hZENhcnRFdmVudFxuICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkRlbGl2ZXJ5TW9kZUNsZWFyZWRFcnJvcigpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5ldmVudFNlcnZpY2VcbiAgICAgICAgLmdldChDaGVja291dERlbGl2ZXJ5TW9kZUNsZWFyZWRFcnJvckV2ZW50KVxuICAgICAgICAuc3Vic2NyaWJlKCh7IHVzZXJJZCwgY2FydElkLCBjYXJ0Q29kZSB9KSA9PiB7XG4gICAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2goe30sIENoZWNrb3V0UXVlcnlSZXNldEV2ZW50KTtcblxuICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICAgIGNhcnRJZCxcbiAgICAgICAgICAgICAgY2FydENvZGUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgTG9hZENhcnRFdmVudFxuICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgbGlzdGVuZXJzIGZvciB0aGUgZGVsaXZlcnkgbW9kZSBjbGVhciBldmVudC5cbiAgICogVGhpcyBpcyBuZWVkZWQgZm9yIHdoZW4gYENoZWNrb3V0U3VwcG9ydGVkRGVsaXZlcnlNb2Rlc1F1ZXJ5UmVzZXRFdmVudGAgaXMgZGlzcGF0Y2hlZFxuICAgKiBhcyB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGUgdXNlcidzIGNhcnQgd2hlbiB0aGUgZGVsaXZlcnkgbW9kZSBpcyBjbGVhcmVkIGZyb20gdGhlIGJhY2tlbmQgY2hlY2tvdXQgZGV0YWlscy5cbiAgICovXG4gIHByb3RlY3RlZCBvbkRlbGl2ZXJ5TW9kZVJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmV2ZW50U2VydmljZVxuICAgICAgICAuZ2V0KENoZWNrb3V0U3VwcG9ydGVkRGVsaXZlcnlNb2Rlc1F1ZXJ5UmVzZXRFdmVudClcbiAgICAgICAgLnN1YnNjcmliZSgoeyB1c2VySWQsIGNhcnRJZCB9KSA9PlxuICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICAgIGNhcnRJZCxcbiAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAqIEFzIHdlIGtub3cgdGhlIGNhcnQgaXMgbm90IGFub255bW91cyAocHJlY29uZGl0aW9uIGNoZWNrZWQpLFxuICAgICAgICAgICAgICAgKiB3ZSBjYW4gc2FmZWx5IHVzZSB0aGUgY2FydElkLCB3aGljaCBpcyBhY3R1YWxseSB0aGUgY2FydC5jb2RlLlxuICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgY2FydENvZGU6IGNhcnRJZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBMb2FkQ2FydEV2ZW50XG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkdldFN1cHBvcnRlZERlbGl2ZXJ5TW9kZXNRdWVyeVJlbG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgbWVyZ2UoXG4gICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChMYW5ndWFnZVNldEV2ZW50KSxcbiAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZ2V0KEN1cnJlbmN5U2V0RXZlbnQpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIENoZWNrb3V0U3VwcG9ydGVkRGVsaXZlcnlNb2Rlc1F1ZXJ5UmVsb2FkRXZlbnRcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkdldFN1cHBvcnRlZERlbGl2ZXJ5TW9kZXNRdWVyeVJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBtZXJnZShcbiAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZ2V0KExvZ291dEV2ZW50KSxcbiAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZ2V0KExvZ2luRXZlbnQpXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIENoZWNrb3V0U3VwcG9ydGVkRGVsaXZlcnlNb2Rlc1F1ZXJ5UmVzZXRFdmVudFxuICAgICAgICApO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==