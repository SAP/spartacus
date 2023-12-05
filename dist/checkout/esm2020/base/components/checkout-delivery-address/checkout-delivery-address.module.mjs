/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartValidationGuard } from '@spartacus/cart/base/core';
import { I18nModule, provideDefaultConfig, FeaturesConfigModule, } from '@spartacus/core';
import { AddressFormModule, CardModule, SpinnerModule, } from '@spartacus/storefront';
import { CartNotEmptyGuard } from '../guards/cart-not-empty.guard';
import { CheckoutAuthGuard } from '../guards/checkout-auth.guard';
import { CheckoutDeliveryAddressComponent } from './checkout-delivery-address.component';
import * as i0 from "@angular/core";
export class CheckoutDeliveryAddressModule {
}
CheckoutDeliveryAddressModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutDeliveryAddressModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressModule, declarations: [CheckoutDeliveryAddressComponent], imports: [CommonModule,
        RouterModule,
        AddressFormModule,
        CardModule,
        SpinnerModule,
        I18nModule,
        FeaturesConfigModule], exports: [CheckoutDeliveryAddressComponent] });
CheckoutDeliveryAddressModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutDeliveryAddress: {
                    component: CheckoutDeliveryAddressComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        AddressFormModule,
        CardModule,
        SpinnerModule,
        I18nModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        AddressFormModule,
                        CardModule,
                        SpinnerModule,
                        I18nModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutDeliveryAddress: {
                                    component: CheckoutDeliveryAddressComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutDeliveryAddressComponent],
                    exports: [CheckoutDeliveryAddressComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9jb21wb25lbnRzL2NoZWNrb3V0LWRlbGl2ZXJ5LWFkZHJlc3MvY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNoRSxPQUFPLEVBRUwsVUFBVSxFQUNWLG9CQUFvQixFQUNwQixvQkFBb0IsR0FDckIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFVBQVUsRUFDVixhQUFhLEdBQ2QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7QUF5QnpGLE1BQU0sT0FBTyw2QkFBNkI7OzBIQUE3Qiw2QkFBNkI7MkhBQTdCLDZCQUE2QixpQkFIekIsZ0NBQWdDLGFBbEI3QyxZQUFZO1FBQ1osWUFBWTtRQUNaLGlCQUFpQjtRQUNqQixVQUFVO1FBQ1YsYUFBYTtRQUNiLFVBQVU7UUFDVixvQkFBb0IsYUFhWixnQ0FBZ0M7MkhBRS9CLDZCQUE2QixhQWI3QjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYix1QkFBdUIsRUFBRTtvQkFDdkIsU0FBUyxFQUFFLGdDQUFnQztvQkFDM0MsTUFBTSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUM7aUJBQ3BFO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFqQkMsWUFBWTtRQUNaLFlBQVk7UUFDWixpQkFBaUI7UUFDakIsVUFBVTtRQUNWLGFBQWE7UUFDYixVQUFVO1FBQ1Ysb0JBQW9COzJGQWVYLDZCQUE2QjtrQkF2QnpDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixpQkFBaUI7d0JBQ2pCLFVBQVU7d0JBQ1YsYUFBYTt3QkFDYixVQUFVO3dCQUNWLG9CQUFvQjtxQkFDckI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsdUJBQXVCLEVBQUU7b0NBQ3ZCLFNBQVMsRUFBRSxnQ0FBZ0M7b0NBQzNDLE1BQU0sRUFBRSxDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDO2lDQUNwRTs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLGdDQUFnQyxDQUFDO29CQUNoRCxPQUFPLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztpQkFDNUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDYXJ0VmFsaWRhdGlvbkd1YXJkIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2UvY29yZSc7XG5pbXBvcnQge1xuICBDbXNDb25maWcsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBGZWF0dXJlc0NvbmZpZ01vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEFkZHJlc3NGb3JtTW9kdWxlLFxuICBDYXJkTW9kdWxlLFxuICBTcGlubmVyTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQ2FydE5vdEVtcHR5R3VhcmQgfSBmcm9tICcuLi9ndWFyZHMvY2FydC1ub3QtZW1wdHkuZ3VhcmQnO1xuaW1wb3J0IHsgQ2hlY2tvdXRBdXRoR3VhcmQgfSBmcm9tICcuLi9ndWFyZHMvY2hlY2tvdXQtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0NvbXBvbmVudCB9IGZyb20gJy4vY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBBZGRyZXNzRm9ybU1vZHVsZSxcbiAgICBDYXJkTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBGZWF0dXJlc0NvbmZpZ01vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzOiB7XG4gICAgICAgICAgY29tcG9uZW50OiBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0NvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtDaGVja291dEF1dGhHdWFyZCwgQ2FydE5vdEVtcHR5R3VhcmQsIENhcnRWYWxpZGF0aW9uR3VhcmRdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dERlbGl2ZXJ5QWRkcmVzc01vZHVsZSB7fVxuIl19