/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/cds-endpoints.service";
import * as i2 from "@angular/common/http";
const STRATEGY_PRODUCTS_ENDPOINT_KEY = 'strategyProducts';
export class CdsMerchandisingStrategyAdapter {
    constructor(cdsEndpointsService, http) {
        this.cdsEndpointsService = cdsEndpointsService;
        this.http = http;
    }
    loadProductsForStrategy(strategyId, strategyRequest = {}) {
        let headers = new HttpHeaders();
        if (strategyRequest.headers && strategyRequest.headers.consentReference) {
            headers = headers.set('consent-reference', strategyRequest.headers.consentReference);
        }
        return this.http.get(this.cdsEndpointsService.getUrl(STRATEGY_PRODUCTS_ENDPOINT_KEY, {
            strategyId,
        }, strategyRequest.queryParams), { headers });
    }
}
CdsMerchandisingStrategyAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingStrategyAdapter, deps: [{ token: i1.CdsEndpointsService }, { token: i2.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
CdsMerchandisingStrategyAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingStrategyAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingStrategyAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CdsEndpointsService }, { type: i2.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RzLW1lcmNoYW5kaXNpbmctc3RyYXRlZ3kuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RzL3NyYy9tZXJjaGFuZGlzaW5nL2FkYXB0ZXJzL3N0cmF0ZWd5L2Nkcy1tZXJjaGFuZGlzaW5nLXN0cmF0ZWd5LmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBYyxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBTzNDLE1BQU0sOEJBQThCLEdBQUcsa0JBQWtCLENBQUM7QUFHMUQsTUFBTSxPQUFPLCtCQUErQjtJQUcxQyxZQUNVLG1CQUF3QyxFQUN0QyxJQUFnQjtRQURsQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3RDLFNBQUksR0FBSixJQUFJLENBQVk7SUFDekIsQ0FBQztJQUVKLHVCQUF1QixDQUNyQixVQUFrQixFQUNsQixrQkFBbUMsRUFBRTtRQUVyQyxJQUFJLE9BQU8sR0FBZ0IsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUM3QyxJQUFJLGVBQWUsQ0FBQyxPQUFPLElBQUksZUFBZSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2RSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FDbkIsbUJBQW1CLEVBQ25CLGVBQWUsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQ3pDLENBQUM7U0FDSDtRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ2xCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQzdCLDhCQUE4QixFQUM5QjtZQUNFLFVBQVU7U0FDWCxFQUNELGVBQWUsQ0FBQyxXQUFXLENBQzVCLEVBQ0QsRUFBRSxPQUFPLEVBQUUsQ0FDWixDQUFDO0lBQ0osQ0FBQzs7NEhBN0JVLCtCQUErQjtnSUFBL0IsK0JBQStCOzJGQUEvQiwrQkFBK0I7a0JBRDNDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENkc0VuZHBvaW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9jZHMtZW5kcG9pbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVyY2hhbmRpc2luZ1N0cmF0ZWd5QWRhcHRlciB9IGZyb20gJy4uLy4uL2Nvbm5lY3RvcnMvc3RyYXRlZ3kvbWVyY2hhbmRpc2luZy1zdHJhdGVneS5hZGFwdGVyJztcbmltcG9ydCB7IFN0cmF0ZWd5UHJvZHVjdHMgfSBmcm9tICcuLi8uLi9tb2RlbC9zdHJhdGVneS1wcm9kdWN0cy5tb2RlbCc7XG5pbXBvcnQgeyBTdHJhdGVneVJlcXVlc3QgfSBmcm9tICcuLy4uLy4uLy4uL2Nkcy1tb2RlbHMvY2RzLXN0cmF0ZWd5LXJlcXVlc3QubW9kZWwnO1xuXG5jb25zdCBTVFJBVEVHWV9QUk9EVUNUU19FTkRQT0lOVF9LRVkgPSAnc3RyYXRlZ3lQcm9kdWN0cyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDZHNNZXJjaGFuZGlzaW5nU3RyYXRlZ3lBZGFwdGVyXG4gIGltcGxlbWVudHMgTWVyY2hhbmRpc2luZ1N0cmF0ZWd5QWRhcHRlclxue1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNkc0VuZHBvaW50c1NlcnZpY2U6IENkc0VuZHBvaW50c1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnRcbiAgKSB7fVxuXG4gIGxvYWRQcm9kdWN0c0ZvclN0cmF0ZWd5KFxuICAgIHN0cmF0ZWd5SWQ6IHN0cmluZyxcbiAgICBzdHJhdGVneVJlcXVlc3Q6IFN0cmF0ZWd5UmVxdWVzdCA9IHt9XG4gICk6IE9ic2VydmFibGU8U3RyYXRlZ3lQcm9kdWN0cz4ge1xuICAgIGxldCBoZWFkZXJzOiBIdHRwSGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgIGlmIChzdHJhdGVneVJlcXVlc3QuaGVhZGVycyAmJiBzdHJhdGVneVJlcXVlc3QuaGVhZGVycy5jb25zZW50UmVmZXJlbmNlKSB7XG4gICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoXG4gICAgICAgICdjb25zZW50LXJlZmVyZW5jZScsXG4gICAgICAgIHN0cmF0ZWd5UmVxdWVzdC5oZWFkZXJzLmNvbnNlbnRSZWZlcmVuY2VcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KFxuICAgICAgdGhpcy5jZHNFbmRwb2ludHNTZXJ2aWNlLmdldFVybChcbiAgICAgICAgU1RSQVRFR1lfUFJPRFVDVFNfRU5EUE9JTlRfS0VZLFxuICAgICAgICB7XG4gICAgICAgICAgc3RyYXRlZ3lJZCxcbiAgICAgICAgfSxcbiAgICAgICAgc3RyYXRlZ3lSZXF1ZXN0LnF1ZXJ5UGFyYW1zXG4gICAgICApLFxuICAgICAgeyBoZWFkZXJzIH1cbiAgICApO1xuICB9XG59XG4iXX0=