/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./checkout-payment.adapter";
export class CheckoutPaymentConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    createPaymentDetails(userId, cartId, paymentDetails) {
        return this.adapter.createPaymentDetails(userId, cartId, paymentDetails);
    }
    setPaymentDetails(userId, cartId, paymentDetailsId) {
        return this.adapter.setPaymentDetails(userId, cartId, paymentDetailsId);
    }
    getPaymentCardTypes() {
        return this.adapter.getPaymentCardTypes();
    }
}
CheckoutPaymentConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentConnector, deps: [{ token: i1.CheckoutPaymentAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutPaymentConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CheckoutPaymentAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcGF5bWVudC5jb25uZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9jb3JlL2Nvbm5lY3RvcnMvY2hlY2tvdXQtcGF5bWVudC9jaGVja291dC1wYXltZW50LmNvbm5lY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBTTNDLE1BQU0sT0FBTyx3QkFBd0I7SUFDbkMsWUFBc0IsT0FBK0I7UUFBL0IsWUFBTyxHQUFQLE9BQU8sQ0FBd0I7SUFBRyxDQUFDO0lBRWxELG9CQUFvQixDQUN6QixNQUFjLEVBQ2QsTUFBYyxFQUNkLGNBQThCO1FBRTlCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFTSxpQkFBaUIsQ0FDdEIsTUFBYyxFQUNkLE1BQWMsRUFDZCxnQkFBd0I7UUFFeEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzVDLENBQUM7O3FIQXJCVSx3QkFBd0I7eUhBQXhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQURwQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FyZFR5cGUsIFBheW1lbnREZXRhaWxzIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDaGVja291dFBheW1lbnRBZGFwdGVyIH0gZnJvbSAnLi9jaGVja291dC1wYXltZW50LmFkYXB0ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRQYXltZW50Q29ubmVjdG9yIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGFkYXB0ZXI6IENoZWNrb3V0UGF5bWVudEFkYXB0ZXIpIHt9XG5cbiAgcHVibGljIGNyZWF0ZVBheW1lbnREZXRhaWxzKFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGNhcnRJZDogc3RyaW5nLFxuICAgIHBheW1lbnREZXRhaWxzOiBQYXltZW50RGV0YWlsc1xuICApOiBPYnNlcnZhYmxlPFBheW1lbnREZXRhaWxzPiB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5jcmVhdGVQYXltZW50RGV0YWlscyh1c2VySWQsIGNhcnRJZCwgcGF5bWVudERldGFpbHMpO1xuICB9XG5cbiAgcHVibGljIHNldFBheW1lbnREZXRhaWxzKFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGNhcnRJZDogc3RyaW5nLFxuICAgIHBheW1lbnREZXRhaWxzSWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLnNldFBheW1lbnREZXRhaWxzKHVzZXJJZCwgY2FydElkLCBwYXltZW50RGV0YWlsc0lkKTtcbiAgfVxuXG4gIGdldFBheW1lbnRDYXJkVHlwZXMoKTogT2JzZXJ2YWJsZTxDYXJkVHlwZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5nZXRQYXltZW50Q2FyZFR5cGVzKCk7XG4gIH1cbn1cbiJdfQ==