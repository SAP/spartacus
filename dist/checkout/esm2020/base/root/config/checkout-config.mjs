/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import * as i0 from "@angular/core";
export var DeliveryModePreferences;
(function (DeliveryModePreferences) {
    DeliveryModePreferences["FREE"] = "FREE";
    DeliveryModePreferences["LEAST_EXPENSIVE"] = "LEAST_EXPENSIVE";
    DeliveryModePreferences["MOST_EXPENSIVE"] = "MOST_EXPENSIVE";
})(DeliveryModePreferences || (DeliveryModePreferences = {}));
export class CheckoutConfig {
}
CheckoutConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2Jhc2Uvcm9vdC9jb25maWcvY2hlY2tvdXQtY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFHekMsTUFBTSxDQUFOLElBQVksdUJBSVg7QUFKRCxXQUFZLHVCQUF1QjtJQUNqQyx3Q0FBYSxDQUFBO0lBQ2IsOERBQW1DLENBQUE7SUFDbkMsNERBQWlDLENBQUE7QUFDbkMsQ0FBQyxFQUpXLHVCQUF1QixLQUF2Qix1QkFBdUIsUUFJbEM7QUFNRCxNQUFNLE9BQWdCLGNBQWM7OzJHQUFkLGNBQWM7K0dBQWQsY0FBYyxjQUh0QixNQUFNLGVBQ0wsTUFBTTsyRkFFQyxjQUFjO2tCQUpuQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixXQUFXLEVBQUUsTUFBTTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ2hlY2tvdXRTdGVwIH0gZnJvbSAnLi4vbW9kZWwvY2hlY2tvdXQtc3RlcC5tb2RlbCc7XG5cbmV4cG9ydCBlbnVtIERlbGl2ZXJ5TW9kZVByZWZlcmVuY2VzIHtcbiAgRlJFRSA9ICdGUkVFJyxcbiAgTEVBU1RfRVhQRU5TSVZFID0gJ0xFQVNUX0VYUEVOU0lWRScsIC8vIGJ1dCBub3QgZnJlZVxuICBNT1NUX0VYUEVOU0lWRSA9ICdNT1NUX0VYUEVOU0lWRScsXG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB1c2VFeGlzdGluZzogQ29uZmlnLFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDaGVja291dENvbmZpZyB7XG4gIGNoZWNrb3V0Pzoge1xuICAgIC8qKlxuICAgICAqIFNldCBjaGVja291dCBzdGVwcyBhcyBvcmRlcmVkIGFycmF5IG9mIHBhZ2VzLlxuICAgICAqL1xuICAgIHN0ZXBzPzogQXJyYXk8Q2hlY2tvdXRTdGVwPjtcbiAgICAvKipcbiAgICAgKiBBbGxvdyBmb3IgZXhwcmVzcyBjaGVja291dCB3aGVuIGRlZmF1bHQgc2hpcHBpbmcgbWV0aG9kIGFuZCBwYXltZW50IG1ldGhvZCBhcmUgYXZhaWxhYmxlLlxuICAgICAqL1xuICAgIGV4cHJlc3M/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIERlZmF1bHQgZGVsaXZlcnkgbW9kZSBmb3IgaS5hLiBleHByZXNzIGNoZWNrb3V0LiBTZXQgcHJlZmVyZW5jZXMgaW4gb3JkZXIgd2l0aCBnZW5lcmFsIHByZWZlcmVuY2VzIChlZy4gRGVsaXZlcnlNb2RlUHJlZmVyZW5jZXMuTEVBU1RfRVhQRU5TSVZFKSBvciBzcGVjaWZpYyBkZWxpdmVyeSBjb2Rlcy5cbiAgICAgKi9cbiAgICBkZWZhdWx0RGVsaXZlcnlNb2RlPzogQXJyYXk8RGVsaXZlcnlNb2RlUHJlZmVyZW5jZXMgfCBzdHJpbmc+O1xuICAgIC8qKlxuICAgICAqIEFsbG93IGZvciBndWVzdCBjaGVja291dC5cbiAgICAgKi9cbiAgICBndWVzdD86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogVXNlIGRlbGl2ZXJ5IGFkZHJlc3Mgc2F2ZWQgaW4gY2FydCBmb3IgcHJlLWZpbGxpbmcgZGVsaXZlcnkgYWRkcmVzcyBmb3JtLlxuICAgICAqL1xuICAgIGd1ZXN0VXNlU2F2ZWRBZGRyZXNzPzogYm9vbGVhbjtcbiAgfTtcbn1cblxuZGVjbGFyZSBtb2R1bGUgJ0BzcGFydGFjdXMvY29yZScge1xuICBpbnRlcmZhY2UgQ29uZmlnIGV4dGVuZHMgQ2hlY2tvdXRDb25maWcge31cbn1cbiJdfQ==