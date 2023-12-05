import { CxEvent, facadeFactory, provideDefaultConfigFactory, provideDefaultConfig, AuthGuard } from '@spartacus/core';
import * as i0 from '@angular/core';
import { Injectable, InjectionToken, NgModule } from '@angular/core';
import { CmsPageGuard, PageLayoutComponent, getAddressNumbers } from '@spartacus/storefront';
import * as i1 from '@angular/router';
import { RouterModule } from '@angular/router';
import { CART_BASE_FEATURE, ORDER_ENTRIES_CONTEXT } from '@spartacus/cart/base/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * An abstract event for all the order events.
 */
class OrderEvent extends CxEvent {
}
/**
 * Indicates that a user has successfully placed an order.
 */
class OrderPlacedEvent extends OrderEvent {
}
/**
 * Event's type
 */
OrderPlacedEvent.type = 'OrderPlacedEvent';
/**
 * Indicates that a user has successfully placed scheduled an order.
 */
class ReplenishmentOrderScheduledEvent extends OrderEvent {
}
/**
 * Event's type
 */
ReplenishmentOrderScheduledEvent.type = 'ReplenishmentOrderScheduledEvent';
/**
 * Indicates that a user has click on 'Download Invoices' button on Order details page
 */
class DownloadOrderInvoicesEvent extends CxEvent {
}
/**
 * Event's type
 */
DownloadOrderInvoicesEvent.type = 'DownloadOrderInvoicesEvent';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ORDER_FEATURE = 'order';
const ORDER_CORE_FEATURE = 'orderCore';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function orderHistoryFacadeFactory() {
    return facadeFactory({
        facade: OrderHistoryFacade,
        feature: ORDER_CORE_FEATURE,
        methods: [
            'getOrderDetails',
            'loadOrderDetails',
            'clearOrderDetails',
            'getOrderHistoryList',
            'getOrderHistoryListLoaded',
            'loadOrderList',
            'clearOrderList',
            'getConsignmentTracking',
            'loadConsignmentTracking',
            'clearConsignmentTracking',
            'cancelOrder',
            'getCancelOrderLoading',
            'getCancelOrderSuccess',
            'resetCancelOrderProcessState',
            'getOrderDetailsLoading',
        ],
        async: true,
    });
}
class OrderHistoryFacade {
}
OrderHistoryFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderHistoryFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OrderHistoryFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderHistoryFacade, providedIn: 'root', useFactory: orderHistoryFacadeFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderHistoryFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: orderHistoryFacadeFactory,
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function orderReturnRequestFacadeFactory() {
    return facadeFactory({
        facade: OrderReturnRequestFacade,
        feature: ORDER_CORE_FEATURE,
        methods: [
            'createOrderReturnRequest',
            'getOrderReturnRequest',
            'getOrderReturnRequestList',
            'loadOrderReturnRequestDetail',
            'loadOrderReturnRequestList',
            'clearOrderReturnRequestList',
            'getReturnRequestLoading',
            'getReturnRequestSuccess',
            'clearOrderReturnRequestDetail',
            'cancelOrderReturnRequest',
            'getCancelReturnRequestLoading',
            'getCancelReturnRequestSuccess',
            'resetCancelReturnRequestProcessState',
        ],
        async: true,
    });
}
class OrderReturnRequestFacade {
}
OrderReturnRequestFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnRequestFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OrderReturnRequestFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnRequestFacade, providedIn: 'root', useFactory: orderReturnRequestFacadeFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnRequestFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: orderReturnRequestFacadeFactory,
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderFacade {
}
OrderFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OrderFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: OrderFacade,
        feature: ORDER_CORE_FEATURE,
        methods: [
            'getOrderDetails',
            'clearPlacedOrder',
            'setPlacedOrder',
            'placeOrder',
            'getPickupEntries',
            'getDeliveryEntries',
        ],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: OrderFacade,
                        feature: ORDER_CORE_FEATURE,
                        methods: [
                            'getOrderDetails',
                            'clearPlacedOrder',
                            'setPlacedOrder',
                            'placeOrder',
                            'getPickupEntries',
                            'getDeliveryEntries',
                        ],
                    }),
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReorderOrderFacade {
}
ReorderOrderFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReorderOrderFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ReorderOrderFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReorderOrderFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: ReorderOrderFacade,
        feature: ORDER_CORE_FEATURE,
        methods: ['reorder'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReorderOrderFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: ReorderOrderFacade,
                        feature: ORDER_CORE_FEATURE,
                        methods: ['reorder'],
                    }),
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function replenishmentOrderHistoryFacadeFactory() {
    return facadeFactory({
        facade: ReplenishmentOrderHistoryFacade,
        feature: ORDER_CORE_FEATURE,
        methods: [
            'loadReplenishmentOrderDetails',
            'getReplenishmentOrderDetails',
            'getReplenishmentOrderDetailsLoading',
            'getReplenishmentOrderDetailsSuccess',
            'getReplenishmentOrderDetailsError',
            'clearReplenishmentOrderDetails',
            'cancelReplenishmentOrder',
            'getCancelReplenishmentOrderLoading',
            'getCancelReplenishmentOrderSuccess',
            'getCancelReplenishmentOrderError',
            'clearCancelReplenishmentOrderProcessState',
            'getReplenishmentOrderHistoryList',
            'getReplenishmentOrderHistoryListLoading',
            'getReplenishmentOrderHistoryListError',
            'getReplenishmentOrderHistoryListSuccess',
            'loadReplenishmentOrderList',
            'clearReplenishmentOrderList',
        ],
        async: true,
    });
}
class ReplenishmentOrderHistoryFacade {
}
ReplenishmentOrderHistoryFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ReplenishmentOrderHistoryFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryFacade, providedIn: 'root', useFactory: replenishmentOrderHistoryFacadeFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: replenishmentOrderHistoryFacadeFactory,
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ScheduledReplenishmentOrderFacade {
}
ScheduledReplenishmentOrderFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduledReplenishmentOrderFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ScheduledReplenishmentOrderFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduledReplenishmentOrderFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: ScheduledReplenishmentOrderFacade,
        feature: ORDER_CORE_FEATURE,
        methods: ['scheduleReplenishmentOrder'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduledReplenishmentOrderFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: ScheduledReplenishmentOrderFacade,
                        feature: ORDER_CORE_FEATURE,
                        methods: ['scheduleReplenishmentOrder'],
                    }),
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Identifiers of outlets for the order consignment.
 */
