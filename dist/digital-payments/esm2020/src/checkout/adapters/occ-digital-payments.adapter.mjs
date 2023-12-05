/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpParamsURIEncoder, } from '@spartacus/core';
import { CURRENT_CART } from '../../utils/dp-constants';
import { DP_DETAILS_NORMALIZER, DP_REQUEST_NORMALIZER } from './converters';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccDigitalPaymentsAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.paramEncoder = new HttpParamsURIEncoder();
    }
    createPaymentRequest(userId, cartId = CURRENT_CART) {
        const url = this.occEndpoints.buildUrl('paymentRequest', {
            urlParams: { userId, cartId },
        });
        return this.http
            .post(url, null)
            .pipe(this.converter.pipeable(DP_REQUEST_NORMALIZER));
    }
    createPaymentDetails(sessionId, signature, userId, cartId = CURRENT_CART) {
        let params = new HttpParams({ encoder: this.paramEncoder });
        params = params.append('sid', sessionId);
        params = params.append('sign', signature);
        const url = this.occEndpoints.buildUrl('paymentDetails', {
            urlParams: { userId, cartId },
        });
        return this.http
            .post(url, null, { params: params })
            .pipe(this.converter.pipeable(DP_DETAILS_NORMALIZER));
    }
}
OccDigitalPaymentsAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccDigitalPaymentsAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccDigitalPaymentsAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccDigitalPaymentsAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccDigitalPaymentsAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWRpZ2l0YWwtcGF5bWVudHMuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvZGlnaXRhbC1wYXltZW50cy9zcmMvY2hlY2tvdXQvYWRhcHRlcnMvb2NjLWRpZ2l0YWwtcGF5bWVudHMuYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUVMLG9CQUFvQixHQUdyQixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV4RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7QUFLNUUsTUFBTSxPQUFPLHlCQUF5QjtJQUdwQyxZQUNZLElBQWdCLEVBQ2hCLFlBQWlDLEVBQ2pDLFNBQTJCO1FBRjNCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBTHRCLGlCQUFZLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO0lBTXhELENBQUM7SUFFSixvQkFBb0IsQ0FDbEIsTUFBYyxFQUNkLE1BQU0sR0FBRyxZQUFZO1FBRXJCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZELFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7U0FDOUIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLElBQUksQ0FBc0IsR0FBRyxFQUFFLElBQUksQ0FBQzthQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxvQkFBb0IsQ0FDbEIsU0FBaUIsRUFDakIsU0FBaUIsRUFDakIsTUFBYyxFQUNkLE1BQU0sR0FBRyxZQUFZO1FBRXJCLElBQUksTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQzVELE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN6QyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDMUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkQsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTtTQUM5QixDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsSUFBSSxDQUFxQixHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDO2FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7c0hBcENVLHlCQUF5QjswSEFBekIseUJBQXlCOzJGQUF6Qix5QkFBeUI7a0JBRHJDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGF5bWVudERldGFpbHMgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIENvbnZlcnRlclNlcnZpY2UsXG4gIEh0dHBQYXJhbXNVUklFbmNvZGVyLFxuICBPY2MsXG4gIE9jY0VuZHBvaW50c1NlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDVVJSRU5UX0NBUlQgfSBmcm9tICcuLi8uLi91dGlscy9kcC1jb25zdGFudHMnO1xuaW1wb3J0IHsgRHBQYXltZW50UmVxdWVzdCB9IGZyb20gJy4uL21vZGVscy9kcC1jaGVja291dC5tb2RlbCc7XG5pbXBvcnQgeyBEUF9ERVRBSUxTX05PUk1BTElaRVIsIERQX1JFUVVFU1RfTk9STUFMSVpFUiB9IGZyb20gJy4vY29udmVydGVycyc7XG5pbXBvcnQgeyBEaWdpdGFsUGF5bWVudHNBZGFwdGVyIH0gZnJvbSAnLi9kaWdpdGFsLXBheW1lbnRzLmFkYXB0ZXInO1xuaW1wb3J0IHsgT2NjRHBQYXltZW50UmVxdWVzdCB9IGZyb20gJy4vb2NjLm1vZGVscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPY2NEaWdpdGFsUGF5bWVudHNBZGFwdGVyIGltcGxlbWVudHMgRGlnaXRhbFBheW1lbnRzQWRhcHRlciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgcGFyYW1FbmNvZGVyID0gbmV3IEh0dHBQYXJhbXNVUklFbmNvZGVyKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJvdGVjdGVkIG9jY0VuZHBvaW50czogT2NjRW5kcG9pbnRzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29udmVydGVyOiBDb252ZXJ0ZXJTZXJ2aWNlXG4gICkge31cblxuICBjcmVhdGVQYXltZW50UmVxdWVzdChcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQgPSBDVVJSRU5UX0NBUlRcbiAgKTogT2JzZXJ2YWJsZTxEcFBheW1lbnRSZXF1ZXN0PiB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ3BheW1lbnRSZXF1ZXN0Jywge1xuICAgICAgdXJsUGFyYW1zOiB7IHVzZXJJZCwgY2FydElkIH0sXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3Q8T2NjRHBQYXltZW50UmVxdWVzdD4odXJsLCBudWxsKVxuICAgICAgLnBpcGUodGhpcy5jb252ZXJ0ZXIucGlwZWFibGUoRFBfUkVRVUVTVF9OT1JNQUxJWkVSKSk7XG4gIH1cblxuICBjcmVhdGVQYXltZW50RGV0YWlscyhcbiAgICBzZXNzaW9uSWQ6IHN0cmluZyxcbiAgICBzaWduYXR1cmU6IHN0cmluZyxcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQgPSBDVVJSRU5UX0NBUlRcbiAgKTogT2JzZXJ2YWJsZTxQYXltZW50RGV0YWlscz4ge1xuICAgIGxldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcyh7IGVuY29kZXI6IHRoaXMucGFyYW1FbmNvZGVyIH0pO1xuICAgIHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoJ3NpZCcsIHNlc3Npb25JZCk7XG4gICAgcGFyYW1zID0gcGFyYW1zLmFwcGVuZCgnc2lnbicsIHNpZ25hdHVyZSk7XG4gICAgY29uc3QgdXJsID0gdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ3BheW1lbnREZXRhaWxzJywge1xuICAgICAgdXJsUGFyYW1zOiB7IHVzZXJJZCwgY2FydElkIH0sXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3Q8T2NjLlBheW1lbnREZXRhaWxzPih1cmwsIG51bGwsIHsgcGFyYW1zOiBwYXJhbXMgfSlcbiAgICAgIC5waXBlKHRoaXMuY29udmVydGVyLnBpcGVhYmxlKERQX0RFVEFJTFNfTk9STUFMSVpFUikpO1xuICB9XG59XG4iXX0=