/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CART_BASE_FEATURE } from '@spartacus/cart/base/root';
import { provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { defaultCheckoutConfig } from './config/default-checkout-config';
import { defaultCheckoutRoutingConfig } from './config/default-checkout-routing-config';
import { CheckoutEventModule } from './events/checkout-event.module';
import { CHECKOUT_CORE_FEATURE, CHECKOUT_FEATURE } from './feature-name';
import { interceptors } from './http-interceptors/index';
import * as i0 from "@angular/core";
export const CHECKOUT_BASE_CMS_COMPONENTS = [
    'CheckoutOrchestrator',
    'CheckoutOrderSummary',
    'CheckoutProgress',
    'CheckoutProgressMobileBottom',
    'CheckoutProgressMobileTop',
    'CheckoutDeliveryMode',
    'CheckoutPaymentDetails',
    'CheckoutPlaceOrder',
    'CheckoutReviewOrder',
    'CheckoutReviewPayment',
    'CheckoutReviewShipping',
    'CheckoutReviewOverview',
    'CheckoutDeliveryAddress',
    'GuestCheckoutLoginComponent',
];
export function defaultCheckoutComponentsConfig() {
    const config = {
        featureModules: {
            [CHECKOUT_FEATURE]: {
                cmsComponents: CHECKOUT_BASE_CMS_COMPONENTS,
                dependencies: [CART_BASE_FEATURE],
            },
            // by default core is bundled together with components
            [CHECKOUT_CORE_FEATURE]: CHECKOUT_FEATURE,
        },
    };
    return config;
}
export class CheckoutRootModule {
}
CheckoutRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutRootModule, imports: [CheckoutEventModule] });
CheckoutRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutRootModule, providers: [
        ...interceptors,
        provideDefaultConfig(defaultCheckoutRoutingConfig),
        provideDefaultConfig(defaultCheckoutConfig),
        provideDefaultConfigFactory(defaultCheckoutComponentsConfig),
    ], imports: [CheckoutEventModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CheckoutEventModule],
                    providers: [
                        ...interceptors,
                        provideDefaultConfig(defaultCheckoutRoutingConfig),
                        provideDefaultConfig(defaultCheckoutConfig),
                        provideDefaultConfigFactory(defaultCheckoutComponentsConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcm9vdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9yb290L2NoZWNrb3V0LXJvb3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFFTCxvQkFBb0IsRUFDcEIsMkJBQTJCLEdBQzVCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDekUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDeEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDckUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQUV6RCxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBYTtJQUNwRCxzQkFBc0I7SUFDdEIsc0JBQXNCO0lBQ3RCLGtCQUFrQjtJQUNsQiw4QkFBOEI7SUFDOUIsMkJBQTJCO0lBQzNCLHNCQUFzQjtJQUN0Qix3QkFBd0I7SUFDeEIsb0JBQW9CO0lBQ3BCLHFCQUFxQjtJQUNyQix1QkFBdUI7SUFDdkIsd0JBQXdCO0lBQ3hCLHdCQUF3QjtJQUN4Qix5QkFBeUI7SUFDekIsNkJBQTZCO0NBQzlCLENBQUM7QUFFRixNQUFNLFVBQVUsK0JBQStCO0lBQzdDLE1BQU0sTUFBTSxHQUFjO1FBQ3hCLGNBQWMsRUFBRTtZQUNkLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDbEIsYUFBYSxFQUFFLDRCQUE0QjtnQkFDM0MsWUFBWSxFQUFFLENBQUMsaUJBQWlCLENBQUM7YUFDbEM7WUFDRCxzREFBc0Q7WUFDdEQsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLGdCQUFnQjtTQUMxQztLQUNGLENBQUM7SUFDRixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBV0QsTUFBTSxPQUFPLGtCQUFrQjs7K0dBQWxCLGtCQUFrQjtnSEFBbEIsa0JBQWtCLFlBUm5CLG1CQUFtQjtnSEFRbEIsa0JBQWtCLGFBUGxCO1FBQ1QsR0FBRyxZQUFZO1FBQ2Ysb0JBQW9CLENBQUMsNEJBQTRCLENBQUM7UUFDbEQsb0JBQW9CLENBQUMscUJBQXFCLENBQUM7UUFDM0MsMkJBQTJCLENBQUMsK0JBQStCLENBQUM7S0FDN0QsWUFOUyxtQkFBbUI7MkZBUWxCLGtCQUFrQjtrQkFUOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztvQkFDOUIsU0FBUyxFQUFFO3dCQUNULEdBQUcsWUFBWTt3QkFDZixvQkFBb0IsQ0FBQyw0QkFBNEIsQ0FBQzt3QkFDbEQsb0JBQW9CLENBQUMscUJBQXFCLENBQUM7d0JBQzNDLDJCQUEyQixDQUFDLCtCQUErQixDQUFDO3FCQUM3RDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDQVJUX0JBU0VfRkVBVFVSRSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQ21zQ29uZmlnLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5LFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgZGVmYXVsdENoZWNrb3V0Q29uZmlnIH0gZnJvbSAnLi9jb25maWcvZGVmYXVsdC1jaGVja291dC1jb25maWcnO1xuaW1wb3J0IHsgZGVmYXVsdENoZWNrb3V0Um91dGluZ0NvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtY2hlY2tvdXQtcm91dGluZy1jb25maWcnO1xuaW1wb3J0IHsgQ2hlY2tvdXRFdmVudE1vZHVsZSB9IGZyb20gJy4vZXZlbnRzL2NoZWNrb3V0LWV2ZW50Lm1vZHVsZSc7XG5pbXBvcnQgeyBDSEVDS09VVF9DT1JFX0ZFQVRVUkUsIENIRUNLT1VUX0ZFQVRVUkUgfSBmcm9tICcuL2ZlYXR1cmUtbmFtZSc7XG5pbXBvcnQgeyBpbnRlcmNlcHRvcnMgfSBmcm9tICcuL2h0dHAtaW50ZXJjZXB0b3JzL2luZGV4JztcblxuZXhwb3J0IGNvbnN0IENIRUNLT1VUX0JBU0VfQ01TX0NPTVBPTkVOVFM6IHN0cmluZ1tdID0gW1xuICAnQ2hlY2tvdXRPcmNoZXN0cmF0b3InLFxuICAnQ2hlY2tvdXRPcmRlclN1bW1hcnknLFxuICAnQ2hlY2tvdXRQcm9ncmVzcycsXG4gICdDaGVja291dFByb2dyZXNzTW9iaWxlQm90dG9tJyxcbiAgJ0NoZWNrb3V0UHJvZ3Jlc3NNb2JpbGVUb3AnLFxuICAnQ2hlY2tvdXREZWxpdmVyeU1vZGUnLFxuICAnQ2hlY2tvdXRQYXltZW50RGV0YWlscycsXG4gICdDaGVja291dFBsYWNlT3JkZXInLFxuICAnQ2hlY2tvdXRSZXZpZXdPcmRlcicsXG4gICdDaGVja291dFJldmlld1BheW1lbnQnLFxuICAnQ2hlY2tvdXRSZXZpZXdTaGlwcGluZycsXG4gICdDaGVja291dFJldmlld092ZXJ2aWV3JyxcbiAgJ0NoZWNrb3V0RGVsaXZlcnlBZGRyZXNzJyxcbiAgJ0d1ZXN0Q2hlY2tvdXRMb2dpbkNvbXBvbmVudCcsXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdENoZWNrb3V0Q29tcG9uZW50c0NvbmZpZygpIHtcbiAgY29uc3QgY29uZmlnOiBDbXNDb25maWcgPSB7XG4gICAgZmVhdHVyZU1vZHVsZXM6IHtcbiAgICAgIFtDSEVDS09VVF9GRUFUVVJFXToge1xuICAgICAgICBjbXNDb21wb25lbnRzOiBDSEVDS09VVF9CQVNFX0NNU19DT01QT05FTlRTLFxuICAgICAgICBkZXBlbmRlbmNpZXM6IFtDQVJUX0JBU0VfRkVBVFVSRV0sXG4gICAgICB9LFxuICAgICAgLy8gYnkgZGVmYXVsdCBjb3JlIGlzIGJ1bmRsZWQgdG9nZXRoZXIgd2l0aCBjb21wb25lbnRzXG4gICAgICBbQ0hFQ0tPVVRfQ09SRV9GRUFUVVJFXTogQ0hFQ0tPVVRfRkVBVFVSRSxcbiAgICB9LFxuICB9O1xuICByZXR1cm4gY29uZmlnO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ2hlY2tvdXRFdmVudE1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIC4uLmludGVyY2VwdG9ycyxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0Q2hlY2tvdXRSb3V0aW5nQ29uZmlnKSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0Q2hlY2tvdXRDb25maWcpLFxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeShkZWZhdWx0Q2hlY2tvdXRDb21wb25lbnRzQ29uZmlnKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRSb290TW9kdWxlIHt9XG4iXX0=