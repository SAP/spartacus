/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { PromotionsModule } from '@spartacus/storefront';
import { CartCouponModule } from '../cart-coupon/cart-coupon.module';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { CartDetailsComponent } from './cart-details.component';
import { CartValidationWarningsModule } from '../validation/cart-warnings/cart-validation-warnings.module';
import * as i0 from "@angular/core";
export class CartDetailsModule {
}
CartDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartDetailsModule, declarations: [CartDetailsComponent], imports: [CartSharedModule,
        CommonModule,
        CartCouponModule,
        RouterModule,
        UrlModule,
        PromotionsModule,
        I18nModule,
        CartValidationWarningsModule], exports: [CartDetailsComponent] });
CartDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartDetailsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CartComponent: {
                    component: CartDetailsComponent,
                },
            },
        }),
    ], imports: [CartSharedModule,
        CommonModule,
        CartCouponModule,
        RouterModule,
        UrlModule,
        PromotionsModule,
        I18nModule,
        CartValidationWarningsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CartSharedModule,
                        CommonModule,
                        CartCouponModule,
                        RouterModule,
                        UrlModule,
                        PromotionsModule,
                        I18nModule,
                        CartValidationWarningsModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CartComponent: {
                                    component: CartDetailsComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [CartDetailsComponent],
                    exports: [CartDetailsComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1kZXRhaWxzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2UvY29tcG9uZW50cy9jYXJ0LWRldGFpbHMvY2FydC1kZXRhaWxzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFFTCxVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDZEQUE2RCxDQUFDOztBQXlCM0csTUFBTSxPQUFPLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLGlCQUhiLG9CQUFvQixhQWxCakMsZ0JBQWdCO1FBQ2hCLFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLFNBQVM7UUFDVCxnQkFBZ0I7UUFDaEIsVUFBVTtRQUNWLDRCQUE0QixhQVlwQixvQkFBb0I7K0dBRW5CLGlCQUFpQixhQVpqQjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYixhQUFhLEVBQUU7b0JBQ2IsU0FBUyxFQUFFLG9CQUFvQjtpQkFDaEM7YUFDRjtTQUNGLENBQUM7S0FDSCxZQWpCQyxnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLGdCQUFnQjtRQUNoQixZQUFZO1FBQ1osU0FBUztRQUNULGdCQUFnQjtRQUNoQixVQUFVO1FBQ1YsNEJBQTRCOzJGQWNuQixpQkFBaUI7a0JBdkI3QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxnQkFBZ0I7d0JBQ2hCLFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQixZQUFZO3dCQUNaLFNBQVM7d0JBQ1QsZ0JBQWdCO3dCQUNoQixVQUFVO3dCQUNWLDRCQUE0QjtxQkFDN0I7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsYUFBYSxFQUFFO29DQUNiLFNBQVMsRUFBRSxvQkFBb0I7aUNBQ2hDOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsb0JBQW9CLENBQUM7b0JBQ3BDLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixDQUFDO2lCQUNoQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIENtc0NvbmZpZyxcbiAgSTE4bk1vZHVsZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIFVybE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFByb21vdGlvbnNNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQ2FydENvdXBvbk1vZHVsZSB9IGZyb20gJy4uL2NhcnQtY291cG9uL2NhcnQtY291cG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBDYXJ0U2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vY2FydC1zaGFyZWQvY2FydC1zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IENhcnREZXRhaWxzQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJ0LWRldGFpbHMuY29tcG9uZW50JztcbmltcG9ydCB7IENhcnRWYWxpZGF0aW9uV2FybmluZ3NNb2R1bGUgfSBmcm9tICcuLi92YWxpZGF0aW9uL2NhcnQtd2FybmluZ3MvY2FydC12YWxpZGF0aW9uLXdhcm5pbmdzLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDYXJ0U2hhcmVkTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBDYXJ0Q291cG9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgUHJvbW90aW9uc01vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIENhcnRWYWxpZGF0aW9uV2FybmluZ3NNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBDYXJ0Q29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBDYXJ0RGV0YWlsc0NvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NhcnREZXRhaWxzQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NhcnREZXRhaWxzQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FydERldGFpbHNNb2R1bGUge31cbiJdfQ==