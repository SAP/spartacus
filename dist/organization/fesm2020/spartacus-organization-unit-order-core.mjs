import * as i0 from '@angular/core';
import { Injectable, inject, InjectionToken, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { B2BUserRight, B2BUserRole, GlobalMessageType, StateUtils, LoggerService, normalizeHttpError, SiteContextActions } from '@spartacus/core';
import { filter, map, switchMap, catchError, tap } from 'rxjs/operators';
import * as i1 from '@spartacus/user/account/root';
import * as i1$2 from '@ngrx/store';
import { createFeatureSelector, createSelector, select, StoreModule } from '@ngrx/store';
import * as i1$1 from '@ngrx/effects';
import { createEffect, ofType, EffectsModule } from '@ngrx/effects';
import { of } from 'rxjs';
import { UnitOrderFacade } from '@spartacus/organization/unit-order/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitOrderAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitOrderConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    getUnitOrderHistory(userId, pageSize, currentPage, filters, sort) {
        return this.adapter.loadUnitOrderHistory(userId, pageSize, currentPage, filters, sort);
    }
    getUnitOrderDetail(userId, orderCode) {
        return this.adapter.loadUnitOrderDetail(userId, orderCode);
    }
}
UnitOrderConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderConnector, deps: [{ token: UnitOrderAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
UnitOrderConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: UnitOrderAdapter }]; } });

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
class UnitLevelOrdersViewerGuard {
    constructor(userAccountFacade, routingService, globalMessageService) {
        this.userAccountFacade = userAccountFacade;
        this.routingService = routingService;
        this.globalMessageService = globalMessageService;
    }
    canActivate() {
        return this.userAccountFacade.get().pipe(filter((user) => !!user && Object.keys(user).length > 0), map((user) => user.roles), map((roles) => {
            const hasRole = Array.isArray(roles) &&
                (roles.includes(B2BUserRight.UNITORDERVIEWER) ||
                    roles.includes(B2BUserRole.ADMIN));
            if (!hasRole) {
                this.routingService.go({ cxRoute: 'home' });
                this.globalMessageService.add({
                    key: 'organization.notification.noSufficientPermissions',
                }, GlobalMessageType.MSG_TYPE_WARNING);
            }
            return hasRole;
        }));
    }
}
UnitLevelOrdersViewerGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrdersViewerGuard, deps: [{ token: i1.UserAccountFacade }, { token: i2.RoutingService }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitLevelOrdersViewerGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrdersViewerGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrdersViewerGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.UserAccountFacade }, { type: i2.RoutingService }, { type: i2.GlobalMessageService }]; } });

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
const UNIT_ORDER_FEATURE = 'unit order';
const UNIT_ORDERS = '[Unit Order] Unit Orders';
const UNIT_ORDER_DETAILS = '[Unit Order] Order Details';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const LOAD_UNIT_ORDERS = '[Unit Order] Load Unit Orders';
const LOAD_UNIT_ORDERS_FAIL = '[Unit Order] Load Unit Orders Fail';
const LOAD_UNIT_ORDERS_SUCCESS = '[Unit Order] Load Unit Orders Success';
const CLEAR_UNIT_ORDERS = '[Unit Order] Clear Unit Orders';
const LOAD_ORDER_DETAILS = '[Unit Order] Load Unit Order Details';
const LOAD_ORDER_DETAILS_FAIL = '[Unit Order] Load Unit Order Details Fail';
const LOAD_ORDER_DETAILS_SUCCESS = '[Unit Order] Load Unit Order Details Success';
const CLEAR_ORDER_DETAILS = '[Unit Order] Clear Unit Order Details';
class LoadUnitOrders extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(UNIT_ORDERS);
        this.payload = payload;
        this.type = LOAD_UNIT_ORDERS;
    }
}
class LoadUnitOrdersFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(UNIT_ORDERS, payload);
        this.payload = payload;
        this.type = LOAD_UNIT_ORDERS_FAIL;
    }
}
class LoadUnitOrdersSuccess extends StateUtils.LoaderSuccessAction {
    constructor(payload) {
        super(UNIT_ORDERS);
        this.payload = payload;
        this.type = LOAD_UNIT_ORDERS_SUCCESS;
    }
}
class ClearUnitOrders extends StateUtils.LoaderResetAction {
    constructor() {
        super(UNIT_ORDERS);
        this.type = CLEAR_UNIT_ORDERS;
    }
}
class LoadOrderDetails extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(UNIT_ORDER_DETAILS);
        this.payload = payload;
        this.type = LOAD_ORDER_DETAILS;
    }
}
class LoadOrderDetailsFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(UNIT_ORDER_DETAILS, payload);
        this.payload = payload;
        this.type = LOAD_ORDER_DETAILS_FAIL;
    }
}
class LoadOrderDetailsSuccess extends StateUtils.LoaderSuccessAction {
    constructor(payload) {
        super(UNIT_ORDER_DETAILS);
        this.payload = payload;
        this.type = LOAD_ORDER_DETAILS_SUCCESS;
    }
}
class ClearOrderDetails extends StateUtils.LoaderResetAction {
    constructor() {
        super(UNIT_ORDER_DETAILS);
        this.type = CLEAR_ORDER_DETAILS;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

var unitOrderGroup_actions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CLEAR_ORDER_DETAILS: CLEAR_ORDER_DETAILS,
    CLEAR_UNIT_ORDERS: CLEAR_UNIT_ORDERS,
    ClearOrderDetails: ClearOrderDetails,
    ClearUnitOrders: ClearUnitOrders,
    LOAD_ORDER_DETAILS: LOAD_ORDER_DETAILS,
    LOAD_ORDER_DETAILS_FAIL: LOAD_ORDER_DETAILS_FAIL,
    LOAD_ORDER_DETAILS_SUCCESS: LOAD_ORDER_DETAILS_SUCCESS,
    LOAD_UNIT_ORDERS: LOAD_UNIT_ORDERS,
    LOAD_UNIT_ORDERS_FAIL: LOAD_UNIT_ORDERS_FAIL,
    LOAD_UNIT_ORDERS_SUCCESS: LOAD_UNIT_ORDERS_SUCCESS,
    LoadOrderDetails: LoadOrderDetails,
    LoadOrderDetailsFail: LoadOrderDetailsFail,
    LoadOrderDetailsSuccess: LoadOrderDetailsSuccess,
    LoadUnitOrders: LoadUnitOrders,
    LoadUnitOrdersFail: LoadUnitOrdersFail,
    LoadUnitOrdersSuccess: LoadUnitOrdersSuccess
});

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
class UnitOrderEffect {
    constructor(actions$, orderConnector) {
        this.actions$ = actions$;
        this.orderConnector = orderConnector;
        this.logger = inject(LoggerService);
        this.loadUnitOrders$ = createEffect(() => this.actions$.pipe(ofType(LOAD_UNIT_ORDERS), map((action) => action.payload), switchMap((payload) => {
            return this.orderConnector
                .getUnitOrderHistory(payload.userId, payload.pageSize, payload.currentPage, payload.filters, payload.sort)
                .pipe(map((orders) => {
                return new LoadUnitOrdersSuccess(orders);
            }), catchError((error) => of(new LoadUnitOrdersFail(normalizeHttpError(error, this.logger)))));
        })));
        this.resetUserOrders$ = createEffect(() => this.actions$.pipe(ofType(SiteContextActions.LANGUAGE_CHANGE), map(() => {
            return new ClearUnitOrders();
        })));
        this.loadOrderDetails$ = createEffect(() => this.actions$.pipe(ofType(LOAD_ORDER_DETAILS), map((action) => action.payload), switchMap((payload) => {
            return this.orderConnector
                .getUnitOrderDetail(payload.userId, payload.orderCode)
                .pipe(map((order) => {
                return new LoadOrderDetailsSuccess(order);
            }), catchError((error) => of(new LoadOrderDetailsFail(normalizeHttpError(error, this.logger)))));
        })));
    }
}
UnitOrderEffect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderEffect, deps: [{ token: i1$1.Actions }, { token: UnitOrderConnector }], target: i0.ɵɵFactoryTarget.Injectable });
UnitOrderEffect.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderEffect });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderEffect, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Actions }, { type: UnitOrderConnector }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const effects = [UnitOrderEffect];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialState = {
    orders: [],
    pagination: {},
    sorts: [],
};
const detailInitialState = {};
function historyReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_UNIT_ORDERS_SUCCESS: {
            return action.payload ? action.payload : initialState;
        }
        case LOAD_UNIT_ORDERS_FAIL: {
            return initialState;
        }
    }
    return state;
}
function detailReducer(state = detailInitialState, action) {
    switch (action.type) {
        case LOAD_ORDER_DETAILS_SUCCESS: {
            const order = action.payload;
            return order;
        }
        case LOAD_ORDER_DETAILS_FAIL:
        case LOAD_ORDER_DETAILS: {
            return detailInitialState;
        }
    }
    return state;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function getReducers() {
    return {
        orders: StateUtils.loaderReducer(UNIT_ORDERS, historyReducer),
        orderDetail: StateUtils.loaderReducer(UNIT_ORDER_DETAILS, detailReducer),
    };
}
const reducerToken = new InjectionToken('UnitOrderReducers');
const reducerProvider = {
    provide: reducerToken,
    useFactory: getReducers,
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getOrderState = createFeatureSelector(UNIT_ORDER_FEATURE);

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getOrdersState = createSelector(getOrderState, (state) => state.orders);
const getOrdersLoaded = createSelector(getOrdersState, (state) => StateUtils.loaderSuccessSelector(state));
const getOrders = createSelector(getOrdersState, (state) => StateUtils.loaderValueSelector(state));
const getOrderDetailState = createSelector(getOrderState, (state) => state.orderDetail);
const getOrderDetails = createSelector(getOrderDetailState, (state) => StateUtils.loaderValueSelector(state));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

var unitOrderGroup_selectors = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getOrderDetailState: getOrderDetailState,
    getOrderDetails: getOrderDetails,
    getOrderState: getOrderState,
    getOrders: getOrders,
    getOrdersLoaded: getOrdersLoaded,
    getOrdersState: getOrdersState
});

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
class UnitOrderService {
    constructor(store, userIdService, routingService) {
        this.store = store;
        this.userIdService = userIdService;
        this.routingService = routingService;
    }
    /**
     * Returns order history list
     */
    getOrderHistoryList(pageSize) {
        return this.store.pipe(select(getOrdersState), tap((orderListState) => {
            const attemptedLoad = orderListState.loading ||
                orderListState.success ||
                orderListState.error;
            if (!attemptedLoad) {
                this.loadOrderList(pageSize);
            }
        }), map((orderListState) => orderListState.value));
    }
    /**
     * Returns a loaded flag for order history list
     */
    getOrderHistoryListLoaded() {
        return this.store.pipe(select(getOrdersLoaded));
    }
    /**
     * Retrieves an order list
     * @param pageSize page size
     * @param currentPage current page
     * @param sort sort
     */
    loadOrderList(pageSize, currentPage, filters, sort) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                this.store.dispatch(new LoadUnitOrders({
                    userId,
                    pageSize,
                    currentPage,
                    filters,
                    sort,
                }));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Cleaning order list
     */
    clearOrderList() {
        this.store.dispatch(new ClearUnitOrders());
    }
    /**
     * Returns an order's detail
     */
    getOrderDetails() {
        return this.store.pipe(select(getOrderDetails));
    }
    /**
     * Retrieves order's details
     *
     * @param orderCode an order code
     */
    loadOrderDetails(orderCode) {
        this.userIdService.takeUserId().subscribe((userId) => {
            this.store.dispatch(new LoadOrderDetails({
                userId,
                orderCode,
            }));
        });
    }
    /**
     * Clears order's details
     */
    clearOrderDetails() {
        this.store.dispatch(new ClearOrderDetails());
    }
}
UnitOrderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderService, deps: [{ token: i1$2.Store }, { token: i2.UserIdService }, { token: i2.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitOrderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$2.Store }, { type: i2.UserIdService }, { type: i2.RoutingService }]; } });

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
class UnitOrderStoreModule {
}
UnitOrderStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitOrderStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderStoreModule, imports: [i1$2.StoreFeatureModule, i1$1.EffectsFeatureModule] });
UnitOrderStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderStoreModule, providers: [reducerProvider], imports: [StoreModule.forFeature(UNIT_ORDER_FEATURE, reducerToken),
        EffectsModule.forFeature(effects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        StoreModule.forFeature(UNIT_ORDER_FEATURE, reducerToken),
                        EffectsModule.forFeature(effects),
                    ],
                    providers: [reducerProvider],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitOrderCoreModule {
    static forRoot() {
        return {
            ngModule: UnitOrderCoreModule,
            providers: [
                {
                    provide: UnitOrderFacade,
                    useExisting: UnitOrderService,
                },
                UnitOrderConnector,
            ],
        };
    }
}
UnitOrderCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitOrderCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderCoreModule, imports: [UnitOrderStoreModule] });
UnitOrderCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderCoreModule, imports: [UnitOrderStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [UnitOrderStoreModule],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { UnitLevelOrdersViewerGuard, unitOrderGroup_actions as UnitOrderActions, UnitOrderAdapter, UnitOrderConnector, UnitOrderCoreModule, unitOrderGroup_selectors as UnitOrderSelectors, UnitOrderService };
//# sourceMappingURL=spartacus-organization-unit-order-core.mjs.map
