/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CART_MODIFICATION_NORMALIZER, } from '@spartacus/cart/base/root';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccCartEntryAdapter {
    constructor(http, occEndpointsService, converterService) {
        this.http = http;
        this.occEndpointsService = occEndpointsService;
        this.converterService = converterService;
    }
    add(userId, cartId, productCode, quantity = 1, pickupStore) {
        const url = this.occEndpointsService.buildUrl('addEntries', {
            urlParams: { userId, cartId, quantity },
        });
        // Handle b2b case where the x-www-form-urlencoded is still used
        if (url.includes(`quantity=${quantity}`)) {
            const httpHeaders = new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
            });
            return this.http
                .post(url, {}, { headers: httpHeaders, params: { code: productCode } })
                .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
        }
        const toAdd = {
            quantity,
            product: { code: productCode },
            ...(pickupStore && { deliveryPointOfService: { name: pickupStore } }),
        };
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http
            .post(url, toAdd, { headers })
            .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }
    update(userId, cartId, entryNumber, qty, pickupStore, pickupToDelivery = false) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = this.occEndpointsService.buildUrl('updateEntries', {
            urlParams: {
                userId,
                cartId,
                entryNumber,
            },
        });
        // switch from pickup to delivery mode
        if (pickupStore === undefined && pickupToDelivery) {
            return this.http
                .put(url, { quantity: qty }, { headers })
                .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
        }
        let params = {};
        if (pickupStore) {
            params = {
                deliveryPointOfService: {
                    name: pickupStore,
                },
            };
        }
        return this.http
            .patch(url, { quantity: qty, ...params }, { headers })
            .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }
    remove(userId, cartId, entryNumber) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        const url = this.occEndpointsService.buildUrl('removeEntries', {
            urlParams: {
                userId,
                cartId,
                entryNumber,
            },
        });
        return this.http.delete(url, { headers });
    }
}
OccCartEntryAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartEntryAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCartEntryAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartEntryAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartEntryAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNhcnQtZW50cnkuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2Uvb2NjL2FkYXB0ZXJzL29jYy1jYXJ0LWVudHJ5LmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBYyxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFFTCw0QkFBNEIsR0FDN0IsTUFBTSwyQkFBMkIsQ0FBQzs7OztBQUtuQyxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFlBQ1ksSUFBZ0IsRUFDaEIsbUJBQXdDLEVBQ3hDLGdCQUFrQztRQUZsQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUMzQyxDQUFDO0lBRUcsR0FBRyxDQUNSLE1BQWMsRUFDZCxNQUFjLEVBQ2QsV0FBbUIsRUFDbkIsV0FBbUIsQ0FBQyxFQUNwQixXQUFvQjtRQUVwQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRTtZQUMxRCxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtTQUN4QyxDQUFDLENBQUM7UUFFSCxnRUFBZ0U7UUFDaEUsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksUUFBUSxFQUFFLENBQUMsRUFBRTtZQUN4QyxNQUFNLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQztnQkFDbEMsY0FBYyxFQUFFLG1DQUFtQzthQUNwRCxDQUFDLENBQUM7WUFFSCxPQUFPLElBQUksQ0FBQyxJQUFJO2lCQUNiLElBQUksQ0FDSCxHQUFHLEVBQ0gsRUFBRSxFQUNGLEVB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KiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FydEVudHJ5QWRhcHRlciB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FydE1vZGlmaWNhdGlvbixcbiAgQ0FSVF9NT0RJRklDQVRJT05fTk9STUFMSVpFUixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXJTZXJ2aWNlLCBPY2NFbmRwb2ludHNTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9jY0NhcnRFbnRyeUFkYXB0ZXIgaW1wbGVtZW50cyBDYXJ0RW50cnlBZGFwdGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJvdGVjdGVkIG9jY0VuZHBvaW50c1NlcnZpY2U6IE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbnZlcnRlclNlcnZpY2U6IENvbnZlcnRlclNlcnZpY2VcbiAgKSB7fVxuXG4gIHB1YmxpYyBhZGQoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY2FydElkOiBzdHJpbmcsXG4gICAgcHJvZHVjdENvZGU6IHN0cmluZyxcbiAgICBxdWFudGl0eTogbnVtYmVyID0gMSxcbiAgICBwaWNrdXBTdG9yZT86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPENhcnRNb2RpZmljYXRpb24+IHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLm9jY0VuZHBvaW50c1NlcnZpY2UuYnVpbGRVcmwoJ2FkZEVudHJpZXMnLCB7XG4gICAgICB1cmxQYXJhbXM6IHsgdXNlcklkLCBjYXJ0SWQsIHF1YW50aXR5IH0sXG4gICAgfSk7XG5cbiAgICAvLyBIYW5kbGUgYjJiIGNhc2Ugd2hlcmUgdGhlIHgtd3d3LWZvcm0tdXJsZW5jb2RlZCBpcyBzdGlsbCB1c2VkXG4gICAgaWYgKHVybC5pbmNsdWRlcyhgcXVhbnRpdHk9JHtxdWFudGl0eX1gKSkge1xuICAgICAgY29uc3QgaHR0cEhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgICAucG9zdDxDYXJ0TW9kaWZpY2F0aW9uPihcbiAgICAgICAgICB1cmwsXG4gICAgICAgICAge30sXG4gICAgICAgICAgeyBoZWFkZXJzOiBodHRwSGVhZGVycywgcGFyYW1zOiB7IGNvZGU6IHByb2R1Y3RDb2RlIH0gfVxuICAgICAgICApXG4gICAgICAgIC5waXBlKHRoaXMuY29udmVydGVyU2VydmljZS5waXBlYWJsZShDQVJUX01PRElGSUNBVElPTl9OT1JNQUxJWkVSKSk7XG4gICAgfVxuXG4gICAgY29uc3QgdG9BZGQgPSB7XG4gICAgICBxdWFudGl0eSxcbiAgICAgIHByb2R1Y3Q6IHsgY29kZTogcHJvZHVjdENvZGUgfSxcbiAgICAgIC4uLihwaWNrdXBTdG9yZSAmJiB7IGRlbGl2ZXJ5UG9pbnRPZlNlcnZpY2U6IHsgbmFtZTogcGlja3VwU3RvcmUgfSB9KSxcbiAgICB9O1xuXG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3Q8Q2FydE1vZGlmaWNhdGlvbj4odXJsLCB0b0FkZCwgeyBoZWFkZXJzIH0pXG4gICAgICAucGlwZSh0aGlzLmNvbnZlcnRlclNlcnZpY2UucGlwZWFibGUoQ0FSVF9NT0RJRklDQVRJT05fTk9STUFMSVpFUikpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZShcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICBlbnRyeU51bWJlcjogc3RyaW5nLFxuICAgIHF0eT86IG51bWJlcixcbiAgICBwaWNrdXBTdG9yZT86IHN0cmluZyxcbiAgICBwaWNrdXBUb0RlbGl2ZXJ5OiBib29sZWFuID0gZmFsc2VcbiAgKTogT2JzZXJ2YWJsZTxDYXJ0TW9kaWZpY2F0aW9uPiB7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH0pO1xuXG4gICAgY29uc3QgdXJsID0gdGhpcy5vY2NFbmRwb2ludHNTZXJ2aWNlLmJ1aWxkVXJsKCd1cGRhdGVFbnRyaWVzJywge1xuICAgICAgdXJsUGFyYW1zOiB7XG4gICAgICAgIHVzZXJJZCxcbiAgICAgICAgY2FydElkLFxuICAgICAgICBlbnRyeU51bWJlcixcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyBzd2l0Y2ggZnJvbSBwaWNrdXAgdG8gZGVsaXZlcnkgbW9kZVxuICAgIGlmIChwaWNrdXBTdG9yZSA9PT0gdW5kZWZpbmVkICYmIHBpY2t1cFRvRGVsaXZlcnkpIHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgLnB1dDxDYXJ0TW9kaWZpY2F0aW9uPih1cmwsIHsgcXVhbnRpdHk6IHF0eSB9LCB7IGhlYWRlcnMgfSlcbiAgICAgICAgLnBpcGUodGhpcy5jb252ZXJ0ZXJTZXJ2aWNlLnBpcGVhYmxlKENBUlRfTU9ESUZJQ0FUSU9OX05PUk1BTElaRVIpKTtcbiAgICB9XG5cbiAgICBsZXQgcGFyYW1zID0ge307XG4gICAgaWYgKHBpY2t1cFN0b3JlKSB7XG4gICAgICBwYXJhbXMgPSB7XG4gICAgICAgIGRlbGl2ZXJ5UG9pbnRPZlNlcnZpY2U6IHtcbiAgICAgICAgICBuYW1lOiBwaWNrdXBTdG9yZSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBhdGNoPENhcnRNb2RpZmljYXRpb24+KHVybCwgeyBxdWFudGl0eTogcXR5LCAuLi5wYXJhbXMgfSwgeyBoZWFkZXJzIH0pXG4gICAgICAucGlwZSh0aGlzLmNvbnZlcnRlclNlcnZpY2UucGlwZWFibGUoQ0FSVF9NT0RJRklDQVRJT05fTk9STUFMSVpFUikpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZShcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICBlbnRyeU51bWJlcjogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgfSk7XG5cbiAgICBjb25zdCB1cmwgPSB0aGlzLm9jY0VuZHBvaW50c1NlcnZpY2UuYnVpbGRVcmwoJ3JlbW92ZUVudHJpZXMnLCB7XG4gICAgICB1cmxQYXJhbXM6IHtcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBjYXJ0SWQsXG4gICAgICAgIGVudHJ5TnVtYmVyLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKHVybCwgeyBoZWFkZXJzIH0pO1xuICB9XG59XG4iXX0=