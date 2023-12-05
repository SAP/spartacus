/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ORDER_HISTORY_NORMALIZER, REPLENISHMENT_ORDER_HISTORY_NORMALIZER, REPLENISHMENT_ORDER_NORMALIZER, } from '@spartacus/order/root';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccReplenishmentOrderHistoryAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    load(userId, replenishmentOrderCode) {
        return this.http
            .get(this.occEndpoints.buildUrl('replenishmentOrderDetails', {
            urlParams: { userId, replenishmentOrderCode },
        }))
            .pipe(this.converter.pipeable(REPLENISHMENT_ORDER_NORMALIZER));
    }
    loadReplenishmentDetailsHistory(userId, replenishmentOrderCode, pageSize, currentPage, sort) {
        const params = {};
        if (pageSize) {
            params['pageSize'] = pageSize.toString();
        }
        if (currentPage) {
            params['currentPage'] = currentPage.toString();
        }
        if (sort) {
            params['sort'] = sort.toString();
        }
        return this.http
            .get(this.occEndpoints.buildUrl('replenishmentOrderDetailsHistory', {
            urlParams: { userId, replenishmentOrderCode },
            queryParams: params,
        }))
            .pipe(this.converter.pipeable(ORDER_HISTORY_NORMALIZER));
    }
    cancelReplenishmentOrder(userId, replenishmentOrderCode) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http
            .patch(this.occEndpoints.buildUrl('cancelReplenishmentOrder', {
            urlParams: { userId, replenishmentOrderCode },
        }), {}, { headers })
            .pipe(this.converter.pipeable(REPLENISHMENT_ORDER_NORMALIZER));
    }
    loadHistory(userId, pageSize, currentPage, sort) {
        const params = {};
        if (pageSize) {
            params['pageSize'] = pageSize.toString();
        }
        if (currentPage) {
            params['currentPage'] = currentPage.toString();
        }
        if (sort) {
            params['sort'] = sort.toString();
        }
        const url = this.occEndpoints.buildUrl('replenishmentOrderHistory', {
            urlParams: { userId },
            queryParams: params,
        });
        return this.http
            .get(url)
            .pipe(this.converter.pipeable(REPLENISHMENT_ORDER_HISTORY_NORMALIZER));
    }
}
OccReplenishmentOrderHistoryAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReplenishmentOrderHistoryAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccReplenishmentOrderHistoryAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReplenishmentOrderHistoryAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReplenishmentOrderHistoryAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXJlcGxlbmlzaG1lbnQtb3JkZXItaGlzdG9yeS5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL29jYy9hZGFwdGVycy9vY2MtcmVwbGVuaXNobWVudC1vcmRlci1oaXN0b3J5LmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBYyxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFFTCx3QkFBd0IsRUFHeEIsc0NBQXNDLEVBQ3RDLDhCQUE4QixHQUMvQixNQUFNLHVCQUF1QixDQUFDOzs7O0FBSS9CLE1BQU0sT0FBTyxtQ0FBbUM7SUFHOUMsWUFDWSxJQUFnQixFQUNoQixZQUFpQyxFQUNqQyxTQUEyQjtRQUYzQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNqQyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtJQUNwQyxDQUFDO0lBQ0csSUFBSSxDQUNULE1BQWMsRUFDZCxzQkFBOEI7UUFFOUIsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FDRixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsRUFBRTtZQUN0RCxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsc0JBQXNCLEVBQUU7U0FDOUMsQ0FBQyxDQUNIO2FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRU0sK0JBQStCLENBQ3BDLE1BQWMsRUFDZCxzQkFBOEIsRUFDOUIsUUFBaUIsRUFDakIsV0FBb0IsRUFDcEIsSUFBYTtRQUViLE1BQU0sTUFBTSxHQUE4QixFQUFFLENBQUM7UUFFN0MsSUFBSSxRQUFRLEVBQUU7WUFDWixNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxXQUFXLEVBQUU7WUFDZixNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxJQUFJLEVBQUU7WUFDUixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2xDO1FBRUQsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FDRixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxrQ0FBa0MsRUFBRTtZQUM3RCxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsc0JBQXNCLEVBQUU7WUFDN0MsV0FBVyxFQUFFLE1BQU07U0FDcEIsQ0FBQyxDQUNIO2FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRU0sd0JBQXdCLENBQzdCLE1BQWMsRUFDZCxzQkFBOEI7UUFFOUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFMUUsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEtBQUssQ0FDSixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsRUFBRTtZQUNyRCxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsc0JBQXNCLEVBQUU7U0FDOUMsQ0FBQyxFQUNGLEVBQUUsRUFDRixFQUFFLE9BQU8sRUFBRSxDQUNaO2FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRU0sV0FBVyxDQUNoQixNQUFjLEVBQ2QsUUFBaUIsRUFDakIsV0FBb0IsRUFDcEIsSUFBYTtRQUViLE1BQU0sTUFBTSxHQUE4QixFQUFFLENBQUM7UUFDN0MsSUFBSSxRQUFRLEVBQUU7WUFDWixNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxXQUFXLEVBQUU7WUFDZixNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxJQUFJLEVBQUU7WUFDUixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2xDO1FBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsMkJBQTJCLEVBQUU7WUFDbEUsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFO1lBQ3JCLFdBQVcsRUFBRSxNQUFNO1NBQ3BCLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQTZCLEdBQUcsQ0FBQzthQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsc0NBQXNDLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7O2dJQTVGVSxtQ0FBbUM7b0lBQW5DLG1DQUFtQzsyRkFBbkMsbUNBQW1DO2tCQUQvQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXJTZXJ2aWNlLCBPY2MsIE9jY0VuZHBvaW50c1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUmVwbGVuaXNobWVudE9yZGVySGlzdG9yeUFkYXB0ZXIgfSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL2NvcmUnO1xuaW1wb3J0IHtcbiAgT3JkZXJIaXN0b3J5TGlzdCxcbiAgT1JERVJfSElTVE9SWV9OT1JNQUxJWkVSLFxuICBSZXBsZW5pc2htZW50T3JkZXIsXG4gIFJlcGxlbmlzaG1lbnRPcmRlckxpc3QsXG4gIFJFUExFTklTSE1FTlRfT1JERVJfSElTVE9SWV9OT1JNQUxJWkVSLFxuICBSRVBMRU5JU0hNRU5UX09SREVSX05PUk1BTElaRVIsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JkZXIvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPY2NSZXBsZW5pc2htZW50T3JkZXJIaXN0b3J5QWRhcHRlclxuICBpbXBsZW1lbnRzIFJlcGxlbmlzaG1lbnRPcmRlckhpc3RvcnlBZGFwdGVyXG57XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByb3RlY3RlZCBvY2NFbmRwb2ludHM6IE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbnZlcnRlcjogQ29udmVydGVyU2VydmljZVxuICApIHt9XG4gIHB1YmxpYyBsb2FkKFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIHJlcGxlbmlzaG1lbnRPcmRlckNvZGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPFJlcGxlbmlzaG1lbnRPcmRlcj4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQ8T2NjLlJlcGxlbmlzaG1lbnRPcmRlcj4oXG4gICAgICAgIHRoaXMub2NjRW5kcG9pbnRzLmJ1aWxkVXJsKCdyZXBsZW5pc2htZW50T3JkZXJEZXRhaWxzJywge1xuICAgICAgICAgIHVybFBhcmFtczogeyB1c2VySWQsIHJlcGxlbmlzaG1lbnRPcmRlckNvZGUgfSxcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5waXBlKHRoaXMuY29udmVydGVyLnBpcGVhYmxlKFJFUExFTklTSE1FTlRfT1JERVJfTk9STUFMSVpFUikpO1xuICB9XG5cbiAgcHVibGljIGxvYWRSZXBsZW5pc2htZW50RGV0YWlsc0hpc3RvcnkoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgcmVwbGVuaXNobWVudE9yZGVyQ29kZTogc3RyaW5nLFxuICAgIHBhZ2VTaXplPzogbnVtYmVyLFxuICAgIGN1cnJlbnRQYWdlPzogbnVtYmVyLFxuICAgIHNvcnQ/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxPcmRlckhpc3RvcnlMaXN0PiB7XG4gICAgY29uc3QgcGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG5cbiAgICBpZiAocGFnZVNpemUpIHtcbiAgICAgIHBhcmFtc1sncGFnZVNpemUnXSA9IHBhZ2VTaXplLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChjdXJyZW50UGFnZSkge1xuICAgICAgcGFyYW1zWydjdXJyZW50UGFnZSddID0gY3VycmVudFBhZ2UudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHNvcnQpIHtcbiAgICAgIHBhcmFtc1snc29ydCddID0gc29ydC50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQ8T2NjLk9yZGVySGlzdG9yeUxpc3Q+KFxuICAgICAgICB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgncmVwbGVuaXNobWVudE9yZGVyRGV0YWlsc0hpc3RvcnknLCB7XG4gICAgICAgICAgdXJsUGFyYW1zOiB7IHVzZXJJZCwgcmVwbGVuaXNobWVudE9yZGVyQ29kZSB9LFxuICAgICAgICAgIHF1ZXJ5UGFyYW1zOiBwYXJhbXMsXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAucGlwZSh0aGlzLmNvbnZlcnRlci5waXBlYWJsZShPUkRFUl9ISVNUT1JZX05PUk1BTElaRVIpKTtcbiAgfVxuXG4gIHB1YmxpYyBjYW5jZWxSZXBsZW5pc2htZW50T3JkZXIoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgcmVwbGVuaXNobWVudE9yZGVyQ29kZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8UmVwbGVuaXNobWVudE9yZGVyPiB7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpLnNldCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcblxuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wYXRjaDxPY2MuUmVwbGVuaXNobWVudE9yZGVyPihcbiAgICAgICAgdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ2NhbmNlbFJlcGxlbmlzaG1lbnRPcmRlcicsIHtcbiAgICAgICAgICB1cmxQYXJhbXM6IHsgdXNlcklkLCByZXBsZW5pc2htZW50T3JkZXJDb2RlIH0sXG4gICAgICAgIH0pLFxuICAgICAgICB7fSxcbiAgICAgICAgeyBoZWFkZXJzIH1cbiAgICAgIClcbiAgICAgIC5waXBlKHRoaXMuY29udmVydGVyLnBpcGVhYmxlKFJFUExFTklTSE1FTlRfT1JERVJfTk9STUFMSVpFUikpO1xuICB9XG5cbiAgcHVibGljIGxvYWRIaXN0b3J5KFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIHBhZ2VTaXplPzogbnVtYmVyLFxuICAgIGN1cnJlbnRQYWdlPzogbnVtYmVyLFxuICAgIHNvcnQ/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxSZXBsZW5pc2htZW50T3JkZXJMaXN0PiB7XG4gICAgY29uc3QgcGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG4gICAgaWYgKHBhZ2VTaXplKSB7XG4gICAgICBwYXJhbXNbJ3BhZ2VTaXplJ10gPSBwYWdlU2l6ZS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAoY3VycmVudFBhZ2UpIHtcbiAgICAgIHBhcmFtc1snY3VycmVudFBhZ2UnXSA9IGN1cnJlbnRQYWdlLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChzb3J0KSB7XG4gICAgICBwYXJhbXNbJ3NvcnQnXSA9IHNvcnQudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBjb25zdCB1cmwgPSB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgncmVwbGVuaXNobWVudE9yZGVySGlzdG9yeScsIHtcbiAgICAgIHVybFBhcmFtczogeyB1c2VySWQgfSxcbiAgICAgIHF1ZXJ5UGFyYW1zOiBwYXJhbXMsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0PE9jYy5SZXBsZW5pc2htZW50T3JkZXJMaXN0Pih1cmwpXG4gICAgICAucGlwZSh0aGlzLmNvbnZlcnRlci5waXBlYWJsZShSRVBMRU5JU0hNRU5UX09SREVSX0hJU1RPUllfTk9STUFMSVpFUikpO1xuICB9XG59XG4iXX0=