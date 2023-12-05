/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckoutAdapter, CheckoutDeliveryAddressAdapter, CheckoutDeliveryModesAdapter, CheckoutPaymentAdapter, } from '@spartacus/checkout/base/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OccCheckoutDeliveryAddressAdapter } from './adapters/occ-checkout-delivery-address.adapter';
import { OccCheckoutDeliveryModesAdapter } from './adapters/occ-checkout-delivery-modes.adapter';
import { OccCheckoutPaymentAdapter } from './adapters/occ-checkout-payment.adapter';
import { OccCheckoutAdapter } from './adapters/occ-checkout.adapter';
import { defaultOccCheckoutConfig } from './config/default-occ-checkout-config';
import * as i0 from "@angular/core";
export class CheckoutOccModule {
}
CheckoutOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutOccModule, imports: [CommonModule] });
CheckoutOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutOccModule, providers: [
        provideDefaultConfig(defaultOccCheckoutConfig),
        {
            provide: CheckoutAdapter,
            useClass: OccCheckoutAdapter,
        },
        {
            provide: CheckoutDeliveryAddressAdapter,
            useClass: OccCheckoutDeliveryAddressAdapter,
        },
        {
            provide: CheckoutDeliveryModesAdapter,
            useClass: OccCheckoutDeliveryModesAdapter,
        },
        {
            provide: CheckoutPaymentAdapter,
            useClass: OccCheckoutPaymentAdapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccCheckoutConfig),
                        {
                            provide: CheckoutAdapter,
                            useClass: OccCheckoutAdapter,
                        },
                        {
                            provide: CheckoutDeliveryAddressAdapter,
                            useClass: OccCheckoutDeliveryAddressAdapter,
                        },
                        {
                            provide: CheckoutDeliveryModesAdapter,
                            useClass: OccCheckoutDeliveryModesAdapter,
                        },
                        {
                            provide: CheckoutPaymentAdapter,
                            useClass: OccCheckoutPaymentAdapter,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtb2NjLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iYXNlL29jYy9jaGVja291dC1vY2MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsZUFBZSxFQUNmLDhCQUE4QixFQUM5Qiw0QkFBNEIsRUFDNUIsc0JBQXNCLEdBQ3ZCLE1BQU0sK0JBQStCLENBQUM7QUFDdkMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDckcsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDakcsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDcEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7O0FBd0JoRixNQUFNLE9BQU8saUJBQWlCOzs4R0FBakIsaUJBQWlCOytHQUFqQixpQkFBaUIsWUFyQmxCLFlBQVk7K0dBcUJYLGlCQUFpQixhQXBCakI7UUFDVCxvQkFBb0IsQ0FBQyx3QkFBd0IsQ0FBQztRQUM5QztZQUNFLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFFBQVEsRUFBRSxrQkFBa0I7U0FDN0I7UUFDRDtZQUNFLE9BQU8sRUFBRSw4QkFBOEI7WUFDdkMsUUFBUSxFQUFFLGlDQUFpQztTQUM1QztRQUNEO1lBQ0UsT0FBTyxFQUFFLDRCQUE0QjtZQUNyQyxRQUFRLEVBQUUsK0JBQStCO1NBQzFDO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLFFBQVEsRUFBRSx5QkFBeUI7U0FDcEM7S0FDRixZQW5CUyxZQUFZOzJGQXFCWCxpQkFBaUI7a0JBdEI3QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDLHdCQUF3QixDQUFDO3dCQUM5Qzs0QkFDRSxPQUFPLEVBQUUsZUFBZTs0QkFDeEIsUUFBUSxFQUFFLGtCQUFrQjt5QkFDN0I7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLDhCQUE4Qjs0QkFDdkMsUUFBUSxFQUFFLGlDQUFpQzt5QkFDNUM7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLDRCQUE0Qjs0QkFDckMsUUFBUSxFQUFFLCtCQUErQjt5QkFDMUM7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLHNCQUFzQjs0QkFDL0IsUUFBUSxFQUFFLHlCQUF5Qjt5QkFDcEM7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENoZWNrb3V0QWRhcHRlcixcbiAgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NBZGFwdGVyLFxuICBDaGVja291dERlbGl2ZXJ5TW9kZXNBZGFwdGVyLFxuICBDaGVja291dFBheW1lbnRBZGFwdGVyLFxufSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2UvY29yZSc7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPY2NDaGVja291dERlbGl2ZXJ5QWRkcmVzc0FkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXJzL29jYy1jaGVja291dC1kZWxpdmVyeS1hZGRyZXNzLmFkYXB0ZXInO1xuaW1wb3J0IHsgT2NjQ2hlY2tvdXREZWxpdmVyeU1vZGVzQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcnMvb2NjLWNoZWNrb3V0LWRlbGl2ZXJ5LW1vZGVzLmFkYXB0ZXInO1xuaW1wb3J0IHsgT2NjQ2hlY2tvdXRQYXltZW50QWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcnMvb2NjLWNoZWNrb3V0LXBheW1lbnQuYWRhcHRlcic7XG5pbXBvcnQgeyBPY2NDaGVja291dEFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXJzL29jYy1jaGVja291dC5hZGFwdGVyJztcbmltcG9ydCB7IGRlZmF1bHRPY2NDaGVja291dENvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtb2NjLWNoZWNrb3V0LWNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0T2NjQ2hlY2tvdXRDb25maWcpLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IENoZWNrb3V0QWRhcHRlcixcbiAgICAgIHVzZUNsYXNzOiBPY2NDaGVja291dEFkYXB0ZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0FkYXB0ZXIsXG4gICAgICB1c2VDbGFzczogT2NjQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NBZGFwdGVyLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogQ2hlY2tvdXREZWxpdmVyeU1vZGVzQWRhcHRlcixcbiAgICAgIHVzZUNsYXNzOiBPY2NDaGVja291dERlbGl2ZXJ5TW9kZXNBZGFwdGVyLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogQ2hlY2tvdXRQYXltZW50QWRhcHRlcixcbiAgICAgIHVzZUNsYXNzOiBPY2NDaGVja291dFBheW1lbnRBZGFwdGVyLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0T2NjTW9kdWxlIHt9XG4iXX0=