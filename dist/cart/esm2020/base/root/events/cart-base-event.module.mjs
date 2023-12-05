/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./multi-cart-event.listener";
export class CartBaseEventModule {
    constructor(_multiCartEventListener) {
        // Intentional empty constructor
    }
}
CartBaseEventModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseEventModule, deps: [{ token: i1.MultiCartEventListener }], target: i0.ɵɵFactoryTarget.NgModule });
CartBaseEventModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartBaseEventModule });
CartBaseEventModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseEventModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseEventModule, decorators: [{
            type: NgModule,
            args: [{}]
        }], ctorParameters: function () { return [{ type: i1.MultiCartEventListener }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1iYXNlLWV2ZW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2Uvcm9vdC9ldmVudHMvY2FydC1iYXNlLWV2ZW50Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBSXpDLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsWUFBWSx1QkFBK0M7UUFDekQsZ0NBQWdDO0lBQ2xDLENBQUM7O2dIQUhVLG1CQUFtQjtpSEFBbkIsbUJBQW1CO2lIQUFuQixtQkFBbUI7MkZBQW5CLG1CQUFtQjtrQkFEL0IsUUFBUTttQkFBQyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE11bHRpQ2FydEV2ZW50TGlzdGVuZXIgfSBmcm9tICcuL211bHRpLWNhcnQtZXZlbnQubGlzdGVuZXInO1xuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgQ2FydEJhc2VFdmVudE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKF9tdWx0aUNhcnRFdmVudExpc3RlbmVyOiBNdWx0aUNhcnRFdmVudExpc3RlbmVyKSB7XG4gICAgLy8gSW50ZW50aW9uYWwgZW1wdHkgY29uc3RydWN0b3JcbiAgfVxufVxuIl19