var OrderOutlets;
(function (OrderOutlets) {
    OrderOutlets["ORDER_CONSIGNMENT"] = "cx-order-consignment";
    OrderOutlets["CONSIGNMENT_DELIVERY_INFO"] = "cx-order-consignment-delivery-info";
})(OrderOutlets || (OrderOutlets = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const recurrencePeriod = {
    DAILY: 'DAILY',
    WEEKLY: 'WEEKLY',
    MONTHLY: 'MONTHLY',
};
var DaysOfWeek;
(function (DaysOfWeek) {
    DaysOfWeek["MONDAY"] = "MONDAY";
    DaysOfWeek["TUESDAY"] = "TUESDAY";
    DaysOfWeek["WEDNESDAY"] = "WEDNESDAY";
    DaysOfWeek["THURSDAY"] = "THURSDAY";
    DaysOfWeek["FRIDAY"] = "FRIDAY";
    DaysOfWeek["SATURDAY"] = "SATURDAY";
    DaysOfWeek["SUNDAY"] = "SUNDAY";
})(DaysOfWeek || (DaysOfWeek = {}));
var ORDER_TYPE;
(function (ORDER_TYPE) {
    ORDER_TYPE["PLACE_ORDER"] = "PLACE_ORDER";
    ORDER_TYPE["SCHEDULE_REPLENISHMENT_ORDER"] = "SCHEDULE_REPLENISHMENT_ORDER";
})(ORDER_TYPE || (ORDER_TYPE = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultOrderRoutingConfig = {
    routing: {
        routes: {
            orders: {
                paths: ['my-account/orders'],
            },
            orderDetails: {
                paths: ['my-account/order/:orderCode'],
                paramsMapping: { orderCode: 'code' },
            },
            orderGuest: {
                paths: ['guest/order/:orderCode'],
                paramsMapping: { orderCode: 'code' },
            },
            orderReturn: {
                paths: ['my-account/order/return/:orderCode'],
                paramsMapping: { orderCode: 'code' },
            },
            orderReturnConfirmation: {
                paths: ['my-account/order/return/confirmation/:orderCode'],
                paramsMapping: { orderCode: 'code' },
            },
            orderCancel: {
                paths: ['my-account/order/cancel/:orderCode'],
                paramsMapping: { orderCode: 'code' },
            },
            orderCancelConfirmation: {
                paths: ['my-account/order/cancel/confirmation/:orderCode'],
                paramsMapping: { orderCode: 'code' },
            },
            returnRequestDetails: {
                paths: ['my-account/return-request/:returnCode'],
                paramsMapping: { returnCode: 'rma' },
            },
            replenishmentOrders: {
                paths: ['my-account/my-replenishments'],
            },
            replenishmentDetails: {
                paths: ['my-account/my-replenishment/:replenishmentOrderCode'],
                paramsMapping: { replenishmentOrderCode: 'replenishmentOrderCode' },
            },
            replenishmentConfirmation: { paths: ['replenishment/confirmation'] },
            orderConfirmation: { paths: ['order-confirmation'] },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const OrderDetailsOrderEntriesContextToken = new InjectionToken('OrderDetailsOrderEntriesContext');
const OrderConfirmationOrderEntriesContextToken = new InjectionToken('OrderConfirmationOrderEntriesContext');
const USE_MY_ACCOUNT_V2_ORDER = new InjectionToken('feature flag to enable enhanced UI for Order related pages under My-Account', { providedIn: 'root', factory: () => false });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// TODO: Inline this factory when we start releasing Ivy compiled libraries
function defaultOrderComponentsConfig() {
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
class OrderRootModule {
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ORDER_NORMALIZER = new InjectionToken('OrderNormalizer');
const REPLENISHMENT_ORDER_NORMALIZER = new InjectionToken('ReplenishmentOrderNormalizer');
const REORDER_ORDER_NORMALIZER = new InjectionToken('ReorderOrderNormalizer');
const ORDER_HISTORY_NORMALIZER = new InjectionToken('OrderHistoryNormalizer');
const CONSIGNMENT_TRACKING_NORMALIZER = new InjectionToken('ConsignmentTrackingNormalizer');
const ORDER_RETURN_REQUEST_NORMALIZER = new InjectionToken('OrderReturnRequestNormalizer');
const ORDER_RETURN_REQUEST_INPUT_SERIALIZER = new InjectionToken('OrderReturnRequestInputSerializer');
const ORDER_RETURNS_NORMALIZER = new InjectionToken('OrderReturnsNormalizer');
const REPLENISHMENT_ORDER_HISTORY_NORMALIZER = new InjectionToken('ReplenishmentOrderHistoryNormalizer');
const REPLENISHMENT_ORDER_FORM_SERIALIZER = new InjectionToken('ReplenishmentOrderFormSerializer');

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Get card for delivery address
 */
function deliveryAddressCard(textTitle, textPhone, textMobile, deliveryAddress, countryName) {
    var _a;
    if (!countryName) {
        countryName = (_a = deliveryAddress === null || deliveryAddress === void 0 ? void 0 : deliveryAddress.country) === null || _a === void 0 ? void 0 : _a.name;
    }
    let region = '';
    if (deliveryAddress &&
        deliveryAddress.region &&
        deliveryAddress.region.isocode) {
        region = deliveryAddress.region.isocode + ', ';
    }
    const numbers = getAddressNumbers(deliveryAddress, textPhone, textMobile);
    let fullName;
    if (deliveryAddress.firstName && deliveryAddress.lastName) {
        fullName = deliveryAddress.firstName + ' ' + deliveryAddress.lastName;
    }
    else if (deliveryAddress.firstName) {
        fullName = deliveryAddress.firstName;
    }
    else if (deliveryAddress.lastName) {
        fullName = deliveryAddress.lastName;
    }
    return {
        title: textTitle,
        textBold: fullName,
        text: [
            deliveryAddress.line1,
            deliveryAddress.line2,
            deliveryAddress.town + ', ' + region + countryName,
            deliveryAddress.postalCode,
            numbers,
        ],
    };
}
/**
 * Get card for delivery mode
 */
function deliveryModeCard(textTitle, deliveryMode) {
    var _a, _b;
    return {
        title: textTitle,
        textBold: deliveryMode.name,
        text: [
            deliveryMode.description,
            ((_a = deliveryMode.deliveryCost) === null || _a === void 0 ? void 0 : _a.formattedValue)
                ? (_b = deliveryMode.deliveryCost) === null || _b === void 0 ? void 0 : _b.formattedValue
                : '',
        ],
    };
}
/**
 * Get card for payment method
 */
function paymentMethodCard(textTitle, textExpires, paymentDetails) {
    var _a;
    return {
        title: textTitle,
        text: [
            (_a = paymentDetails.cardType) === null || _a === void 0 ? void 0 : _a.name,
            paymentDetails.accountHolderName,
            paymentDetails.cardNumber,
            textExpires,
        ],
    };
}
/**
 * Get card for billing address
 */
function billingAddressCard(textTitle, textBillTo, paymentDetails) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const region = ((_b = (_a = paymentDetails.billingAddress) === null || _a === void 0 ? void 0 : _a.region) === null || _b === void 0 ? void 0 : _b.isocode)
        ? ((_d = (_c = paymentDetails.billingAddress) === null || _c === void 0 ? void 0 : _c.region) === null || _d === void 0 ? void 0 : _d.isocode) + ', '
        : '';
    return {
        title: textTitle,
        text: [
            textBillTo,
            ((_e = paymentDetails.billingAddress) === null || _e === void 0 ? void 0 : _e.firstName) +
                ' ' +
                ((_f = paymentDetails.billingAddress) === null || _f === void 0 ? void 0 : _f.lastName),
            (_g = paymentDetails.billingAddress) === null || _g === void 0 ? void 0 : _g.line1,
            ((_h = paymentDetails.billingAddress) === null || _h === void 0 ? void 0 : _h.town) +
                ', ' +
                region +
                ((_k = (_j = paymentDetails.billingAddress) === null || _j === void 0 ? void 0 : _j.country) === null || _k === void 0 ? void 0 : _k.isocode),
            (_l = paymentDetails.billingAddress) === null || _l === void 0 ? void 0 : _l.postalCode,
        ],
    };
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/** AUGMENTABLE_TYPES_END */

/**
 * Generated bundle index. Do not edit.
 */

export { CONSIGNMENT_TRACKING_NORMALIZER, DaysOfWeek, DownloadOrderInvoicesEvent, ORDER_CORE_FEATURE, ORDER_FEATURE, ORDER_HISTORY_NORMALIZER, ORDER_NORMALIZER, ORDER_RETURNS_NORMALIZER, ORDER_RETURN_REQUEST_INPUT_SERIALIZER, ORDER_RETURN_REQUEST_NORMALIZER, ORDER_TYPE, OrderConfirmationOrderEntriesContextToken, OrderDetailsOrderEntriesContextToken, OrderEvent, OrderFacade, OrderHistoryFacade, OrderOutlets, OrderPlacedEvent, OrderReturnRequestFacade, OrderRootModule, REORDER_ORDER_NORMALIZER, REPLENISHMENT_ORDER_FORM_SERIALIZER, REPLENISHMENT_ORDER_HISTORY_NORMALIZER, REPLENISHMENT_ORDER_NORMALIZER, ReorderOrderFacade, ReplenishmentOrderHistoryFacade, ReplenishmentOrderScheduledEvent, ScheduledReplenishmentOrderFacade, USE_MY_ACCOUNT_V2_ORDER, billingAddressCard, defaultOrderComponentsConfig, deliveryAddressCard, deliveryModeCard, orderHistoryFacadeFactory, orderReturnRequestFacadeFactory, paymentMethodCard, recurrencePeriod, replenishmentOrderHistoryFacadeFactory };
//# sourceMappingURL=spartacus-order-root.mjs.map
