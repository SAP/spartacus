/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { FutureStockAdapter } from '@spartacus/product/future-stock/core';
import { OccFutureStockAdapter } from './adapters/occ-future-stock.adapter';
import { defaultOccFutureStockConfig } from './config/default-occ-future-stock.config';
import * as i0 from "@angular/core";
export class FutureStockOccModule {
}
FutureStockOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FutureStockOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: FutureStockOccModule, imports: [CommonModule] });
FutureStockOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockOccModule, providers: [
        provideDefaultConfig(defaultOccFutureStockConfig),
        {
            provide: FutureStockAdapter,
            useClass: OccFutureStockAdapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccFutureStockConfig),
                        {
                            provide: FutureStockAdapter,
                            useClass: OccFutureStockAdapter,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnV0dXJlLXN0b2NrLW9jYy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC9mdXR1cmUtc3RvY2svb2NjL2Z1dHVyZS1zdG9jay1vY2MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQzs7QUFZdkYsTUFBTSxPQUFPLG9CQUFvQjs7aUhBQXBCLG9CQUFvQjtrSEFBcEIsb0JBQW9CLFlBVHJCLFlBQVk7a0hBU1gsb0JBQW9CLGFBUnBCO1FBQ1Qsb0JBQW9CLENBQUMsMkJBQTJCLENBQUM7UUFDakQ7WUFDRSxPQUFPLEVBQUUsa0JBQWtCO1lBQzNCLFFBQVEsRUFBRSxxQkFBcUI7U0FDaEM7S0FDRixZQVBTLFlBQVk7MkZBU1gsb0JBQW9CO2tCQVZoQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDLDJCQUEyQixDQUFDO3dCQUNqRDs0QkFDRSxPQUFPLEVBQUUsa0JBQWtCOzRCQUMzQixRQUFRLEVBQUUscUJBQXFCO3lCQUNoQztxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgRnV0dXJlU3RvY2tBZGFwdGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9wcm9kdWN0L2Z1dHVyZS1zdG9jay9jb3JlJztcbmltcG9ydCB7IE9jY0Z1dHVyZVN0b2NrQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcnMvb2NjLWZ1dHVyZS1zdG9jay5hZGFwdGVyJztcbmltcG9ydCB7IGRlZmF1bHRPY2NGdXR1cmVTdG9ja0NvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtb2NjLWZ1dHVyZS1zdG9jay5jb25maWcnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdE9jY0Z1dHVyZVN0b2NrQ29uZmlnKSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBGdXR1cmVTdG9ja0FkYXB0ZXIsXG4gICAgICB1c2VDbGFzczogT2NjRnV0dXJlU3RvY2tBZGFwdGVyLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEZ1dHVyZVN0b2NrT2NjTW9kdWxlIHt9XG4iXX0=