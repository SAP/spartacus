/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CART_BASE_FEATURE, ORDER_ENTRIES_CONTEXT, } from '@spartacus/cart/base/root';
import { AuthGuard, provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { defaultOrderRoutingConfig } from './config/default-order-routing-config';
import { ORDER_CORE_FEATURE, ORDER_FEATURE } from './feature-name';
import { OrderConfirmationOrderEntriesContextToken, OrderDetailsOrderEntriesContextToken, } from './tokens/context';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultOrderComponentsConfig() {
    const config = {
        featureModules: {
            [ORDER_FEATURE]: {
                cmsComponents: [
                    'CancelOrderComponent',
                    'CancelOrderConfirmationComponent',
                    'ReturnOrderComponent',
                    'ReturnOrderConfirmationComponent',
                    'AccountOrderDetailsActionsComponent',
                    'AccountOrderDetailsItemsComponent',
                    'AccountOrderDetailsTotalsComponent',
                    'AccountOrderDetailsOverviewComponent',
                    'AccountOrderDetailsBillingComponent',
                    'AccountOrderDetailsGroupedItemsComponent',
                    'AccountOrderDetailsSimpleOverviewComponent',
                    'AccountOrderHistoryComponent',
                    'ReplenishmentDetailItemsComponent',
                    'AccountOrderDetailsReorderComponent',
                    'ReplenishmentDetailTotalsComponent',
                    'ReplenishmentDetailShippingComponent',
                    'ReplenishmentDetailActionsComponent',
                    'ReplenishmentDetailOrderHistoryComponent',
                    'AccountReplenishmentHistoryComponent',
                    'ReturnRequestOverviewComponent',
                    'ReturnRequestItemsComponent',
                    'ReturnRequestTotalsComponent',
                    'OrderReturnRequestListComponent',
                    'OrderConfirmationThankMessageComponent',
                    'OrderConfirmationItemsComponent',
                    'OrderConfirmationTotalsComponent',
                    'OrderConfirmationOverviewComponent',
                    'OrderConfirmationShippingComponent',
                    'OrderConfirmationBillingComponent',
                    'OrderConfirmationContinueButtonComponent',
                    'ReplenishmentConfirmationMessageComponent',
                    'ReplenishmentConfirmationOverviewComponent',
                    'ReplenishmentConfirmationItemsComponent',
                    'ReplenishmentConfirmationTotalsComponent',
                    'MyAccountViewOrderComponent',
                ],
                dependencies: [CART_BASE_FEATURE],
            },
            // by default core is bundled together with components
            [ORDER_CORE_FEATURE]: ORDER_FEATURE,
        },
    };
    return config;
}
export class OrderRootModule {
}
OrderRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderRootModule, imports: [i1.RouterModule] });
OrderRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderRootModule, providers: [
        provideDefaultConfigFactory(defaultOrderComponentsConfig),
        provideDefaultConfig(defaultOrderRoutingConfig),
    ], imports: [RouterModule.forChild([
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: { pageLabel: 'order', cxRoute: 'orderGuest' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'orderDetails',
                    cxContext: {
                        [ORDER_ENTRIES_CONTEXT]: OrderDetailsOrderEntriesContextToken,
                    },
                },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'orderCancel' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'orderCancelConfirmation' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'orderReturn' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'orderReturnConfirmation' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'orders' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'replenishmentDetails' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'replenishmentOrders' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'returnRequestDetails' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'orderConfirmation',
                    cxContext: {
                        [ORDER_ENTRIES_CONTEXT]: OrderConfirmationOrderEntriesContextToken,
                    },
                },
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { pageLabel: 'order', cxRoute: 'orderGuest' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'orderDetails',
                                    cxContext: {
                                        [ORDER_ENTRIES_CONTEXT]: OrderDetailsOrderEntriesContextToken,
                                    },
                                },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'orderCancel' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'orderCancelConfirmation' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'orderReturn' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'orderReturnConfirmation' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'orders' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'replenishmentDetails' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'replenishmentOrders' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'returnRequestDetails' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'orderConfirmation',
                                    cxContext: {
                                        [ORDER_ENTRIES_CONTEXT]: OrderConfirmationOrderEntriesContextToken,
                                    },
                                },
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfigFactory(defaultOrderComponentsConfig),
                        provideDefaultConfig(defaultOrderRoutingConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcm9vdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvcm9vdC9vcmRlci1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixxQkFBcUIsR0FDdEIsTUFBTSwyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLEVBQ0wsU0FBUyxFQUVULG9CQUFvQixFQUNwQiwyQkFBMkIsR0FDNUIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25FLE9BQU8sRUFDTCx5Q0FBeUMsRUFDekMsb0NBQW9DLEdBQ3JDLE1BQU0sa0JBQWtCLENBQUM7OztBQUUxQiwyRUFBMkU7QUFDM0UsTUFBTSxVQUFVLDRCQUE0QjtJQUMxQyxNQUFNLE1BQU0sR0FBYztRQUN4QixjQUFjLEVBQUU7WUFDZCxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUNmLGFBQWEsRUFBRTtvQkFDYixzQkFBc0I7b0JBQ3RCLGtDQUFrQztvQkFDbEMsc0JBQXNCO29CQUN0QixrQ0FBa0M7b0JBQ2xDLHFDQUFxQztvQkFDckMsbUNBQW1DO29CQUNuQyxvQ0FBb0M7b0JBQ3BDLHNDQUFzQztvQkFDdEMscUNBQXFDO29CQUNyQywwQ0FBMEM7b0JBQzFDLDRDQUE0QztvQkFDNUMsOEJBQThCO29CQUM5QixtQ0FBbUM7b0JBQ25DLHFDQUFx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QVksQ0FBQztnQ0FDdEMsU0FBUyxFQUFFLG1CQUFtQjtnQ0FDOUIsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFOzZCQUMxQzs0QkFDRDtnQ0FDRSxhQUFhO2dDQUNiLElBQUksRUFBRSxJQUFJO2dDQUNWLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUM7Z0NBQ3RDLFNBQVMsRUFBRSxtQkFBbUI7Z0NBQzlCLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRTs2QkFDekM7NEJBQ0Q7Z0NBQ0UsYUFBYTtnQ0FDYixJQUFJLEVBQUUsSUFBSTtnQ0FDVixXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO2dDQUN0QyxTQUFTLEVBQUUsbUJBQW1CO2dDQUM5QixJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUU7NkJBQzFDOzRCQUNEO2dDQUNFLGFBQWE7Z0NBQ2IsSUFBSSxFQUFFLElBQUk7Z0NBQ1YsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDO2dDQUMzQixTQUFTLEVBQUUsbUJBQW1CO2dDQUM5QixJQUFJLEVBQUU7b0NBQ0osT0FBTyxFQUFFLG1CQUFtQjtvQ0FDNUIsU0FBUyxFQUFFO3dDQUNULENBQUMscUJBQXFCLENBQUMsRUFBRSx5Q0FBeUM7cUNBQ25FO2lDQUNGOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULDJCQUEyQixDQUFDLDRCQUE0QixDQUFDO3dCQUN6RCxvQkFBb0IsQ0FBQyx5QkFBeUIsQ0FBQztxQkFDaEQ7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIENBUlRfQkFTRV9GRUFUVVJFLFxuICBPUkRFUl9FTlRSSUVTX0NPTlRFWFQsXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQXV0aEd1YXJkLFxuICBDbXNDb25maWcsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnksXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDbXNQYWdlR3VhcmQsIFBhZ2VMYXlvdXRDb21wb25lbnQgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgZGVmYXVsdE9yZGVyUm91dGluZ0NvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtb3JkZXItcm91dGluZy1jb25maWcnO1xuaW1wb3J0IHsgT1JERVJfQ09SRV9GRUFUVVJFLCBPUkRFUl9GRUFUVVJFIH0gZnJvbSAnLi9mZWF0dXJlLW5hbWUnO1xuaW1wb3J0IHtcbiAgT3JkZXJDb25maXJtYXRpb25PcmRlckVudHJpZXNDb250ZXh0VG9rZW4sXG4gIE9yZGVyRGV0YWlsc09yZGVyRW50cmllc0NvbnRleHRUb2tlbixcbn0gZnJvbSAnLi90b2tlbnMvY29udGV4dCc7XG5cbi8vIFRPRE86IElubGluZSB0aGlzIGZhY3Rvcnkgd2hlbiB3ZSBzdGFydCByZWxlYXNpbmcgSXZ5IGNvbXBpbGVkIGxpYnJhcmllc1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRPcmRlckNvbXBvbmVudHNDb25maWcoKTogQ21zQ29uZmlnIHtcbiAgY29uc3QgY29uZmlnOiBDbXNDb25maWcgPSB7XG4gICAgZmVhdHVyZU1vZHVsZXM6IHtcbiAgICAgIFtPUkRFUl9GRUFUVVJFXToge1xuICAgICAgICBjbXNDb21wb25lbnRzOiBbXG4gICAgICAgICAgJ0NhbmNlbE9yZGVyQ29tcG9uZW50JyxcbiAgICAgICAgICAnQ2FuY2VsT3JkZXJDb25maXJtYXRpb25Db21wb25lbnQnLFxuICAgICAgICAgICdSZXR1cm5PcmRlckNvbXBvbmVudCcsXG4gICAgICAgICAgJ1JldHVybk9yZGVyQ29uZmlybWF0aW9uQ29tcG9uZW50JyxcbiAgICAgICAgICAnQWNjb3VudE9yZGVyRGV0YWlsc0FjdGlvbnNDb21wb25lbnQnLFxuICAgICAgICAgICdBY2NvdW50T3JkZXJEZXRhaWxzSXRlbXNDb21wb25lbnQnLFxuICAgICAgICAgICdBY2NvdW50T3JkZXJEZXRhaWxzVG90YWxzQ29tcG9uZW50JyxcbiAgICAgICAgICAnQWNjb3VudE9yZGVyRGV0YWlsc092ZXJ2aWV3Q29tcG9uZW50JyxcbiAgICAgICAgICAnQWNjb3VudE9yZGVyRGV0YWlsc0JpbGxpbmdDb21wb25lbnQnLFxuICAgICAgICAgICdBY2NvdW50T3JkZXJEZXRhaWxzR3JvdXBlZEl0ZW1zQ29tcG9uZW50JyxcbiAgICAgICAgICAnQWNjb3VudE9yZGVyRGV0YWlsc1NpbXBsZU92ZXJ2aWV3Q29tcG9uZW50JyxcbiAgICAgICAgICAnQWNjb3VudE9yZGVySGlzdG9yeUNvbXBvbmVudCcsXG4gICAgICAgICAgJ1JlcGxlbmlzaG1lbnREZXRhaWxJdGVtc0NvbXBvbmVudCcsXG4gICAgICAgICAgJ0FjY291bnRPcmRlckRldGFpbHNSZW9yZGVyQ29tcG9uZW50JyxcbiAgICAgICAgICAnUmVwbGVuaXNobWVudERldGFpbFRvdGFsc0NvbXBvbmVudCcsXG4gICAgICAgICAgJ1JlcGxlbmlzaG1lbnREZXRhaWxTaGlwcGluZ0NvbXBvbmVudCcsXG4gICAgICAgICAgJ1JlcGxlbmlzaG1lbnREZXRhaWxBY3Rpb25zQ29tcG9uZW50JyxcbiAgICAgICAgICAnUmVwbGVuaXNobWVudERldGFpbE9yZGVySGlzdG9yeUNvbXBvbmVudCcsXG4gICAgICAgICAgJ0FjY291bnRSZXBsZW5pc2htZW50SGlzdG9yeUNvbXBvbmVudCcsXG4gICAgICAgICAgJ1JldHVyblJlcXVlc3RPdmVydmlld0NvbXBvbmVudCcsXG4gICAgICAgICAgJ1JldHVyblJlcXVlc3RJdGVtc0NvbXBvbmVudCcsXG4gICAgICAgICAgJ1JldHVyblJlcXVlc3RUb3RhbHNDb21wb25lbnQnLFxuICAgICAgICAgICdPcmRlclJldHVyblJlcXVlc3RMaXN0Q29tcG9uZW50JyxcbiAgICAgICAgICAnT3JkZXJDb25maXJtYXRpb25UaGFua01lc3NhZ2VDb21wb25lbnQnLFxuICAgICAgICAgICdPcmRlckNvbmZpcm1hdGlvbkl0ZW1zQ29tcG9uZW50JyxcbiAgICAgICAgICAnT3JkZXJDb25maXJtYXRpb25Ub3RhbHNDb21wb25lbnQnLFxuICAgICAgICAgICdPcmRlckNvbmZpcm1hdGlvbk92ZXJ2aWV3Q29tcG9uZW50JyxcbiAgICAgICAgICAnT3JkZXJDb25maXJtYXRpb25TaGlwcGluZ0NvbXBvbmVudCcsXG4gICAgICAgICAgJ09yZGVyQ29uZmlybWF0aW9uQmlsbGluZ0NvbXBvbmVudCcsXG4gICAgICAgICAgJ09yZGVyQ29uZmlybWF0aW9uQ29udGludWVCdXR0b25Db21wb25lbnQnLFxuICAgICAgICAgICdSZXBsZW5pc2htZW50Q29uZmlybWF0aW9uTWVzc2FnZUNvbXBvbmVudCcsXG4gICAgICAgICAgJ1JlcGxlbmlzaG1lbnRDb25maXJtYXRpb25PdmVydmlld0NvbXBvbmVudCcsXG4gICAgICAgICAgJ1JlcGxlbmlzaG1lbnRDb25maXJtYXRpb25JdGVtc0NvbXBvbmVudCcsXG4gICAgICAgICAgJ1JlcGxlbmlzaG1lbnRDb25maXJtYXRpb25Ub3RhbHNDb21wb25lbnQnLFxuICAgICAgICAgICdNeUFjY291bnRWaWV3T3JkZXJDb21wb25lbnQnLFxuICAgICAgICBdLFxuICAgICAgICBkZXBlbmRlbmNpZXM6IFtDQVJUX0JBU0VfRkVBVFVSRV0sXG4gICAgICB9LFxuICAgICAgLy8gYnkgZGVmYXVsdCBjb3JlIGlzIGJ1bmRsZWQgdG9nZXRoZXIgd2l0aCBjb21wb25lbnRzXG4gICAgICBbT1JERVJfQ09SRV9GRUFUVVJFXTogT1JERVJfRkVBVFVSRSxcbiAgICB9LFxuICB9O1xuICByZXR1cm4gY29uZmlnO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFtcbiAgICAgIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwYXRoOiBudWxsLFxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7IHBhZ2VMYWJlbDogJ29yZGVyJywgY3hSb3V0ZTogJ29yZGVyR3Vlc3QnIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHBhdGg6IG51bGwsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkLCBDbXNQYWdlR3VhcmRdLFxuICAgICAgICBjb21wb25lbnQ6IFBhZ2VMYXlvdXRDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjeFJvdXRlOiAnb3JkZXJEZXRhaWxzJyxcbiAgICAgICAgICBjeENvbnRleHQ6IHtcbiAgICAgICAgICAgIFtPUkRFUl9FTlRSSUVTX0NPTlRFWFRdOiBPcmRlckRldGFpbHNPcmRlckVudHJpZXNDb250ZXh0VG9rZW4sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtDbXNQYWdlR3VhcmRdLFxuICAgICAgICBjb21wb25lbnQ6IFBhZ2VMYXlvdXRDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHsgY3hSb3V0ZTogJ29yZGVyQ2FuY2VsJyB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwYXRoOiBudWxsLFxuICAgICAgICBjYW5BY3RpdmF0ZTogW0Ntc1BhZ2VHdWFyZF0sXG4gICAgICAgIGNvbXBvbmVudDogUGFnZUxheW91dENvbXBvbmVudCxcbiAgICAgICAgZGF0YTogeyBjeFJvdXRlOiAnb3JkZXJDYW5jZWxDb25maXJtYXRpb24nIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHBhdGg6IG51bGwsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7IGN4Um91dGU6ICdvcmRlclJldHVybicgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtDbXNQYWdlR3VhcmRdLFxuICAgICAgICBjb21wb25lbnQ6IFBhZ2VMYXlvdXRDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHsgY3hSb3V0ZTogJ29yZGVyUmV0dXJuQ29uZmlybWF0aW9uJyB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwYXRoOiBudWxsLFxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7IGN4Um91dGU6ICdvcmRlcnMnIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHBhdGg6IG51bGwsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkLCBDbXNQYWdlR3VhcmRdLFxuICAgICAgICBjb21wb25lbnQ6IFBhZ2VMYXlvdXRDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHsgY3hSb3V0ZTogJ3JlcGxlbmlzaG1lbnREZXRhaWxzJyB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwYXRoOiBudWxsLFxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7IGN4Um91dGU6ICdyZXBsZW5pc2htZW50T3JkZXJzJyB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwYXRoOiBudWxsLFxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7IGN4Um91dGU6ICdyZXR1cm5SZXF1ZXN0RGV0YWlscycgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtDbXNQYWdlR3VhcmRdLFxuICAgICAgICBjb21wb25lbnQ6IFBhZ2VMYXlvdXRDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjeFJvdXRlOiAnb3JkZXJDb25maXJtYXRpb24nLFxuICAgICAgICAgIGN4Q29udGV4dDoge1xuICAgICAgICAgICAgW09SREVSX0VOVFJJRVNfQ09OVEVYVF06IE9yZGVyQ29uZmlybWF0aW9uT3JkZXJFbnRyaWVzQ29udGV4dFRva2VuLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0pLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkoZGVmYXVsdE9yZGVyQ29tcG9uZW50c0NvbmZpZyksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdE9yZGVyUm91dGluZ0NvbmZpZyksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyUm9vdE1vZHVsZSB7fVxuIl19