/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { PDF_INVOICES_CORE_FEATURE, PDF_INVOICES_FEATURE, } from './feature-name';
import * as i0 from "@angular/core";
export function defaultRequestedDeliveryDateComponentsConfig() {
    const config = {
        featureModules: {
            [PDF_INVOICES_FEATURE]: {
                cmsComponents: ['AccountOrderDetailsPDFInvoicesComponent'],
            },
            // by default core is bundled together with components
            [PDF_INVOICES_CORE_FEATURE]: PDF_INVOICES_FEATURE,
        },
    };
    return config;
}
export class PDFInvoicesRootModule {
}
PDFInvoicesRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PDFInvoicesRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesRootModule });
PDFInvoicesRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesRootModule, providers: [
        provideDefaultConfigFactory(defaultRequestedDeliveryDateComponentsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfigFactory(defaultRequestedDeliveryDateComponentsConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLWludm9pY2VzLXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3BkZi1pbnZvaWNlcy9yb290L3BkZi1pbnZvaWNlcy1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFhLDJCQUEyQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekUsT0FBTyxFQUNMLHlCQUF5QixFQUN6QixvQkFBb0IsR0FDckIsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFeEIsTUFBTSxVQUFVLDRDQUE0QztJQUMxRCxNQUFNLE1BQU0sR0FBYztRQUN4QixjQUFjLEVBQUU7WUFDZCxDQUFDLG9CQUFvQixDQUFDLEVBQUU7Z0JBQ3RCLGFBQWEsRUFBRSxDQUFDLHlDQUF5QyxDQUFDO2FBQzNEO1lBQ0Qsc0RBQXNEO1lBQ3RELENBQUMseUJBQXlCLENBQUMsRUFBRSxvQkFBb0I7U0FDbEQ7S0FDRixDQUFDO0lBRUYsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQU9ELE1BQU0sT0FBTyxxQkFBcUI7O2tIQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQjttSEFBckIscUJBQXFCLGFBSnJCO1FBQ1QsMkJBQTJCLENBQUMsNENBQTRDLENBQUM7S0FDMUU7MkZBRVUscUJBQXFCO2tCQUxqQyxRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVCwyQkFBMkIsQ0FBQyw0Q0FBNEMsQ0FBQztxQkFDMUU7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMiBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbXNDb25maWcsIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBQREZfSU5WT0lDRVNfQ09SRV9GRUFUVVJFLFxuICBQREZfSU5WT0lDRVNfRkVBVFVSRSxcbn0gZnJvbSAnLi9mZWF0dXJlLW5hbWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFJlcXVlc3RlZERlbGl2ZXJ5RGF0ZUNvbXBvbmVudHNDb25maWcoKTogQ21zQ29uZmlnIHtcbiAgY29uc3QgY29uZmlnOiBDbXNDb25maWcgPSB7XG4gICAgZmVhdHVyZU1vZHVsZXM6IHtcbiAgICAgIFtQREZfSU5WT0lDRVNfRkVBVFVSRV06IHtcbiAgICAgICAgY21zQ29tcG9uZW50czogWydBY2NvdW50T3JkZXJEZXRhaWxzUERGSW52b2ljZXNDb21wb25lbnQnXSxcbiAgICAgIH0sXG4gICAgICAvLyBieSBkZWZhdWx0IGNvcmUgaXMgYnVuZGxlZCB0b2dldGhlciB3aXRoIGNvbXBvbmVudHNcbiAgICAgIFtQREZfSU5WT0lDRVNfQ09SRV9GRUFUVVJFXTogUERGX0lOVk9JQ0VTX0ZFQVRVUkUsXG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4gY29uZmlnO1xufVxuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkoZGVmYXVsdFJlcXVlc3RlZERlbGl2ZXJ5RGF0ZUNvbXBvbmVudHNDb25maWcpLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQREZJbnZvaWNlc1Jvb3RNb2R1bGUge31cbiJdfQ==