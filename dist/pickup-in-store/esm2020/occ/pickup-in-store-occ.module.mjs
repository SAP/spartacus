/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { PickupLocationAdapter, StockAdapter, } from '@spartacus/pickup-in-store/core';
import { defaultOccPickupLocationConfig, OccPickupLocationAdapter, } from './adapters';
import { defaultOccStockConfig } from './adapters/default-occ-stock-config';
import { OccStockAdapter } from './adapters/occ-stock.adapter';
import * as i0 from "@angular/core";
export class PickupInStoreOccModule {
}
PickupInStoreOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PickupInStoreOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreOccModule });
PickupInStoreOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreOccModule, providers: [
        provideDefaultConfig(defaultOccPickupLocationConfig),
        provideDefaultConfig(defaultOccStockConfig),
        { provide: PickupLocationAdapter, useClass: OccPickupLocationAdapter },
        { provide: StockAdapter, useClass: OccStockAdapter },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreOccModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig(defaultOccPickupLocationConfig),
                        provideDefaultConfig(defaultOccStockConfig),
                        { provide: PickupLocationAdapter, useClass: OccPickupLocationAdapter },
                        { provide: StockAdapter, useClass: OccStockAdapter },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3VwLWluLXN0b3JlLW9jYy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcGlja3VwLWluLXN0b3JlL29jYy9waWNrdXAtaW4tc3RvcmUtb2NjLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLFlBQVksR0FDYixNQUFNLGlDQUFpQyxDQUFDO0FBQ3pDLE9BQU8sRUFDTCw4QkFBOEIsRUFDOUIsd0JBQXdCLEdBQ3pCLE1BQU0sWUFBWSxDQUFDO0FBRXBCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFVL0QsTUFBTSxPQUFPLHNCQUFzQjs7bUhBQXRCLHNCQUFzQjtvSEFBdEIsc0JBQXNCO29IQUF0QixzQkFBc0IsYUFQdEI7UUFDVCxvQkFBb0IsQ0FBQyw4QkFBOEIsQ0FBQztRQUNwRCxvQkFBb0IsQ0FBQyxxQkFBcUIsQ0FBQztRQUMzQyxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUU7UUFDdEUsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUU7S0FDckQ7MkZBRVUsc0JBQXNCO2tCQVJsQyxRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBQyw4QkFBOEIsQ0FBQzt3QkFDcEQsb0JBQW9CLENBQUMscUJBQXFCLENBQUM7d0JBQzNDLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBRTt3QkFDdEUsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUU7cUJBQ3JEO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIFBpY2t1cExvY2F0aW9uQWRhcHRlcixcbiAgU3RvY2tBZGFwdGVyLFxufSBmcm9tICdAc3BhcnRhY3VzL3BpY2t1cC1pbi1zdG9yZS9jb3JlJztcbmltcG9ydCB7XG4gIGRlZmF1bHRPY2NQaWNrdXBMb2NhdGlvbkNvbmZpZyxcbiAgT2NjUGlja3VwTG9jYXRpb25BZGFwdGVyLFxufSBmcm9tICcuL2FkYXB0ZXJzJztcblxuaW1wb3J0IHsgZGVmYXVsdE9jY1N0b2NrQ29uZmlnIH0gZnJvbSAnLi9hZGFwdGVycy9kZWZhdWx0LW9jYy1zdG9jay1jb25maWcnO1xuaW1wb3J0IHsgT2NjU3RvY2tBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycy9vY2Mtc3RvY2suYWRhcHRlcic7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRPY2NQaWNrdXBMb2NhdGlvbkNvbmZpZyksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdE9jY1N0b2NrQ29uZmlnKSxcbiAgICB7IHByb3ZpZGU6IFBpY2t1cExvY2F0aW9uQWRhcHRlciwgdXNlQ2xhc3M6IE9jY1BpY2t1cExvY2F0aW9uQWRhcHRlciB9LFxuICAgIHsgcHJvdmlkZTogU3RvY2tBZGFwdGVyLCB1c2VDbGFzczogT2NjU3RvY2tBZGFwdGVyIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBpY2t1cEluU3RvcmVPY2NNb2R1bGUge31cbiJdfQ==