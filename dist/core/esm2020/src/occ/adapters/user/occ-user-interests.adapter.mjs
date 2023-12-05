/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PRODUCT_INTERESTS_NORMALIZER } from '../../../user/connectors/interests/converters';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../services/occ-endpoints.service";
import * as i3 from "../../config/occ-config";
import * as i4 from "../../../util/converter.service";
const headers = new HttpHeaders({
    'Content-Type': 'application/json',
});
export class OccUserInterestsAdapter {
    constructor(http, occEndpoints, config, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.config = config;
        this.converter = converter;
    }
    getInterests(userId, pageSize, currentPage, sort, productCode, notificationType) {
        let params = new HttpParams().set('sort', sort ? sort : 'name:asc');
        if (pageSize) {
            params = params.set('pageSize', pageSize.toString());
        }
        if (currentPage) {
            params = params.set('currentPage', currentPage.toString());
        }
        if (productCode) {
            params = params.set('productCode', productCode);
        }
        if (notificationType) {
            params = params.set('notificationType', notificationType.toString());
        }
        return this.http
            .get(this.occEndpoints.buildUrl('getProductInterests', {
            urlParams: { userId },
        }), {
            headers,
            params,
        })
            .pipe(this.converter.pipeable(PRODUCT_INTERESTS_NORMALIZER), catchError((error) => throwError(error)));
    }
    removeInterest(userId, item) {
        const r = [];
        item.productInterestEntry?.forEach((entry) => {
            const params = new HttpParams()
                .set('productCode', item.product?.code ?? '')
                .set('notificationType', entry.interestType);
            r.push(this.http
                .delete(this.occEndpoints.buildUrl('productInterests', {
                urlParams: { userId },
            }), {
                params: params,
            })
                .pipe(catchError((error) => throwError(error))));
        });
        return forkJoin(r);
    }
    addInterest(userId, productCode, notificationType) {
        const params = new HttpParams()
            .set('productCode', productCode)
            .set('notificationType', notificationType.toString());
        return this.http
            .post(this.occEndpoints.buildUrl('productInterests', {
            urlParams: { userId },
        }), {}, {
            headers,
            params,
        })
            .pipe(catchError((error) => throwError(error)));
    }
}
OccUserInterestsAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserInterestsAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i3.OccConfig }, { token: i4.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccUserInterestsAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserInterestsAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserInterestsAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i3.OccConfig }, { type: i4.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXVzZXItaW50ZXJlc3RzLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9vY2MvYWRhcHRlcnMvdXNlci9vY2MtdXNlci1pbnRlcmVzdHMuYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFjLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxRQUFRLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU01QyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQzs7Ozs7O0FBTTdGLE1BQU0sT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDO0lBQzlCLGNBQWMsRUFBRSxrQkFBa0I7Q0FDbkMsQ0FBQyxDQUFDO0FBR0gsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQyxZQUNZLElBQWdCLEVBQ2hCLFlBQWlDLEVBQ2pDLE1BQWlCLEVBQ2pCLFNBQTJCO1FBSDNCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFDcEMsQ0FBQztJQUVHLFlBQVksQ0FDakIsTUFBYyxFQUNkLFFBQWlCLEVBQ2pCLFdBQW9CLEVBQ3BCLElBQWEsRUFDYixXQUFvQixFQUNwQixnQkFBbUM7UUFFbkMsSUFBSSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMs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QkFBdUI7a0JBRG5DLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZvcmtKb2luLCBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgTm90aWZpY2F0aW9uVHlwZSxcbiAgUHJvZHVjdEludGVyZXN0RW50cnlSZWxhdGlvbixcbiAgUHJvZHVjdEludGVyZXN0U2VhcmNoUmVzdWx0LFxufSBmcm9tICcuLi8uLi8uLi9tb2RlbC9wcm9kdWN0LWludGVyZXN0Lm1vZGVsJztcbmltcG9ydCB7IFBST0RVQ1RfSU5URVJFU1RTX05PUk1BTElaRVIgfSBmcm9tICcuLi8uLi8uLi91c2VyL2Nvbm5lY3RvcnMvaW50ZXJlc3RzL2NvbnZlcnRlcnMnO1xuaW1wb3J0IHsgVXNlckludGVyZXN0c0FkYXB0ZXIgfSBmcm9tICcuLi8uLi8uLi91c2VyL2Nvbm5lY3RvcnMvaW50ZXJlc3RzL3VzZXItaW50ZXJlc3RzLmFkYXB0ZXInO1xuaW1wb3J0IHsgQ29udmVydGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3V0aWwvY29udmVydGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2NjQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29uZmlnL29jYy1jb25maWcnO1xuaW1wb3J0IHsgT2NjRW5kcG9pbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL29jYy1lbmRwb2ludHMuc2VydmljZSc7XG5cbmNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxufSk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPY2NVc2VySW50ZXJlc3RzQWRhcHRlciBpbXBsZW1lbnRzIFVzZXJJbnRlcmVzdHNBZGFwdGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJvdGVjdGVkIG9jY0VuZHBvaW50czogT2NjRW5kcG9pbnRzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlnOiBPY2NDb25maWcsXG4gICAgcHJvdGVjdGVkIGNvbnZlcnRlcjogQ29udmVydGVyU2VydmljZVxuICApIHt9XG5cbiAgcHVibGljIGdldEludGVyZXN0cyhcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBwYWdlU2l6ZT86IG51bWJlcixcbiAgICBjdXJyZW50UGFnZT86IG51bWJlcixcbiAgICBzb3J0Pzogc3RyaW5nLFxuICAgIHByb2R1Y3RDb2RlPzogc3RyaW5nLFxuICAgIG5vdGlmaWNhdGlvblR5cGU/OiBOb3RpZmljYXRpb25UeXBlXG4gICk6IE9ic2VydmFibGU8UHJvZHVjdEludGVyZXN0U2VhcmNoUmVzdWx0PiB7XG4gICAgbGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCkuc2V0KCdzb3J0Jywgc29ydCA/IHNvcnQgOiAnbmFtZTphc2MnKTtcbiAgICBpZiAocGFnZVNpemUpIHtcbiAgICAgIHBhcmFtcyA9IHBhcmFtcy5zZXQoJ3BhZ2VTaXplJywgcGFnZVNpemUudG9TdHJpbmcoKSk7XG4gICAgfVxuICAgIGlmIChjdXJyZW50UGFnZSkge1xuICAgICAgcGFyYW1zID0gcGFyYW1zLnNldCgnY3VycmVudFBhZ2UnLCBjdXJyZW50UGFnZS50b1N0cmluZygpKTtcbiAgICB9XG4gICAgaWYgKHByb2R1Y3RDb2RlKSB7XG4gICAgICBwYXJhbXMgPSBwYXJhbXMuc2V0KCdwcm9kdWN0Q29kZScsIHByb2R1Y3RDb2RlKTtcbiAgICB9XG4gICAgaWYgKG5vdGlmaWNhdGlvblR5cGUpIHtcbiAgICAgIHBhcmFtcyA9IHBhcmFtcy5zZXQoJ25vdGlmaWNhdGlvblR5cGUnLCBub3RpZmljYXRpb25UeXBlLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQoXG4gICAgICAgIHRoaXMub2NjRW5kcG9pbnRzLmJ1aWxkVXJsKCdnZXRQcm9kdWN0SW50ZXJlc3RzJywge1xuICAgICAgICAgIHVybFBhcmFtczogeyB1c2VySWQgfSxcbiAgICAgICAgfSksXG4gICAgICAgIHtcbiAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRoaXMuY29udmVydGVyLnBpcGVhYmxlKFBST0RVQ1RfSU5URVJFU1RTX05PUk1BTElaRVIpLFxuICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogYW55KSA9PiB0aHJvd0Vycm9yKGVycm9yKSlcbiAgICAgICk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlSW50ZXJlc3QoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgaXRlbTogUHJvZHVjdEludGVyZXN0RW50cnlSZWxhdGlvblxuICApOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgY29uc3QgcjogT2JzZXJ2YWJsZTxhbnk+W10gPSBbXTtcbiAgICBpdGVtLnByb2R1Y3RJbnRlcmVzdEVudHJ5Py5mb3JFYWNoKChlbnRyeTogYW55KSA9PiB7XG4gICAgICBjb25zdCBwYXJhbXM6IEh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpXG4gICAgICAgIC5zZXQoJ3Byb2R1Y3RDb2RlJywgaXRlbS5wcm9kdWN0Py5jb2RlID8/ICcnKVxuICAgICAgICAuc2V0KCdub3RpZmljYXRpb25UeXBlJywgZW50cnkuaW50ZXJlc3RUeXBlKTtcbiAgICAgIHIucHVzaChcbiAgICAgICAgdGhpcy5odHRwXG4gICAgICAgICAgLmRlbGV0ZShcbiAgICAgICAgICAgIHRoaXMub2NjRW5kcG9pbnRzLmJ1aWxkVXJsKCdwcm9kdWN0SW50ZXJlc3RzJywge1xuICAgICAgICAgICAgICB1cmxQYXJhbXM6IHsgdXNlcklkIH0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKVxuICAgICAgICAgIC5waXBlKGNhdGNoRXJyb3IoKGVycm9yOiBhbnkpID0+IHRocm93RXJyb3IoZXJyb3IpKSlcbiAgICAgICk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvcmtKb2luKHIpO1xuICB9XG5cbiAgcHVibGljIGFkZEludGVyZXN0KFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIHByb2R1Y3RDb2RlOiBzdHJpbmcsXG4gICAgbm90aWZpY2F0aW9uVHlwZTogTm90aWZpY2F0aW9uVHlwZVxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKClcbiAgICAgIC5zZXQoJ3Byb2R1Y3RDb2RlJywgcHJvZHVjdENvZGUpXG4gICAgICAuc2V0KCdub3RpZmljYXRpb25UeXBlJywgbm90aWZpY2F0aW9uVHlwZS50b1N0cmluZygpKTtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucG9zdChcbiAgICAgICAgdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ3Byb2R1Y3RJbnRlcmVzdHMnLCB7XG4gICAgICAgICAgdXJsUGFyYW1zOiB7IHVzZXJJZCB9LFxuICAgICAgICB9KSxcbiAgICAgICAge30sXG4gICAgICAgIHtcbiAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLnBpcGUoY2F0Y2hFcnJvcigoZXJyb3I6IGFueSkgPT4gdGhyb3dFcnJvcihlcnJvcikpKTtcbiAgfVxufVxuIl19