/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./checkout-query-event.listener";
import * as i2 from "./checkout-delivery-address-event.listener";
import * as i3 from "./checkout-delivery-mode-event.listener";
import * as i4 from "./checkout-payment-event.listener";
import * as i5 from "./checkout-place-order-event.listener";
import * as i6 from "./checkout-legacy-store-event.listener";
export class CheckoutEventModule {
    constructor(_checkoutQueryEventListener, _checkoutDeliveryAddressEventListener, _checkoutDeliveryModeEventListener, _checkoutPaymentEventListener, _checkoutPlaceOrderEventListener, _checkoutLegacyStoreEventListener) {
        // Intentional empty constructor
    }
}
CheckoutEventModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutEventModule, deps: [{ token: i1.CheckoutQueryEventListener }, { token: i2.CheckoutDeliveryAddressEventListener }, { token: i3.CheckoutDeliveryModeEventListener }, { token: i4.CheckoutPaymentEventListener }, { token: i5.CheckoutPlaceOrderEventListener }, { token: i6.CheckoutLegacyStoreEventListener }], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutEventModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutEventModule });
CheckoutEventModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutEventModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutEventModule, decorators: [{
            type: NgModule,
            args: [{}]
        }], ctorParameters: function () { return [{ type: i1.CheckoutQueryEventListener }, { type: i2.CheckoutDeliveryAddressEventListener }, { type: i3.CheckoutDeliveryModeEventListener }, { type: i4.CheckoutPaymentEventListener }, { type: i5.CheckoutPlaceOrderEventListener }, { type: i6.CheckoutLegacyStoreEventListener }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtZXZlbnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2Jhc2Uvcm9vdC9ldmVudHMvY2hlY2tvdXQtZXZlbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7OztBQVN6QyxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFlBQ0UsMkJBQXVELEVBQ3ZELHFDQUEyRSxFQUMzRSxrQ0FBcUUsRUFDckUsNkJBQTJELEVBQzNELGdDQUFpRSxFQUNqRSxpQ0FBbUU7UUFFbkUsZ0NBQWdDO0lBQ2xDLENBQUM7O2dIQVZVLG1CQUFtQjtpSEFBbkIsbUJBQW1CO2lIQUFuQixtQkFBbUI7MkZBQW5CLG1CQUFtQjtrQkFEL0IsUUFBUTttQkFBQyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzRXZlbnRMaXN0ZW5lciB9IGZyb20gJy4vY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy1ldmVudC5saXN0ZW5lcic7XG5pbXBvcnQgeyBDaGVja291dERlbGl2ZXJ5TW9kZUV2ZW50TGlzdGVuZXIgfSBmcm9tICcuL2NoZWNrb3V0LWRlbGl2ZXJ5LW1vZGUtZXZlbnQubGlzdGVuZXInO1xuaW1wb3J0IHsgQ2hlY2tvdXRMZWdhY3lTdG9yZUV2ZW50TGlzdGVuZXIgfSBmcm9tICcuL2NoZWNrb3V0LWxlZ2FjeS1zdG9yZS1ldmVudC5saXN0ZW5lcic7XG5pbXBvcnQgeyBDaGVja291dFBheW1lbnRFdmVudExpc3RlbmVyIH0gZnJvbSAnLi9jaGVja291dC1wYXltZW50LWV2ZW50Lmxpc3RlbmVyJztcbmltcG9ydCB7IENoZWNrb3V0UGxhY2VPcmRlckV2ZW50TGlzdGVuZXIgfSBmcm9tICcuL2NoZWNrb3V0LXBsYWNlLW9yZGVyLWV2ZW50Lmxpc3RlbmVyJztcbmltcG9ydCB7IENoZWNrb3V0UXVlcnlFdmVudExpc3RlbmVyIH0gZnJvbSAnLi9jaGVja291dC1xdWVyeS1ldmVudC5saXN0ZW5lcic7XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBDaGVja291dEV2ZW50TW9kdWxlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgX2NoZWNrb3V0UXVlcnlFdmVudExpc3RlbmVyOiBDaGVja291dFF1ZXJ5RXZlbnRMaXN0ZW5lcixcbiAgICBfY2hlY2tvdXREZWxpdmVyeUFkZHJlc3NFdmVudExpc3RlbmVyOiBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0V2ZW50TGlzdGVuZXIsXG4gICAgX2NoZWNrb3V0RGVsaXZlcnlNb2RlRXZlbnRMaXN0ZW5lcjogQ2hlY2tvdXREZWxpdmVyeU1vZGVFdmVudExpc3RlbmVyLFxuICAgIF9jaGVja291dFBheW1lbnRFdmVudExpc3RlbmVyOiBDaGVja291dFBheW1lbnRFdmVudExpc3RlbmVyLFxuICAgIF9jaGVja291dFBsYWNlT3JkZXJFdmVudExpc3RlbmVyOiBDaGVja291dFBsYWNlT3JkZXJFdmVudExpc3RlbmVyLFxuICAgIF9jaGVja291dExlZ2FjeVN0b3JlRXZlbnRMaXN0ZW5lcjogQ2hlY2tvdXRMZWdhY3lTdG9yZUV2ZW50TGlzdGVuZXJcbiAgKSB7XG4gICAgLy8gSW50ZW50aW9uYWwgZW1wdHkgY29uc3RydWN0b3JcbiAgfVxufVxuIl19