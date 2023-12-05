/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, inject, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddToCartModule } from '@spartacus/cart/base/components/add-to-cart';
import { AuthGuard, FeaturesConfigModule, I18nModule, MODULE_INITIALIZER, provideDefaultConfig, provideDefaultConfigFactory, UrlModule, } from '@spartacus/core';
import { USE_MY_ACCOUNT_V2_ORDER, OrderOutlets } from '@spartacus/order/root';
import { CardModule, IconModule, KeyboardFocusModule, OutletModule, OutletPosition, OutletService, PromotionsModule, SpinnerModule, } from '@spartacus/storefront';
import { MyAccountV2ConsignmentTrackingComponent, MyAccountV2OrderDetailsActionsComponent, MyAccountV2DownloadInvoicesModule, } from './my-account-v2';
import { OrderDetailActionsComponent } from './order-detail-actions/order-detail-actions.component';
import { OrderDetailBillingComponent } from './order-detail-billing/order-detail-billing.component';
import { ConsignmentTrackingComponent } from './order-detail-items/consignment-tracking/consignment-tracking.component';
import { TrackingEventsComponent } from './order-detail-items/consignment-tracking/tracking-events/tracking-events.component';
import { defaultConsignmentTrackingLayoutConfig } from './order-detail-items/default-consignment-tracking-layout.config';
import { OrderConsignedEntriesComponent } from './order-detail-items/order-consigned-entries/order-consigned-entries.component';
import { OrderDetailItemsComponent } from './order-detail-items/order-detail-items.component';
import { OrderDetailReorderComponent } from './order-detail-reorder/order-detail-reorder.component';
import { ReorderDialogComponent } from './order-detail-reorder/reorder-dialog/reorder-dialog.component';
import { OrderDetailTotalsComponent } from './order-detail-totals/order-detail-totals.component';
import { OrderOverviewComponent } from './order-overview/order-overview.component';
import { defaultReorderLayoutConfig } from './reoder-layout.config';
import * as i0 from "@angular/core";
function registerOrderOutletFactory() {
    const isMyAccountV2 = inject(USE_MY_ACCOUNT_V2_ORDER);
    const outletService = inject(OutletService);
    const componentFactoryResolver = inject(ComponentFactoryResolver);
    return () => {
        const config = {
            component: MyAccountV2ConsignmentTrackingComponent,
            id: OrderOutlets.ORDER_CONSIGNMENT,
            position: OutletPosition.REPLACE,
        };
        if (isMyAccountV2) {
            const template = componentFactoryResolver.resolveComponentFactory(config.component);
            outletService.add(config.id, template, config.position);
        }
    };
}
const myAccountV2CmsMapping = {
    cmsComponents: {
        AccountOrderDetailsActionsComponent: {
            component: MyAccountV2OrderDetailsActionsComponent,
            //guards: inherited from standard config,
        },
    },
};
const moduleComponents = [
    OrderOverviewComponent,
    OrderDetailActionsComponent,
    OrderDetailItemsComponent,
    OrderDetailTotalsComponent,
    OrderDetailBillingComponent,
    TrackingEventsComponent,
    ConsignmentTrackingComponent,
    OrderConsignedEntriesComponent,
    OrderDetailReorderComponent,
    ReorderDialogComponent,
    MyAccountV2OrderDetailsActionsComponent,
    MyAccountV2ConsignmentTrackingComponent,
];
export class OrderDetailsModule {
}
OrderDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailsModule, declarations: [OrderOverviewComponent,
        OrderDetailActionsComponent,
        OrderDetailItemsComponent,
        OrderDetailTotalsComponent,
        OrderDetailBillingComponent,
        TrackingEventsComponent,
        ConsignmentTrackingComponent,
        OrderConsignedEntriesComponent,
        OrderDetailReorderComponent,
        ReorderDialogComponent,
        MyAccountV2OrderDetailsActionsComponent,
        MyAccountV2ConsignmentTrackingComponent], imports: [CardModule,
        CommonModule,
        I18nModule,
        FeaturesConfigModule,
        PromotionsModule,
        UrlModule,
        SpinnerModule,
        RouterModule,
        OutletModule,
        AddToCartModule,
        KeyboardFocusModule,
        IconModule,
        MyAccountV2DownloadInvoicesModule], exports: [OrderOverviewComponent,
        OrderDetailActionsComponent,
        OrderDetailItemsComponent,
        OrderDetailTotalsComponent,
        OrderDetailBillingComponent,
        TrackingEventsComponent,
        ConsignmentTrackingComponent,
        OrderConsignedEntriesComponent,
        OrderDetailReorderComponent,
        ReorderDialogComponent,
        MyAccountV2OrderDetailsActionsComponent,
        MyAccountV2ConsignmentTrackingComponent] });
OrderDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                AccountOrderDetailsActionsComponent: {
                    component: OrderDetailActionsComponent,
                    guards: [AuthGuard],
                },
                AccountOrderDetailsItemsComponent: {
                    component: OrderDetailItemsComponent,
                    guards: [AuthGuard],
                    data: {
                        enableAddToCart: true,
                    },
                },
                AccountOrderDetailsGroupedItemsComponent: {
                    component: OrderDetailItemsComponent,
                    guards: [AuthGuard],
                    data: {
                        enableAddToCart: true,
                        groupCartItems: true,
                    },
                },
                AccountOrderDetailsTotalsComponent: {
                    component: OrderDetailTotalsComponent,
                    guards: [AuthGuard],
                },
                AccountOrderDetailsOverviewComponent: {
                    component: OrderOverviewComponent,
                    guards: [AuthGuard],
                },
                AccountOrderDetailsSimpleOverviewComponent: {
                    component: OrderOverviewComponent,
                    guards: [AuthGuard],
                    data: {
                        simple: true,
                    },
                },
                AccountOrderDetailsReorderComponent: {
                    component: OrderDetailReorderComponent,
                    guards: [AuthGuard],
                },
            },
            features: {
                consignmentTracking: '1.2',
            },
        }),
        provideDefaultConfig(defaultConsignmentTrackingLayoutConfig),
        provideDefaultConfig(defaultReorderLayoutConfig),
        provideDefaultConfigFactory(() => inject(USE_MY_ACCOUNT_V2_ORDER) ? myAccountV2CmsMapping : {}),
        {
            provide: MODULE_INITIALIZER,
            useFactory: registerOrderOutletFactory,
            multi: true,
        },
    ], imports: [CardModule,
        CommonModule,
        I18nModule,
        FeaturesConfigModule,
        PromotionsModule,
        UrlModule,
        SpinnerModule,
        RouterModule,
        OutletModule,
        AddToCartModule,
        KeyboardFocusModule,
        IconModule,
        MyAccountV2DownloadInvoicesModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CardModule,
                        CommonModule,
                        I18nModule,
                        FeaturesConfigModule,
                        PromotionsModule,
                        UrlModule,
                        SpinnerModule,
                        RouterModule,
                        OutletModule,
                        AddToCartModule,
                        KeyboardFocusModule,
                        IconModule,
                        MyAccountV2DownloadInvoicesModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                AccountOrderDetailsActionsComponent: {
                                    component: OrderDetailActionsComponent,
                                    guards: [AuthGuard],
                                },
                                AccountOrderDetailsItemsComponent: {
                                    component: OrderDetailItemsComponent,
                                    guards: [AuthGuard],
                                    data: {
                                        enableAddToCart: true,
                                    },
                                },
                                AccountOrderDetailsGroupedItemsComponent: {
                                    component: OrderDetailItemsComponent,
                                    guards: [AuthGuard],
                                    data: {
                                        enableAddToCart: true,
                                        groupCartItems: true,
                                    },
                                },
                                AccountOrderDetailsTotalsComponent: {
                                    component: OrderDetailTotalsComponent,
                                    guards: [AuthGuard],
                                },
                                AccountOrderDetailsOverviewComponent: {
                                    component: OrderOverviewComponent,
                                    guards: [AuthGuard],
                                },
                                AccountOrderDetailsSimpleOverviewComponent: {
                                    component: OrderOverviewComponent,
                                    guards: [AuthGuard],
                                    data: {
                                        simple: true,
                                    },
                                },
                                AccountOrderDetailsReorderComponent: {
                                    component: OrderDetailReorderComponent,
                                    guards: [AuthGuard],
                                },
                            },
                            features: {
                                consignmentTracking: '1.2',
                            },
                        }),
                        provideDefaultConfig(defaultConsignmentTrackingLayoutConfig),
                        provideDefaultConfig(defaultReorderLayoutConfig),
                        provideDefaultConfigFactory(() => inject(USE_MY_ACCOUNT_V2_ORDER) ? myAccountV2CmsMapping : {}),
                        {
                            provide: MODULE_INITIALIZER,
                            useFactory: registerOrderOutletFactory,
                            multi: true,
                        },
                    ],
                    declarations: [...moduleComponents],
                    exports: [...moduleComponents],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItZGV0YWlscy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9vcmRlci1kZXRhaWxzL29yZGVyLWRldGFpbHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUM5RSxPQUFPLEVBQ0wsU0FBUyxFQUdULG9CQUFvQixFQUNwQixVQUFVLEVBQ1Ysa0JBQWtCLEVBQ2xCLG9CQUFvQixFQUNwQiwyQkFBMkIsRUFDM0IsU0FBUyxHQUNWLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlFLE9BQU8sRUFDTCxVQUFVLEVBQ1YsVUFBVSxFQUNWLG1CQUFtQixFQUNuQixZQUFZLEVBQ1osY0FBYyxFQUNkLGFBQWEsRUFDYixnQkFBZ0IsRUFFaEIsYUFBYSxHQUNkLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUNMLHVDQUF1QyxFQUN2Qyx1Q0FBdUMsRUFDdkMsaUNBQWlDLEdBQ2xDLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDcEcsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDcEcsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMEVBQTBFLENBQUM7QUFDeEgsT0FBTyxFQUFFLHVC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QUFDLFNBQVMsQ0FBQztpQ0FDcEI7Z0NBQ0Qsb0NBQW9DLEVBQUU7b0NBQ3BDLFNBQVMsRUFBRSxzQkFBc0I7b0NBQ2pDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztpQ0FDcEI7Z0NBQ0QsMENBQTBDLEVBQUU7b0NBQzFDLFNBQVMsRUFBRSxzQkFBc0I7b0NBQ2pDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztvQ0FDbkIsSUFBSSxFQUFFO3dDQUNKLE1BQU0sRUFBRSxJQUFJO3FDQUNiO2lDQUNGO2dDQUNELG1DQUFtQyxFQUFFO29DQUNuQyxTQUFTLEVBQUUsMkJBQTJCO29DQUN0QyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUNBQ3BCOzZCQUNGOzRCQUNELFFBQVEsRUFBRTtnQ0FDUixtQkFBbUIsRUFBRSxLQUFLOzZCQUMzQjt5QkFDRixDQUFDO3dCQUNGLG9CQUFvQixDQUFDLHNDQUFzQyxDQUFDO3dCQUM1RCxvQkFBb0IsQ0FBQywwQkFBMEIsQ0FBQzt3QkFDaEQsMkJBQTJCLENBQUMsR0FBRyxFQUFFLENBQy9CLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUM3RDt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsa0JBQWtCOzRCQUMzQixVQUFVLEVBQUUsMEJBQTBCOzRCQUN0QyxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixDQUFDO29CQUNuQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixDQUFDO2lCQUMvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIGluamVjdCwgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBZGRUb0NhcnRNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9jb21wb25lbnRzL2FkZC10by1jYXJ0JztcbmltcG9ydCB7XG4gIEF1dGhHdWFyZCxcbiAgQ21zQ29uZmlnLFxuICBGZWF0dXJlc0NvbmZpZyxcbiAgRmVhdHVyZXNDb25maWdNb2R1bGUsXG4gIEkxOG5Nb2R1bGUsXG4gIE1PRFVMRV9JTklUSUFMSVpFUixcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeSxcbiAgVXJsTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgVVNFX01ZX0FDQ09VTlRfVjJfT1JERVIsIE9yZGVyT3V0bGV0cyB9IGZyb20gJ0BzcGFydGFjdXMvb3JkZXIvcm9vdCc7XG5pbXBvcnQge1xuICBDYXJkTW9kdWxlLFxuICBJY29uTW9kdWxlLFxuICBLZXlib2FyZEZvY3VzTW9kdWxlLFxuICBPdXRsZXRNb2R1bGUsXG4gIE91dGxldFBvc2l0aW9uLFxuICBPdXRsZXRTZXJ2aWNlLFxuICBQcm9tb3Rpb25zTW9kdWxlLFxuICBQcm92aWRlT3V0bGV0T3B0aW9ucyxcbiAgU3Bpbm5lck1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7XG4gIE15QWNjb3VudFYyQ29uc2lnbm1lbnRUcmFja2luZ0NvbXBvbmVudCxcbiAgTXlBY2NvdW50VjJPcmRlckRldGFpbHNBY3Rpb25zQ29tcG9uZW50LFxuICBNeUFjY291bnRWMkRvd25sb2FkSW52b2ljZXNNb2R1bGUsXG59IGZyb20gJy4vbXktYWNjb3VudC12Mic7XG5pbXBvcnQgeyBPcmRlckRldGFpbEFjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL29yZGVyLWRldGFpbC1hY3Rpb25zL29yZGVyLWRldGFpbC1hY3Rpb25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcmRlckRldGFpbEJpbGxpbmdDb21wb25lbnQgfSBmcm9tICcuL29yZGVyLWRldGFpbC1iaWxsaW5nL29yZGVyLWRldGFpbC1iaWxsaW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb25zaWdubWVudFRyYWNraW5nQ29tcG9uZW50IH0gZnJvbSAnLi9vcmRlci1kZXRhaWwtaXRlbXMvY29uc2lnbm1lbnQtdHJhY2tpbmcvY29uc2lnbm1lbnQtdHJhY2tpbmcuY29tcG9uZW50JztcbmltcG9ydCB7IFRyYWNraW5nRXZlbnRzQ29tcG9uZW50IH0gZnJvbSAnLi9vcmRlci1kZXRhaWwtaXRlbXMvY29uc2lnbm1lbnQtdHJhY2tpbmcvdHJhY2tpbmctZXZlbnRzL3RyYWNraW5nLWV2ZW50cy5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVmYXVsdENvbnNpZ25tZW50VHJhY2tpbmdMYXlvdXRDb25maWcgfSBmcm9tICcuL29yZGVyLWRldGFpbC1pdGVtcy9kZWZhdWx0LWNvbnNpZ25tZW50LXRyYWNraW5nLWxheW91dC5jb25maWcnO1xuaW1wb3J0IHsgT3JkZXJDb25zaWduZWRFbnRyaWVzQ29tcG9uZW50IH0gZnJvbSAnLi9vcmRlci1kZXRhaWwtaXRlbXMvb3JkZXItY29uc2lnbmVkLWVudHJpZXMvb3JkZXItY29uc2lnbmVkLWVudHJpZXMuY29tcG9uZW50JztcbmltcG9ydCB7IE9yZGVyRGV0YWlsSXRlbXNDb21wb25lbnQgfSBmcm9tICcuL29yZGVyLWRldGFpbC1pdGVtcy9vcmRlci1kZXRhaWwtaXRlbXMuY29tcG9uZW50JztcbmltcG9ydCB7IE9yZGVyRGV0YWlsUmVvcmRlckNvbXBvbmVudCB9IGZyb20gJy4vb3JkZXItZGV0YWlsLXJlb3JkZXIvb3JkZXItZGV0YWlsLXJlb3JkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFJlb3JkZXJEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL29yZGVyLWRldGFpbC1yZW9yZGVyL3Jlb3JkZXItZGlhbG9nL3Jlb3JkZXItZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcmRlckRldGFpbFRvdGFsc0NvbXBvbmVudCB9IGZyb20gJy4vb3JkZXItZGV0YWlsLXRvdGFscy9vcmRlci1kZXRhaWwtdG90YWxzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcmRlck92ZXJ2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi9vcmRlci1vdmVydmlldy9vcmRlci1vdmVydmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVmYXVsdFJlb3JkZXJMYXlvdXRDb25maWcgfSBmcm9tICcuL3Jlb2Rlci1sYXlvdXQuY29uZmlnJztcblxuZnVuY3Rpb24gcmVnaXN0ZXJPcmRlck91dGxldEZhY3RvcnkoKTogKCkgPT4gdm9pZCB7XG4gIGNvbnN0IGlzTXlBY2NvdW50VjIgPSBpbmplY3QoVVNFX01ZX0FDQ09VTlRfVjJfT1JERVIpO1xuICBjb25zdCBvdXRsZXRTZXJ2aWNlID0gaW5qZWN0KE91dGxldFNlcnZpY2UpO1xuICBjb25zdCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgPSBpbmplY3QoQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKTtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBjb25zdCBjb25maWc6IFByb3ZpZGVPdXRsZXRPcHRpb25zID0ge1xuICAgICAgY29tcG9uZW50OiBNeUFjY291bnRWMkNvbnNpZ25tZW50VHJhY2tpbmdDb21wb25lbnQsXG4gICAgICBpZDogT3JkZXJPdXRsZXRzLk9SREVSX0NPTlNJR05NRU5ULFxuICAgICAgcG9zaXRpb246IE91dGxldFBvc2l0aW9uLlJFUExBQ0UsXG4gICAgfTtcbiAgICBpZiAoaXNNeUFjY291bnRWMikge1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXG4gICAgICAgIGNvbmZpZy5jb21wb25lbnRcbiAgICAgICk7XG4gICAgICBvdXRsZXRTZXJ2aWNlLmFkZChjb25maWcuaWQsIHRlbXBsYXRlLCBjb25maWcucG9zaXRpb24pO1xuICAgIH1cbiAgfTtcbn1cblxuY29uc3QgbXlBY2NvdW50VjJDbXNNYXBwaW5nOiBDbXNDb25maWcgPSB7XG4gIGNtc0NvbXBvbmVudHM6IHtcbiAgICBBY2NvdW50T3JkZXJEZXRhaWxzQWN0aW9uc0NvbXBvbmVudDoge1xuICAgICAgY29tcG9uZW50OiBNeUFjY291bnRWMk9yZGVyRGV0YWlsc0FjdGlvbnNDb21wb25lbnQsXG4gICAgICAvL2d1YXJkczogaW5oZXJpdGVkIGZyb20gc3RhbmRhcmQgY29uZmlnLFxuICAgIH0sXG4gIH0sXG59O1xuXG5jb25zdCBtb2R1bGVDb21wb25lbnRzID0gW1xuICBPcmRlck92ZXJ2aWV3Q29tcG9uZW50LFxuICBPcmRlckRldGFpbEFjdGlvbnNDb21wb25lbnQsXG4gIE9yZGVyRGV0YWlsSXRlbXNDb21wb25lbnQsXG4gIE9yZGVyRGV0YWlsVG90YWxzQ29tcG9uZW50LFxuICBPcmRlckRldGFpbEJpbGxpbmdDb21wb25lbnQsXG4gIFRyYWNraW5nRXZlbnRzQ29tcG9uZW50LFxuICBDb25zaWdubWVudFRyYWNraW5nQ29tcG9uZW50LFxuICBPcmRlckNvbnNpZ25lZEVudHJpZXNDb21wb25lbnQsXG4gIE9yZGVyRGV0YWlsUmVvcmRlckNvbXBvbmVudCxcbiAgUmVvcmRlckRpYWxvZ0NvbXBvbmVudCxcbiAgTXlBY2NvdW50VjJPcmRlckRldGFpbHNBY3Rpb25zQ29tcG9uZW50LFxuICBNeUFjY291bnRWMkNvbnNpZ25tZW50VHJhY2tpbmdDb21wb25lbnQsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ2FyZE1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBGZWF0dXJlc0NvbmZpZ01vZHVsZSxcbiAgICBQcm9tb3Rpb25zTW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBTcGlubmVyTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBPdXRsZXRNb2R1bGUsXG4gICAgQWRkVG9DYXJ0TW9kdWxlLFxuICAgIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gICAgSWNvbk1vZHVsZSxcbiAgICBNeUFjY291bnRWMkRvd25sb2FkSW52b2ljZXNNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWcgfCBGZWF0dXJlc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIEFjY291bnRPcmRlckRldGFpbHNBY3Rpb25zQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlckRldGFpbEFjdGlvbnNDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQXV0aEd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgICAgQWNjb3VudE9yZGVyRGV0YWlsc0l0ZW1zQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlckRldGFpbEl0ZW1zQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZF0sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZW5hYmxlQWRkVG9DYXJ0OiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIEFjY291bnRPcmRlckRldGFpbHNHcm91cGVkSXRlbXNDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyRGV0YWlsSXRlbXNDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQXV0aEd1YXJkXSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBlbmFibGVBZGRUb0NhcnQ6IHRydWUsXG4gICAgICAgICAgICBncm91cENhcnRJdGVtczogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBBY2NvdW50T3JkZXJEZXRhaWxzVG90YWxzQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlckRldGFpbFRvdGFsc0NvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtBdXRoR3VhcmRdLFxuICAgICAgICB9LFxuICAgICAgICBBY2NvdW50T3JkZXJEZXRhaWxzT3ZlcnZpZXdDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyT3ZlcnZpZXdDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQXV0aEd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgICAgQWNjb3VudE9yZGVyRGV0YWlsc1NpbXBsZU92ZXJ2aWV3Q29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlck92ZXJ2aWV3Q29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZF0sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgc2ltcGxlOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIEFjY291bnRPcmRlckRldGFpbHNSZW9yZGVyQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlckRldGFpbFJlb3JkZXJDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQXV0aEd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBmZWF0dXJlczoge1xuICAgICAgICBjb25zaWdubWVudFRyYWNraW5nOiAnMS4yJyxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdENvbnNpZ25tZW50VHJhY2tpbmdMYXlvdXRDb25maWcpLFxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRSZW9yZGVyTGF5b3V0Q29uZmlnKSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkoKCkgPT5cbiAgICAgIGluamVjdChVU0VfTVlfQUNDT1VOVF9WMl9PUkRFUikgPyBteUFjY291bnRWMkNtc01hcHBpbmcgOiB7fVxuICAgICksXG4gICAge1xuICAgICAgcHJvdmlkZTogTU9EVUxFX0lOSVRJQUxJWkVSLFxuICAgICAgdXNlRmFjdG9yeTogcmVnaXN0ZXJPcmRlck91dGxldEZhY3RvcnksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFsuLi5tb2R1bGVDb21wb25lbnRzXSxcbiAgZXhwb3J0czogWy4uLm1vZHVsZUNvbXBvbmVudHNdLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlckRldGFpbHNNb2R1bGUge31cbiJdfQ==