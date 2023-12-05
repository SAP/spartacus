/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartValidationGuard } from '@spartacus/cart/base/core';
import { CartNotEmptyGuard, CheckoutAuthGuard, } from '@spartacus/checkout/base/components';
import { ConfigModule, I18nModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { CheckoutPaymentTypeComponent } from './checkout-payment-type.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class CheckoutPaymentTypeModule {
}
CheckoutPaymentTypeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutPaymentTypeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeModule, declarations: [CheckoutPaymentTypeComponent], imports: [CommonModule,
        I18nModule,
        SpinnerModule, i1.ConfigModule], exports: [CheckoutPaymentTypeComponent] });
CheckoutPaymentTypeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeModule, imports: [CommonModule,
        I18nModule,
        SpinnerModule,
        ConfigModule.withConfig({
            cmsComponents: {
                CheckoutPaymentType: {
                    component: CheckoutPaymentTypeComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        SpinnerModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                CheckoutPaymentType: {
                                    component: CheckoutPaymentTypeComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutPaymentTypeComponent],
                    exports: [CheckoutPaymentTypeComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcGF5bWVudC10eXBlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iMmIvY29tcG9uZW50cy9jaGVja291dC1wYXltZW50LXR5cGUvY2hlY2tvdXQtcGF5bWVudC10eXBlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixpQkFBaUIsR0FDbEIsTUFBTSxxQ0FBcUMsQ0FBQztBQUM3QyxPQUFPLEVBQWEsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7O0FBbUJqRixNQUFNLE9BQU8seUJBQXlCOztzSEFBekIseUJBQXlCO3VIQUF6Qix5QkFBeUIsaUJBSHJCLDRCQUE0QixhQVp6QyxZQUFZO1FBQ1osVUFBVTtRQUNWLGFBQWEsOEJBV0wsNEJBQTRCO3VIQUUzQix5QkFBeUIsWUFmbEMsWUFBWTtRQUNaLFVBQVU7UUFDVixhQUFhO1FBQ2IsWUFBWSxDQUFDLFVBQVUsQ0FBWTtZQUNqQyxhQUFhLEVBQUU7Z0JBQ2IsbUJBQW1CLEVBQUU7b0JBQ25CLFNBQVMsRUFBRSw0QkFBNEI7b0JBQ3ZDLE1BQU0sRUFBRSxDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDO2lCQUNwRTthQUNGO1NBQ0YsQ0FBQzsyRkFLTyx5QkFBeUI7a0JBakJyQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsYUFBYTt3QkFDYixZQUFZLENBQUMsVUFBVSxDQUFZOzRCQUNqQyxhQUFhLEVBQUU7Z0NBQ2IsbUJBQW1CLEVBQUU7b0NBQ25CLFNBQVMsRUFBRSw0QkFBNEI7b0NBQ3ZDLE1BQU0sRUFBRSxDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDO2lDQUNwRTs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLDRCQUE0QixDQUFDO29CQUM1QyxPQUFPLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztpQkFDeEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcnRWYWxpZGF0aW9uR3VhcmQgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9jb3JlJztcbmltcG9ydCB7XG4gIENhcnROb3RFbXB0eUd1YXJkLFxuICBDaGVja291dEF1dGhHdWFyZCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jaGVja291dC9iYXNlL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBDb25maWdNb2R1bGUsIEkxOG5Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgU3Bpbm5lck1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDaGVja291dFBheW1lbnRUeXBlQ29tcG9uZW50IH0gZnJvbSAnLi9jaGVja291dC1wYXltZW50LXR5cGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gICAgQ29uZmlnTW9kdWxlLndpdGhDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIENoZWNrb3V0UGF5bWVudFR5cGU6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IENoZWNrb3V0UGF5bWVudFR5cGVDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQ2hlY2tvdXRBdXRoR3VhcmQsIENhcnROb3RFbXB0eUd1YXJkLCBDYXJ0VmFsaWRhdGlvbkd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NoZWNrb3V0UGF5bWVudFR5cGVDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ2hlY2tvdXRQYXltZW50VHlwZUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0UGF5bWVudFR5cGVNb2R1bGUge31cbiJdfQ==