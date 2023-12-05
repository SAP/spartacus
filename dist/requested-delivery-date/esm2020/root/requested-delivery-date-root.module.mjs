/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { DeliveryModeDatePickerComponent } from './components/delivery-mode-date-picker/delivery-mode-date-picker.component';
import { OrderOverviewDeliveryDateComponent } from './components/order-overview-delivery-date/order-overview-delivery-date.component';
import { REQUESTED_DELIVERY_DATE_CORE_FEATURE, REQUESTED_DELIVERY_DATE_FEATURE, } from './feature-name';
import * as i0 from "@angular/core";
export function defaultRequestedDeliveryDateComponentsConfig() {
    const config = {
        featureModules: {
            [REQUESTED_DELIVERY_DATE_FEATURE]: {
                cmsComponents: [
                    'DeliveryModeDatePickerComponent',
                    'OrderOverviewDeliveryDateComponent',
                ],
            },
            // by default core is bundled together with components
            [REQUESTED_DELIVERY_DATE_CORE_FEATURE]: REQUESTED_DELIVERY_DATE_FEATURE,
        },
    };
    return config;
}
export class RequestedDeliveryDateRootModule {
}
RequestedDeliveryDateRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RequestedDeliveryDateRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateRootModule });
RequestedDeliveryDateRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateRootModule, providers: [
        provideOutlet({
            id: CartOutlets.DELIVERY_MODE,
            position: OutletPosition.AFTER,
            component: DeliveryModeDatePickerComponent,
        }),
        provideOutlet({
            id: CartOutlets.ORDER_OVERVIEW,
            position: OutletPosition.AFTER,
            component: OrderOverviewDeliveryDateComponent,
        }),
        provideDefaultConfigFactory(defaultRequestedDeliveryDateComponentsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideOutlet({
                            id: CartOutlets.DELIVERY_MODE,
                            position: OutletPosition.AFTER,
                            component: DeliveryModeDatePickerComponent,
                        }),
                        provideOutlet({
                            id: CartOutlets.ORDER_OVERVIEW,
                            position: OutletPosition.AFTER,
                            component: OrderOverviewDeliveryDateComponent,
                        }),
                        provideDefaultConfigFactory(defaultRequestedDeliveryDateComponentsConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdGVkLWRlbGl2ZXJ5LWRhdGUtcm9vdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcmVxdWVzdGVkLWRlbGl2ZXJ5LWRhdGUvcm9vdC9yZXF1ZXN0ZWQtZGVsaXZlcnktZGF0ZS1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBYSwyQkFBMkIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEUsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sNEVBQTRFLENBQUM7QUFDN0gsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sa0ZBQWtGLENBQUM7QUFDdEksT0FBTyxFQUNMLG9DQUFvQyxFQUNwQywrQkFBK0IsR0FDaEMsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFeEIsTUFBTSxVQUFVLDRDQUE0QztJQUMxRCxNQUFNLE1BQU0sR0FBYztRQUN4QixjQUFjLEVBQUU7WUFDZCxDQUFDLCtCQUErQixDQUFDLEVBQUU7Z0JBQ2pDLGFBQWEsRUFBRTtvQkFDYixpQ0FBaUM7b0JBQ2pDLG9DQUFvQztpQkFDckM7YUFDRjtZQUNELHNEQUFzRDtZQUN0RCxDQUFDLG9DQUFvQyxDQUFDLEVBQUUsK0JBQStCO1NBQ3hFO0tBQ0YsQ0FBQztJQUVGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFpQkQsTUFBTSxPQUFPLCtCQUErQjs7NEhBQS9CLCtCQUErQjs2SEFBL0IsK0JBQStCOzZIQUEvQiwrQkFBK0IsYUFkL0I7UUFDVCxhQUFhLENBQUM7WUFDWixFQUFFLEVBQUUsV0FBVyxDQUFDLGFBQWE7WUFDN0IsUUFBUSxFQUFFLGNBQWMsQ0FBQyxLQUFLO1lBQzlCLFNBQVMsRUFBRSwrQkFBK0I7U0FDM0MsQ0FBQztRQUNGLGFBQWEsQ0FBQztZQUNaLEVBQUUsRUFBRSxXQUFXLENBQUMsY0FBYztZQUM5QixRQUFRLEVBQUUsY0FBYyxDQUFDLEtBQUs7WUFDOUIsU0FBUyxFQUFFLGtDQUFrQztTQUM5QyxDQUFDO1FBQ0YsMkJBQTJCLENBQUMsNENBQTRDLENBQUM7S0FDMUU7MkZBRVUsK0JBQStCO2tCQWYzQyxRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVCxhQUFhLENBQUM7NEJBQ1osRUFBRSxFQUFFLFdBQVcsQ0FBQyxhQUFhOzRCQUM3QixRQUFRLEVBQUUsY0FBYyxDQUFDLEtBQUs7NEJBQzlCLFNBQVMsRUFBRSwrQkFBK0I7eUJBQzNDLENBQUM7d0JBQ0YsYUFBYSxDQUFDOzRCQUNaLEVBQUUsRUFBRSxXQUFXLENBQUMsY0FBYzs0QkFDOUIsUUFBUSxFQUFFLGNBQWMsQ0FBQyxLQUFLOzRCQUM5QixTQUFTLEVBQUUsa0NBQWtDO3lCQUM5QyxDQUFDO3dCQUNGLDJCQUEyQixDQUFDLDRDQUE0QyxDQUFDO3FCQUMxRTtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIyIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcnRPdXRsZXRzIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBDbXNDb25maWcsIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPdXRsZXRQb3NpdGlvbiwgcHJvdmlkZU91dGxldCB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBEZWxpdmVyeU1vZGVEYXRlUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2RlbGl2ZXJ5LW1vZGUtZGF0ZS1waWNrZXIvZGVsaXZlcnktbW9kZS1kYXRlLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJPdmVydmlld0RlbGl2ZXJ5RGF0ZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9vcmRlci1vdmVydmlldy1kZWxpdmVyeS1kYXRlL29yZGVyLW92ZXJ2aWV3LWRlbGl2ZXJ5LWRhdGUuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIFJFUVVFU1RFRF9ERUxJVkVSWV9EQVRFX0NPUkVfRkVBVFVSRSxcbiAgUkVRVUVTVEVEX0RFTElWRVJZX0RBVEVfRkVBVFVSRSxcbn0gZnJvbSAnLi9mZWF0dXJlLW5hbWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFJlcXVlc3RlZERlbGl2ZXJ5RGF0ZUNvbXBvbmVudHNDb25maWcoKTogQ21zQ29uZmlnIHtcbiAgY29uc3QgY29uZmlnOiBDbXNDb25maWcgPSB7XG4gICAgZmVhdHVyZU1vZHVsZXM6IHtcbiAgICAgIFtSRVFVRVNURURfREVMSVZFUllfREFURV9GRUFUVVJFXToge1xuICAgICAgICBjbXNDb21wb25lbnRzOiBbXG4gICAgICAgICAgJ0RlbGl2ZXJ5TW9kZURhdGVQaWNrZXJDb21wb25lbnQnLFxuICAgICAgICAgICdPcmRlck92ZXJ2aWV3RGVsaXZlcnlEYXRlQ29tcG9uZW50JyxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICAvLyBieSBkZWZhdWx0IGNvcmUgaXMgYnVuZGxlZCB0b2dldGhlciB3aXRoIGNvbXBvbmVudHNcbiAgICAgIFtSRVFVRVNURURfREVMSVZFUllfREFURV9DT1JFX0ZFQVRVUkVdOiBSRVFVRVNURURfREVMSVZFUllfREFURV9GRUFUVVJFLFxuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZU91dGxldCh7XG4gICAgICBpZDogQ2FydE91dGxldHMuREVMSVZFUllfTU9ERSxcbiAgICAgIHBvc2l0aW9uOiBPdXRsZXRQb3NpdGlvbi5BRlRFUixcbiAgICAgIGNvbXBvbmVudDogRGVsaXZlcnlNb2RlRGF0ZVBpY2tlckNvbXBvbmVudCxcbiAgICB9KSxcbiAgICBwcm92aWRlT3V0bGV0KHtcbiAgICAgIGlkOiBDYXJ0T3V0bGV0cy5PUkRFUl9PVkVSVklFVyxcbiAgICAgIHBvc2l0aW9uOiBPdXRsZXRQb3NpdGlvbi5BRlRFUixcbiAgICAgIGNvbXBvbmVudDogT3JkZXJPdmVydmlld0RlbGl2ZXJ5RGF0ZUNvbXBvbmVudCxcbiAgICB9KSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkoZGVmYXVsdFJlcXVlc3RlZERlbGl2ZXJ5RGF0ZUNvbXBvbmVudHNDb25maWcpLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0ZWREZWxpdmVyeURhdGVSb290TW9kdWxlIHt9XG4iXX0=