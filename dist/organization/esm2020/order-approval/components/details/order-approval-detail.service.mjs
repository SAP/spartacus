/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../../core/services/order-approval.service";
export class OrderApprovalDetailService {
    constructor(routingService, orderApprovalService) {
        this.routingService = routingService;
        this.orderApprovalService = orderApprovalService;
        this.approvalCode$ = this.routingService
            .getRouterState()
            .pipe(map((routingData) => routingData.state.params.approvalCode));
        this.orderApproval$ = this.approvalCode$.pipe(filter((approvalCode) => Boolean(approvalCode)), tap((approvalCode) => this.orderApprovalService.loadOrderApproval(approvalCode)), switchMap((approvalCode) => this.orderApprovalService.get(approvalCode)), shareReplay({ bufferSize: 1, refCount: true }));
        this.order$ = this.orderApproval$.pipe(map((orderApproval) => orderApproval?.order));
    }
    /**
     * Returns a string that represents the approval code
     * found in the page url.
     */
    getOrderApprovalCodeFromRoute() {
        return this.approvalCode$;
    }
    /**
     * Returns the order data from the approval details that have been
     * retrieved from the approval code in the page url.
     */
    getOrderDetails() {
        return this.order$;
    }
    /**
     * Returns the approval details that have been retrieved from the
     * approval code in the page url.
     */
    getOrderApproval() {
        return this.orderApproval$;
    }
}
OrderApprovalDetailService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalDetailService, deps: [{ token: i1.RoutingService }, { token: i2.OrderApprovalService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderApprovalDetailService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalDetailService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalDetailService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.OrderApprovalService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItYXBwcm92YWwtZGV0YWlsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL29yZGVyLWFwcHJvdmFsL2NvbXBvbmVudHMvZGV0YWlscy9vcmRlci1hcHByb3ZhbC1kZXRhaWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBTzFFLE1BQU0sT0FBTywwQkFBMEI7SUFvQnJDLFlBQ1ksY0FBOEIsRUFDOUIsb0JBQTBDO1FBRDFDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBckI1QyxrQkFBYSxHQUFHLElBQUksQ0FBQyxjQUFjO2FBQzFDLGNBQWMsRUFBRTthQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBRTNELG1CQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ2hELE1BQU0sQ0FBQyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQy9DLEdBQUcsQ0FBQyxDQUFDLFlBQW9CLEVBQUUsRUFBRSxDQUMzQixJQUFJLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQzFELEVBQ0QsU0FBUyxDQUFDLENBQUMsWUFBb0IsRUFBRSxFQUFFLENBQ2pDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQzVDLEVBQ0QsV0FBVyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDL0MsQ0FBQztRQUVRLFdBQU0sR0FBc0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQzVELEdBQUcsQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsYUFBYSxFQUFFLEtBQWMsQ0FBQyxDQUN0RCxDQUFDO0lBS0MsQ0FBQztJQUVKOzs7T0FHRztJQUNILDZCQUE2QjtRQUMzQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7T0FHRztJQUNILGVBQWU7UUFDYixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7T0FHRztJQUNILGdCQUFnQjtRQUNkLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDOzt1SEEvQ1UsMEJBQTBCOzJIQUExQiwwQkFBMEIsY0FGekIsTUFBTTsyRkFFUCwwQkFBMEI7a0JBSHRDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGluZ1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXIgfSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHNoYXJlUmVwbGF5LCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9yZGVyQXBwcm92YWwgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVsL29yZGVyLWFwcHJvdmFsLm1vZGVsJztcbmltcG9ydCB7IE9yZGVyQXBwcm92YWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9vcmRlci1hcHByb3ZhbC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyQXBwcm92YWxEZXRhaWxTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIGFwcHJvdmFsQ29kZSQgPSB0aGlzLnJvdXRpbmdTZXJ2aWNlXG4gICAgLmdldFJvdXRlclN0YXRlKClcbiAgICAucGlwZShtYXAoKHJvdXRpbmdEYXRhKSA9PiByb3V0aW5nRGF0YS5zdGF0ZS5wYXJhbXMuYXBwcm92YWxDb2RlKSk7XG5cbiAgcHJvdGVjdGVkIG9yZGVyQXBwcm92YWwkID0gdGhpcy5hcHByb3ZhbENvZGUkLnBpcGUoXG4gICAgZmlsdGVyKChhcHByb3ZhbENvZGUpID0+IEJvb2xlYW4oYXBwcm92YWxDb2RlKSksXG4gICAgdGFwKChhcHByb3ZhbENvZGU6IHN0cmluZykgPT5cbiAgICAgIHRoaXMub3JkZXJBcHByb3ZhbFNlcnZpY2UubG9hZE9yZGVyQXBwcm92YWwoYXBwcm92YWxDb2RlKVxuICAgICksXG4gICAgc3dpdGNoTWFwKChhcHByb3ZhbENvZGU6IHN0cmluZykgPT5cbiAgICAgIHRoaXMub3JkZXJBcHByb3ZhbFNlcnZpY2UuZ2V0KGFwcHJvdmFsQ29kZSlcbiAgICApLFxuICAgIHNoYXJlUmVwbGF5KHsgYnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IHRydWUgfSlcbiAgKTtcblxuICBwcm90ZWN0ZWQgb3JkZXIkOiBPYnNlcnZhYmxlPE9yZGVyPiA9IHRoaXMub3JkZXJBcHByb3ZhbCQucGlwZShcbiAgICBtYXAoKG9yZGVyQXBwcm92YWwpID0+IG9yZGVyQXBwcm92YWw/Lm9yZGVyIGFzIE9yZGVyKVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIG9yZGVyQXBwcm92YWxTZXJ2aWNlOiBPcmRlckFwcHJvdmFsU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdHJpbmcgdGhhdCByZXByZXNlbnRzIHRoZSBhcHByb3ZhbCBjb2RlXG4gICAqIGZvdW5kIGluIHRoZSBwYWdlIHVybC5cbiAgICovXG4gIGdldE9yZGVyQXBwcm92YWxDb2RlRnJvbVJvdXRlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBwcm92YWxDb2RlJDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBvcmRlciBkYXRhIGZyb20gdGhlIGFwcHJvdmFsIGRldGFpbHMgdGhhdCBoYXZlIGJlZW5cbiAgICogcmV0cmlldmVkIGZyb20gdGhlIGFwcHJvdmFsIGNvZGUgaW4gdGhlIHBhZ2UgdXJsLlxuICAgKi9cbiAgZ2V0T3JkZXJEZXRhaWxzKCk6IE9ic2VydmFibGU8T3JkZXI+IHtcbiAgICByZXR1cm4gdGhpcy5vcmRlciQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYXBwcm92YWwgZGV0YWlscyB0aGF0IGhhdmUgYmVlbiByZXRyaWV2ZWQgZnJvbSB0aGVcbiAgICogYXBwcm92YWwgY29kZSBpbiB0aGUgcGFnZSB1cmwuXG4gICAqL1xuICBnZXRPcmRlckFwcHJvdmFsKCk6IE9ic2VydmFibGU8T3JkZXJBcHByb3ZhbCB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLm9yZGVyQXBwcm92YWwkO1xuICB9XG59XG4iXX0=