/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckoutAuthGuard, CheckoutStepsSetGuard, } from '@spartacus/checkout/base/components';
import { CheckoutCostCenterModule } from './checkout-cost-center/checkout-cost-center.module';
import { B2BCheckoutDeliveryAddressModule } from './checkout-delivery-address/checkout-delivery-address.module';
import { CheckoutPaymentTypeModule } from './checkout-payment-type/checkout-payment-type.module';
import { B2BCheckoutReviewSubmitModule } from './checkout-review-submit/checkout-review-submit.module';
import { CheckoutB2BAuthGuard } from './guards/checkout-b2b-auth.guard';
import { CheckoutB2BStepsSetGuard } from './guards/checkout-b2b-steps-set.guard';
import * as i0 from "@angular/core";
export class CheckoutB2BComponentsModule {
}
CheckoutB2BComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutB2BComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BComponentsModule, imports: [CommonModule,
        CheckoutCostCenterModule,
        CheckoutPaymentTypeModule,
        B2BCheckoutDeliveryAddressModule,
        B2BCheckoutReviewSubmitModule] });
CheckoutB2BComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BComponentsModule, providers: [
        {
            provide: CheckoutAuthGuard,
            useExisting: CheckoutB2BAuthGuard,
        },
        {
            provide: CheckoutStepsSetGuard,
            useExisting: CheckoutB2BStepsSetGuard,
        },
    ], imports: [CommonModule,
        CheckoutCostCenterModule,
        CheckoutPaymentTypeModule,
        B2BCheckoutDeliveryAddressModule,
        B2BCheckoutReviewSubmitModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CheckoutCostCenterModule,
                        CheckoutPaymentTypeModule,
                        B2BCheckoutDeliveryAddressModule,
                        B2BCheckoutReviewSubmitModule,
                    ],
                    providers: [
                        {
                            provide: CheckoutAuthGuard,
                            useExisting: CheckoutB2BAuthGuard,
                        },
                        {
                            provide: CheckoutStepsSetGuard,
                            useExisting: CheckoutB2BStepsSetGuard,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtYjJiLWNvbXBvbmVudHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2IyYi9jb21wb25lbnRzL2NoZWNrb3V0LWIyYi1jb21wb25lbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixxQkFBcUIsR0FDdEIsTUFBTSxxQ0FBcUMsQ0FBQztBQUM3QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUM5RixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUNoSCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNqRyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUN2RyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7QUFxQmpGLE1BQU0sT0FBTywyQkFBMkI7O3dIQUEzQiwyQkFBMkI7eUhBQTNCLDJCQUEyQixZQWpCcEMsWUFBWTtRQUNaLHdCQUF3QjtRQUN4Qix5QkFBeUI7UUFDekIsZ0NBQWdDO1FBQ2hDLDZCQUE2Qjt5SEFhcEIsMkJBQTJCLGFBWDNCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFdBQVcsRUFBRSxvQkFBb0I7U0FDbEM7UUFDRDtZQUNFLE9BQU8sRUFBRSxxQkFBcUI7WUFDOUIsV0FBVyxFQUFFLHdCQUF3QjtTQUN0QztLQUNGLFlBZkMsWUFBWTtRQUNaLHdCQUF3QjtRQUN4Qix5QkFBeUI7UUFDekIsZ0NBQWdDO1FBQ2hDLDZCQUE2QjsyRkFhcEIsMkJBQTJCO2tCQW5CdkMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWix3QkFBd0I7d0JBQ3hCLHlCQUF5Qjt3QkFDekIsZ0NBQWdDO3dCQUNoQyw2QkFBNkI7cUJBQzlCO29CQUNELFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsb0JBQW9CO3lCQUNsQzt3QkFDRDs0QkFDRSxPQUFPLEVBQUUscUJBQXFCOzRCQUM5QixXQUFXLEVBQUUsd0JBQXdCO3lCQUN0QztxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2hlY2tvdXRBdXRoR3VhcmQsXG4gIENoZWNrb3V0U3RlcHNTZXRHdWFyZCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jaGVja291dC9iYXNlL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgQ2hlY2tvdXRDb3N0Q2VudGVyTW9kdWxlIH0gZnJvbSAnLi9jaGVja291dC1jb3N0LWNlbnRlci9jaGVja291dC1jb3N0LWNlbnRlci5tb2R1bGUnO1xuaW1wb3J0IHsgQjJCQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NNb2R1bGUgfSBmcm9tICcuL2NoZWNrb3V0LWRlbGl2ZXJ5LWFkZHJlc3MvY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy5tb2R1bGUnO1xuaW1wb3J0IHsgQ2hlY2tvdXRQYXltZW50VHlwZU1vZHVsZSB9IGZyb20gJy4vY2hlY2tvdXQtcGF5bWVudC10eXBlL2NoZWNrb3V0LXBheW1lbnQtdHlwZS5tb2R1bGUnO1xuaW1wb3J0IHsgQjJCQ2hlY2tvdXRSZXZpZXdTdWJtaXRNb2R1bGUgfSBmcm9tICcuL2NoZWNrb3V0LXJldmlldy1zdWJtaXQvY2hlY2tvdXQtcmV2aWV3LXN1Ym1pdC5tb2R1bGUnO1xuaW1wb3J0IHsgQ2hlY2tvdXRCMkJBdXRoR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9jaGVja291dC1iMmItYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBDaGVja291dEIyQlN0ZXBzU2V0R3VhcmQgfSBmcm9tICcuL2d1YXJkcy9jaGVja291dC1iMmItc3RlcHMtc2V0Lmd1YXJkJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBDaGVja291dENvc3RDZW50ZXJNb2R1bGUsXG4gICAgQ2hlY2tvdXRQYXltZW50VHlwZU1vZHVsZSxcbiAgICBCMkJDaGVja291dERlbGl2ZXJ5QWRkcmVzc01vZHVsZSxcbiAgICBCMkJDaGVja291dFJldmlld1N1Ym1pdE1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogQ2hlY2tvdXRBdXRoR3VhcmQsXG4gICAgICB1c2VFeGlzdGluZzogQ2hlY2tvdXRCMkJBdXRoR3VhcmQsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBDaGVja291dFN0ZXBzU2V0R3VhcmQsXG4gICAgICB1c2VFeGlzdGluZzogQ2hlY2tvdXRCMkJTdGVwc1NldEd1YXJkLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0QjJCQ29tcG9uZW50c01vZHVsZSB7fVxuIl19