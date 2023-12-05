/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckoutCostCenterAdapter, CheckoutPaymentTypeAdapter, } from '@spartacus/checkout/b2b/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OccCheckoutCostCenterAdapter } from './adapters/occ-checkout-cost-center.adapter';
import { OccCheckoutPaymentTypeAdapter } from './adapters/occ-checkout-payment-type.adapter';
import { defaultOccCheckoutB2BConfig } from './config/default-occ-checkout-b2b-config';
import * as i0 from "@angular/core";
export class CheckoutB2BOccModule {
}
CheckoutB2BOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutB2BOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BOccModule, imports: [CommonModule] });
CheckoutB2BOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BOccModule, providers: [
        provideDefaultConfig(defaultOccCheckoutB2BConfig),
        {
            provide: CheckoutPaymentTypeAdapter,
            useClass: OccCheckoutPaymentTypeAdapter,
        },
        {
            provide: CheckoutCostCenterAdapter,
            useClass: OccCheckoutCostCenterAdapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccCheckoutB2BConfig),
                        {
                            provide: CheckoutPaymentTypeAdapter,
                            useClass: OccCheckoutPaymentTypeAdapter,
                        },
                        {
                            provide: CheckoutCostCenterAdapter,
                            useClass: OccCheckoutCostCenterAdapter,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtYjJiLW9jYy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYjJiL29jYy9jaGVja291dC1iMmItb2NjLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNMLHlCQUF5QixFQUN6QiwwQkFBMEIsR0FDM0IsTUFBTSw4QkFBOEIsQ0FBQztBQUN0QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMzRixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM3RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7QUFldkYsTUFBTSxPQUFPLG9CQUFvQjs7aUhBQXBCLG9CQUFvQjtrSEFBcEIsb0JBQW9CLFlBYnJCLFlBQVk7a0hBYVgsb0JBQW9CLGFBWnBCO1FBQ1Qsb0JBQW9CLENBQUMsMkJBQTJCLENBQUM7UUFDakQ7WUFDRSxPQUFPLEVBQUUsMEJBQTBCO1lBQ25DLFFBQVEsRUFBRSw2QkFBNkI7U0FDeEM7UUFDRDtZQUNFLE9BQU8sRUFBRSx5QkFBeUI7WUFDbEMsUUFBUSxFQUFFLDRCQUE0QjtTQUN2QztLQUNGLFlBWFMsWUFBWTsyRkFhWCxvQkFBb0I7a0JBZGhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQUMsMkJBQTJCLENBQUM7d0JBQ2pEOzRCQUNFLE9BQU8sRUFBRSwwQkFBMEI7NEJBQ25DLFFBQVEsRUFBRSw2QkFBNkI7eUJBQ3hDO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSx5QkFBeUI7NEJBQ2xDLFFBQVEsRUFBRSw0QkFBNEI7eUJBQ3ZDO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDaGVja291dENvc3RDZW50ZXJBZGFwdGVyLFxuICBDaGVja291dFBheW1lbnRUeXBlQWRhcHRlcixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jaGVja291dC9iMmIvY29yZSc7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPY2NDaGVja291dENvc3RDZW50ZXJBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycy9vY2MtY2hlY2tvdXQtY29zdC1jZW50ZXIuYWRhcHRlcic7XG5pbXBvcnQgeyBPY2NDaGVja291dFBheW1lbnRUeXBlQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcnMvb2NjLWNoZWNrb3V0LXBheW1lbnQtdHlwZS5hZGFwdGVyJztcbmltcG9ydCB7IGRlZmF1bHRPY2NDaGVja291dEIyQkNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtb2NjLWNoZWNrb3V0LWIyYi1jb25maWcnO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRPY2NDaGVja291dEIyQkNvbmZpZyksXG4gICAge1xuICAgICAgcHJvdmlkZTogQ2hlY2tvdXRQYXltZW50VHlwZUFkYXB0ZXIsXG4gICAgICB1c2VDbGFzczogT2NjQ2hlY2tvdXRQYXltZW50VHlwZUFkYXB0ZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBDaGVja291dENvc3RDZW50ZXJBZGFwdGVyLFxuICAgICAgdXNlQ2xhc3M6IE9jY0NoZWNrb3V0Q29zdENlbnRlckFkYXB0ZXIsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRCMkJPY2NNb2R1bGUge31cbiJdfQ==