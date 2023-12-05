/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartNotEmptyGuard, CheckoutAuthGuard, } from '@spartacus/checkout/base/components';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { CheckoutScheduleReplenishmentOrderComponent } from './checkout-schedule-replenishment-order.component';
import * as i0 from "@angular/core";
export class CheckoutScheduleReplenishmentOrderModule {
}
CheckoutScheduleReplenishmentOrderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduleReplenishmentOrderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutScheduleReplenishmentOrderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduleReplenishmentOrderModule, declarations: [CheckoutScheduleReplenishmentOrderComponent], imports: [CommonModule, RouterModule, I18nModule, IconModule], exports: [CheckoutScheduleReplenishmentOrderComponent] });
CheckoutScheduleReplenishmentOrderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduleReplenishmentOrderModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutScheduleReplenishmentOrder: {
                    component: CheckoutScheduleReplenishmentOrderComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                },
            },
        }),
    ], imports: [CommonModule, RouterModule, I18nModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutScheduleReplenishmentOrderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, I18nModule, IconModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutScheduleReplenishmentOrder: {
                                    component: CheckoutScheduleReplenishmentOrderComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutScheduleReplenishmentOrderComponent],
                    exports: [CheckoutScheduleReplenishmentOrderComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtc2NoZWR1bGUtcmVwbGVuaXNobWVudC1vcmRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvc2NoZWR1bGVkLXJlcGxlbmlzaG1lbnQvY29tcG9uZW50cy9jaGVja291dC1zY2hlZHVsZS1yZXBsZW5pc2htZW50LW9yZGVyL2NoZWNrb3V0LXNjaGVkdWxlLXJlcGxlbmlzaG1lbnQtb3JkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixpQkFBaUIsR0FDbEIsTUFBTSxxQ0FBcUMsQ0FBQztBQUM3QyxPQUFPLEVBQWEsVUFBVSxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSwyQ0FBMkMsRUFBRSxNQUFNLG1EQUFtRCxDQUFDOztBQWlCaEgsTUFBTSxPQUFPLHdDQUF3Qzs7cUlBQXhDLHdDQUF3QztzSUFBeEMsd0NBQXdDLGlCQUhwQywyQ0FBMkMsYUFYaEQsWUFBWSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxhQVlsRCwyQ0FBMkM7c0lBRTFDLHdDQUF3QyxhQWJ4QztRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYixrQ0FBa0MsRUFBRTtvQkFDbEMsU0FBUyxFQUFFLDJDQUEyQztvQkFDdEQsTUFBTSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUM7aUJBQy9DO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFWUyxZQUFZLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVOzJGQWNqRCx3Q0FBd0M7a0JBZnBELFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO29CQUM3RCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYixrQ0FBa0MsRUFBRTtvQ0FDbEMsU0FBUyxFQUFFLDJDQUEyQztvQ0FDdEQsTUFBTSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUM7aUNBQy9DOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsMkNBQTJDLENBQUM7b0JBQzNELE9BQU8sRUFBRSxDQUFDLDJDQUEyQyxDQUFDO2lCQUN2RCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIENhcnROb3RFbXB0eUd1YXJkLFxuICBDaGVja291dEF1dGhHdWFyZCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jaGVja291dC9iYXNlL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBJY29uTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENoZWNrb3V0U2NoZWR1bGVSZXBsZW5pc2htZW50T3JkZXJDb21wb25lbnQgfSBmcm9tICcuL2NoZWNrb3V0LXNjaGVkdWxlLXJlcGxlbmlzaG1lbnQtb3JkZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlLCBJMThuTW9kdWxlLCBJY29uTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIENoZWNrb3V0U2NoZWR1bGVSZXBsZW5pc2htZW50T3JkZXI6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IENoZWNrb3V0U2NoZWR1bGVSZXBsZW5pc2htZW50T3JkZXJDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQ2hlY2tvdXRBdXRoR3VhcmQsIENhcnROb3RFbXB0eUd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NoZWNrb3V0U2NoZWR1bGVSZXBsZW5pc2htZW50T3JkZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ2hlY2tvdXRTY2hlZHVsZVJlcGxlbmlzaG1lbnRPcmRlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0U2NoZWR1bGVSZXBsZW5pc2htZW50T3JkZXJNb2R1bGUge31cbiJdfQ==