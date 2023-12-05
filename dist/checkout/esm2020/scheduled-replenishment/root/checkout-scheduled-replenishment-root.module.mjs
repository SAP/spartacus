/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CHECKOUT_B2B_CMS_COMPONENTS } from '@spartacus/checkout/b2b/root';
import { CHECKOUT_FEATURE } from '@spartacus/checkout/base/root';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { CheckoutScheduledReplenishmentEventModule } from './events/checkout-scheduled-replenishment-event.module';
import * as i0 from "@angular/core";
export const CHECKOUT_SCHEDULED_REPLENISHMENT_CMS_COMPONENTS = [
    /**
     *  TODO:#9574 - we should be able to remove the spread of `CHECKOUT_BASE_CMS_COMPONENTS`.
     * Re-test the B2B checkout flow after doing it.
     */
    ...CHECKOUT_B2B_CMS_COMPONENTS,
    'CheckoutScheduleReplenishmentOrder',
];
export function defaultCheckoutComponentsConfig() {
    const config = {
        featureModules: {
            [CHECKOUT_FEATURE]: {
                cmsComponents: CHECKOUT_SCHEDULED_REPLENISHMENT_CMS_COMPONENTS,
            },
        },
    };
    return config;
}
export class CheckoutScheduledReplenishmentRootModule {
}
CheckoutScheduledReplenishmentRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutScheduledReplenishmentRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentRootModule, imports: [CheckoutScheduledReplenishmentEventModule] });
CheckoutScheduledReplenishmentRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentRootModule, providers: [provideDefaultConfigFactory(defaultCheckoutComponentsConfig)], imports: [CheckoutScheduledReplenishmentEventModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CheckoutScheduledReplenishmentEventModule],
                    providers: [provideDefaultConfigFactory(defaultCheckoutComponentsConfig)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtc2NoZWR1bGVkLXJlcGxlbmlzaG1lbnQtcm9vdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvc2NoZWR1bGVkLXJlcGxlbmlzaG1lbnQvcm9vdC9jaGVja291dC1zY2hlZHVsZWQtcmVwbGVuaXNobWVudC1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQWEsMkJBQTJCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUseUNBQXlDLEVBQUUsTUFBTSx3REFBd0QsQ0FBQzs7QUFFbkgsTUFBTSxDQUFDLE1BQU0sK0NBQStDLEdBQWE7SUFDdkU7OztPQUdHO0lBQ0gsR0FBRywyQkFBMkI7SUFDOUIsb0NBQW9DO0NBQ3JDLENBQUM7QUFFRixNQUFNLFVBQVUsK0JBQStCO0lBQzdDLE1BQU0sTUFBTSxHQUFjO1FBQ3hCLGNBQWMsRUFBRTtZQUNkLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDbEIsYUFBYSxFQUFFLCtDQUErQzthQUMvRDtTQUNGO0tBQ0YsQ0FBQztJQUNGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFNRCxNQUFNLE9BQU8sd0NBQXdDOztxSUFBeEMsd0NBQXdDO3NJQUF4Qyx3Q0FBd0MsWUFIekMseUNBQXlDO3NJQUd4Qyx3Q0FBd0MsYUFGeEMsQ0FBQywyQkFBMkIsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLFlBRC9ELHlDQUF5QzsyRkFHeEMsd0NBQXdDO2tCQUpwRCxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLHlDQUF5QyxDQUFDO29CQUNwRCxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO2lCQUMxRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDSEVDS09VVF9CMkJfQ01TX0NPTVBPTkVOVFMgfSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2IyYi9yb290JztcbmltcG9ydCB7IENIRUNLT1VUX0ZFQVRVUkUgfSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBDbXNDb25maWcsIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDaGVja291dFNjaGVkdWxlZFJlcGxlbmlzaG1lbnRFdmVudE1vZHVsZSB9IGZyb20gJy4vZXZlbnRzL2NoZWNrb3V0LXNjaGVkdWxlZC1yZXBsZW5pc2htZW50LWV2ZW50Lm1vZHVsZSc7XG5cbmV4cG9ydCBjb25zdCBDSEVDS09VVF9TQ0hFRFVMRURfUkVQTEVOSVNITUVOVF9DTVNfQ09NUE9ORU5UUzogc3RyaW5nW10gPSBbXG4gIC8qKlxuICAgKiAgVE9ETzojOTU3NCAtIHdlIHNob3VsZCBiZSBhYmxlIHRvIHJlbW92ZSB0aGUgc3ByZWFkIG9mIGBDSEVDS09VVF9CQVNFX0NNU19DT01QT05FTlRTYC5cbiAgICogUmUtdGVzdCB0aGUgQjJCIGNoZWNrb3V0IGZsb3cgYWZ0ZXIgZG9pbmcgaXQuXG4gICAqL1xuICAuLi5DSEVDS09VVF9CMkJfQ01TX0NPTVBPTkVOVFMsXG4gICdDaGVja291dFNjaGVkdWxlUmVwbGVuaXNobWVudE9yZGVyJyxcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0Q2hlY2tvdXRDb21wb25lbnRzQ29uZmlnKCkge1xuICBjb25zdCBjb25maWc6IENtc0NvbmZpZyA9IHtcbiAgICBmZWF0dXJlTW9kdWxlczoge1xuICAgICAgW0NIRUNLT1VUX0ZFQVRVUkVdOiB7XG4gICAgICAgIGNtc0NvbXBvbmVudHM6IENIRUNLT1VUX1NDSEVEVUxFRF9SRVBMRU5JU0hNRU5UX0NNU19DT01QT05FTlRTLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuICByZXR1cm4gY29uZmlnO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ2hlY2tvdXRTY2hlZHVsZWRSZXBsZW5pc2htZW50RXZlbnRNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkoZGVmYXVsdENoZWNrb3V0Q29tcG9uZW50c0NvbmZpZyldLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dFNjaGVkdWxlZFJlcGxlbmlzaG1lbnRSb290TW9kdWxlIHt9XG4iXX0=