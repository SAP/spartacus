/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartNotEmptyGuard, CheckoutAuthGuard, } from '@spartacus/checkout/base/components';
import { I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { AtMessageModule } from '@spartacus/storefront';
import { CheckoutScheduledReplenishmentPlaceOrderComponent } from './checkout-place-order.component';
import * as i0 from "@angular/core";
export class CheckoutScheduledReplenishmentPlaceOrderModule {
}
CheckoutScheduledReplenishmentPlaceOrderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentPlaceOrderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutScheduledReplenishmentPlaceOrderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentPlaceOrderModule, declarations: [CheckoutScheduledReplenishmentPlaceOrderComponent], imports: [AtMessageModule,
        CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule], exports: [CheckoutScheduledReplenishmentPlaceOrderComponent] });
CheckoutScheduledReplenishmentPlaceOrderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentPlaceOrderModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutPlaceOrder: {
                    component: CheckoutScheduledReplenishmentPlaceOrderComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                },
            },
        }),
    ], imports: [AtMessageModule,
        CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduledReplenishmentPlaceOrderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AtMessageModule,
                        CommonModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        ReactiveFormsModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutPlaceOrder: {
                                    component: CheckoutScheduledReplenishmentPlaceOrderComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutScheduledReplenishmentPlaceOrderComponent],
                    exports: [CheckoutScheduledReplenishmentPlaceOrderComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcGxhY2Utb3JkZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L3NjaGVkdWxlZC1yZXBsZW5pc2htZW50L2NvbXBvbmVudHMvY2hlY2tvdXQtcGxhY2Utb3JkZXIvY2hlY2tvdXQtcGxhY2Utb3JkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixpQkFBaUIsR0FDbEIsTUFBTSxxQ0FBcUMsQ0FBQztBQUM3QyxPQUFPLEVBRUwsVUFBVSxFQUNWLG9CQUFvQixFQUNwQixTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGlEQUFpRCxFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0FBd0JyRyxNQUFNLE9BQU8sOENBQThDOzsySUFBOUMsOENBQThDOzRJQUE5Qyw4Q0FBOEMsaUJBSDFDLGlEQUFpRCxhQWpCOUQsZUFBZTtRQUNmLFlBQVk7UUFDWixZQUFZO1FBQ1osU0FBUztRQUNULFVBQVU7UUFDVixtQkFBbUIsYUFhWCxpREFBaUQ7NElBRWhELDhDQUE4QyxhQWI5QztRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYixrQkFBa0IsRUFBRTtvQkFDbEIsU0FBUyxFQUFFLGlEQUFpRDtvQkFDNUQsTUFBTSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUM7aUJBQy9DO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFoQkMsZUFBZTtRQUNmLFlBQVk7UUFDWixZQUFZO1FBQ1osU0FBUztRQUNULFVBQVU7UUFDVixtQkFBbUI7MkZBZVYsOENBQThDO2tCQXRCMUQsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsZUFBZTt3QkFDZixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osU0FBUzt3QkFDVCxVQUFVO3dCQUNWLG1CQUFtQjtxQkFDcEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2Isa0JBQWtCLEVBQUU7b0NBQ2xCLFNBQVMsRUFBRSxpREFBaUQ7b0NBQzVELE1BQU0sRUFBRSxDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDO2lDQUMvQzs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLGlEQUFpRCxDQUFDO29CQUNqRSxPQUFPLEVBQUUsQ0FBQyxpREFBaUQsQ0FBQztpQkFDN0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQ2FydE5vdEVtcHR5R3VhcmQsXG4gIENoZWNrb3V0QXV0aEd1YXJkLFxufSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2UvY29tcG9uZW50cyc7XG5pbXBvcnQge1xuICBDbXNDb25maWcsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBVcmxNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBBdE1lc3NhZ2VNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQ2hlY2tvdXRTY2hlZHVsZWRSZXBsZW5pc2htZW50UGxhY2VPcmRlckNvbXBvbmVudCB9IGZyb20gJy4vY2hlY2tvdXQtcGxhY2Utb3JkZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEF0TWVzc2FnZU1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBDaGVja291dFBsYWNlT3JkZXI6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IENoZWNrb3V0U2NoZWR1bGVkUmVwbGVuaXNobWVudFBsYWNlT3JkZXJDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQ2hlY2tvdXRBdXRoR3VhcmQsIENhcnROb3RFbXB0eUd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NoZWNrb3V0U2NoZWR1bGVkUmVwbGVuaXNobWVudFBsYWNlT3JkZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ2hlY2tvdXRTY2hlZHVsZWRSZXBsZW5pc2htZW50UGxhY2VPcmRlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0U2NoZWR1bGVkUmVwbGVuaXNobWVudFBsYWNlT3JkZXJNb2R1bGUge31cbiJdfQ==