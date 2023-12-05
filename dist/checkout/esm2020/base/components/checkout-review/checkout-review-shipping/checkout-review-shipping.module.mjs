/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { CardModule, IconModule, OutletModule } from '@spartacus/storefront';
import { CartNotEmptyGuard } from '../../guards/cart-not-empty.guard';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
import { CheckoutReviewShippingComponent } from './checkout-review-shipping.component';
import * as i0 from "@angular/core";
export class CheckoutReviewShippingModule {
}
CheckoutReviewShippingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutReviewShippingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutReviewShippingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutReviewShippingModule, declarations: [CheckoutReviewShippingComponent], imports: [CommonModule,
        I18nModule,
        CardModule,
        UrlModule,
        RouterModule,
        IconModule,
        OutletModule], exports: [CheckoutReviewShippingComponent] });
CheckoutReviewShippingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutReviewShippingModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutReviewShipping: {
                    component: CheckoutReviewShippingComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        I18nModule,
        CardModule,
        UrlModule,
        RouterModule,
        IconModule,
        OutletModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutReviewShippingModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [CheckoutReviewShippingComponent],
                    exports: [CheckoutReviewShippingComponent],
                    imports: [
                        CommonModule,
                        I18nModule,
                        CardModule,
                        UrlModule,
                        RouterModule,
                        IconModule,
                        OutletModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutReviewShipping: {
                                    component: CheckoutReviewShippingComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcmV2aWV3LXNoaXBwaW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iYXNlL2NvbXBvbmVudHMvY2hlY2tvdXQtcmV2aWV3L2NoZWNrb3V0LXJldmlldy1zaGlwcGluZy9jaGVja291dC1yZXZpZXctc2hpcHBpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUVMLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsU0FBUyxHQUNWLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7O0FBeUJ2RixNQUFNLE9BQU8sNEJBQTRCOzt5SEFBNUIsNEJBQTRCOzBIQUE1Qiw0QkFBNEIsaUJBdEJ4QiwrQkFBK0IsYUFHNUMsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVO1FBQ1YsU0FBUztRQUNULFlBQVk7UUFDWixVQUFVO1FBQ1YsWUFBWSxhQVJKLCtCQUErQjswSEFxQjlCLDRCQUE0QixhQVg1QjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYixzQkFBc0IsRUFBRTtvQkFDdEIsU0FBUyxFQUFFLCtCQUErQjtvQkFDMUMsTUFBTSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUM7aUJBQy9DO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFqQkMsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVO1FBQ1YsU0FBUztRQUNULFlBQVk7UUFDWixVQUFVO1FBQ1YsWUFBWTsyRkFhSCw0QkFBNEI7a0JBdkJ4QyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLCtCQUErQixDQUFDO29CQUMvQyxPQUFPLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztvQkFDMUMsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixVQUFVO3dCQUNWLFNBQVM7d0JBQ1QsWUFBWTt3QkFDWixVQUFVO3dCQUNWLFlBQVk7cUJBQ2I7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2Isc0JBQXNCLEVBQUU7b0NBQ3RCLFNBQVMsRUFBRSwrQkFBK0I7b0NBQzFDLE1BQU0sRUFBRSxDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDO2lDQUMvQzs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQ21zQ29uZmlnLFxuICBJMThuTW9kdWxlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgVXJsTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ2FyZE1vZHVsZSwgSWNvbk1vZHVsZSwgT3V0bGV0TW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENhcnROb3RFbXB0eUd1YXJkIH0gZnJvbSAnLi4vLi4vZ3VhcmRzL2NhcnQtbm90LWVtcHR5Lmd1YXJkJztcbmltcG9ydCB7IENoZWNrb3V0QXV0aEd1YXJkIH0gZnJvbSAnLi4vLi4vZ3VhcmRzL2NoZWNrb3V0LWF1dGguZ3VhcmQnO1xuaW1wb3J0IHsgQ2hlY2tvdXRSZXZpZXdTaGlwcGluZ0NvbXBvbmVudCB9IGZyb20gJy4vY2hlY2tvdXQtcmV2aWV3LXNoaXBwaW5nLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0NoZWNrb3V0UmV2aWV3U2hpcHBpbmdDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ2hlY2tvdXRSZXZpZXdTaGlwcGluZ0NvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBDYXJkTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgSWNvbk1vZHVsZSxcbiAgICBPdXRsZXRNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBDaGVja291dFJldmlld1NoaXBwaW5nOiB7XG4gICAgICAgICAgY29tcG9uZW50OiBDaGVja291dFJldmlld1NoaXBwaW5nQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0NoZWNrb3V0QXV0aEd1YXJkLCBDYXJ0Tm90RW1wdHlHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dFJldmlld1NoaXBwaW5nTW9kdWxlIHt9XG4iXX0=