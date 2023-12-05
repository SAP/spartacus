/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { FormErrorsModule, IconModule } from '@spartacus/storefront';
import { AppliedCouponsComponent } from './applied-coupons/applied-coupons.component';
import { CartCouponComponent } from './cart-coupon.component';
import * as i0 from "@angular/core";
export class CartCouponModule {
}
CartCouponModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartCouponModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartCouponModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartCouponModule, declarations: [CartCouponComponent, AppliedCouponsComponent], imports: [CommonModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        I18nModule,
        IconModule,
        FormErrorsModule], exports: [CartCouponComponent, AppliedCouponsComponent] });
CartCouponModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartCouponModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CartApplyCouponComponent: {
                    component: CartCouponComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        I18nModule,
        IconModule,
        FormErrorsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartCouponModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [CartCouponComponent, AppliedCouponsComponent],
                    exports: [CartCouponComponent, AppliedCouponsComponent],
                    imports: [
                        CommonModule,
                        NgSelectModule,
                        FormsModule,
                        ReactiveFormsModule,
                        I18nModule,
                        IconModule,
                        FormErrorsModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CartApplyCouponComponent: {
                                    component: CartCouponComponent,
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1jb3Vwb24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb21wb25lbnRzL2NhcnQtY291cG9uL2NhcnQtY291cG9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQWEsVUFBVSxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQXdCOUQsTUFBTSxPQUFPLGdCQUFnQjs7NkdBQWhCLGdCQUFnQjs4R0FBaEIsZ0JBQWdCLGlCQXJCWixtQkFBbUIsRUFBRSx1QkFBdUIsYUFHekQsWUFBWTtRQUNaLGNBQWM7UUFDZCxXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLFVBQVU7UUFDVixVQUFVO1FBQ1YsZ0JBQWdCLGFBUlIsbUJBQW1CLEVBQUUsdUJBQXVCOzhHQW9CM0MsZ0JBQWdCLGFBVmhCO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLHdCQUF3QixFQUFFO29CQUN4QixTQUFTLEVBQUUsbUJBQW1CO2lCQUMvQjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBaEJDLFlBQVk7UUFDWixjQUFjO1FBQ2QsV0FBVztRQUNYLG1CQUFtQjtRQUNuQixVQUFVO1FBQ1YsVUFBVTtRQUNWLGdCQUFnQjsyRkFZUCxnQkFBZ0I7a0JBdEI1QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLG1CQUFtQixFQUFFLHVCQUF1QixDQUFDO29CQUM1RCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSx1QkFBdUIsQ0FBQztvQkFDdkQsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osY0FBYzt3QkFDZCxXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsVUFBVTt3QkFDVixVQUFVO3dCQUNWLGdCQUFnQjtxQkFDakI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2Isd0JBQXdCLEVBQUU7b0NBQ3hCLFNBQVMsRUFBRSxtQkFBbUI7aUNBQy9COzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTmdTZWxlY3RNb2R1bGUgfSBmcm9tICdAbmctc2VsZWN0L25nLXNlbGVjdCc7XG5pbXBvcnQgeyBDbXNDb25maWcsIEkxOG5Nb2R1bGUsIHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEZvcm1FcnJvcnNNb2R1bGUsIEljb25Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQXBwbGllZENvdXBvbnNDb21wb25lbnQgfSBmcm9tICcuL2FwcGxpZWQtY291cG9ucy9hcHBsaWVkLWNvdXBvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IENhcnRDb3Vwb25Db21wb25lbnQgfSBmcm9tICcuL2NhcnQtY291cG9uLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0NhcnRDb3Vwb25Db21wb25lbnQsIEFwcGxpZWRDb3Vwb25zQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NhcnRDb3Vwb25Db21wb25lbnQsIEFwcGxpZWRDb3Vwb25zQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBOZ1NlbGVjdE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgSWNvbk1vZHVsZSxcbiAgICBGb3JtRXJyb3JzTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgQ2FydEFwcGx5Q291cG9uQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBDYXJ0Q291cG9uQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FydENvdXBvbk1vZHVsZSB7fVxuIl19