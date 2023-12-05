/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { DpCheckoutModule } from './checkout/dp-checkout.module';
import * as i0 from "@angular/core";
export class DigitalPaymentsModule {
}
DigitalPaymentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DigitalPaymentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DigitalPaymentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: DigitalPaymentsModule, imports: [DpCheckoutModule] });
DigitalPaymentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DigitalPaymentsModule, imports: [DpCheckoutModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DigitalPaymentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [DpCheckoutModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlnaXRhbC1wYXltZW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2RpZ2l0YWwtcGF5bWVudHMvc3JjL2RpZ2l0YWwtcGF5bWVudHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDOztBQUtqRSxNQUFNLE9BQU8scUJBQXFCOztrSEFBckIscUJBQXFCO21IQUFyQixxQkFBcUIsWUFGdEIsZ0JBQWdCO21IQUVmLHFCQUFxQixZQUZ0QixnQkFBZ0I7MkZBRWYscUJBQXFCO2tCQUhqQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO2lCQUM1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEcENoZWNrb3V0TW9kdWxlIH0gZnJvbSAnLi9jaGVja291dC9kcC1jaGVja291dC5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbRHBDaGVja291dE1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIERpZ2l0YWxQYXltZW50c01vZHVsZSB7fVxuIl19