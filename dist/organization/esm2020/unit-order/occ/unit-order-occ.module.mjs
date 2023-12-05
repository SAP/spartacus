/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccUnitOrderConfig } from './config/default-occ-organization-config';
import { OccUnitOrderAdapter } from './adapters/occ-unit-order.adapter';
import { UnitOrderAdapter } from '@spartacus/organization/unit-order/core';
import { ORDER_NORMALIZER } from '@spartacus/order/root';
import { OccOrderNormalizer } from '@spartacus/order/occ';
import * as i0 from "@angular/core";
export class UnitOrderOccModule {
}
UnitOrderOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitOrderOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderOccModule, imports: [CommonModule] });
UnitOrderOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderOccModule, providers: [
        provideDefaultConfig(defaultOccUnitOrderConfig),
        { provide: UnitOrderAdapter, useClass: OccUnitOrderAdapter },
        {
            provide: ORDER_NORMALIZER,
            useExisting: OccOrderNormalizer,
            multi: true,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccUnitOrderConfig),
                        { provide: UnitOrderAdapter, useClass: OccUnitOrderAdapter },
                        {
                            provide: ORDER_NORMALIZER,
                            useExisting: OccOrderNormalizer,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1vcmRlci1vY2MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi91bml0LW9yZGVyL29jYy91bml0LW9yZGVyLW9jYy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXZELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQWMxRCxNQUFNLE9BQU8sa0JBQWtCOzsrR0FBbEIsa0JBQWtCO2dIQUFsQixrQkFBa0IsWUFYbkIsWUFBWTtnSEFXWCxrQkFBa0IsYUFWbEI7UUFDVCxvQkFBb0IsQ0FBQyx5QkFBeUIsQ0FBQztRQUMvQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7UUFDNUQ7WUFDRSxPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLFdBQVcsRUFBRSxrQkFBa0I7WUFDL0IsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGLFlBVFMsWUFBWTsyRkFXWCxrQkFBa0I7a0JBWjlCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQUMseUJBQXlCLENBQUM7d0JBQy9DLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRTt3QkFDNUQ7NEJBQ0UsT0FBTyxFQUFFLGdCQUFnQjs0QkFDekIsV0FBVyxFQUFFLGtCQUFrQjs0QkFDL0IsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuaW1wb3J0IHsgZGVmYXVsdE9jY1VuaXRPcmRlckNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtb2NjLW9yZ2FuaXphdGlvbi1jb25maWcnO1xuaW1wb3J0IHsgT2NjVW5pdE9yZGVyQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcnMvb2NjLXVuaXQtb3JkZXIuYWRhcHRlcic7XG5pbXBvcnQgeyBVbml0T3JkZXJBZGFwdGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vdW5pdC1vcmRlci9jb3JlJztcbmltcG9ydCB7IE9SREVSX05PUk1BTElaRVIgfSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgT2NjT3JkZXJOb3JtYWxpemVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9vY2MnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdE9jY1VuaXRPcmRlckNvbmZpZyksXG4gICAgeyBwcm92aWRlOiBVbml0T3JkZXJBZGFwdGVyLCB1c2VDbGFzczogT2NjVW5pdE9yZGVyQWRhcHRlciB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE9SREVSX05PUk1BTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjT3JkZXJOb3JtYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVW5pdE9yZGVyT2NjTW9kdWxlIHt9XG4iXX0=