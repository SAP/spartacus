/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/storefront";
import * as i3 from "@angular/common";
export class CheckoutOrderSummaryComponent {
    constructor(activeCartFacade) {
        this.activeCartFacade = activeCartFacade;
        this.cartOutlets = CartOutlets;
        this.cart$ = this.activeCartFacade.getActive();
    }
}
CheckoutOrderSummaryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutOrderSummaryComponent, deps: [{ token: i1.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Component });
CheckoutOrderSummaryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CheckoutOrderSummaryComponent, selector: "cx-checkout-order-summary", ngImport: i0, template: "<ng-template\n  [cxOutlet]=\"cartOutlets.ORDER_SUMMARY\"\n  [cxOutletContext]=\"cart$ | async\"\n>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer", "cxComponentRef"], outputs: ["loaded", "cxComponentRefChange"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutOrderSummaryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-checkout-order-summary', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template\n  [cxOutlet]=\"cartOutlets.ORDER_SUMMARY\"\n  [cxOutletContext]=\"cart$ | async\"\n>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtb3JkZXItc3VtbWFyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9jb21wb25lbnRzL2NoZWNrb3V0LW9yZGVyLXN1bW1hcnkvY2hlY2tvdXQtb3JkZXItc3VtbWFyeS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9jb21wb25lbnRzL2NoZWNrb3V0LW9yZGVyLXN1bW1hcnkvY2hlY2tvdXQtb3JkZXItc3VtbWFyeS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQTBCLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7OztBQVFoRixNQUFNLE9BQU8sNkJBQTZCO0lBS3hDLFlBQXNCLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBRi9DLGdCQUFXLEdBQUcsV0FBVyxDQUFDO1FBR2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2pELENBQUM7OzBIQVBVLDZCQUE2Qjs4R0FBN0IsNkJBQTZCLGlFQ2YxQyxzSEFLQTsyRkRVYSw2QkFBNkI7a0JBTHpDLFNBQVM7K0JBQ0UsMkJBQTJCLG1CQUVwQix1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZlQ2FydEZhY2FkZSwgQ2FydCwgQ2FydE91dGxldHMgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtY2hlY2tvdXQtb3JkZXItc3VtbWFyeScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jaGVja291dC1vcmRlci1zdW1tYXJ5LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0T3JkZXJTdW1tYXJ5Q29tcG9uZW50IHtcbiAgY2FydCQ6IE9ic2VydmFibGU8Q2FydD47XG5cbiAgcmVhZG9ubHkgY2FydE91dGxldHMgPSBDYXJ0T3V0bGV0cztcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZSkge1xuICAgIHRoaXMuY2FydCQgPSB0aGlzLmFjdGl2ZUNhcnRGYWNhZGUuZ2V0QWN0aXZlKCk7XG4gIH1cbn1cbiIsIjxuZy10ZW1wbGF0ZVxuICBbY3hPdXRsZXRdPVwiY2FydE91dGxldHMuT1JERVJfU1VNTUFSWVwiXG4gIFtjeE91dGxldENvbnRleHRdPVwiY2FydCQgfCBhc3luY1wiXG4+XG48L25nLXRlbXBsYXRlPlxuIl19