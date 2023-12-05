/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartValidationGuard } from '@spartacus/cart/base/core';
import { CartNotEmptyGuard, CheckoutAuthGuard, } from '@spartacus/checkout/base/components';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { AddressFormModule, CardModule, SpinnerModule, } from '@spartacus/storefront';
import { B2BCheckoutDeliveryAddressComponent } from './checkout-delivery-address.component';
import * as i0 from "@angular/core";
export class B2BCheckoutDeliveryAddressModule {
}
B2BCheckoutDeliveryAddressModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: B2BCheckoutDeliveryAddressModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
B2BCheckoutDeliveryAddressModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: B2BCheckoutDeliveryAddressModule, declarations: [B2BCheckoutDeliveryAddressComponent], imports: [CommonModule,
        RouterModule,
        AddressFormModule,
        CardModule,
        SpinnerModule,
        I18nModule], exports: [B2BCheckoutDeliveryAddressComponent] });
B2BCheckoutDeliveryAddressModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: B2BCheckoutDeliveryAddressModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutDeliveryAddress: {
                    component: B2BCheckoutDeliveryAddressComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        AddressFormModule,
        CardModule,
        SpinnerModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: B2BCheckoutDeliveryAddressModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        AddressFormModule,
                        CardModule,
                        SpinnerModule,
                        I18nModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutDeliveryAddress: {
                                    component: B2BCheckoutDeliveryAddressComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [B2BCheckoutDeliveryAddressComponent],
                    exports: [B2BCheckoutDeliveryAddressComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYjJiL2NvbXBvbmVudHMvY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy9jaGVja291dC1kZWxpdmVyeS1hZGRyZXNzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2hFLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsaUJBQWlCLEdBQ2xCLE1BQU0scUNBQXFDLENBQUM7QUFDN0MsT0FBTyxFQUFhLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlFLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsVUFBVSxFQUNWLGFBQWEsR0FDZCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOztBQXdCNUYsTUFBTSxPQUFPLGdDQUFnQzs7NkhBQWhDLGdDQUFnQzs4SEFBaEMsZ0NBQWdDLGlCQUg1QixtQ0FBbUMsYUFqQmhELFlBQVk7UUFDWixZQUFZO1FBQ1osaUJBQWlCO1FBQ2pCLFVBQVU7UUFDVixhQUFhO1FBQ2IsVUFBVSxhQWFGLG1DQUFtQzs4SEFFbEMsZ0NBQWdDLGFBYmhDO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLHVCQUF1QixFQUFFO29CQUN2QixTQUFTLEVBQUUsbUNBQW1DO29CQUM5QyxNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsQ0FBQztpQkFDcEU7YUFDRjtTQUNGLENBQUM7S0FDSCxZQWhCQyxZQUFZO1FBQ1osWUFBWTtRQUNaLGlCQUFpQjtRQUNqQixVQUFVO1FBQ1YsYUFBYTtRQUNiLFVBQVU7MkZBZUQsZ0NBQWdDO2tCQXRCNUMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixZQUFZO3dCQUNaLGlCQUFpQjt3QkFDakIsVUFBVTt3QkFDVixhQUFhO3dCQUNiLFVBQVU7cUJBQ1g7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsdUJBQXVCLEVBQUU7b0NBQ3ZCLFNBQVMsRUFBRSxtQ0FBbUM7b0NBQzlDLE1BQU0sRUFBRSxDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDO2lDQUNwRTs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLG1DQUFtQyxDQUFDO29CQUNuRCxPQUFPLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztpQkFDL0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDYXJ0VmFsaWRhdGlvbkd1YXJkIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2UvY29yZSc7XG5pbXBvcnQge1xuICBDYXJ0Tm90RW1wdHlHdWFyZCxcbiAgQ2hlY2tvdXRBdXRoR3VhcmQsXG59IGZyb20gJ0BzcGFydGFjdXMvY2hlY2tvdXQvYmFzZS9jb21wb25lbnRzJztcbmltcG9ydCB7IENtc0NvbmZpZywgSTE4bk1vZHVsZSwgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWRkcmVzc0Zvcm1Nb2R1bGUsXG4gIENhcmRNb2R1bGUsXG4gIFNwaW5uZXJNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBCMkJDaGVja291dERlbGl2ZXJ5QWRkcmVzc0NvbXBvbmVudCB9IGZyb20gJy4vY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBBZGRyZXNzRm9ybU1vZHVsZSxcbiAgICBDYXJkTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzOiB7XG4gICAgICAgICAgY29tcG9uZW50OiBCMkJDaGVja291dERlbGl2ZXJ5QWRkcmVzc0NvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtDaGVja291dEF1dGhHdWFyZCwgQ2FydE5vdEVtcHR5R3VhcmQsIENhcnRWYWxpZGF0aW9uR3VhcmRdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQjJCQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQjJCQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBCMkJDaGVja291dERlbGl2ZXJ5QWRkcmVzc01vZHVsZSB7fVxuIl19