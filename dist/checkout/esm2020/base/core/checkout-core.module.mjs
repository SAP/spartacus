/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { PageMetaResolver } from '@spartacus/core';
import { CheckoutDeliveryAddressConnector } from './connectors/checkout-delivery-address/checkout-delivery-address.connector';
import { CheckoutDeliveryModesConnector } from './connectors/checkout-delivery-modes/checkout-delivery-modes.connector';
import { CheckoutPaymentConnector } from './connectors/checkout-payment/checkout-payment.connector';
import { CheckoutConnector } from './connectors/checkout/checkout.connector';
import { facadeProviders } from './facade/facade-providers';
import { CheckoutPageMetaResolver } from './services/checkout-page-meta.resolver';
import * as i0 from "@angular/core";
export class CheckoutCoreModule {
}
CheckoutCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCoreModule });
CheckoutCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCoreModule, providers: [
        ...facadeProviders,
        CheckoutDeliveryAddressConnector,
        CheckoutDeliveryModesConnector,
        CheckoutPaymentConnector,
        CheckoutConnector,
        CheckoutPageMetaResolver,
        {
            provide: PageMetaResolver,
            useExisting: CheckoutPageMetaResolver,
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        ...facadeProviders,
                        CheckoutDeliveryAddressConnector,
                        CheckoutDeliveryModesConnector,
                        CheckoutPaymentConnector,
                        CheckoutConnector,
                        CheckoutPageMetaResolver,
                        {
                            provide: PageMetaResolver,
                            useExisting: CheckoutPageMetaResolver,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9jb3JlL2NoZWNrb3V0LWNvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLDRFQUE0RSxDQUFDO0FBQzlILE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHdFQUF3RSxDQUFDO0FBQ3hILE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7QUFpQmxGLE1BQU0sT0FBTyxrQkFBa0I7OytHQUFsQixrQkFBa0I7Z0hBQWxCLGtCQUFrQjtnSEFBbEIsa0JBQWtCLGFBZGxCO1FBQ1QsR0FBRyxlQUFlO1FBQ2xCLGdDQUFnQztRQUNoQyw4QkFBOEI7UUFDOUIsd0JBQXdCO1FBQ3hCLGlCQUFpQjtRQUNqQix3QkFBd0I7UUFDeEI7WUFDRSxPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGOzJGQUVVLGtCQUFrQjtrQkFmOUIsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUU7d0JBQ1QsR0FBRyxlQUFlO3dCQUNsQixnQ0FBZ0M7d0JBQ2hDLDhCQUE4Qjt3QkFDOUIsd0JBQXdCO3dCQUN4QixpQkFBaUI7d0JBQ2pCLHdCQUF3Qjt3QkFDeEI7NEJBQ0UsT0FBTyxFQUFFLGdCQUFnQjs0QkFDekIsV0FBVyxFQUFFLHdCQUF3Qjs0QkFDckMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZU1ldGFSZXNvbHZlciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0Nvbm5lY3RvciB9IGZyb20gJy4vY29ubmVjdG9ycy9jaGVja291dC1kZWxpdmVyeS1hZGRyZXNzL2NoZWNrb3V0LWRlbGl2ZXJ5LWFkZHJlc3MuY29ubmVjdG9yJztcbmltcG9ydCB7IENoZWNrb3V0RGVsaXZlcnlNb2Rlc0Nvbm5lY3RvciB9IGZyb20gJy4vY29ubmVjdG9ycy9jaGVja291dC1kZWxpdmVyeS1tb2Rlcy9jaGVja291dC1kZWxpdmVyeS1tb2Rlcy5jb25uZWN0b3InO1xuaW1wb3J0IHsgQ2hlY2tvdXRQYXltZW50Q29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzL2NoZWNrb3V0LXBheW1lbnQvY2hlY2tvdXQtcGF5bWVudC5jb25uZWN0b3InO1xuaW1wb3J0IHsgQ2hlY2tvdXRDb25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMvY2hlY2tvdXQvY2hlY2tvdXQuY29ubmVjdG9yJztcbmltcG9ydCB7IGZhY2FkZVByb3ZpZGVycyB9IGZyb20gJy4vZmFjYWRlL2ZhY2FkZS1wcm92aWRlcnMnO1xuaW1wb3J0IHsgQ2hlY2tvdXRQYWdlTWV0YVJlc29sdmVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9jaGVja291dC1wYWdlLW1ldGEucmVzb2x2ZXInO1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICAuLi5mYWNhZGVQcm92aWRlcnMsXG4gICAgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NDb25uZWN0b3IsXG4gICAgQ2hlY2tvdXREZWxpdmVyeU1vZGVzQ29ubmVjdG9yLFxuICAgIENoZWNrb3V0UGF5bWVudENvbm5lY3RvcixcbiAgICBDaGVja291dENvbm5lY3RvcixcbiAgICBDaGVja291dFBhZ2VNZXRhUmVzb2x2ZXIsXG4gICAge1xuICAgICAgcHJvdmlkZTogUGFnZU1ldGFSZXNvbHZlcixcbiAgICAgIHVzZUV4aXN0aW5nOiBDaGVja291dFBhZ2VNZXRhUmVzb2x2ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dENvcmVNb2R1bGUge31cbiJdfQ==