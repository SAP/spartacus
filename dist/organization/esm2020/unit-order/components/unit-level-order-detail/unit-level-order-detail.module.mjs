/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard, provideDefaultConfig } from '@spartacus/core';
import { UnitLevelOrdersViewerGuard } from '@spartacus/organization/unit-order/core';
import { UnitLevelOrderOverviewComponent, UnitLevelOrderOverviewModule, } from './unit-level-order-overview';
import { OrderDetailItemsComponent, OrderDetailsService, OrderDetailTotalsComponent, } from '@spartacus/order/components';
import { UnitLevelOrderDetailService } from './unit-level-order-detail.service';
import * as i0 from "@angular/core";
export class UnitLevelOrderDetailModule {
}
UnitLevelOrderDetailModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderDetailModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitLevelOrderDetailModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderDetailModule, imports: [CommonModule, UnitLevelOrderOverviewModule] });
UnitLevelOrderDetailModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderDetailModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                UnitLevelOrderDetailsOverviewComponent: {
                    component: UnitLevelOrderOverviewComponent,
                    guards: [AuthGuard, UnitLevelOrdersViewerGuard],
                },
                UnitLevelOrderDetailsItemsComponent: {
                    component: OrderDetailItemsComponent,
                    guards: [AuthGuard, UnitLevelOrdersViewerGuard],
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: UnitLevelOrderDetailService,
                        },
                    ],
                },
                UnitLevelOrderDetailsTotalsComponent: {
                    component: OrderDetailTotalsComponent,
                    guards: [AuthGuard, UnitLevelOrdersViewerGuard],
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: UnitLevelOrderDetailService,
                        },
                    ],
                },
            },
        }),
    ], imports: [CommonModule, UnitLevelOrderOverviewModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderDetailModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, UnitLevelOrderOverviewModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                UnitLevelOrderDetailsOverviewComponent: {
                                    component: UnitLevelOrderOverviewComponent,
                                    guards: [AuthGuard, UnitLevelOrdersViewerGuard],
                                },
                                UnitLevelOrderDetailsItemsComponent: {
                                    component: OrderDetailItemsComponent,
                                    guards: [AuthGuard, UnitLevelOrdersViewerGuard],
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: UnitLevelOrderDetailService,
                                        },
                                    ],
                                },
                                UnitLevelOrderDetailsTotalsComponent: {
                                    component: OrderDetailTotalsComponent,
                                    guards: [AuthGuard, UnitLevelOrdersViewerGuard],
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: UnitLevelOrderDetailService,
                                        },
                                    ],
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1sZXZlbC1vcmRlci1kZXRhaWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi91bml0LW9yZGVyL2NvbXBvbmVudHMvdW5pdC1sZXZlbC1vcmRlci1kZXRhaWwvdW5pdC1sZXZlbC1vcmRlci1kZXRhaWwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFhLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0UsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDckYsT0FBTyxFQUNMLCtCQUErQixFQUMvQiw0QkFBNEIsR0FDN0IsTUFBTSw2QkFBNkIsQ0FBQztBQUNyQyxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLG1CQUFtQixFQUNuQiwwQkFBMEIsR0FDM0IsTUFBTSw2QkFBNkIsQ0FBQztBQUNyQyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7QUFtQ2hGLE1BQU0sT0FBTywwQkFBMEI7O3VIQUExQiwwQkFBMEI7d0hBQTFCLDBCQUEwQixZQWhDM0IsWUFBWSxFQUFFLDRCQUE0Qjt3SEFnQ3pDLDBCQUEwQixhQS9CMUI7UUFDVCxvQkFBb0IsQ0FBQztZQUNuQixhQUFhLEVBQUU7Z0JBQ2Isc0NBQXNDLEVBQUU7b0JBQ3RDLFNBQVMsRUFBRSwrQkFBK0I7b0JBQzFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSwwQkFBMEIsQ0FBQztpQkFDaEQ7Z0JBQ0QsbUNBQW1DLEVBQUU7b0JBQ25DLFNBQVMsRUFBRSx5QkFBeUI7b0JBQ3BDLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSwwQkFBMEIsQ0FBQztvQkFDL0MsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxtQkFBbUI7NEJBQzVCLFdBQVcsRUFBRSwyQkFBMkI7eUJBQ3pDO3FCQUNGO2lCQUNGO2dCQUNELG9DQUFvQyxFQUFFO29CQUNwQyxTQUFTLEVBQUUsMEJBQTBCO29CQUNyQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsMEJBQTBCLENBQUM7b0JBQy9DLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsbUJBQW1COzRCQUM1QixXQUFXLEVBQUUsMkJBQTJCO3lCQUN6QztxQkFDRjtpQkFDRjthQUNGO1NBQ1csQ0FBQztLQUNoQixZQTlCUyxZQUFZLEVBQUUsNEJBQTRCOzJGQWdDekMsMEJBQTBCO2tCQWpDdEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsNEJBQTRCLENBQUM7b0JBQ3JELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBQzs0QkFDbkIsYUFBYSxFQUFFO2dDQUNiLHNDQUFzQyxFQUFFO29DQUN0QyxTQUFTLEVBQUUsK0JBQStCO29DQUMxQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsMEJBQTBCLENBQUM7aUNBQ2hEO2dDQUNELG1DQUFtQyxFQUFFO29DQUNuQyxTQUFTLEVBQUUseUJBQXlCO29DQUNwQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsMEJBQTBCLENBQUM7b0NBQy9DLFNBQVMsRUFBRTt3Q0FDVDs0Q0FDRSxPQUFPLEVBQUUsbUJBQW1COzRDQUM1QixXQUFXLEVBQUUsMkJBQTJCO3lDQUN6QztxQ0FDRjtpQ0FDRjtnQ0FDRCxvQ0FBb0MsRUFBRTtvQ0FDcEMsU0FBUyxFQUFFLDBCQUEwQjtvQ0FDckMsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLDBCQUEwQixDQUFDO29DQUMvQyxTQUFTLEVBQUU7d0NBQ1Q7NENBQ0UsT0FBTyxFQUFFLG1CQUFtQjs0Q0FDNUIsV0FBVyxFQUFFLDJCQUEyQjt5Q0FDekM7cUNBQ0Y7aUNBQ0Y7NkJBQ0Y7eUJBQ1csQ0FBQztxQkFDaEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEF1dGhHdWFyZCwgQ21zQ29uZmlnLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBVbml0TGV2ZWxPcmRlcnNWaWV3ZXJHdWFyZCB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL3VuaXQtb3JkZXIvY29yZSc7XG5pbXBvcnQge1xuICBVbml0TGV2ZWxPcmRlck92ZXJ2aWV3Q29tcG9uZW50LFxuICBVbml0TGV2ZWxPcmRlck92ZXJ2aWV3TW9kdWxlLFxufSBmcm9tICcuL3VuaXQtbGV2ZWwtb3JkZXItb3ZlcnZpZXcnO1xuaW1wb3J0IHtcbiAgT3JkZXJEZXRhaWxJdGVtc0NvbXBvbmVudCxcbiAgT3JkZXJEZXRhaWxzU2VydmljZSxcbiAgT3JkZXJEZXRhaWxUb3RhbHNDb21wb25lbnQsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JkZXIvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBVbml0TGV2ZWxPcmRlckRldGFpbFNlcnZpY2UgfSBmcm9tICcuL3VuaXQtbGV2ZWwtb3JkZXItZGV0YWlsLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBVbml0TGV2ZWxPcmRlck92ZXJ2aWV3TW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoe1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBVbml0TGV2ZWxPcmRlckRldGFpbHNPdmVydmlld0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogVW5pdExldmVsT3JkZXJPdmVydmlld0NvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtBdXRoR3VhcmQsIFVuaXRMZXZlbE9yZGVyc1ZpZXdlckd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgICAgVW5pdExldmVsT3JkZXJEZXRhaWxzSXRlbXNDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyRGV0YWlsSXRlbXNDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQXV0aEd1YXJkLCBVbml0TGV2ZWxPcmRlcnNWaWV3ZXJHdWFyZF0sXG4gICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByb3ZpZGU6IE9yZGVyRGV0YWlsc1NlcnZpY2UsXG4gICAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBVbml0TGV2ZWxPcmRlckRldGFpbFNlcnZpY2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIFVuaXRMZXZlbE9yZGVyRGV0YWlsc1RvdGFsc0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogT3JkZXJEZXRhaWxUb3RhbHNDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQXV0aEd1YXJkLCBVbml0TGV2ZWxPcmRlcnNWaWV3ZXJHdWFyZF0sXG4gICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByb3ZpZGU6IE9yZGVyRGV0YWlsc1NlcnZpY2UsXG4gICAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBVbml0TGV2ZWxPcmRlckRldGFpbFNlcnZpY2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0gYXMgQ21zQ29uZmlnKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVW5pdExldmVsT3JkZXJEZXRhaWxNb2R1bGUge31cbiJdfQ==