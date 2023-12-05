/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { PRODUCT_BULK_PRICING_FEATURE } from './feature-name';
import * as i0 from "@angular/core";
// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultProductBulkPricingComponentsConfig() {
    const config = {
        featureModules: {
            [PRODUCT_BULK_PRICING_FEATURE]: {
                cmsComponents: ['BulkPricingTableComponent'],
            },
        },
    };
    return config;
}
export class BulkPricingRootModule {
}
BulkPricingRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BulkPricingRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingRootModule });
BulkPricingRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingRootModule, providers: [
        provideDefaultConfigFactory(defaultProductBulkPricingComponentsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    providers: [
                        provideDefaultConfigFactory(defaultProductBulkPricingComponentsConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVsay1wcmljaW5nLXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QvYnVsay1wcmljaW5nL3Jvb3QvYnVsay1wcmljaW5nLXJvb3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBYSwyQkFBMkIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUU5RCwyRUFBMkU7QUFDM0UsTUFBTSxVQUFVLHlDQUF5QztJQUN2RCxNQUFNLE1BQU0sR0FBYztRQUN4QixjQUFjLEVBQUU7WUFDZCxDQUFDLDRCQUE0QixDQUFDLEVBQUU7Z0JBQzlCLGFBQWEsRUFBRSxDQUFDLDJCQUEyQixDQUFDO2FBQzdDO1NBQ0Y7S0FDRixDQUFDO0lBRUYsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQVFELE1BQU0sT0FBTyxxQkFBcUI7O2tIQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQjttSEFBckIscUJBQXFCLGFBSnJCO1FBQ1QsMkJBQTJCLENBQUMseUNBQXlDLENBQUM7S0FDdkU7MkZBRVUscUJBQXFCO2tCQU5qQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxFQUFFO29CQUNYLFNBQVMsRUFBRTt3QkFDVCwyQkFBMkIsQ0FBQyx5Q0FBeUMsQ0FBQztxQkFDdkU7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUFJPRFVDVF9CVUxLX1BSSUNJTkdfRkVBVFVSRSB9IGZyb20gJy4vZmVhdHVyZS1uYW1lJztcblxuLy8gVE9ETzogSW5saW5lIHRoaXMgZmFjdG9yeSB3aGVuIHdlIHN0YXJ0IHJlbGVhc2luZyBJdnkgY29tcGlsZWQgbGlicmFyaWVzXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFByb2R1Y3RCdWxrUHJpY2luZ0NvbXBvbmVudHNDb25maWcoKTogQ21zQ29uZmlnIHtcbiAgY29uc3QgY29uZmlnOiBDbXNDb25maWcgPSB7XG4gICAgZmVhdHVyZU1vZHVsZXM6IHtcbiAgICAgIFtQUk9EVUNUX0JVTEtfUFJJQ0lOR19GRUFUVVJFXToge1xuICAgICAgICBjbXNDb21wb25lbnRzOiBbJ0J1bGtQcmljaW5nVGFibGVDb21wb25lbnQnXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4gY29uZmlnO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5KGRlZmF1bHRQcm9kdWN0QnVsa1ByaWNpbmdDb21wb25lbnRzQ29uZmlnKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQnVsa1ByaWNpbmdSb290TW9kdWxlIHt9XG4iXX0=