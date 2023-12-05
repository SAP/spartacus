/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@angular/common";
import * as i3 from "../cart-shared/order-summary/order-summary.component";
export class CartTotalsComponent {
    constructor(activeCartService) {
        this.activeCartService = activeCartService;
    }
    ngOnInit() {
        this.cart$ = this.activeCartService.getActive();
    }
}
CartTotalsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartTotalsComponent, deps: [{ token: i1.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Component });
CartTotalsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CartTotalsComponent, selector: "cx-cart-totals", ngImport: i0, template: "<ng-container *ngIf=\"cart$ | async as cart\">\n  <cx-order-summary [cart]=\"cart\"></cx-order-summary>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.OrderSummaryComponent, selector: "cx-order-summary", inputs: ["cart"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartTotalsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cart-totals', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"cart$ | async as cart\">\n  <cx-order-summary [cart]=\"cart\"></cx-order-summary>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC10b3RhbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb21wb25lbnRzL2NhcnQtdG90YWxzL2NhcnQtdG90YWxzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2UvY29tcG9uZW50cy9jYXJ0LXRvdGFscy9jYXJ0LXRvdGFscy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFTM0UsTUFBTSxPQUFPLG1CQUFtQjtJQUc5QixZQUFzQixpQkFBbUM7UUFBbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtJQUFHLENBQUM7SUFFN0QsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2xELENBQUM7O2dIQVBVLG1CQUFtQjtvR0FBbkIsbUJBQW1CLHNEQ2ZoQyw0SEFHQTsyRkRZYSxtQkFBbUI7a0JBTC9CLFNBQVM7K0JBQ0UsZ0JBQWdCLG1CQUVULHVCQUF1QixDQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2ZUNhcnRGYWNhZGUsIENhcnQgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtY2FydC10b3RhbHMnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FydC10b3RhbHMuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ2FydFRvdGFsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGNhcnQkOiBPYnNlcnZhYmxlPENhcnQ+O1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhY3RpdmVDYXJ0U2VydmljZTogQWN0aXZlQ2FydEZhY2FkZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNhcnQkID0gdGhpcy5hY3RpdmVDYXJ0U2VydmljZS5nZXRBY3RpdmUoKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cImNhcnQkIHwgYXN5bmMgYXMgY2FydFwiPlxuICA8Y3gtb3JkZXItc3VtbWFyeSBbY2FydF09XCJjYXJ0XCI+PC9jeC1vcmRlci1zdW1tYXJ5PlxuPC9uZy1jb250YWluZXI+XG4iXX0=