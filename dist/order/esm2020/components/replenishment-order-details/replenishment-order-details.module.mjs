/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { CardModule, ListNavigationModule, PromotionsModule, SpinnerModule, } from '@spartacus/storefront';
import { OrderDetailItemsComponent } from '../order-details/order-detail-items/order-detail-items.component';
import { OrderDetailTotalsComponent } from '../order-details/order-detail-totals/order-detail-totals.component';
import { OrderDetailsService } from '../order-details/order-details.service';
import { OrderOverviewComponent } from '../order-details/order-overview/order-overview.component';
import { OrderHistoryComponent } from '../order-history/order-history.component';
import { ReplenishmentOrderCancellationDialogModule } from '../replenishment-order-cancellation-dialog/replenishment-order-cancellation-dialog.module';
import { defaultReplenishmentOrderCancellationLayoutConfig } from './default-replenishment-order-cancellation-layout.config';
import { ReplenishmentOrderCancellationComponent } from './replenishment-order-cancellation/replenishment-order-cancellation.component';
import { ReplenishmentOrderDetailsService } from './replenishment-order-details.service';
import * as i0 from "@angular/core";
const moduleComponents = [ReplenishmentOrderCancellationComponent];
export class ReplenishmentOrderDetailsModule {
}
ReplenishmentOrderDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReplenishmentOrderDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderDetailsModule, declarations: [ReplenishmentOrderCancellationComponent], imports: [CardModule,
        CommonModule,
        I18nModule,
        PromotionsModule,
        UrlModule,
        ReplenishmentOrderCancellationDialogModule,
        SpinnerModule,
        ListNavigationModule,
        RouterModule], exports: [ReplenishmentOrderCancellationComponent] });
ReplenishmentOrderDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderDetailsModule, providers: [
        provideDefaultConfig(defaultReplenishmentOrderCancellationLayoutConfig),
        provideDefaultConfig({
            cmsComponents: {
                ReplenishmentDetailItemsComponent: {
                    component: OrderDetailItemsComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: ReplenishmentOrderDetailsService,
                        },
                    ],
                },
                ReplenishmentDetailTotalsComponent: {
                    component: OrderDetailTotalsComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: ReplenishmentOrderDetailsService,
                        },
                    ],
                },
                ReplenishmentDetailShippingComponent: {
                    component: OrderOverviewComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: ReplenishmentOrderDetailsService,
                        },
                    ],
                },
                ReplenishmentDetailActionsComponent: {
                    component: ReplenishmentOrderCancellationComponent,
                },
                ReplenishmentDetailOrderHistoryComponent: {
                    component: OrderHistoryComponent,
                },
            },
        }),
    ], imports: [CardModule,
        CommonModule,
        I18nModule,
        PromotionsModule,
        UrlModule,
        ReplenishmentOrderCancellationDialogModule,
        SpinnerModule,
        ListNavigationModule,
        RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CardModule,
                        CommonModule,
                        I18nModule,
                        PromotionsModule,
                        UrlModule,
                        ReplenishmentOrderCancellationDialogModule,
                        SpinnerModule,
                        ListNavigationModule,
                        RouterModule,
                    ],
                    providers: [
                        provideDefaultConfig(defaultReplenishmentOrderCancellationLayoutConfig),
                        provideDefaultConfig({
                            cmsComponents: {
                                ReplenishmentDetailItemsComponent: {
                                    component: OrderDetailItemsComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: ReplenishmentOrderDetailsService,
                                        },
                                    ],
                                },
                                ReplenishmentDetailTotalsComponent: {
                                    component: OrderDetailTotalsComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: ReplenishmentOrderDetailsService,
                                        },
                                    ],
                                },
                                ReplenishmentDetailShippingComponent: {
                                    component: OrderOverviewComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: ReplenishmentOrderDetailsService,
                                        },
                                    ],
                                },
                                ReplenishmentDetailActionsComponent: {
                                    component: ReplenishmentOrderCancellationComponent,
                                },
                                ReplenishmentDetailOrderHistoryComponent: {
                                    component: OrderHistoryComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [...moduleComponents],
                    exports: [...moduleComponents],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGVuaXNobWVudC1vcmRlci1kZXRhaWxzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb21wb25lbnRzL3JlcGxlbmlzaG1lbnQtb3JkZXItZGV0YWlscy9yZXBsZW5pc2htZW50LW9yZGVyLWRldGFpbHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUVMLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsU0FBUyxHQUNWLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsZ0JBQWdCLEVBQ2hCLGFBQWEsR0FDZCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGtFQUFrRSxDQUFDO0FBQzdHLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQ2hILE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSwwQ0FBMEMsRUFBRSxNQUFNLDJGQUEyRixDQUFDO0FBQ3ZKLE9BQU8sRUFBRSxpREFBaUQsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQzdILE9BQU8sRUFBRSx1Q0FBdUMsRUFBRSxNQUFNLCtFQUErRSxDQUFDO0FBQ3hJLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFN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XG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIENtc0NvbmZpZyxcbiAgSTE4bk1vZHVsZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIFVybE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIENhcmRNb2R1bGUsXG4gIExpc3ROYXZpZ2F0aW9uTW9kdWxlLFxuICBQcm9tb3Rpb25zTW9kdWxlLFxuICBTcGlubmVyTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxJdGVtc0NvbXBvbmVudCB9IGZyb20gJy4uL29yZGVyLWRldGFpbHMvb3JkZXItZGV0YWlsLWl0ZW1zL29yZGVyLWRldGFpbC1pdGVtcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxUb3RhbHNDb21wb25lbnQgfSBmcm9tICcuLi9vcmRlci1kZXRhaWxzL29yZGVyLWRldGFpbC10b3RhbHMvb3JkZXItZGV0YWlsLXRvdGFscy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxzU2VydmljZSB9IGZyb20gJy4uL29yZGVyLWRldGFpbHMvb3JkZXItZGV0YWlscy5zZXJ2aWNlJztcbmltcG9ydCB7IE9yZGVyT3ZlcnZpZXdDb21wb25lbnQgfSBmcm9tICcuLi9vcmRlci1kZXRhaWxzL29yZGVyLW92ZXJ2aWV3L29yZGVyLW92ZXJ2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcmRlckhpc3RvcnlDb21wb25lbnQgfSBmcm9tICcuLi9vcmRlci1oaXN0b3J5L29yZGVyLWhpc3RvcnkuY29tcG9uZW50JztcbmltcG9ydCB7IFJlcGxlbmlzaG1lbnRPcmRlckNhbmNlbGxhdGlvbkRpYWxvZ01vZHVsZSB9IGZyb20gJy4uL3JlcGxlbmlzaG1lbnQtb3JkZXItY2FuY2VsbGF0aW9uLWRpYWxvZy9yZXBsZW5pc2htZW50LW9yZGVyLWNhbmNlbGxhdGlvbi1kaWFsb2cubW9kdWxlJztcbmltcG9ydCB7IGRlZmF1bHRSZXBsZW5pc2htZW50T3JkZXJDYW5jZWxsYXRpb25MYXlvdXRDb25maWcgfSBmcm9tICcuL2RlZmF1bHQtcmVwbGVuaXNobWVudC1vcmRlci1jYW5jZWxsYXRpb24tbGF5b3V0LmNvbmZpZyc7XG5pbXBvcnQgeyBSZXBsZW5pc2htZW50T3JkZXJDYW5jZWxsYXRpb25Db21wb25lbnQgfSBmcm9tICcuL3JlcGxlbmlzaG1lbnQtb3JkZXItY2FuY2VsbGF0aW9uL3JlcGxlbmlzaG1lbnQtb3JkZXItY2FuY2VsbGF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZXBsZW5pc2htZW50T3JkZXJEZXRhaWxzU2VydmljZSB9IGZyb20gJy4vcmVwbGVuaXNobWVudC1vcmRlci1kZXRhaWxzLnNlcnZpY2UnO1xuXG5jb25zdCBtb2R1bGVDb21wb25lbnRzID0gW1JlcGxlbmlzaG1lbnRPcmRlckNhbmNlbGxhdGlvbkNvbXBvbmVudF07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDYXJkTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIFByb21vdGlvbnNNb2R1bGUsXG4gICAgVXJsTW9kdWxlLFxuICAgIFJlcGxlbmlzaG1lbnRPcmRlckNhbmNlbGxhdGlvbkRpYWxvZ01vZHVsZSxcbiAgICBTcGlubmVyTW9kdWxlLFxuICAgIExpc3ROYXZpZ2F0aW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdFJlcGxlbmlzaG1lbnRPcmRlckNhbmNlbGxhdGlvbkxheW91dENvbmZpZyksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIFJlcGxlbmlzaG1lbnREZXRhaWxJdGVtc0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogT3JkZXJEZXRhaWxJdGVtc0NvbXBvbmVudCxcbiAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJvdmlkZTogT3JkZXJEZXRhaWxzU2VydmljZSxcbiAgICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IFJlcGxlbmlzaG1lbnRPcmRlckRldGFpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICBSZXBsZW5pc2htZW50RGV0YWlsVG90YWxzQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlckRldGFpbFRvdGFsc0NvbXBvbmVudCxcbiAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJvdmlkZTogT3JkZXJEZXRhaWxzU2VydmljZSxcbiAgICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IFJlcGxlbmlzaG1lbnRPcmRlckRldGFpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICBSZXBsZW5pc2htZW50RGV0YWlsU2hpcHBpbmdDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyT3ZlcnZpZXdDb21wb25lbnQsXG4gICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByb3ZpZGU6IE9yZGVyRGV0YWlsc1NlcnZpY2UsXG4gICAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBSZXBsZW5pc2htZW50T3JkZXJEZXRhaWxzU2VydmljZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAgUmVwbGVuaXNobWVudERldGFpbEFjdGlvbnNDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IFJlcGxlbmlzaG1lbnRPcmRlckNhbmNlbGxhdGlvbkNvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgICAgUmVwbGVuaXNobWVudERldGFpbE9yZGVySGlzdG9yeUNvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogT3JkZXJIaXN0b3J5Q29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbLi4ubW9kdWxlQ29tcG9uZW50c10sXG4gIGV4cG9ydHM6IFsuLi5tb2R1bGVDb21wb25lbnRzXSxcbn0pXG5leHBvcnQgY2xhc3MgUmVwbGVuaXNobWVudE9yZGVyRGV0YWlsc01vZHVsZSB7fVxuIl19