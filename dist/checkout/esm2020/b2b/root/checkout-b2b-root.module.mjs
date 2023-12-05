/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CHECKOUT_BASE_CMS_COMPONENTS, CHECKOUT_FEATURE, } from '@spartacus/checkout/base/root';
import { provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { defaultB2BCheckoutConfig } from './config/default-b2b-checkout-config';
import { defaultCheckoutB2BRoutingConfig } from './config/default-checkout-b2b-routing-config';
import { CheckoutB2BEventModule } from './events/checkout-b2b-event.module';
import * as i0 from "@angular/core";
export const CHECKOUT_B2B_CMS_COMPONENTS = [
    /**
     *  TODO:#9574 - we should be able to remove the spread of `CHECKOUT_BASE_CMS_COMPONENTS`.
     * Re-test the B2B checkout flow after doing it.
     */
    ...CHECKOUT_BASE_CMS_COMPONENTS,
    'CheckoutCostCenterComponent',
    'CheckoutPaymentType',
];
export function defaultCheckoutComponentsConfig() {
    const config = {
        featureModules: {
            [CHECKOUT_FEATURE]: {
                cmsComponents: CHECKOUT_B2B_CMS_COMPONENTS,
            },
        },
    };
    return config;
}
export class CheckoutB2BRootModule {
}
CheckoutB2BRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutB2BRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BRootModule, imports: [CheckoutB2BEventModule] });
CheckoutB2BRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BRootModule, providers: [
        provideDefaultConfig(defaultB2BCheckoutConfig),
        provideDefaultConfig(defaultCheckoutB2BRoutingConfig),
        provideDefaultConfigFactory(defaultCheckoutComponentsConfig),
    ], imports: [CheckoutB2BEventModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CheckoutB2BEventModule],
                    providers: [
                        provideDefaultConfig(defaultB2BCheckoutConfig),
                        provideDefaultConfig(defaultCheckoutB2BRoutingConfig),
                        provideDefaultConfigFactory(defaultCheckoutComponentsConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtYjJiLXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2IyYi9yb290L2NoZWNrb3V0LWIyYi1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsNEJBQTRCLEVBQzVCLGdCQUFnQixHQUNqQixNQUFNLCtCQUErQixDQUFDO0FBQ3ZDLE9BQU8sRUFFTCxvQkFBb0IsRUFDcEIsMkJBQTJCLEdBQzVCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDaEYsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDL0YsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7O0FBRTVFLE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUFhO0lBQ25EOzs7T0FHRztJQUNILEdBQUcsNEJBQTRCO0lBQy9CLDZCQUE2QjtJQUM3QixxQkFBcUI7Q0FDdEIsQ0FBQztBQUVGLE1BQU0sVUFBVSwrQkFBK0I7SUFDN0MsTUFBTSxNQUFNLEdBQWM7UUFDeEIsY0FBYyxFQUFFO1lBQ2QsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUNsQixhQUFhLEVBQUUsMkJBQTJCO2FBQzNDO1NBQ0Y7S0FDRixDQUFDO0lBQ0YsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQVVELE1BQU0sT0FBTyxxQkFBcUI7O2tIQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQixZQVB0QixzQkFBc0I7bUhBT3JCLHFCQUFxQixhQU5yQjtRQUNULG9CQUFvQixDQUFDLHdCQUF3QixDQUFDO1FBQzlDLG9CQUFvQixDQUFDLCtCQUErQixDQUFDO1FBQ3JELDJCQUEyQixDQUFDLCtCQUErQixDQUFDO0tBQzdELFlBTFMsc0JBQXNCOzJGQU9yQixxQkFBcUI7a0JBUmpDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7b0JBQ2pDLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBQyx3QkFBd0IsQ0FBQzt3QkFDOUMsb0JBQW9CLENBQUMsK0JBQStCLENBQUM7d0JBQ3JELDJCQUEyQixDQUFDLCtCQUErQixDQUFDO3FCQUM3RDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDSEVDS09VVF9CQVNFX0NNU19DT01QT05FTlRTLFxuICBDSEVDS09VVF9GRUFUVVJFLFxufSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBDbXNDb25maWcsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnksXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBkZWZhdWx0QjJCQ2hlY2tvdXRDb25maWcgfSBmcm9tICcuL2NvbmZpZy9kZWZhdWx0LWIyYi1jaGVja291dC1jb25maWcnO1xuaW1wb3J0IHsgZGVmYXVsdENoZWNrb3V0QjJCUm91dGluZ0NvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtY2hlY2tvdXQtYjJiLXJvdXRpbmctY29uZmlnJztcbmltcG9ydCB7IENoZWNrb3V0QjJCRXZlbnRNb2R1bGUgfSBmcm9tICcuL2V2ZW50cy9jaGVja291dC1iMmItZXZlbnQubW9kdWxlJztcblxuZXhwb3J0IGNvbnN0IENIRUNLT1VUX0IyQl9DTVNfQ09NUE9ORU5UUzogc3RyaW5nW10gPSBbXG4gIC8qKlxuICAgKiAgVE9ETzojOTU3NCAtIHdlIHNob3VsZCBiZSBhYmxlIHRvIHJlbW92ZSB0aGUgc3ByZWFkIG9mIGBDSEVDS09VVF9CQVNFX0NNU19DT01QT05FTlRTYC5cbiAgICogUmUtdGVzdCB0aGUgQjJCIGNoZWNrb3V0IGZsb3cgYWZ0ZXIgZG9pbmcgaXQuXG4gICAqL1xuICAuLi5DSEVDS09VVF9CQVNFX0NNU19DT01QT05FTlRTLFxuICAnQ2hlY2tvdXRDb3N0Q2VudGVyQ29tcG9uZW50JyxcbiAgJ0NoZWNrb3V0UGF5bWVudFR5cGUnLFxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRDaGVja291dENvbXBvbmVudHNDb25maWcoKSB7XG4gIGNvbnN0IGNvbmZpZzogQ21zQ29uZmlnID0ge1xuICAgIGZlYXR1cmVNb2R1bGVzOiB7XG4gICAgICBbQ0hFQ0tPVVRfRkVBVFVSRV06IHtcbiAgICAgICAgY21zQ29tcG9uZW50czogQ0hFQ0tPVVRfQjJCX0NNU19DT01QT05FTlRTLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuICByZXR1cm4gY29uZmlnO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ2hlY2tvdXRCMkJFdmVudE1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRCMkJDaGVja291dENvbmZpZyksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdENoZWNrb3V0QjJCUm91dGluZ0NvbmZpZyksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5KGRlZmF1bHRDaGVja291dENvbXBvbmVudHNDb25maWcpLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dEIyQlJvb3RNb2R1bGUge31cbiJdfQ==