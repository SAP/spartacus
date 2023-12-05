/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultPickupInStoreConfig } from './config/index';
import { PickupLocationConnector, StockConnector } from './connectors/index';
import { facadeProviders } from './facade/index';
import { PickupInStoreStoreModule } from './store/index';
import * as i0 from "@angular/core";
export class PickupInStoreCoreModule {
}
PickupInStoreCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PickupInStoreCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreCoreModule, imports: [PickupInStoreStoreModule] });
PickupInStoreCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreCoreModule, providers: [
        provideDefaultConfig(defaultPickupInStoreConfig),
        StockConnector,
        PickupLocationConnector,
        ...facadeProviders,
    ], imports: [PickupInStoreStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [PickupInStoreStoreModule],
                    providers: [
                        provideDefaultConfig(defaultPickupInStoreConfig),
                        StockConnector,
                        PickupLocationConnector,
                        ...facadeProviders,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3VwLWluLXN0b3JlLWNvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3BpY2t1cC1pbi1zdG9yZS9jb3JlL3BpY2t1cC1pbi1zdG9yZS1jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFXekQsTUFBTSxPQUFPLHVCQUF1Qjs7b0hBQXZCLHVCQUF1QjtxSEFBdkIsdUJBQXVCLFlBUnhCLHdCQUF3QjtxSEFRdkIsdUJBQXVCLGFBUHZCO1FBQ1Qsb0JBQW9CLENBQUMsMEJBQTBCLENBQUM7UUFDaEQsY0FBYztRQUNkLHVCQUF1QjtRQUN2QixHQUFHLGVBQWU7S0FDbkIsWUFOUyx3QkFBd0I7MkZBUXZCLHVCQUF1QjtrQkFUbkMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztvQkFDbkMsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDLDBCQUEwQixDQUFDO3dCQUNoRCxjQUFjO3dCQUNkLHVCQUF1Qjt3QkFDdkIsR0FBRyxlQUFlO3FCQUNuQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBkZWZhdWx0UGlja3VwSW5TdG9yZUNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2luZGV4JztcbmltcG9ydCB7IFBpY2t1cExvY2F0aW9uQ29ubmVjdG9yLCBTdG9ja0Nvbm5lY3RvciB9IGZyb20gJy4vY29ubmVjdG9ycy9pbmRleCc7XG5pbXBvcnQgeyBmYWNhZGVQcm92aWRlcnMgfSBmcm9tICcuL2ZhY2FkZS9pbmRleCc7XG5pbXBvcnQgeyBQaWNrdXBJblN0b3JlU3RvcmVNb2R1bGUgfSBmcm9tICcuL3N0b3JlL2luZGV4JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1BpY2t1cEluU3RvcmVTdG9yZU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRQaWNrdXBJblN0b3JlQ29uZmlnKSxcbiAgICBTdG9ja0Nvbm5lY3RvcixcbiAgICBQaWNrdXBMb2NhdGlvbkNvbm5lY3RvcixcbiAgICAuLi5mYWNhZGVQcm92aWRlcnMsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBpY2t1cEluU3RvcmVDb3JlTW9kdWxlIHt9XG4iXX0=