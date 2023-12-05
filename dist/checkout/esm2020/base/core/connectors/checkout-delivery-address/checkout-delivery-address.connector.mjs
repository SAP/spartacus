/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./checkout-delivery-address.adapter";
export class CheckoutDeliveryAddressConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    createAddress(userId, cartId, address) {
        return this.adapter.createAddress(userId, cartId, address);
    }
    setAddress(userId, cartId, addressId) {
        return this.adapter.setAddress(userId, cartId, addressId);
    }
    clearCheckoutDeliveryAddress(userId, cartId) {
        return this.adapter.clearCheckoutDeliveryAddress(userId, cartId);
    }
}
CheckoutDeliveryAddressConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressConnector, deps: [{ token: i1.CheckoutDeliveryAddressAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutDeliveryAddressConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CheckoutDeliveryAddressAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy5jb25uZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9jb3JlL2Nvbm5lY3RvcnMvY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy9jaGVja291dC1kZWxpdmVyeS1hZGRyZXNzLmNvbm5lY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBTTNDLE1BQU0sT0FBTyxnQ0FBZ0M7SUFDM0MsWUFBc0IsT0FBdUM7UUFBdkMsWUFBTyxHQUFQLE9BQU8sQ0FBZ0M7SUFBRyxDQUFDO0lBRTFELGFBQWEsQ0FDbEIsTUFBYyxFQUNkLE1BQWMsRUFDZCxPQUFnQjtRQUVoQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVNLFVBQVUsQ0FDZixNQUFjLEVBQ2QsTUFBYyxFQUNkLFNBQWlCO1FBRWpCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRU0sNEJBQTRCLENBQ2pDLE1BQWMsRUFDZCxNQUFjO1FBRWQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNuRSxDQUFDOzs2SEF4QlUsZ0NBQWdDO2lJQUFoQyxnQ0FBZ0M7MkZBQWhDLGdDQUFnQztrQkFENUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFkZHJlc3MgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NBZGFwdGVyIH0gZnJvbSAnLi9jaGVja291dC1kZWxpdmVyeS1hZGRyZXNzLmFkYXB0ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NDb25uZWN0b3Ige1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYWRhcHRlcjogQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NBZGFwdGVyKSB7fVxuXG4gIHB1YmxpYyBjcmVhdGVBZGRyZXNzKFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGNhcnRJZDogc3RyaW5nLFxuICAgIGFkZHJlc3M6IEFkZHJlc3NcbiAgKTogT2JzZXJ2YWJsZTxBZGRyZXNzPiB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5jcmVhdGVBZGRyZXNzKHVzZXJJZCwgY2FydElkLCBhZGRyZXNzKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRBZGRyZXNzKFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGNhcnRJZDogc3RyaW5nLFxuICAgIGFkZHJlc3NJZDogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuc2V0QWRkcmVzcyh1c2VySWQsIGNhcnRJZCwgYWRkcmVzc0lkKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhckNoZWNrb3V0RGVsaXZlcnlBZGRyZXNzKFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGNhcnRJZDogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuY2xlYXJDaGVja291dERlbGl2ZXJ5QWRkcmVzcyh1c2VySWQsIGNhcnRJZCk7XG4gIH1cbn1cbiJdfQ==