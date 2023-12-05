/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MODULE_INITIALIZER } from '@spartacus/core';
import { AsmConnector } from './connectors/asm.connector';
import { facadeProviders } from './facade/facade-providers';
import { AsmStatePersistenceService } from './services/asm-state-persistence.service';
import { AsmStoreModule } from './store/asm-store.module';
import * as i0 from "@angular/core";
export function asmStatePersistenceFactory(asmStatePersistenceService) {
    const result = () => asmStatePersistenceService.initSync();
    return result;
}
export class AsmCoreModule {
}
AsmCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCoreModule, imports: [CommonModule, AsmStoreModule] });
AsmCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCoreModule, providers: [
        AsmConnector,
        {
            provide: MODULE_INITIALIZER,
            useFactory: asmStatePersistenceFactory,
            deps: [AsmStatePersistenceService],
            multi: true,
        },
        ...facadeProviders,
    ], imports: [CommonModule, AsmStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AsmStoreModule],
                    providers: [
                        AsmConnector,
                        {
                            provide: MODULE_INITIALIZER,
                            useFactory: asmStatePersistenceFactory,
                            deps: [AsmStatePersistenceService],
                            multi: true,
                        },
                        ...facadeProviders,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWNvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jb3JlL2FzbS1jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBRTFELE1BQU0sVUFBVSwwQkFBMEIsQ0FDeEMsMEJBQXNEO0lBRXRELE1BQU0sTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLDBCQUEwQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFlRCxNQUFNLE9BQU8sYUFBYTs7MEdBQWIsYUFBYTsyR0FBYixhQUFhLFlBWmQsWUFBWSxFQUFFLGNBQWM7MkdBWTNCLGFBQWEsYUFYYjtRQUNULFlBQVk7UUFDWjtZQUNFLE9BQU8sRUFBRSxrQkFBa0I7WUFDM0IsVUFBVSxFQUFFLDBCQUEwQjtZQUN0QyxJQUFJLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztZQUNsQyxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0QsR0FBRyxlQUFlO0tBQ25CLFlBVlMsWUFBWSxFQUFFLGNBQWM7MkZBWTNCLGFBQWE7a0JBYnpCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQztvQkFDdkMsU0FBUyxFQUFFO3dCQUNULFlBQVk7d0JBQ1o7NEJBQ0UsT0FBTyxFQUFFLGtCQUFrQjs0QkFDM0IsVUFBVSxFQUFFLDBCQUEwQjs0QkFDdEMsSUFBSSxFQUFFLENBQUMsMEJBQTBCLENBQUM7NEJBQ2xDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNELEdBQUcsZUFBZTtxQkFDbkI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1PRFVMRV9JTklUSUFMSVpFUiB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBBc21Db25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMvYXNtLmNvbm5lY3Rvcic7XG5pbXBvcnQgeyBmYWNhZGVQcm92aWRlcnMgfSBmcm9tICcuL2ZhY2FkZS9mYWNhZGUtcHJvdmlkZXJzJztcbmltcG9ydCB7IEFzbVN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9hc20tc3RhdGUtcGVyc2lzdGVuY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBc21TdG9yZU1vZHVsZSB9IGZyb20gJy4vc3RvcmUvYXNtLXN0b3JlLm1vZHVsZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhc21TdGF0ZVBlcnNpc3RlbmNlRmFjdG9yeShcbiAgYXNtU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2U6IEFzbVN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlXG4pOiAoKSA9PiB2b2lkIHtcbiAgY29uc3QgcmVzdWx0ID0gKCkgPT4gYXNtU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2UuaW5pdFN5bmMoKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQXNtU3RvcmVNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBBc21Db25uZWN0b3IsXG4gICAge1xuICAgICAgcHJvdmlkZTogTU9EVUxFX0lOSVRJQUxJWkVSLFxuICAgICAgdXNlRmFjdG9yeTogYXNtU3RhdGVQZXJzaXN0ZW5jZUZhY3RvcnksXG4gICAgICBkZXBzOiBbQXNtU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2VdLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICAuLi5mYWNhZGVQcm92aWRlcnMsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFzbUNvcmVNb2R1bGUge31cbiJdfQ==