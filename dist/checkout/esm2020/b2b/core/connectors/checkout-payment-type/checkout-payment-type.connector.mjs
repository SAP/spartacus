/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./checkout-payment-type.adapter";
export class CheckoutPaymentTypeConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    getPaymentTypes() {
        return this.adapter.getPaymentTypes();
    }
    setPaymentType(userId, cartId, typeCode, purchaseOrderNumber) {
        return this.adapter.setPaymentType(userId, cartId, typeCode, purchaseOrderNumber);
    }
}
CheckoutPaymentTypeConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeConnector, deps: [{ token: i1.CheckoutPaymentTypeAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutPaymentTypeConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CheckoutPaymentTypeAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcGF5bWVudC10eXBlLmNvbm5lY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iMmIvY29yZS9jb25uZWN0b3JzL2NoZWNrb3V0LXBheW1lbnQtdHlwZS9jaGVja291dC1wYXltZW50LXR5cGUuY29ubmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFNM0MsTUFBTSxPQUFPLDRCQUE0QjtJQUN2QyxZQUFzQixPQUFtQztRQUFuQyxZQUFPLEdBQVAsT0FBTyxDQUE0QjtJQUFHLENBQUM7SUFFN0QsZUFBZTtRQUNiLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsY0FBYyxDQUNaLE1BQWMsRUFDZCxNQUFjLEVBQ2QsUUFBZ0IsRUFDaEIsbUJBQTRCO1FBRTVCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQ2hDLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLG1CQUFtQixDQUNwQixDQUFDO0lBQ0osQ0FBQzs7eUhBbkJVLDRCQUE0Qjs2SEFBNUIsNEJBQTRCOzJGQUE1Qiw0QkFBNEI7a0JBRHhDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYXltZW50VHlwZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2hlY2tvdXRQYXltZW50VHlwZUFkYXB0ZXIgfSBmcm9tICcuL2NoZWNrb3V0LXBheW1lbnQtdHlwZS5hZGFwdGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0UGF5bWVudFR5cGVDb25uZWN0b3Ige1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYWRhcHRlcjogQ2hlY2tvdXRQYXltZW50VHlwZUFkYXB0ZXIpIHt9XG5cbiAgZ2V0UGF5bWVudFR5cGVzKCk6IE9ic2VydmFibGU8UGF5bWVudFR5cGVbXT4ge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuZ2V0UGF5bWVudFR5cGVzKCk7XG4gIH1cblxuICBzZXRQYXltZW50VHlwZShcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICB0eXBlQ29kZTogc3RyaW5nLFxuICAgIHB1cmNoYXNlT3JkZXJOdW1iZXI/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5zZXRQYXltZW50VHlwZShcbiAgICAgIHVzZXJJZCxcbiAgICAgIGNhcnRJZCxcbiAgICAgIHR5cGVDb2RlLFxuICAgICAgcHVyY2hhc2VPcmRlck51bWJlclxuICAgICk7XG4gIH1cbn1cbiJdfQ==