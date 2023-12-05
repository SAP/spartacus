/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UnitOrderDetailsOrderEntriesContextToken } from '@spartacus/organization/unit-order/root';
import { UnitOrderDetailsOrderEntriesContext } from './page-context/unit-order-details-order-entries.context';
import { UnitLevelOrderDetailModule } from './unit-level-order-detail/unit-level-order-detail.module';
import { UnitLevelOrderHistoryModule } from './unit-level-order-history';
import * as i0 from "@angular/core";
export class UnitOrderComponentsModule {
}
UnitOrderComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitOrderComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderComponentsModule, imports: [RouterModule,
        UnitLevelOrderHistoryModule,
        UnitLevelOrderDetailModule] });
UnitOrderComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderComponentsModule, providers: [
        {
            provide: UnitOrderDetailsOrderEntriesContextToken,
            useExisting: UnitOrderDetailsOrderEntriesContext,
        },
    ], imports: [RouterModule,
        UnitLevelOrderHistoryModule,
        UnitLevelOrderDetailModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule,
                        UnitLevelOrderHistoryModule,
                        UnitLevelOrderDetailModule,
                    ],
                    providers: [
                        {
                            provide: UnitOrderDetailsOrderEntriesContextToken,
                            useExisting: UnitOrderDetailsOrderEntriesContext,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1vcmRlci1jb21wb25lbnRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vdW5pdC1vcmRlci9jb21wb25lbnRzL3VuaXQtb3JkZXItY29tcG9uZW50cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx3Q0FBd0MsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ25HLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBQzlHLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQ3RHLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztBQWV6RSxNQUFNLE9BQU8seUJBQXlCOztzSEFBekIseUJBQXlCO3VIQUF6Qix5QkFBeUIsWUFYbEMsWUFBWTtRQUNaLDJCQUEyQjtRQUMzQiwwQkFBMEI7dUhBU2pCLHlCQUF5QixhQVB6QjtRQUNUO1lBQ0UsT0FBTyxFQUFFLHdDQUF3QztZQUNqRCxXQUFXLEVBQUUsbUNBQW1DO1NBQ2pEO0tBQ0YsWUFUQyxZQUFZO1FBQ1osMkJBQTJCO1FBQzNCLDBCQUEwQjsyRkFTakIseUJBQXlCO2tCQWJyQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLDJCQUEyQjt3QkFDM0IsMEJBQTBCO3FCQUMzQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLHdDQUF3Qzs0QkFDakQsV0FBVyxFQUFFLG1DQUFtQzt5QkFDakQ7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFVuaXRPcmRlckRldGFpbHNPcmRlckVudHJpZXNDb250ZXh0VG9rZW4gfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi91bml0LW9yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgVW5pdE9yZGVyRGV0YWlsc09yZGVyRW50cmllc0NvbnRleHQgfSBmcm9tICcuL3BhZ2UtY29udGV4dC91bml0LW9yZGVyLWRldGFpbHMtb3JkZXItZW50cmllcy5jb250ZXh0JztcbmltcG9ydCB7IFVuaXRMZXZlbE9yZGVyRGV0YWlsTW9kdWxlIH0gZnJvbSAnLi91bml0LWxldmVsLW9yZGVyLWRldGFpbC91bml0LWxldmVsLW9yZGVyLWRldGFpbC5tb2R1bGUnO1xuaW1wb3J0IHsgVW5pdExldmVsT3JkZXJIaXN0b3J5TW9kdWxlIH0gZnJvbSAnLi91bml0LWxldmVsLW9yZGVyLWhpc3RvcnknO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFVuaXRMZXZlbE9yZGVySGlzdG9yeU1vZHVsZSxcbiAgICBVbml0TGV2ZWxPcmRlckRldGFpbE1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogVW5pdE9yZGVyRGV0YWlsc09yZGVyRW50cmllc0NvbnRleHRUb2tlbixcbiAgICAgIHVzZUV4aXN0aW5nOiBVbml0T3JkZXJEZXRhaWxzT3JkZXJFbnRyaWVzQ29udGV4dCxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBVbml0T3JkZXJDb21wb25lbnRzTW9kdWxlIHt9XG4iXX0=