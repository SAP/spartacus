/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckoutPaymentMethodModule as CorePaymentMethodModule } from '@spartacus/checkout/base/components';
import { ConfigModule, I18nModule } from '@spartacus/core';
import { CardModule, SpinnerModule } from '@spartacus/storefront';
import { DpPaymentCallbackModule } from './dp-payment-callback/dp-payment-callback.module';
import { DpPaymentFormModule } from './dp-payment-form/dp-payment-form.module';
import { DpPaymentMethodComponent } from './dp-payment-method.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class DpPaymentMethodModule extends CorePaymentMethodModule {
}
DpPaymentMethodModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentMethodModule, deps: null, target: i0.ɵɵFactoryTarget.NgModule });
DpPaymentMethodModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentMethodModule, declarations: [DpPaymentMethodComponent], imports: [CommonModule,
        DpPaymentFormModule,
        RouterModule,
        CardModule,
        SpinnerModule,
        I18nModule,
        DpPaymentCallbackModule, i1.ConfigModule], exports: [DpPaymentMethodComponent] });
DpPaymentMethodModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentMethodModule, imports: [CommonModule,
        DpPaymentFormModule,
        RouterModule,
        CardModule,
        SpinnerModule,
        I18nModule,
        DpPaymentCallbackModule,
        ConfigModule.withConfig({
            cmsComponents: {
                CheckoutPaymentDetails: {
                    component: DpPaymentMethodComponent,
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentMethodModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        DpPaymentFormModule,
                        RouterModule,
                        CardModule,
                        SpinnerModule,
                        I18nModule,
                        DpPaymentCallbackModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                CheckoutPaymentDetails: {
                                    component: DpPaymentMethodComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [DpPaymentMethodComponent],
                    exports: [DpPaymentMethodComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHAtcGF5bWVudC1tZXRob2QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9kaWdpdGFsLXBheW1lbnRzL3NyYy9jaGVja291dC9jbXMtY29tcG9uZW50cy9kcC1wYXltZW50LW1ldGhvZC9kcC1wYXltZW50LW1ldGhvZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsMkJBQTJCLElBQUksdUJBQXVCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM3RyxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDM0YsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDL0UsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7OztBQXVCekUsTUFBTSxPQUFPLHFCQUFzQixTQUFRLHVCQUF1Qjs7a0hBQXJELHFCQUFxQjttSEFBckIscUJBQXFCLGlCQUhqQix3QkFBd0IsYUFoQnJDLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLFVBQVU7UUFDVixhQUFhO1FBQ2IsVUFBVTtRQUNWLHVCQUF1Qiw4QkFXZix3QkFBd0I7bUhBRXZCLHFCQUFxQixZQW5COUIsWUFBWTtRQUNaLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osVUFBVTtRQUNWLGFBQWE7UUFDYixVQUFVO1FBQ1YsdUJBQXVCO1FBRXZCLFlBQVksQ0FBQyxVQUFVLENBQUM7WUFDdEIsYUFBYSxFQUFFO2dCQUNiLHNCQUFzQixFQUFFO29CQUN0QixTQUFTLEVBQUUsd0JBQXdCO2lCQUNwQzthQUNGO1NBQ0YsQ0FBQzsyRkFLTyxxQkFBcUI7a0JBckJqQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixVQUFVO3dCQUNWLGFBQWE7d0JBQ2IsVUFBVTt3QkFDVix1QkFBdUI7d0JBRXZCLFlBQVksQ0FBQyxVQUFVLENBQUM7NEJBQ3RCLGFBQWEsRUFBRTtnQ0FDYixzQkFBc0IsRUFBRTtvQ0FDdEIsU0FBUyxFQUFFLHdCQUF3QjtpQ0FDcEM7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztvQkFDeEMsT0FBTyxFQUFFLENBQUMsd0JBQXdCLENBQUM7aUJBQ3BDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ2hlY2tvdXRQYXltZW50TWV0aG9kTW9kdWxlIGFzIENvcmVQYXltZW50TWV0aG9kTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jaGVja291dC9iYXNlL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgQ29uZmlnTW9kdWxlLCBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENhcmRNb2R1bGUsIFNwaW5uZXJNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgRHBQYXltZW50Q2FsbGJhY2tNb2R1bGUgfSBmcm9tICcuL2RwLXBheW1lbnQtY2FsbGJhY2svZHAtcGF5bWVudC1jYWxsYmFjay5tb2R1bGUnO1xuaW1wb3J0IHsgRHBQYXltZW50Rm9ybU1vZHVsZSB9IGZyb20gJy4vZHAtcGF5bWVudC1mb3JtL2RwLXBheW1lbnQtZm9ybS5tb2R1bGUnO1xuaW1wb3J0IHsgRHBQYXltZW50TWV0aG9kQ29tcG9uZW50IH0gZnJvbSAnLi9kcC1wYXltZW50LW1ldGhvZC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIERwUGF5bWVudEZvcm1Nb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIENhcmRNb2R1bGUsXG4gICAgU3Bpbm5lck1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIERwUGF5bWVudENhbGxiYWNrTW9kdWxlLFxuXG4gICAgQ29uZmlnTW9kdWxlLndpdGhDb25maWcoe1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBDaGVja291dFBheW1lbnREZXRhaWxzOiB7XG4gICAgICAgICAgY29tcG9uZW50OiBEcFBheW1lbnRNZXRob2RDb21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEcFBheW1lbnRNZXRob2RDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRHBQYXltZW50TWV0aG9kQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgRHBQYXltZW50TWV0aG9kTW9kdWxlIGV4dGVuZHMgQ29yZVBheW1lbnRNZXRob2RNb2R1bGUge31cbiJdfQ==