/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartNotEmptyGuard, CheckoutAuthGuard, } from '@spartacus/checkout/base/components';
import { FeaturesConfigModule, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { CardModule, IconModule, OutletModule, PromotionsModule, } from '@spartacus/storefront';
import { B2BCheckoutReviewSubmitComponent } from './checkout-review-submit.component';
import * as i0 from "@angular/core";
export class B2BCheckoutReviewSubmitModule {
}
B2BCheckoutReviewSubmitModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: B2BCheckoutReviewSubmitModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
B2BCheckoutReviewSubmitModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: B2BCheckoutReviewSubmitModule, declarations: [B2BCheckoutReviewSubmitComponent], imports: [CommonModule,
        CardModule,
        I18nModule,
        UrlModule,
        RouterModule,
        PromotionsModule,
        IconModule,
        OutletModule,
        FeaturesConfigModule], exports: [B2BCheckoutReviewSubmitComponent] });
B2BCheckoutReviewSubmitModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: B2BCheckoutReviewSubmitModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutReviewOrder: {
                    component: B2BCheckoutReviewSubmitComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        CardModule,
        I18nModule,
        UrlModule,
        RouterModule,
        PromotionsModule,
        IconModule,
        OutletModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: B2BCheckoutReviewSubmitModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        I18nModule,
                        UrlModule,
                        RouterModule,
                        PromotionsModule,
                        IconModule,
                        OutletModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutReviewOrder: {
                                    component: B2BCheckoutReviewSubmitComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [B2BCheckoutReviewSubmitComponent],
                    exports: [B2BCheckoutReviewSubmitComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcmV2aWV3LXN1Ym1pdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYjJiL2NvbXBvbmVudHMvY2hlY2tvdXQtcmV2aWV3LXN1Ym1pdC9jaGVja291dC1yZXZpZXctc3VibWl0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsaUJBQWlCLEdBQ2xCLE1BQU0scUNBQXFDLENBQUM7QUFDN0MsT0FBTyxFQUVMLG9CQUFvQixFQUNwQixVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxVQUFVLEVBQ1YsVUFBVSxFQUNWLFlBQVksRUFDWixnQkFBZ0IsR0FDakIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7QUEyQnRGLE1BQU0sT0FBTyw2QkFBNkI7OzBIQUE3Qiw2QkFBNkI7MkhBQTdCLDZCQUE2QixpQkFIekIsZ0NBQWdDLGFBcEI3QyxZQUFZO1FBQ1osVUFBVTtRQUNWLFVBQVU7UUFDVixTQUFTO1FBQ1QsWUFBWTtRQUNaLGdCQUFnQjtRQUNoQixVQUFVO1FBQ1YsWUFBWTtRQUNaLG9CQUFvQixhQWFaLGdDQUFnQzsySEFFL0IsNkJBQTZCLGFBYjdCO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLG1CQUFtQixFQUFFO29CQUNuQixTQUFTLEVBQUUsZ0NBQWdDO29CQUMzQyxNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQztpQkFDL0M7YUFDRjtTQUNGLENBQUM7S0FDSCxZQW5CQyxZQUFZO1FBQ1osVUFBVTtRQUNWLFVBQVU7UUFDVixTQUFTO1FBQ1QsWUFBWTtRQUNaLGdCQUFnQjtRQUNoQixVQUFVO1FBQ1YsWUFBWTtRQUNaLG9CQUFvQjsyRkFlWCw2QkFBNkI7a0JBekJ6QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixTQUFTO3dCQUNULFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQixVQUFVO3dCQUNWLFlBQVk7d0JBQ1osb0JBQW9CO3FCQUNyQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYixtQkFBbUIsRUFBRTtvQ0FDbkIsU0FBUyxFQUFFLGdDQUFnQztvQ0FDM0MsTUFBTSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUM7aUNBQy9DOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsZ0NBQWdDLENBQUM7b0JBQ2hELE9BQU8sRUFBRSxDQUFDLGdDQUFnQyxDQUFDO2lCQUM1QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIENhcnROb3RFbXB0eUd1YXJkLFxuICBDaGVja291dEF1dGhHdWFyZCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jaGVja291dC9iYXNlL2NvbXBvbmVudHMnO1xuaW1wb3J0IHtcbiAgQ21zQ29uZmlnLFxuICBGZWF0dXJlc0NvbmZpZ01vZHVsZSxcbiAgSTE4bk1vZHVsZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIFVybE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIENhcmRNb2R1bGUsXG4gIEljb25Nb2R1bGUsXG4gIE91dGxldE1vZHVsZSxcbiAgUHJvbW90aW9uc01vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEIyQkNoZWNrb3V0UmV2aWV3U3VibWl0Q29tcG9uZW50IH0gZnJvbSAnLi9jaGVja291dC1yZXZpZXctc3VibWl0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ2FyZE1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgUHJvbW90aW9uc01vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICAgIE91dGxldE1vZHVsZSxcbiAgICBGZWF0dXJlc0NvbmZpZ01vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIENoZWNrb3V0UmV2aWV3T3JkZXI6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IEIyQkNoZWNrb3V0UmV2aWV3U3VibWl0Q29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0NoZWNrb3V0QXV0aEd1YXJkLCBDYXJ0Tm90RW1wdHlHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtCMkJDaGVja291dFJldmlld1N1Ym1pdENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtCMkJDaGVja291dFJldmlld1N1Ym1pdENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIEIyQkNoZWNrb3V0UmV2aWV3U3VibWl0TW9kdWxlIHt9XG4iXX0=