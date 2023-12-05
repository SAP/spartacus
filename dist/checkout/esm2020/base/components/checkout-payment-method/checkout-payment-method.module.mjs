/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, FeaturesConfigModule, } from '@spartacus/core';
import { CardModule, SpinnerModule } from '@spartacus/storefront';
import { CartNotEmptyGuard } from '../guards/cart-not-empty.guard';
import { CheckoutAuthGuard } from '../guards/checkout-auth.guard';
import { CheckoutPaymentFormModule } from './checkout-payment-form/checkout-payment-form.module';
import { CheckoutPaymentMethodComponent } from './checkout-payment-method.component';
import * as i0 from "@angular/core";
export class CheckoutPaymentMethodModule {
}
CheckoutPaymentMethodModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentMethodModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutPaymentMethodModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentMethodModule, declarations: [CheckoutPaymentMethodComponent], imports: [CommonModule,
        RouterModule,
        CheckoutPaymentFormModule,
        CardModule,
        SpinnerModule,
        I18nModule,
        FeaturesConfigModule], exports: [CheckoutPaymentMethodComponent] });
CheckoutPaymentMethodModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentMethodModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutPaymentDetails: {
                    component: CheckoutPaymentMethodComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        CheckoutPaymentFormModule,
        CardModule,
        SpinnerModule,
        I18nModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentMethodModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        CheckoutPaymentFormModule,
                        CardModule,
                        SpinnerModule,
                        I18nModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutPaymentDetails: {
                                    component: CheckoutPaymentMethodComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutPaymentMethodComponent],
                    exports: [CheckoutPaymentMethodComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcGF5bWVudC1tZXRob2QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2Jhc2UvY29tcG9uZW50cy9jaGVja291dC1wYXltZW50LW1ldGhvZC9jaGVja291dC1wYXltZW50LW1ldGhvZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBRUwsVUFBVSxFQUNWLG9CQUFvQixFQUNwQixvQkFBb0IsR0FDckIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOztBQXlCckYsTUFBTSxPQUFPLDJCQUEyQjs7d0hBQTNCLDJCQUEyQjt5SEFBM0IsMkJBQTJCLGlCQUh2Qiw4QkFBOEIsYUFsQjNDLFlBQVk7UUFDWixZQUFZO1FBQ1oseUJBQXlCO1FBQ3pCLFVBQVU7UUFDVixhQUFhO1FBQ2IsVUFBVTtRQUNWLG9CQUFvQixhQWFaLDhCQUE4Qjt5SEFFN0IsMkJBQTJCLGFBYjNCO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLHNCQUFzQixFQUFFO29CQUN0QixTQUFTLEVBQUUsOEJBQThCO29CQUN6QyxNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQztpQkFDL0M7YUFDRjtTQUNGLENBQUM7S0FDSCxZQWpCQyxZQUFZO1FBQ1osWUFBWTtRQUNaLHlCQUF5QjtRQUN6QixVQUFVO1FBQ1YsYUFBYTtRQUNiLFVBQVU7UUFDVixvQkFBb0I7MkZBZVgsMkJBQTJCO2tCQXZCdkMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixZQUFZO3dCQUNaLHlCQUF5Qjt3QkFDekIsVUFBVTt3QkFDVixhQUFhO3dCQUNiLFVBQVU7d0JBQ1Ysb0JBQW9CO3FCQUNyQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYixzQkFBc0IsRUFBRTtvQ0FDdEIsU0FBUyxFQUFFLDhCQUE4QjtvQ0FDekMsTUFBTSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUM7aUNBQy9DOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsOEJBQThCLENBQUM7b0JBQzlDLE9BQU8sRUFBRSxDQUFDLDhCQUE4QixDQUFDO2lCQUMxQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIENtc0NvbmZpZyxcbiAgSTE4bk1vZHVsZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIEZlYXR1cmVzQ29uZmlnTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ2FyZE1vZHVsZSwgU3Bpbm5lck1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDYXJ0Tm90RW1wdHlHdWFyZCB9IGZyb20gJy4uL2d1YXJkcy9jYXJ0LW5vdC1lbXB0eS5ndWFyZCc7XG5pbXBvcnQgeyBDaGVja291dEF1dGhHdWFyZCB9IGZyb20gJy4uL2d1YXJkcy9jaGVja291dC1hdXRoLmd1YXJkJztcbmltcG9ydCB7IENoZWNrb3V0UGF5bWVudEZvcm1Nb2R1bGUgfSBmcm9tICcuL2NoZWNrb3V0LXBheW1lbnQtZm9ybS9jaGVja291dC1wYXltZW50LWZvcm0ubW9kdWxlJztcbmltcG9ydCB7IENoZWNrb3V0UGF5bWVudE1ldGhvZENvbXBvbmVudCB9IGZyb20gJy4vY2hlY2tvdXQtcGF5bWVudC1tZXRob2QuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgQ2hlY2tvdXRQYXltZW50Rm9ybU1vZHVsZSxcbiAgICBDYXJkTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBGZWF0dXJlc0NvbmZpZ01vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIENoZWNrb3V0UGF5bWVudERldGFpbHM6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IENoZWNrb3V0UGF5bWVudE1ldGhvZENvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtDaGVja291dEF1dGhHdWFyZCwgQ2FydE5vdEVtcHR5R3VhcmRdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ2hlY2tvdXRQYXltZW50TWV0aG9kQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0NoZWNrb3V0UGF5bWVudE1ldGhvZENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0UGF5bWVudE1ldGhvZE1vZHVsZSB7fVxuIl19