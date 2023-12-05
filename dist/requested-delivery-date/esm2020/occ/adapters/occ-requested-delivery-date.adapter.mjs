/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterceptorUtil, OccEndpointsService, USE_CLIENT_TOKEN, } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccRequestedDeliveryDateAdapter {
    constructor(http, occEndpoints) {
        this.http = http;
        this.occEndpoints = occEndpoints;
    }
    setRequestedDeliveryDate(userId, cartId, requestedRetrievalAt) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
        const url = this.occEndpoints.buildUrl('requestedDeliveryDate', {
            urlParams: {
                userId,
                cartId,
            },
            queryParams: { requestedRetrievalAt },
        });
        return this.http.put(url, { headers });
    }
}
OccRequestedDeliveryDateAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccRequestedDeliveryDateAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }], target: i0.ɵɵFactoryTarget.Injectable });
OccRequestedDeliveryDateAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccRequestedDeliveryDateAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccRequestedDeliveryDateAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXJlcXVlc3RlZC1kZWxpdmVyeS1kYXRlLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcmVxdWVzdGVkLWRlbGl2ZXJ5LWRhdGUvb2NjL2FkYXB0ZXJzL29jYy1yZXF1ZXN0ZWQtZGVsaXZlcnktZGF0ZS5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLGVBQWUsRUFDZixtQkFBbUIsRUFDbkIsZ0JBQWdCLEdBQ2pCLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFJekIsTUFBTSxPQUFPLCtCQUErQjtJQUcxQyxZQUNZLElBQWdCLEVBQ2hCLFlBQWlDO1FBRGpDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQXFCO0lBQzFDLENBQUM7SUFFSix3QkFBd0IsQ0FDdEIsTUFBYyxFQUNkLE1BQWMsRUFDZCxvQkFBNEI7UUFFNUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxXQUFXLENBQUM7WUFDNUIsY0FBYyxFQUFFLG1DQUFtQztTQUNwRCxDQUFDLENBQUM7UUFDSCxPQUFPLEdBQUcsZUFBZSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFeEUsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEVBQUU7WUFDOUQsU0FBUyxFQUFFO2dCQUNULE1BQU07Z0JBQ04sTUFBTTthQUNQO1lBQ0QsV0FBVyxFQUFFLEVBQUUsb0JBQW9CLEVBQUU7U0FDdEMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7OzRIQTNCVSwrQkFBK0I7Z0lBQS9CLCtCQUErQjsyRkFBL0IsK0JBQStCO2tCQUQzQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBJbnRlcmNlcHRvclV0aWwsXG4gIE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gIFVTRV9DTElFTlRfVE9LRU4sXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBSZXF1ZXN0ZWREZWxpdmVyeURhdGVBZGFwdGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9yZXF1ZXN0ZWQtZGVsaXZlcnktZGF0ZS9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9jY1JlcXVlc3RlZERlbGl2ZXJ5RGF0ZUFkYXB0ZXJcbiAgaW1wbGVtZW50cyBSZXF1ZXN0ZWREZWxpdmVyeURhdGVBZGFwdGVyXG57XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByb3RlY3RlZCBvY2NFbmRwb2ludHM6IE9jY0VuZHBvaW50c1NlcnZpY2VcbiAgKSB7fVxuXG4gIHNldFJlcXVlc3RlZERlbGl2ZXJ5RGF0ZShcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICByZXF1ZXN0ZWRSZXRyaWV2YWxBdDogc3RyaW5nXG4gICkge1xuICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgICB9KTtcbiAgICBoZWFkZXJzID0gSW50ZXJjZXB0b3JVdGlsLmNyZWF0ZUhlYWRlcihVU0VfQ0xJRU5UX1RPS0VOLCB0cnVlLCBoZWFkZXJzKTtcblxuICAgIGNvbnN0IHVybCA9IHRoaXMub2NjRW5kcG9pbnRzLmJ1aWxkVXJsKCdyZXF1ZXN0ZWREZWxpdmVyeURhdGUnLCB7XG4gICAgICB1cmxQYXJhbXM6IHtcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBjYXJ0SWQsXG4gICAgICB9LFxuICAgICAgcXVlcnlQYXJhbXM6IHsgcmVxdWVzdGVkUmV0cmlldmFsQXQgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHVybCwgeyBoZWFkZXJzIH0pO1xuICB9XG59XG4iXX0=