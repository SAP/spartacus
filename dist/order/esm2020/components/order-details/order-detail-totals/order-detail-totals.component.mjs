/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import * as i0 from "@angular/core";
import * as i1 from "../order-details.service";
import * as i2 from "@angular/common";
import * as i3 from "@spartacus/storefront";
export class OrderDetailTotalsComponent {
    constructor(orderDetailsService) {
        this.orderDetailsService = orderDetailsService;
        this.CartOutlets = CartOutlets;
    }
    ngOnInit() {
        this.order$ = this.orderDetailsService.getOrderDetails();
    }
}
OrderDetailTotalsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailTotalsComponent, deps: [{ token: i1.OrderDetailsService }], target: i0.ɵɵFactoryTarget.Component });
OrderDetailTotalsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderDetailTotalsComponent, selector: "cx-order-details-totals", ngImport: i0, template: "<ng-container *ngIf=\"order$ | async as order\">\n  <div class=\"row justify-content-end\">\n    <div class=\"cx-summary col-sm-12 col-md-6 col-lg-5 col-xl-4\">\n      <ng-template\n        [cxOutlet]=\"CartOutlets.ORDER_SUMMARY\"\n        [cxOutletContext]=\"order\"\n      >\n      </ng-template>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer", "cxComponentRef"], outputs: ["loaded", "cxComponentRefChange"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailTotalsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-details-totals', template: "<ng-container *ngIf=\"order$ | async as order\">\n  <div class=\"row justify-content-end\">\n    <div class=\"cx-summary col-sm-12 col-md-6 col-lg-5 col-xl-4\">\n      <ng-template\n        [cxOutlet]=\"CartOutlets.ORDER_SUMMARY\"\n        [cxOutletContext]=\"order\"\n      >\n      </ng-template>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OrderDetailsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItZGV0YWlsLXRvdGFscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9vcmRlci1kZXRhaWxzL29yZGVyLWRldGFpbC10b3RhbHMvb3JkZXItZGV0YWlsLXRvdGFscy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9vcmRlci1kZXRhaWxzL29yZGVyLWRldGFpbC10b3RhbHMvb3JkZXItZGV0YWlsLXRvdGFscy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7O0FBUXhELE1BQU0sT0FBTywwQkFBMEI7SUFDckMsWUFBc0IsbUJBQXdDO1FBQXhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFJckQsZ0JBQVcsR0FBRyxXQUFXLENBQUM7SUFKOEIsQ0FBQztJQU1sRSxRQUFRO1FBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0QsQ0FBQzs7dUhBVFUsMEJBQTBCOzJHQUExQiwwQkFBMEIsK0RDZnZDLHFWQVdBOzJGRElhLDBCQUEwQjtrQkFKdEMsU0FBUzsrQkFDRSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FydE91dGxldHMgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9yZGVyRGV0YWlsc1NlcnZpY2UgfSBmcm9tICcuLi9vcmRlci1kZXRhaWxzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1vcmRlci1kZXRhaWxzLXRvdGFscycsXG4gIHRlbXBsYXRlVXJsOiAnLi9vcmRlci1kZXRhaWwtdG90YWxzLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJEZXRhaWxUb3RhbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgb3JkZXJEZXRhaWxzU2VydmljZTogT3JkZXJEZXRhaWxzU2VydmljZSkge31cblxuICBvcmRlciQ6IE9ic2VydmFibGU8YW55PjtcblxuICByZWFkb25seSBDYXJ0T3V0bGV0cyA9IENhcnRPdXRsZXRzO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMub3JkZXIkID0gdGhpcy5vcmRlckRldGFpbHNTZXJ2aWNlLmdldE9yZGVyRGV0YWlscygpO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwib3JkZXIkIHwgYXN5bmMgYXMgb3JkZXJcIj5cbiAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWNvbnRlbnQtZW5kXCI+XG4gICAgPGRpdiBjbGFzcz1cImN4LXN1bW1hcnkgY29sLXNtLTEyIGNvbC1tZC02IGNvbC1sZy01IGNvbC14bC00XCI+XG4gICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgW2N4T3V0bGV0XT1cIkNhcnRPdXRsZXRzLk9SREVSX1NVTU1BUllcIlxuICAgICAgICBbY3hPdXRsZXRDb250ZXh0XT1cIm9yZGVyXCJcbiAgICAgID5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG4iXX0=