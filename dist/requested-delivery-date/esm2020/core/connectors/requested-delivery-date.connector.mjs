/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { RequestedDeliveryDateAdapter } from './requested-delivery-date.adapter';
import * as i0 from "@angular/core";
import * as i1 from "./requested-delivery-date.adapter";
export class RequestedDeliveryDateConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    setRequestedDeliveryDate(userId, cartId, requestedDate) {
        return this.adapter.setRequestedDeliveryDate(userId, cartId, requestedDate);
    }
}
RequestedDeliveryDateConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateConnector, deps: [{ token: i1.RequestedDeliveryDateAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
RequestedDeliveryDateConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RequestedDeliveryDateAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdGVkLWRlbGl2ZXJ5LWRhdGUuY29ubmVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3JlcXVlc3RlZC1kZWxpdmVyeS1kYXRlL2NvcmUvY29ubmVjdG9ycy9yZXF1ZXN0ZWQtZGVsaXZlcnktZGF0ZS5jb25uZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7OztBQUtqRixNQUFNLE9BQU8sOEJBQThCO0lBQ3pDLFlBQXNCLE9BQXFDO1FBQXJDLFlBQU8sR0FBUCxPQUFPLENBQThCO0lBQUcsQ0FBQztJQUV4RCx3QkFBd0IsQ0FDN0IsTUFBYyxFQUNkLE1BQWMsRUFDZCxhQUFxQjtRQUVyQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM5RSxDQUFDOzsySEFUVSw4QkFBOEI7K0hBQTlCLDhCQUE4QixjQUY3QixNQUFNOzJGQUVQLDhCQUE4QjtrQkFIMUMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBSZXF1ZXN0ZWREZWxpdmVyeURhdGVBZGFwdGVyIH0gZnJvbSAnLi9yZXF1ZXN0ZWQtZGVsaXZlcnktZGF0ZS5hZGFwdGVyJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFJlcXVlc3RlZERlbGl2ZXJ5RGF0ZUNvbm5lY3RvciB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhZGFwdGVyOiBSZXF1ZXN0ZWREZWxpdmVyeURhdGVBZGFwdGVyKSB7fVxuXG4gIHB1YmxpYyBzZXRSZXF1ZXN0ZWREZWxpdmVyeURhdGUoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY2FydElkOiBzdHJpbmcsXG4gICAgcmVxdWVzdGVkRGF0ZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8e30+IHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLnNldFJlcXVlc3RlZERlbGl2ZXJ5RGF0ZSh1c2VySWQsIGNhcnRJZCwgcmVxdWVzdGVkRGF0ZSk7XG4gIH1cbn1cbiJdfQ==