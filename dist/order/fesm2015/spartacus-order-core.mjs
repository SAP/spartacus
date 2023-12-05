import * as i0 from '@angular/core';
import { Injectable, inject, InjectionToken, NgModule } from '@angular/core';
import * as i1 from '@ngrx/store';
import { createFeatureSelector, createSelector, select, Store, StoreModule } from '@ngrx/store';
import * as i2 from '@spartacus/core';
import { StateUtils, PROCESS_FEATURE, ProcessSelectors, CommandStrategy, OCC_USER_ID_ANONYMOUS, normalizeHttpError, LoggerService, GlobalMessageType, SiteContextActions, UserIdService } from '@spartacus/core';
import { tap, map, take, switchMap, catchError, concatMap, withLatestFrom, filter, auditTime } from 'rxjs/operators';
import * as i4 from '@spartacus/order/root';
import { OrderPlacedEvent, ReplenishmentOrderScheduledEvent, OrderReturnRequestFacade, OrderHistoryFacade, ReplenishmentOrderHistoryFacade, ScheduledReplenishmentOrderFacade, OrderFacade, ReorderOrderFacade } from '@spartacus/order/root';
import { BehaviorSubject, combineLatest, of, EMPTY, using } from 'rxjs';
import * as i3 from '@spartacus/cart/base/root';
import * as i1$1 from '@ngrx/effects';
import { Actions, createEffect, ofType, EffectsModule } from '@ngrx/effects';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderHistoryAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderHistoryConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    get(userId, orderCode) {
        return this.adapter.load(userId, orderCode);
    }
    getHistory(userId, pageSize, currentPage, sort) {
        return this.adapter.loadHistory(userId, pageSize, currentPage, sort);
    }
    getConsignmentTracking(orderCode, consignmentCode, userId) {
        return this.adapter.getConsignmentTracking(orderCode, consignmentCode, userId);
    }
    cancel(userId, orderCode, cancelRequestInput) {
        return this.adapter.cancel(userId, orderCode, cancelRequestInput);
    }
    return(userId, returnRequestInput) {
        return this.adapter.createReturnRequest(userId, returnRequestInput);
    }
    getReturnRequestDetail(userId, returnRequestCode) {
        return this.adapter.loadReturnRequestDetail(userId, returnRequestCode);
    }
    getReturnRequestList(userId, pageSize, currentPage, sort) {
        return this.adapter.loadReturnRequestList(userId, pageSize, currentPage, sort);
    }
    cancelReturnRequest(userId, returnRequestCode, returnRequestModification) {
        return this.adapter.cancelReturnRequest(userId, returnRequestCode, returnRequestModification);
    }
}
OrderHistoryConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderHistoryConnector, deps: [{ token: OrderHistoryAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
OrderHistoryConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderHistoryConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderHistoryConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: OrderHistoryAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    placeOrder(userId, cartId, termsChecked) {
        return this.adapter.placeOrder(userId, cartId, termsChecked);
    }
}
OrderConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConnector, deps: [{ token: OrderAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
OrderConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: OrderAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReorderOrderAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReorderOrderConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    reorder(orderId, userId) {
        return this.adapter.reorder(orderId, userId);
    }
}
ReorderOrderConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReorderOrderConnector, deps: [{ token: ReorderOrderAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
ReorderOrderConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReorderOrderConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReorderOrderConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: ReorderOrderAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReplenishmentOrderHistoryAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReplenishmentOrderHistoryConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    load(userId, replenishmentOrderCode) {
        return this.adapter.load(userId, replenishmentOrderCode);
    }
    loadReplenishmentDetailsHistory(userId, replenishmentOrderCode, pageSize, currentPage, sort) {
        return this.adapter.loadReplenishmentDetailsHistory(userId, replenishmentOrderCode, pageSize, currentPage, sort);
    }
    cancelReplenishmentOrder(userId, replenishmentOrderCode) {
        return this.adapter.cancelReplenishmentOrder(userId, replenishmentOrderCode);
    }
    loadHistory(userId, pageSize, currentPage, sort) {
        return this.adapter.loadHistory(userId, pageSize, currentPage, sort);
    }
}
ReplenishmentOrderHistoryConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryConnector, deps: [{ token: ReplenishmentOrderHistoryAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
ReplenishmentOrderHistoryConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: ReplenishmentOrderHistoryAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ScheduledReplenishmentOrderAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ScheduledReplenishmentOrderConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    scheduleReplenishmentOrder(cartId, scheduleReplenishmentForm, termsChecked, userId) {
        return this.adapter.scheduleReplenishmentOrder(cartId, scheduleReplenishmentForm, termsChecked, userId);
    }
}
ScheduledReplenishmentOrderConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduledReplenishmentOrderConnector, deps: [{ token: ScheduledReplenishmentOrderAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
ScheduledReplenishmentOrderConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduledReplenishmentOrderConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduledReplenishmentOrderConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: ScheduledReplenishmentOrderAdapter }]; } });

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
const LOAD_CONSIGNMENT_TRACKING = '[Order] Load Consignment Tracking';
const LOAD_CONSIGNMENT_TRACKING_FAIL = '[Order] Load Consignment Tracking Fail';
const LOAD_CONSIGNMENT_TRACKING_SUCCESS = '[Order] Load Consignment Tracking Success';
const CLEAR_CONSIGNMENT_TRACKING = '[Order] Clear Consignment Tracking';
class LoadConsignmentTracking {
    constructor(payload) {
        this.payload = payload;
        this.type = LOAD_CONSIGNMENT_TRACKING;
    }
}
class LoadConsignmentTrackingFail {
    constructor(payload) {
        this.payload = payload;
        this.type = LOAD_CONSIGNMENT_TRACKING_FAIL;
    }
}
class LoadConsignmentTrackingSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = LOAD_CONSIGNMENT_TRACKING_SUCCESS;
    }
}
class ClearConsignmentTracking {
    constructor() {
        this.type = CLEAR_CONSIGNMENT_TRACKING;
        // Intentional empty constructor
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ORDER_FEATURE = 'order';
const CANCEL_ORDER_PROCESS_ID = 'cancelOrder';
const CANCEL_RETURN_PROCESS_ID = 'cancelReturn';
const CANCEL_REPLENISHMENT_ORDER_PROCESS_ID = 'cancelReplenishmentOrder';
const ORDERS = '[Order] User Orders';
const RETURN_REQUESTS = '[Order] Order Return Requests';
const RETURN_REQUEST_DETAILS = '[Order] Return Request Details';
const ORDER_DETAILS = '[Order] User Order Details';
const REPLENISHMENT_ORDERS = '[Order] User Replenishment Orders';
const REPLENISHMENT_ORDER_DETAILS = '[Order] User Replenishment Order Details';
const CONSIGNMENT_TRACKING_BY_ID_ENTITIES = 'consignment-tracking-by-id-entities';
const ORDER_BY_ID_ENTITIES = 'order-by-id-entities';
function getConsignmentTrackingByIdEntityKey(orderCode, consignmentCode) {
    return `${orderCode},${consignmentCode}`;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const LOAD_ORDER_DETAILS = '[Order] Load Order Details';
const LOAD_ORDER_DETAILS_FAIL = '[Order] Load Order Details Fail';
const LOAD_ORDER_DETAILS_SUCCESS = '[Order] Load Order Details Success';
const CLEAR_ORDER_DETAILS = '[Order] Clear Order Details';
const CANCEL_ORDER = '[Order] Cancel Order';
const CANCEL_ORDER_FAIL = '[Order] Cancel Order Fail';
const CANCEL_ORDER_SUCCESS = '[Order] Cancel Order Success';
const RESET_CANCEL_ORDER_PROCESS = '[Order] Reset Cancel Order Process';
class LoadOrderDetails extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(ORDER_DETAILS);
        this.payload = payload;
        this.type = LOAD_ORDER_DETAILS;
    }
}
class LoadOrderDetailsFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(ORDER_DETAILS, payload);
        this.payload = payload;
        this.type = LOAD_ORDER_DETAILS_FAIL;
    }
}
class LoadOrderDetailsSuccess extends StateUtils.LoaderSuccessAction {
    constructor(payload) {
        super(ORDER_DETAILS);
        this.payload = payload;
        this.type = LOAD_ORDER_DETAILS_SUCCESS;
    }
}
class ClearOrderDetails extends StateUtils.LoaderResetAction {
    constructor() {
        super(ORDER_DETAILS);
        this.type = CLEAR_ORDER_DETAILS;
    }
}
class CancelOrder extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(PROCESS_FEATURE, CANCEL_ORDER_PROCESS_ID);
        this.payload = payload;
        this.type = CANCEL_ORDER;
    }
}
class CancelOrderFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(PROCESS_FEATURE, CANCEL_ORDER_PROCESS_ID, payload);
        this.payload = payload;
        this.type = CANCEL_ORDER_FAIL;
    }
}
class CancelOrderSuccess extends StateUtils.EntitySuccessAction {
    constructor() {
        super(PROCESS_FEATURE, CANCEL_ORDER_PROCESS_ID);
        this.type = CANCEL_ORDER_SUCCESS;
    }
}
class ResetCancelOrderProcess extends StateUtils.EntityLoaderResetAction {
    constructor() {
        super(PROCESS_FEATURE, CANCEL_ORDER_PROCESS_ID);
        this.type = RESET_CANCEL_ORDER_PROCESS;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CREATE_ORDER_RETURN_REQUEST = '[Order] Create Order Return Request';
const CREATE_ORDER_RETURN_REQUEST_FAIL = '[Order] Create Order Return Request Fail';
const CREATE_ORDER_RETURN_REQUEST_SUCCESS = '[Order] Create Order Return Request Success';
const LOAD_ORDER_RETURN_REQUEST = '[Order] Load Order Return Request details';
const LOAD_ORDER_RETURN_REQUEST_FAIL = '[Order] Load Order Return Request details Fail';
const LOAD_ORDER_RETURN_REQUEST_SUCCESS = '[Order] Load Order Return Request details Success';
const CANCEL_ORDER_RETURN_REQUEST = '[Order] Cancel Order Return Request';
const CANCEL_ORDER_RETURN_REQUEST_FAIL = '[Order] Cancel Order Return Request Fail';
const CANCEL_ORDER_RETURN_REQUEST_SUCCESS = '[Order] Cancel Order Return Request Success';
const LOAD_ORDER_RETURN_REQUEST_LIST = '[Order] Load User Order Return Request List';
const LOAD_ORDER_RETURN_REQUEST_LIST_FAIL = '[Order] Load User Order Return Request List Fail';
const LOAD_ORDER_RETURN_REQUEST_LIST_SUCCESS = '[Order] Load User Order Return Request List Success';
const CLEAR_ORDER_RETURN_REQUEST = '[Order] Clear Order Return Request Details';
const CLEAR_ORDER_RETURN_REQUEST_LIST = '[Order] Clear Order Return Request List';
const RESET_CANCEL_RETURN_PROCESS = '[Order] Reset Cancel Return Request Process';
class CreateOrderReturnRequest extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(RETURN_REQUEST_DETAILS);
        this.payload = payload;
        this.type = CREATE_ORDER_RETURN_REQUEST;
    }
}
class CreateOrderReturnRequestFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(RETURN_REQUEST_DETAILS, payload);
        this.payload = payload;
        this.type = CREATE_ORDER_RETURN_REQUEST_FAIL;
    }
}
class CreateOrderReturnRequestSuccess extends StateUtils.LoaderSuccessAction {
    constructor(payload) {
        super(RETURN_REQUEST_DETAILS);
        this.payload = payload;
        this.type = CREATE_ORDER_RETURN_REQUEST_SUCCESS;
    }
}
class LoadOrderReturnRequest extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(RETURN_REQUEST_DETAILS);
        this.payload = payload;
        this.type = LOAD_ORDER_RETURN_REQUEST;
    }
}
class LoadOrderReturnRequestFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(RETURN_REQUEST_DETAILS, payload);
        this.payload = payload;
        this.type = LOAD_ORDER_RETURN_REQUEST_FAIL;
    }
}
class LoadOrderReturnRequestSuccess extends StateUtils.LoaderSuccessAction {
    constructor(payload) {
        super(RETURN_REQUEST_DETAILS);
        this.payload = payload;
        this.type = LOAD_ORDER_RETURN_REQUEST_SUCCESS;
    }
}
class CancelOrderReturnRequest extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(PROCESS_FEATURE, CANCEL_RETURN_PROCESS_ID);
        this.payload = payload;
        this.type = CANCEL_ORDER_RETURN_REQUEST;
    }
}
class CancelOrderReturnRequestFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(PROCESS_FEATURE, CANCEL_RETURN_PROCESS_ID, payload);
        this.payload = payload;
        this.type = CANCEL_ORDER_RETURN_REQUEST_FAIL;
    }
}
class CancelOrderReturnRequestSuccess extends StateUtils.EntitySuccessAction {
    constructor() {
        super(PROCESS_FEATURE, CANCEL_RETURN_PROCESS_ID);
        this.type = CANCEL_ORDER_RETURN_REQUEST_SUCCESS;
    }
}
class LoadOrderReturnRequestList extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(RETURN_REQUESTS);
        this.payload = payload;
        this.type = LOAD_ORDER_RETURN_REQUEST_LIST;
    }
}
class LoadOrderReturnRequestListFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(RETURN_REQUESTS, payload);
        this.payload = payload;
        this.type = LOAD_ORDER_RETURN_REQUEST_LIST_FAIL;
    }
}
class LoadOrderReturnRequestListSuccess extends StateUtils.LoaderSuccessAction {
    constructor(payload) {
        super(RETURN_REQUESTS);
        this.payload = payload;
        this.type = LOAD_ORDER_RETURN_REQUEST_LIST_SUCCESS;
    }
}
class ClearOrderReturnRequest extends StateUtils.LoaderResetAction {
    constructor() {
        super(RETURN_REQUEST_DETAILS);
        this.type = CLEAR_ORDER_RETURN_REQUEST;
    }
}
class ClearOrderReturnRequestList extends StateUtils.LoaderResetAction {
    constructor() {
        super(RETURN_REQUESTS);
        this.type = CLEAR_ORDER_RETURN_REQUEST_LIST;
    }
}
class ResetCancelReturnProcess extends StateUtils.EntityLoaderResetAction {
    constructor() {
        super(PROCESS_FEATURE, CANCEL_RETURN_PROCESS_ID);
        this.type = RESET_CANCEL_RETURN_PROCESS;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const LOAD_USER_ORDERS = '[Order] Load User Orders';
const LOAD_USER_ORDERS_FAIL = '[Order] Load User Orders Fail';
const LOAD_USER_ORDERS_SUCCESS = '[Order] Load User Orders Success';
const CLEAR_USER_ORDERS = '[Order] Clear User Orders';
class LoadUserOrders extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(ORDERS);
        this.payload = payload;
        this.type = LOAD_USER_ORDERS;
    }
}
class LoadUserOrdersFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(ORDERS, payload);
        this.payload = payload;
        this.type = LOAD_USER_ORDERS_FAIL;
    }
}
class LoadUserOrdersSuccess extends StateUtils.LoaderSuccessAction {
    constructor(payload) {
        super(ORDERS);
        this.payload = payload;
        this.type = LOAD_USER_ORDERS_SUCCESS;
    }
}
class ClearUserOrders extends StateUtils.LoaderResetAction {
    constructor() {
        super(ORDERS);
        this.type = CLEAR_USER_ORDERS;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const LOAD_REPLENISHMENT_ORDER_DETAILS = '[Order] Load Replenishment Order Details';
const LOAD_REPLENISHMENT_ORDER_DETAILS_SUCCESS = '[Order] Load Replenishment Order Details Success';
const LOAD_REPLENISHMENT_ORDER_DETAILS_FAIL = '[Order] Load Replenishment Order Details Fail';
const ClEAR_REPLENISHMENT_ORDER_DETAILS = '[Order] Clear Replenishment Order Details';
const CANCEL_REPLENISHMENT_ORDER = '[Order] Cancel Replenishment Order';
const CANCEL_REPLENISHMENT_ORDER_SUCCESS = '[Order] Cancel Replenishment Order Success';
const CANCEL_REPLENISHMENT_ORDER_FAIL = '[Order] Cancel Replenishment Order Fail';
const CLEAR_CANCEL_REPLENISHMENT_ORDER = '[Order] Clear Cancel Replenishment Order';
class LoadReplenishmentOrderDetails extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(REPLENISHMENT_ORDER_DETAILS);
        this.payload = payload;
        this.type = LOAD_REPLENISHMENT_ORDER_DETAILS;
    }
}
class LoadReplenishmentOrderDetailsSuccess extends StateUtils.LoaderSuccessAction {
    constructor(payload) {
        super(REPLENISHMENT_ORDER_DETAILS);
        this.payload = payload;
        this.type = LOAD_REPLENISHMENT_ORDER_DETAILS_SUCCESS;
    }
}
class LoadReplenishmentOrderDetailsFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(REPLENISHMENT_ORDER_DETAILS, payload);
        this.payload = payload;
        this.type = LOAD_REPLENISHMENT_ORDER_DETAILS_FAIL;
    }
}
class ClearReplenishmentOrderDetails extends StateUtils.LoaderResetAction {
    constructor() {
        super(REPLENISHMENT_ORDER_DETAILS);
        this.type = ClEAR_REPLENISHMENT_ORDER_DETAILS;
    }
}
class CancelReplenishmentOrder extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(PROCESS_FEATURE, CANCEL_REPLENISHMENT_ORDER_PROCESS_ID);
        this.payload = payload;
        this.type = CANCEL_REPLENISHMENT_ORDER;
    }
}
class CancelReplenishmentOrderSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(PROCESS_FEATURE, CANCEL_REPLENISHMENT_ORDER_PROCESS_ID);
        this.payload = payload;
        this.type = CANCEL_REPLENISHMENT_ORDER_SUCCESS;
    }
}
class CancelReplenishmentOrderFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(PROCESS_FEATURE, CANCEL_REPLENISHMENT_ORDER_PROCESS_ID, payload);
        this.payload = payload;
        this.type = CANCEL_REPLENISHMENT_ORDER_FAIL;
    }
}
class ClearCancelReplenishmentOrder extends StateUtils.EntityLoaderResetAction {
    constructor() {
        super(PROCESS_FEATURE, CANCEL_REPLENISHMENT_ORDER_PROCESS_ID);
        this.type = CLEAR_CANCEL_REPLENISHMENT_ORDER;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const LOAD_USER_REPLENISHMENT_ORDERS = '[Order] Load User Replenishment Orders';
const LOAD_USER_REPLENISHMENT_ORDERS_FAIL = '[Order] Load User Replenishment Orders Fail';
const LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS = '[Order] Load User Replenishment Orders Success';
const CLEAR_USER_REPLENISHMENT_ORDERS = '[Order] Clear User Replenishment Orders';
class LoadUserReplenishmentOrders extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(REPLENISHMENT_ORDERS);
        this.payload = payload;
        this.type = LOAD_USER_REPLENISHMENT_ORDERS;
    }
}
class LoadUserReplenishmentOrdersFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(REPLENISHMENT_ORDERS, payload);
        this.payload = payload;
        this.type = LOAD_USER_REPLENISHMENT_ORDERS_FAIL;
    }
}
class LoadUserReplenishmentOrdersSuccess extends StateUtils.LoaderSuccessAction {
    constructor(payload) {
        super(REPLENISHMENT_ORDERS);
        this.payload = payload;
        this.type = LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS;
    }
}
class ClearUserReplenishmentOrders extends StateUtils.LoaderResetAction {
    constructor() {
        super(REPLENISHMENT_ORDERS);
        this.type = CLEAR_USER_REPLENISHMENT_ORDERS;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const LOAD_CONSIGNMENT_TRACKING_BY_ID = '[Order] Load Consignment Tracking By ID Data';
const LOAD_CONSIGNMENT_TRACKING_BY_ID_FAIL = '[Order] Load  Consignment Tracking By ID Data Fail';
const LOAD_CONSIGNMENT_TRACKING_BY_ID_SUCCESS = '[Order] Load Consignment Tracking By ID Data Success';
class LoadConsignmentTrackingById extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(CONSIGNMENT_TRACKING_BY_ID_ENTITIES, getConsignmentTrackingByIdEntityKey(payload.orderCode, payload.consignmentCode));
        this.payload = payload;
        this.type = LOAD_CONSIGNMENT_TRACKING_BY_ID;
    }
}
class LoadConsignmentTrackingByIdFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(CONSIGNMENT_TRACKING_BY_ID_ENTITIES, getConsignmentTrackingByIdEntityKey(payload.orderCode, payload.consignmentCode), payload.error);
        this.payload = payload;
        this.type = LOAD_CONSIGNMENT_TRACKING_BY_ID_FAIL;
    }
}
class LoadConsignmentTrackingByIdSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONSIGNMENT_TRACKING_BY_ID_ENTITIES, getConsignmentTrackingByIdEntityKey(payload.orderCode, payload.consignmentCode));
        this.payload = payload;
        this.type = LOAD_CONSIGNMENT_TRACKING_BY_ID_SUCCESS;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const LOAD_ORDER_BY_ID = '[Order] Load Order By ID Data';
const LOAD_ORDER_BY_ID_FAIL = '[Order] Load Order By ID Data Fail';
const LOAD_ORDER_BY_ID_SUCCESS = '[Order] Load Order By ID Data Success';
class LoadOrderById extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(ORDER_BY_ID_ENTITIES, payload.code);
        this.payload = payload;
        this.type = LOAD_ORDER_BY_ID;
    }
}
class LoadOrderByIdFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(ORDER_BY_ID_ENTITIES, payload.code, payload.error);
        this.payload = payload;
        this.type = LOAD_ORDER_BY_ID_FAIL;
    }
}
class LoadOrderByIdSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        var _a;
        super(ORDER_BY_ID_ENTITIES, (_a = payload.code) !== null && _a !== void 0 ? _a : '');
        this.payload = payload;
        this.type = LOAD_ORDER_BY_ID_SUCCESS;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

var orderGroup_actions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CANCEL_ORDER: CANCEL_ORDER,
    CANCEL_ORDER_FAIL: CANCEL_ORDER_FAIL,
    CANCEL_ORDER_RETURN_REQUEST: CANCEL_ORDER_RETURN_REQUEST,
    CANCEL_ORDER_RETURN_REQUEST_FAIL: CANCEL_ORDER_RETURN_REQUEST_FAIL,
    CANCEL_ORDER_RETURN_REQUEST_SUCCESS: CANCEL_ORDER_RETURN_REQUEST_SUCCESS,
    CANCEL_ORDER_SUCCESS: CANCEL_ORDER_SUCCESS,
    CANCEL_REPLENISHMENT_ORDER: CANCEL_REPLENISHMENT_ORDER,
    CANCEL_REPLENISHMENT_ORDER_FAIL: CANCEL_REPLENISHMENT_ORDER_FAIL,
    CANCEL_REPLENISHMENT_ORDER_SUCCESS: CANCEL_REPLENISHMENT_ORDER_SUCCESS,
    CLEAR_CANCEL_REPLENISHMENT_ORDER: CLEAR_CANCEL_REPLENISHMENT_ORDER,
    CLEAR_CONSIGNMENT_TRACKING: CLEAR_CONSIGNMENT_TRACKING,
    CLEAR_ORDER_DETAILS: CLEAR_ORDER_DETAILS,
    CLEAR_ORDER_RETURN_REQUEST: CLEAR_ORDER_RETURN_REQUEST,
    CLEAR_ORDER_RETURN_REQUEST_LIST: CLEAR_ORDER_RETURN_REQUEST_LIST,
    CLEAR_USER_ORDERS: CLEAR_USER_ORDERS,
    CLEAR_USER_REPLENISHMENT_ORDERS: CLEAR_USER_REPLENISHMENT_ORDERS,
    CREATE_ORDER_RETURN_REQUEST: CREATE_ORDER_RETURN_REQUEST,
    CREATE_ORDER_RETURN_REQUEST_FAIL: CREATE_ORDER_RETURN_REQUEST_FAIL,
    CREATE_ORDER_RETURN_REQUEST_SUCCESS: CREATE_ORDER_RETURN_REQUEST_SUCCESS,
    CancelOrder: CancelOrder,
    CancelOrderFail: CancelOrderFail,
    CancelOrderReturnRequest: CancelOrderReturnRequest,
    CancelOrderReturnRequestFail: CancelOrderReturnRequestFail,
    CancelOrderReturnRequestSuccess: CancelOrderReturnRequestSuccess,
    CancelOrderSuccess: CancelOrderSuccess,
    CancelReplenishmentOrder: CancelReplenishmentOrder,
    CancelReplenishmentOrderFail: CancelReplenishmentOrderFail,
    CancelReplenishmentOrderSuccess: CancelReplenishmentOrderSuccess,
    ClEAR_REPLENISHMENT_ORDER_DETAILS: ClEAR_REPLENISHMENT_ORDER_DETAILS,
    ClearCancelReplenishmentOrder: ClearCancelReplenishmentOrder,
    ClearConsignmentTracking: ClearConsignmentTracking,
    ClearOrderDetails: ClearOrderDetails,
    ClearOrderReturnRequest: ClearOrderReturnRequest,
    ClearOrderReturnRequestList: ClearOrderReturnRequestList,
    ClearReplenishmentOrderDetails: ClearReplenishmentOrderDetails,
    ClearUserOrders: ClearUserOrders,
    ClearUserReplenishmentOrders: ClearUserReplenishmentOrders,
    CreateOrderReturnRequest: CreateOrderReturnRequest,
    CreateOrderReturnRequestFail: CreateOrderReturnRequestFail,
    CreateOrderReturnRequestSuccess: CreateOrderReturnRequestSuccess,
    LOAD_CONSIGNMENT_TRACKING: LOAD_CONSIGNMENT_TRACKING,
    LOAD_CONSIGNMENT_TRACKING_BY_ID: LOAD_CONSIGNMENT_TRACKING_BY_ID,
    LOAD_CONSIGNMENT_TRACKING_BY_ID_FAIL: LOAD_CONSIGNMENT_TRACKING_BY_ID_FAIL,
    LOAD_CONSIGNMENT_TRACKING_BY_ID_SUCCESS: LOAD_CONSIGNMENT_TRACKING_BY_ID_SUCCESS,
    LOAD_CONSIGNMENT_TRACKING_FAIL: LOAD_CONSIGNMENT_TRACKING_FAIL,
    LOAD_CONSIGNMENT_TRACKING_SUCCESS: LOAD_CONSIGNMENT_TRACKING_SUCCESS,
    LOAD_ORDER_BY_ID: LOAD_ORDER_BY_ID,
    LOAD_ORDER_BY_ID_FAIL: LOAD_ORDER_BY_ID_FAIL,
    LOAD_ORDER_BY_ID_SUCCESS: LOAD_ORDER_BY_ID_SUCCESS,
    LOAD_ORDER_DETAILS: LOAD_ORDER_DETAILS,
    LOAD_ORDER_DETAILS_FAIL: LOAD_ORDER_DETAILS_FAIL,
    LOAD_ORDER_DETAILS_SUCCESS: LOAD_ORDER_DETAILS_SUCCESS,
    LOAD_ORDER_RETURN_REQUEST: LOAD_ORDER_RETURN_REQUEST,
    LOAD_ORDER_RETURN_REQUEST_FAIL: LOAD_ORDER_RETURN_REQUEST_FAIL,
    LOAD_ORDER_RETURN_REQUEST_LIST: LOAD_ORDER_RETURN_REQUEST_LIST,
    LOAD_ORDER_RETURN_REQUEST_LIST_FAIL: LOAD_ORDER_RETURN_REQUEST_LIST_FAIL,
    LOAD_ORDER_RETURN_REQUEST_LIST_SUCCESS: LOAD_ORDER_RETURN_REQUEST_LIST_SUCCESS,
    LOAD_ORDER_RETURN_REQUEST_SUCCESS: LOAD_ORDER_RETURN_REQUEST_SUCCESS,
    LOAD_REPLENISHMENT_ORDER_DETAILS: LOAD_REPLENISHMENT_ORDER_DETAILS,
    LOAD_REPLENISHMENT_ORDER_DETAILS_FAIL: LOAD_REPLENISHMENT_ORDER_DETAILS_FAIL,
    LOAD_REPLENISHMENT_ORDER_DETAILS_SUCCESS: LOAD_REPLENISHMENT_ORDER_DETAILS_SUCCESS,
    LOAD_USER_ORDERS: LOAD_USER_ORDERS,
    LOAD_USER_ORDERS_FAIL: LOAD_USER_ORDERS_FAIL,
    LOAD_USER_ORDERS_SUCCESS: LOAD_USER_ORDERS_SUCCESS,
    LOAD_USER_REPLENISHMENT_ORDERS: LOAD_USER_REPLENISHMENT_ORDERS,
    LOAD_USER_REPLENISHMENT_ORDERS_FAIL: LOAD_USER_REPLENISHMENT_ORDERS_FAIL,
    LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS: LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS,
    LoadConsignmentTracking: LoadConsignmentTracking,
    LoadConsignmentTrackingById: LoadConsignmentTrackingById,
    LoadConsignmentTrackingByIdFail: LoadConsignmentTrackingByIdFail,
    LoadConsignmentTrackingByIdSuccess: LoadConsignmentTrackingByIdSuccess,
    LoadConsignmentTrackingFail: LoadConsignmentTrackingFail,
    LoadConsignmentTrackingSuccess: LoadConsignmentTrackingSuccess,
    LoadOrderById: LoadOrderById,
    LoadOrderByIdFail: LoadOrderByIdFail,
    LoadOrderByIdSuccess: LoadOrderByIdSuccess,
    LoadOrderDetails: LoadOrderDetails,
    LoadOrderDetailsFail: LoadOrderDetailsFail,
    LoadOrderDetailsSuccess: LoadOrderDetailsSuccess,
    LoadOrderReturnRequest: LoadOrderReturnRequest,
    LoadOrderReturnRequestFail: LoadOrderReturnRequestFail,
    LoadOrderReturnRequestList: LoadOrderReturnRequestList,
    LoadOrderReturnRequestListFail: LoadOrderReturnRequestListFail,
    LoadOrderReturnRequestListSuccess: LoadOrderReturnRequestListSuccess,
    LoadOrderReturnRequestSuccess: LoadOrderReturnRequestSuccess,
    LoadReplenishmentOrderDetails: LoadReplenishmentOrderDetails,
    LoadReplenishmentOrderDetailsFail: LoadReplenishmentOrderDetailsFail,
    LoadReplenishmentOrderDetailsSuccess: LoadReplenishmentOrderDetailsSuccess,
    LoadUserOrders: LoadUserOrders,
    LoadUserOrdersFail: LoadUserOrdersFail,
    LoadUserOrdersSuccess: LoadUserOrdersSuccess,
    LoadUserReplenishmentOrders: LoadUserReplenishmentOrders,
    LoadUserReplenishmentOrdersFail: LoadUserReplenishmentOrdersFail,
    LoadUserReplenishmentOrdersSuccess: LoadUserReplenishmentOrdersSuccess,
    RESET_CANCEL_ORDER_PROCESS: RESET_CANCEL_ORDER_PROCESS,
    RESET_CANCEL_RETURN_PROCESS: RESET_CANCEL_RETURN_PROCESS,
    ResetCancelOrderProcess: ResetCancelOrderProcess,
    ResetCancelReturnProcess: ResetCancelReturnProcess
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
const getOrderState = createFeatureSelector(ORDER_FEATURE);

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getConsignmentTrackingState = createSelector(getOrderState, (state) => state.consignmentTracking);
const getConsignmentTracking = createSelector(getConsignmentTrackingState, (state) => state.tracking);

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getOrderDetailState = createSelector(getOrderState, (state) => state.orderDetail);
const getOrderDetails = createSelector(getOrderDetailState, (state) => StateUtils.loaderValueSelector(state));
const getOrderDetailsLoading = createSelector(getOrderDetailState, (state) => StateUtils.loaderLoadingSelector(state));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getOrderReturnRequestState = createSelector(getOrderState, (state) => state.orderReturn);
const getOrderReturnRequest = createSelector(getOrderReturnRequestState, (state) => StateUtils.loaderValueSelector(state));
const getOrderReturnRequestLoading = createSelector(getOrderReturnRequestState, (state) => StateUtils.loaderLoadingSelector(state));
const getOrderReturnRequestSuccess = createSelector(getOrderReturnRequestState, (state) => StateUtils.loaderSuccessSelector(state) &&
    !StateUtils.loaderLoadingSelector(state));
const getOrderReturnRequestListState = createSelector(getOrderState, (state) => state.orderReturnList);
const getOrderReturnRequestList = createSelector(getOrderReturnRequestListState, (state) => StateUtils.loaderValueSelector(state));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getOrdersState = createSelector(getOrderState, (state) => state.orders);
const getOrdersLoaded = createSelector(getOrdersState, (state) => StateUtils.loaderSuccessSelector(state));
const getOrders = createSelector(getOrdersState, (state) => StateUtils.loaderValueSelector(state));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getReplenishmentOrderState = createSelector(getOrderState, (state) => state.replenishmentOrder);
const getReplenishmentOrderDetailsValue = createSelector(getReplenishmentOrderState, (state) => StateUtils.loaderValueSelector(state));
const getReplenishmentOrderDetailsLoading = createSelector(getReplenishmentOrderState, (state) => StateUtils.loaderLoadingSelector(state));
const getReplenishmentOrderDetailsSuccess = createSelector(getReplenishmentOrderState, (state) => StateUtils.loaderSuccessSelector(state));
const getReplenishmentOrderDetailsError = createSelector(getReplenishmentOrderState, (state) => StateUtils.loaderErrorSelector(state));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getReplenishmentOrdersState = createSelector(getOrderState, (state) => state.replenishmentOrders);
const getReplenishmentOrders = createSelector(getReplenishmentOrdersState, (state) => StateUtils.loaderValueSelector(state));
const getReplenishmentOrdersLoading = createSelector(getReplenishmentOrdersState, (state) => StateUtils.loaderLoadingSelector(state));
const getReplenishmentOrdersError = createSelector(getReplenishmentOrdersState, (state) => StateUtils.loaderErrorSelector(state));
const getReplenishmentOrdersSuccess = createSelector(getReplenishmentOrdersState, (state) => StateUtils.loaderSuccessSelector(state));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getConsignmentTrackingByIdEntities = createSelector(getOrderState, (state) => state.consignmentTrackingById);
const getConsignmentTrackingByIdEntity = (orderCode, consignmentCode) => createSelector(getConsignmentTrackingByIdEntities, (state) => StateUtils.entityLoaderStateSelector(state, getConsignmentTrackingByIdEntityKey(orderCode, consignmentCode)));
const getConsignmentTrackingById = (orderCode, consignmentCode) => {
    return createSelector(getConsignmentTrackingByIdEntity(orderCode, consignmentCode), (consignmentTrackingByIdState) => StateUtils.loaderValueSelector(consignmentTrackingByIdState));
};
const getConsignmentTrackingByIdLoading = (orderCode, consignmentCode) => {
    return createSelector(getConsignmentTrackingByIdEntity(orderCode, consignmentCode), (loaderState) => StateUtils.loaderLoadingSelector(loaderState));
};
const getConsignmentTrackingByIdSuccess = (orderCode, consignmentCode) => {
    return createSelector(getConsignmentTrackingByIdEntity(orderCode, consignmentCode), (loaderState) => StateUtils.loaderSuccessSelector(loaderState));
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getOrderByIdEntities = createSelector(getOrderState, (state) => state.orderById);
const getOrderByIdEntity = (code) => createSelector(getOrderByIdEntities, (state) => StateUtils.entityLoaderStateSelector(state, code));
const getOrderById = (code) => {
    return createSelector(getOrderByIdEntity(code), (orderByIDState) => StateUtils.loaderValueSelector(orderByIDState));
};
const getOrderByIdLoading = (code) => {
    return createSelector(getOrderByIdEntity(code), (loaderState) => StateUtils.loaderLoadingSelector(loaderState));
};
const getOrderByIdSuccess = (code) => {
    return createSelector(getOrderByIdEntity(code), (loaderState) => StateUtils.loaderSuccessSelector(loaderState));
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

var orderGroup_selectors = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getConsignmentTracking: getConsignmentTracking,
    getConsignmentTrackingById: getConsignmentTrackingById,
    getConsignmentTrackingByIdEntities: getConsignmentTrackingByIdEntities,
    getConsignmentTrackingByIdEntity: getConsignmentTrackingByIdEntity,
    getConsignmentTrackingByIdLoading: getConsignmentTrackingByIdLoading,
    getConsignmentTrackingByIdSuccess: getConsignmentTrackingByIdSuccess,
    getConsignmentTrackingState: getConsignmentTrackingState,
    getOrderById: getOrderById,
    getOrderByIdEntities: getOrderByIdEntities,
    getOrderByIdEntity: getOrderByIdEntity,
    getOrderByIdLoading: getOrderByIdLoading,
    getOrderByIdSuccess: getOrderByIdSuccess,
    getOrderDetailState: getOrderDetailState,
    getOrderDetails: getOrderDetails,
    getOrderDetailsLoading: getOrderDetailsLoading,
    getOrderReturnRequest: getOrderReturnRequest,
    getOrderReturnRequestList: getOrderReturnRequestList,
    getOrderReturnRequestListState: getOrderReturnRequestListState,
    getOrderReturnRequestLoading: getOrderReturnRequestLoading,
    getOrderReturnRequestState: getOrderReturnRequestState,
    getOrderReturnRequestSuccess: getOrderReturnRequestSuccess,
    getOrderState: getOrderState,
    getOrders: getOrders,
    getOrdersLoaded: getOrdersLoaded,
    getOrdersState: getOrdersState,
    getReplenishmentOrderDetailsError: getReplenishmentOrderDetailsError,
    getReplenishmentOrderDetailsLoading: getReplenishmentOrderDetailsLoading,
    getReplenishmentOrderDetailsSuccess: getReplenishmentOrderDetailsSuccess,
    getReplenishmentOrderDetailsValue: getReplenishmentOrderDetailsValue,
    getReplenishmentOrderState: getReplenishmentOrderState,
    getReplenishmentOrders: getReplenishmentOrders,
    getReplenishmentOrdersError: getReplenishmentOrdersError,
    getReplenishmentOrdersLoading: getReplenishmentOrdersLoading,
    getReplenishmentOrdersState: getReplenishmentOrdersState,
    getReplenishmentOrdersSuccess: getReplenishmentOrdersSuccess
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
class OrderHistoryService {
    constructor(store, processStateStore, userIdService, routingService) {
        this.store = store;
        this.processStateStore = processStateStore;
        this.userIdService = userIdService;
        this.routingService = routingService;
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
    loadOrderList(pageSize, currentPage, sort) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                let replenishmentOrderCode;
                this.routingService
                    .getRouterState()
                    .pipe(take(1))
                    .subscribe((data) => {
                    var _a, _b;
                    replenishmentOrderCode =
                        (_b = (_a = data === null || data === void 0 ? void 0 : data.state) === null || _a === void 0 ? void 0 : _a.params) === null || _b === void 0 ? void 0 : _b.replenishmentOrderCode;
                })
                    .unsubscribe();
                this.store.dispatch(new LoadUserOrders({
                    userId,
                    pageSize,
                    currentPage,
                    sort,
                    replenishmentOrderCode,
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
        this.store.dispatch(new ClearUserOrders());
    }
    /**
     *  Returns a consignment tracking detail
     */
    getConsignmentTracking() {
        return this.store.pipe(select(getConsignmentTracking));
    }
    /**
     * Retrieves consignment tracking details
     * @param orderCode an order code
     * @param consignmentCode a consignment code
     */
    loadConsignmentTracking(orderCode, consignmentCode) {
        this.userIdService.takeUserId().subscribe((userId) => {
            this.store.dispatch(new LoadConsignmentTracking({
                userId,
                orderCode,
                consignmentCode,
            }));
        });
    }
    /**
     * Cleaning consignment tracking
     */
    clearConsignmentTracking() {
        this.store.dispatch(new ClearConsignmentTracking());
    }
    /*
     * Cancel an order
     */
    cancelOrder(orderCode, cancelRequestInput) {
        this.userIdService.takeUserId().subscribe((userId) => {
            this.store.dispatch(new CancelOrder({
                userId,
                orderCode,
                cancelRequestInput,
            }));
        });
    }
    /**
     * Returns the cancel order loading flag
     */
    getCancelOrderLoading() {
        return this.processStateStore.pipe(select(ProcessSelectors.getProcessLoadingFactory(CANCEL_ORDER_PROCESS_ID)));
    }
    /**
     * Returns the cancel order success flag
     */
    getCancelOrderSuccess() {
        return this.processStateStore.pipe(select(ProcessSelectors.getProcessSuccessFactory(CANCEL_ORDER_PROCESS_ID)));
    }
    /**
     * Resets the cancel order process flags
     */
    resetCancelOrderProcessState() {
        return this.store.dispatch(new ResetCancelOrderProcess());
    }
    /**
     * Returns the order details loading flag
     */
    getOrderDetailsLoading() {
        return this.store.pipe(select(getOrderDetailsLoading));
    }
}
OrderHistoryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderHistoryService, deps: [{ token: i1.Store }, { token: i1.Store }, { token: i2.UserIdService }, { token: i2.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderHistoryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderHistoryService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderHistoryService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i1.Store }, { type: i2.UserIdService }, { type: i2.RoutingService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderReturnRequestService {
    constructor(store, processStateStore, userIdService) {
        this.store = store;
        this.processStateStore = processStateStore;
        this.userIdService = userIdService;
    }
    /**
     * Create order return request
     * @param orderCode an order code
     * @param returnRequestInput order return request entry input
     */
    createOrderReturnRequest(returnRequestInput) {
        this.userIdService.takeUserId().subscribe((userId) => {
            this.store.dispatch(new CreateOrderReturnRequest({
                userId,
                returnRequestInput,
            }));
        });
    }
    /**
     * Return an order return request
     */
    getOrderReturnRequest() {
        return this.store.pipe(select(getOrderReturnRequest));
    }
    /**
     * Gets order return request list
     */
    getOrderReturnRequestList(pageSize) {
        return this.store.pipe(select(getOrderReturnRequestListState), tap((returnListState) => {
            const attemptedLoad = returnListState.loading ||
                returnListState.success ||
                returnListState.error;
            if (!attemptedLoad) {
                this.loadOrderReturnRequestList(pageSize);
            }
        }), map((returnListState) => returnListState.value));
    }
    /**
     * Loads order return request detail
     * @param returnRequestCode
     */
    loadOrderReturnRequestDetail(returnRequestCode) {
        this.userIdService.takeUserId().subscribe((userId) => {
            this.store.dispatch(new LoadOrderReturnRequest({
                userId,
                returnRequestCode,
            }));
        });
    }
    /**
     * Loads order return request list
     * @param pageSize page size
     * @param currentPage current page
     * @param sort sort
     */
    loadOrderReturnRequestList(pageSize, currentPage, sort) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                this.store.dispatch(new LoadOrderReturnRequestList({
                    userId,
                    pageSize,
                    currentPage,
                    sort,
                }));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Cleaning order return request list
     */
    clearOrderReturnRequestList() {
        this.store.dispatch(new ClearOrderReturnRequestList());
    }
    /**
     * Get the order return request loading flag
     */
    getReturnRequestLoading() {
        return this.store.pipe(select(getOrderReturnRequestLoading));
    }
    /**
     * Get the order return request success flag
     */
    getReturnRequestSuccess() {
        return this.store.pipe(select(getOrderReturnRequestSuccess));
    }
    /**
     * Cleaning order return request details
     */
    clearOrderReturnRequestDetail() {
        this.store.dispatch(new ClearOrderReturnRequest());
    }
    /*
     * Cancel order return request
     */
    cancelOrderReturnRequest(returnRequestCode, returnRequestModification) {
        this.userIdService.takeUserId().subscribe((userId) => {
            this.store.dispatch(new CancelOrderReturnRequest({
                userId,
                returnRequestCode,
                returnRequestModification,
            }));
        });
    }
    /**
     * Returns the cancel return request loading flag
     */
    getCancelReturnRequestLoading() {
        return this.processStateStore.pipe(select(ProcessSelectors.getProcessLoadingFactory(CANCEL_RETURN_PROCESS_ID)));
    }
    /**
     * Returns the cancel return request success flag
     */
    getCancelReturnRequestSuccess() {
        return this.processStateStore.pipe(select(ProcessSelectors.getProcessSuccessFactory(CANCEL_RETURN_PROCESS_ID)));
    }
    /**
     * Resets the cancel return request process flags
     */
    resetCancelReturnRequestProcessState() {
        return this.store.dispatch(new ResetCancelReturnProcess());
    }
}
OrderReturnRequestService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnRequestService, deps: [{ token: i1.Store }, { token: i1.Store }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderReturnRequestService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnRequestService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnRequestService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i1.Store }, { type: i2.UserIdService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderService {
    constructor(activeCartFacade, userIdService, commandService, orderConnector, eventService) {
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
        this.commandService = commandService;
        this.orderConnector = orderConnector;
        this.eventService = eventService;
        this.placedOrder$ = new BehaviorSubject(undefined);
        this.placeOrderCommand = this.commandService.create((payload) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.orderConnector.placeOrder(userId, cartId, payload).pipe(tap((order) => {
            this.placedOrder$.next(order);
            this.eventService.dispatch({
                userId,
                cartId,
                /**
                 * As we know the cart is not anonymous (precondition checked),
                 * we can safely use the cartId, which is actually the cart.code.
                 */
                cartCode: cartId,
                order,
            }, OrderPlacedEvent);
        })))), {
            strategy: CommandStrategy.CancelPrevious,
        });
    }
    /**
     * Performs the necessary checkout preconditions.
     */
    checkoutPreconditions() {
        return combineLatest([
            this.userIdService.takeUserId(),
            this.activeCartFacade.takeActiveCartId(),
            this.activeCartFacade.isGuestCart(),
        ]).pipe(take(1), map(([userId, cartId, isGuestCart]) => {
            if (!userId ||
                !cartId ||
                (userId === OCC_USER_ID_ANONYMOUS && !isGuestCart)) {
                throw new Error('Checkout conditions not met');
            }
            return [userId, cartId];
        }));
    }
    placeOrder(termsChecked) {
        return this.placeOrderCommand.execute(termsChecked);
    }
    getOrderDetails() {
        return this.placedOrder$.asObservable();
    }
    clearPlacedOrder() {
        this.placedOrder$.next(undefined);
    }
    setPlacedOrder(order) {
        this.placedOrder$.next(order);
    }
    getPickupEntries() {
        return this.getOrderDetails().pipe(map((order) => { var _a; return ((_a = order === null || order === void 0 ? void 0 : order.entries) === null || _a === void 0 ? void 0 : _a.filter((entry) => entry.deliveryPointOfService !== undefined)) || []; }));
    }
    getDeliveryEntries() {
        return this.getOrderDetails().pipe(map((order) => { var _a; return ((_a = order === null || order === void 0 ? void 0 : order.entries) === null || _a === void 0 ? void 0 : _a.filter((entry) => entry.deliveryPointOfService === undefined)) || []; }));
    }
}
OrderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderService, deps: [{ token: i3.ActiveCartFacade }, { token: i2.UserIdService }, { token: i2.CommandService }, { token: OrderConnector }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i3.ActiveCartFacade }, { type: i2.UserIdService }, { type: i2.CommandService }, { type: OrderConnector }, { type: i2.EventService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReorderOrderService {
    constructor(commandService, reorderOrderConnector, userIdService, activeCartFacade, multiCartFacade) {
        this.commandService = commandService;
        this.reorderOrderConnector = reorderOrderConnector;
        this.userIdService = userIdService;
        this.activeCartFacade = activeCartFacade;
        this.multiCartFacade = multiCartFacade;
        this.reorderCommand = this.commandService.create(({ orderId }) => this.reorderPreconditions().pipe(switchMap((userId) => this.reorderOrderConnector.reorder(orderId, userId))), {
            strategy: CommandStrategy.CancelPrevious,
        });
    }
    /**
     * Create cart from an existing order
     */
    reorder(orderId) {
        return this.reorderCommand.execute({
            orderId,
        });
    }
    reorderPreconditions() {
        return combineLatest([
            this.userIdService.takeUserId(),
            this.activeCartFacade.getActiveCartId(),
        ]).pipe(take(1), map(([userId, cartId]) => {
            if (!userId) {
                throw new Error('Must be logged in to reorder');
            }
            if (cartId) {
                this.multiCartFacade.deleteCart(cartId, userId);
            }
            return userId;
        }));
    }
}
ReorderOrderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReorderOrderService, deps: [{ token: i2.CommandService }, { token: ReorderOrderConnector }, { token: i2.UserIdService }, { token: i3.ActiveCartFacade }, { token: i3.MultiCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
ReorderOrderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReorderOrderService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReorderOrderService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i2.CommandService }, { type: ReorderOrderConnector }, { type: i2.UserIdService }, { type: i3.ActiveCartFacade }, { type: i3.MultiCartFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReplenishmentOrderHistoryService {
    constructor(store, processStateStore, userIdService) {
        this.store = store;
        this.processStateStore = processStateStore;
        this.userIdService = userIdService;
    }
    /**
     * Returns replenishment order details for a given 'current' user
     *
     * @param replenishmentOrderCode a replenishment order code
     */
    loadReplenishmentOrderDetails(replenishmentOrderCode) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                this.store.dispatch(new LoadReplenishmentOrderDetails({
                    userId,
                    replenishmentOrderCode,
                }));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Returns a replenishment order details
     */
    getReplenishmentOrderDetails() {
        return this.store.pipe(select(getReplenishmentOrderDetailsValue));
    }
    /**
     * Returns a replenishment order details loading flag
     */
    getReplenishmentOrderDetailsLoading() {
        return this.store.pipe(select(getReplenishmentOrderDetailsLoading));
    }
    /**
     * Returns a replenishment order details success flag
     */
    getReplenishmentOrderDetailsSuccess() {
        return this.store.pipe(select(getReplenishmentOrderDetailsSuccess));
    }
    /**
     * Returns a replenishment order details error flag
     */
    getReplenishmentOrderDetailsError() {
        return this.store.pipe(select(getReplenishmentOrderDetailsError));
    }
    /**
     * Clears the replenishment orders details state
     */
    clearReplenishmentOrderDetails() {
        this.store.dispatch(new ClearReplenishmentOrderDetails());
    }
    /**
     * Cancels a specific replenishment order for a given 'current' user
     *
     * @param replenishmentOrderCode a replenishment order code
     */
    cancelReplenishmentOrder(replenishmentOrderCode) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                this.store.dispatch(new CancelReplenishmentOrder({
                    userId,
                    replenishmentOrderCode,
                }));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Returns the cancel replenishment order loading flag
     */
    getCancelReplenishmentOrderLoading() {
        return this.processStateStore.pipe(select(ProcessSelectors.getProcessLoadingFactory(CANCEL_REPLENISHMENT_ORDER_PROCESS_ID)));
    }
    /**
     * Returns the cancel replenishment order success flag
     */
    getCancelReplenishmentOrderSuccess() {
        return this.processStateStore.pipe(select(ProcessSelectors.getProcessSuccessFactory(CANCEL_REPLENISHMENT_ORDER_PROCESS_ID)));
    }
    /**
     * Returns the cancel replenishment order error flag
     */
    getCancelReplenishmentOrderError() {
        return this.processStateStore.pipe(select(ProcessSelectors.getProcessErrorFactory(CANCEL_REPLENISHMENT_ORDER_PROCESS_ID)));
    }
    /**
     * Clears the cancel replenishment order processing state
     */
    clearCancelReplenishmentOrderProcessState() {
        this.store.dispatch(new ClearCancelReplenishmentOrder());
    }
    /**
     * Returns replenishment order history list
     */
    getReplenishmentOrderHistoryList(pageSize) {
        return this.store.pipe(select(getReplenishmentOrdersState), tap((replenishmentOrderListState) => {
            const attemptedLoad = replenishmentOrderListState.loading ||
                replenishmentOrderListState.success ||
                replenishmentOrderListState.error;
            if (!attemptedLoad) {
                this.loadReplenishmentOrderList(pageSize);
            }
        }), map((replenishmentOrderListState) => replenishmentOrderListState.value));
    }
    /**
     * Returns a loading flag for replenishment order history list
     */
    getReplenishmentOrderHistoryListLoading() {
        return this.store.pipe(select(getReplenishmentOrdersLoading));
    }
    /**
     * Returns a error flag for replenishment order history list
     */
    getReplenishmentOrderHistoryListError() {
        return this.store.pipe(select(getReplenishmentOrdersError));
    }
    /**
     * Returns a success flag for replenishment order history list
     */
    getReplenishmentOrderHistoryListSuccess() {
        return this.store.pipe(select(getReplenishmentOrdersSuccess));
    }
    /**
     * Retrieves a replenishment order list
     * @param pageSize page size
     * @param currentPage current page
     * @param sort sort
     */
    loadReplenishmentOrderList(pageSize, currentPage, sort) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                this.store.dispatch(new LoadUserReplenishmentOrders({
                    userId,
                    pageSize,
                    currentPage,
                    sort,
                }));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Cleaning replenishment order list
     */
    clearReplenishmentOrderList() {
        this.store.dispatch(new ClearUserReplenishmentOrders());
    }
}
ReplenishmentOrderHistoryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryService, deps: [{ token: i1.Store }, { token: i1.Store }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
ReplenishmentOrderHistoryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i1.Store }, { type: i2.UserIdService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ScheduledReplenishmentOrderService {
    constructor(activeCartFacade, userIdService, commandService, scheduledReplenishmentOrderConnector, eventService, orderFacade) {
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
        this.commandService = commandService;
        this.scheduledReplenishmentOrderConnector = scheduledReplenishmentOrderConnector;
        this.eventService = eventService;
        this.orderFacade = orderFacade;
        this.scheduleReplenishmentOrderCommand = this.commandService.create(({ form, termsChecked }) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.scheduledReplenishmentOrderConnector
            .scheduleReplenishmentOrder(cartId, form, termsChecked, userId)
            .pipe(tap((replenishmentOrder) => {
            this.orderFacade.setPlacedOrder(replenishmentOrder);
            this.eventService.dispatch({
                userId,
                cartId,
                /**
                 * As we know the cart is not anonymous (precondition checked),
                 * we can safely use the cartId, which is actually the cart.code.
                 */
                cartCode: cartId,
                replenishmentOrder,
            }, ReplenishmentOrderScheduledEvent);
        })))), {
            strategy: CommandStrategy.CancelPrevious,
        });
    }
    checkoutPreconditions() {
        return combineLatest([
            this.userIdService.takeUserId(),
            this.activeCartFacade.takeActiveCartId(),
            this.activeCartFacade.isGuestCart(),
        ]).pipe(take(1), map(([userId, cartId, isGuestCart]) => {
            if (!userId ||
                !cartId ||
                (userId === OCC_USER_ID_ANONYMOUS && !isGuestCart)) {
                throw new Error('Order conditions not met');
            }
            return [userId, cartId];
        }));
    }
    /**
     * Schedule a replenishment order
     */
    scheduleReplenishmentOrder(scheduleReplenishmentForm, termsChecked) {
        return this.scheduleReplenishmentOrderCommand.execute({
            termsChecked,
            form: scheduleReplenishmentForm,
        });
    }
}
ScheduledReplenishmentOrderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduledReplenishmentOrderService, deps: [{ token: i3.ActiveCartFacade }, { token: i2.UserIdService }, { token: i2.CommandService }, { token: ScheduledReplenishmentOrderConnector }, { token: i2.EventService }, { token: i4.OrderFacade }], target: i0.ɵɵFactoryTarget.Injectable });
ScheduledReplenishmentOrderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduledReplenishmentOrderService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduledReplenishmentOrderService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i3.ActiveCartFacade }, { type: i2.UserIdService }, { type: i2.CommandService }, { type: ScheduledReplenishmentOrderConnector }, { type: i2.EventService }, { type: i4.OrderFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConsignmentTrackingByIdEffects {
    constructor() {
        this.actions$ = inject(Actions);
        this.orderConnector = inject(OrderHistoryConnector);
        this.loadConsignmentTrackingById$ = createEffect(() => this.actions$.pipe(ofType(LOAD_CONSIGNMENT_TRACKING_BY_ID), map((action) => action.payload), switchMap((payload) => {
            return this.orderConnector
                .getConsignmentTracking(payload.orderCode, payload.consignmentCode, payload.userId)
                .pipe(map((tracking) => new LoadConsignmentTrackingByIdSuccess({
                orderCode: payload.orderCode,
                consignmentCode: payload.consignmentCode,
                consignmentTracking: tracking,
            })), catchError((error) => of(new LoadConsignmentTrackingByIdFail({
                orderCode: payload.orderCode,
                consignmentCode: payload.consignmentCode,
                error: normalizeHttpError(error),
            }))));
        })));
    }
}
ConsignmentTrackingByIdEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConsignmentTrackingByIdEffects, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConsignmentTrackingByIdEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConsignmentTrackingByIdEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConsignmentTrackingByIdEffects, decorators: [{
            type: Injectable
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConsignmentTrackingEffects {
    constructor(actions$, orderConnector) {
        this.actions$ = actions$;
        this.orderConnector = orderConnector;
        this.logger = inject(LoggerService);
        this.loadConsignmentTracking$ = createEffect(() => this.actions$.pipe(ofType(LOAD_CONSIGNMENT_TRACKING), map((action) => action.payload), switchMap((payload) => {
            return this.orderConnector
                .getConsignmentTracking(payload.orderCode, payload.consignmentCode, payload.userId)
                .pipe(map((tracking) => new LoadConsignmentTrackingSuccess(tracking)), catchError((error) => of(new LoadConsignmentTrackingFail(normalizeHttpError(error, this.logger)))));
        })));
    }
}
ConsignmentTrackingEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConsignmentTrackingEffects, deps: [{ token: i1$1.Actions }, { token: OrderHistoryConnector }], target: i0.ɵɵFactoryTarget.Injectable });
ConsignmentTrackingEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConsignmentTrackingEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConsignmentTrackingEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Actions }, { type: OrderHistoryConnector }]; } });

class OrderByIdEffect {
    constructor() {
        this.actions$ = inject(Actions);
        this.orderConnector = inject(OrderHistoryConnector);
        this.loadOrderById$ = createEffect(() => this.actions$.pipe(ofType(LOAD_ORDER_BY_ID), map((action) => action.payload), concatMap(({ userId, code }) => {
            return this.orderConnector.get(userId, code).pipe(map((order) => {
                return new LoadOrderByIdSuccess(order);
            }), catchError((error) => {
                return of(new LoadOrderByIdFail({
                    code,
                    error: normalizeHttpError(error),
                }));
            }));
        })));
    }
}
OrderByIdEffect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderByIdEffect, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OrderByIdEffect.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderByIdEffect });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderByIdEffect, decorators: [{
            type: Injectable
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderDetailsEffect {
    constructor(actions$, orderConnector, globalMessageService, userIdService, store) {
        this.actions$ = actions$;
        this.orderConnector = orderConnector;
        this.globalMessageService = globalMessageService;
        this.userIdService = userIdService;
        this.store = store;
        this.logger = inject(LoggerService);
        this.loadOrderDetails$ = createEffect(() => this.actions$.pipe(ofType(LOAD_ORDER_DETAILS), map((action) => action.payload), switchMap((payload) => {
            return this.orderConnector
                .get(payload.userId, payload.orderCode)
                .pipe(map((order) => {
                return new LoadOrderDetailsSuccess(order);
            }), catchError((error) => of(new LoadOrderDetailsFail(normalizeHttpError(error, this.logger)))));
        })));
        this.cancelOrder$ = createEffect(() => this.actions$.pipe(ofType(CANCEL_ORDER), map((action) => action.payload), switchMap((payload) => {
            return this.orderConnector
                .cancel(payload.userId, payload.orderCode, payload.cancelRequestInput)
                .pipe(map(() => new CancelOrderSuccess()), catchError((error) => {
                var _a;
                (_a = error.error) === null || _a === void 0 ? void 0 : _a.errors.forEach((err) => this.globalMessageService.add(err.message, GlobalMessageType.MSG_TYPE_ERROR));
                return of(new CancelOrderFail(normalizeHttpError(error, this.logger)));
            }));
        })));
        this.resetOrderDetails$ = createEffect(() => this.actions$.pipe(ofType(SiteContextActions.LANGUAGE_CHANGE, SiteContextActions.CURRENCY_CHANGE), withLatestFrom(this.userIdService.getUserId(), this.store.pipe(filter((store) => { var _a; return !!((_a = store.order) === null || _a === void 0 ? void 0 : _a.orderDetail); }), map((state) => { var _a; return (_a = state.order.orderDetail.value) === null || _a === void 0 ? void 0 : _a.code; }))), switchMap(([, userId, orderCode]) => {
            if (orderCode) {
                return this.orderConnector.get(userId, orderCode).pipe(map((order) => {
                    return new LoadOrderDetailsSuccess(order);
                }), catchError((error) => of(new LoadOrderDetailsFail(normalizeHttpError(error, this.logger)))));
            }
            return EMPTY;
        })));
    }
}
OrderDetailsEffect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailsEffect, deps: [{ token: i1$1.Actions }, { token: OrderHistoryConnector }, { token: i2.GlobalMessageService }, { token: i2.UserIdService }, { token: i1.Store }], target: i0.ɵɵFactoryTarget.Injectable });
OrderDetailsEffect.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailsEffect });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderDetailsEffect, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Actions }, { type: OrderHistoryConnector }, { type: i2.GlobalMessageService }, { type: i2.UserIdService }, { type: i1.Store }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderReturnRequestEffect {
    constructor(actions$, orderConnector) {
        this.actions$ = actions$;
        this.orderConnector = orderConnector;
        this.logger = inject(LoggerService);
        this.createReturnRequest$ = createEffect(() => this.actions$.pipe(ofType(CREATE_ORDER_RETURN_REQUEST), map((action) => action.payload), switchMap((payload) => {
            return this.orderConnector
                .return(payload.userId, payload.returnRequestInput)
                .pipe(map((returnRequest) => new CreateOrderReturnRequestSuccess(returnRequest)), catchError((error) => of(new CreateOrderReturnRequestFail(normalizeHttpError(error, this.logger)))));
        })));
        this.loadReturnRequest$ = createEffect(() => this.actions$.pipe(ofType(LOAD_ORDER_RETURN_REQUEST), map((action) => action.payload), switchMap((payload) => {
            return this.orderConnector
                .getReturnRequestDetail(payload.userId, payload.returnRequestCode)
                .pipe(map((returnRequest) => new LoadOrderReturnRequestSuccess(returnRequest)), catchError((error) => of(new LoadOrderReturnRequestFail(normalizeHttpError(error, this.logger)))));
        })));
        this.cancelReturnRequest$ = createEffect(() => this.actions$.pipe(ofType(CANCEL_ORDER_RETURN_REQUEST), map((action) => action.payload), switchMap((payload) => {
            return this.orderConnector
                .cancelReturnRequest(payload.userId, payload.returnRequestCode, payload.returnRequestModification)
                .pipe(map(() => new CancelOrderReturnRequestSuccess()), catchError((error) => of(new CancelOrderReturnRequestFail(normalizeHttpError(error, this.logger)))));
        })));
        this.loadReturnRequestList$ = createEffect(() => this.actions$.pipe(ofType(LOAD_ORDER_RETURN_REQUEST_LIST), map((action) => action.payload), switchMap((payload) => {
            return this.orderConnector
                .getReturnRequestList(payload.userId, payload.pageSize, payload.currentPage, payload.sort)
                .pipe(map((returnRequestList) => new LoadOrderReturnRequestListSuccess(returnRequestList)), catchError((error) => of(new LoadOrderReturnRequestListFail(normalizeHttpError(error, this.logger)))));
        })));
    }
}
OrderReturnRequestEffect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnRequestEffect, deps: [{ token: i1$1.Actions }, { token: OrderHistoryConnector }], target: i0.ɵɵFactoryTarget.Injectable });
OrderReturnRequestEffect.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnRequestEffect });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnRequestEffect, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Actions }, { type: OrderHistoryConnector }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrdersEffect {
    constructor(actions$, orderConnector, replenishmentOrderConnector) {
        this.actions$ = actions$;
        this.orderConnector = orderConnector;
        this.replenishmentOrderConnector = replenishmentOrderConnector;
        this.logger = inject(LoggerService);
        this.loadUserOrders$ = createEffect(() => this.actions$.pipe(ofType(LOAD_USER_ORDERS), map((action) => action.payload), switchMap((payload) => {
            var _a;
            return (Boolean(payload.replenishmentOrderCode)
                ? this.replenishmentOrderConnector.loadReplenishmentDetailsHistory(payload.userId, (_a = payload.replenishmentOrderCode) !== null && _a !== void 0 ? _a : '', payload.pageSize, payload.currentPage, payload.sort)
                : this.orderConnector.getHistory(payload.userId, payload.pageSize, payload.currentPage, payload.sort)).pipe(map((orders) => {
                return new LoadUserOrdersSuccess(orders);
            }), catchError((error) => of(new LoadUserOrdersFail(normalizeHttpError(error, this.logger)))));
        })));
        this.resetUserOrders$ = createEffect(() => this.actions$.pipe(ofType(SiteContextActions.LANGUAGE_CHANGE), map(() => {
            return new ClearUserOrders();
        })));
    }
}
OrdersEffect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrdersEffect, deps: [{ token: i1$1.Actions }, { token: OrderHistoryConnector }, { token: ReplenishmentOrderHistoryConnector }], target: i0.ɵɵFactoryTarget.Injectable });
OrdersEffect.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrdersEffect });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrdersEffect, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Actions }, { type: OrderHistoryConnector }, { type: ReplenishmentOrderHistoryConnector }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReplenishmentOrderDetailsEffect {
    constructor(actions$, replenishmentOrderConnector, globalMessageService) {
        this.actions$ = actions$;
        this.replenishmentOrderConnector = replenishmentOrderConnector;
        this.globalMessageService = globalMessageService;
        this.logger = inject(LoggerService);
        this.loadReplenishmentOrderDetails$ = createEffect(() => this.actions$.pipe(ofType(LOAD_REPLENISHMENT_ORDER_DETAILS), map((action) => action.payload), switchMap((payload) => {
            return this.replenishmentOrderConnector
                .load(payload.userId, payload.replenishmentOrderCode)
                .pipe(map((replenishmentOrder) => {
                return new LoadReplenishmentOrderDetailsSuccess(replenishmentOrder);
            }), catchError((error) => of(new LoadReplenishmentOrderDetailsFail(normalizeHttpError(error, this.logger)))));
        })));
        this.cancelReplenishmentOrder$ = createEffect(() => this.actions$.pipe(ofType(CANCEL_REPLENISHMENT_ORDER), map((action) => action.payload), switchMap((payload) => {
            return this.replenishmentOrderConnector
                .cancelReplenishmentOrder(payload.userId, payload.replenishmentOrderCode)
                .pipe(map((replenishmentOrder) => new CancelReplenishmentOrderSuccess(replenishmentOrder)), catchError((error) => {
                var _a;
                (_a = error === null || error === void 0 ? void 0 : error.error) === null || _a === void 0 ? void 0 : _a.errors.forEach((err) => this.globalMessageService.add(err.message, GlobalMessageType.MSG_TYPE_ERROR));
                return of(new CancelReplenishmentOrderFail(normalizeHttpError(error, this.logger)));
            }));
        })));
    }
}
ReplenishmentOrderDetailsEffect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderDetailsEffect, deps: [{ token: i1$1.Actions }, { token: ReplenishmentOrderHistoryConnector }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
ReplenishmentOrderDetailsEffect.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderDetailsEffect });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderDetailsEffect, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Actions }, { type: ReplenishmentOrderHistoryConnector }, { type: i2.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ReplenishmentOrdersEffect {
    constructor(actions$, replenishmentOrderConnector) {
        this.actions$ = actions$;
        this.replenishmentOrderConnector = replenishmentOrderConnector;
        this.logger = inject(LoggerService);
        this.loadUserReplenishmentOrders$ = createEffect(() => this.actions$.pipe(ofType(LOAD_USER_REPLENISHMENT_ORDERS), map((action) => action.payload), switchMap((payload) => {
            return this.replenishmentOrderConnector
                .loadHistory(payload.userId, payload.pageSize, payload.currentPage, payload.sort)
                .pipe(map((orders) => {
                return new LoadUserReplenishmentOrdersSuccess(orders);
            }), catchError((error) => of(new LoadUserReplenishmentOrdersFail(normalizeHttpError(error, this.logger)))));
        })));
    }
}
ReplenishmentOrdersEffect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrdersEffect, deps: [{ token: i1$1.Actions }, { token: ReplenishmentOrderHistoryConnector }], target: i0.ɵɵFactoryTarget.Injectable });
ReplenishmentOrdersEffect.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrdersEffect });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrdersEffect, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Actions }, { type: ReplenishmentOrderHistoryConnector }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const effects = [
    OrdersEffect,
    OrderDetailsEffect,
    ConsignmentTrackingEffects,
    OrderReturnRequestEffect,
    ReplenishmentOrderDetailsEffect,
    ReplenishmentOrdersEffect,
    ConsignmentTrackingByIdEffects,
    OrderByIdEffect,
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialStateOfConsignmentTrackingById = undefined;
function reducer$7(state = initialStateOfConsignmentTrackingById, action) {
    switch (action.type) {
        case LOAD_CONSIGNMENT_TRACKING_BY_ID_SUCCESS: {
            return action.payload.consignmentTracking
                ? action.payload.consignmentTracking
                : initialStateOfConsignmentTrackingById;
        }
        case LOAD_CONSIGNMENT_TRACKING_BY_ID_FAIL: {
            return initialStateOfConsignmentTrackingById;
        }
    }
    return state;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialStateOfOrderById = undefined;
function reducer$6(state = initialStateOfOrderById, action) {
    switch (action.type) {
        case LOAD_ORDER_BY_ID_SUCCESS: {
            return action.payload ? action.payload : initialStateOfOrderById;
        }
        case LOAD_ORDER_BY_ID_FAIL: {
            return initialStateOfOrderById;
        }
    }
    return state;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialState$5 = { tracking: {} };
function reducer$5(state = initialState$5, action) {
    switch (action.type) {
        case LOAD_CONSIGNMENT_TRACKING_SUCCESS: {
            const tracking = action.payload;
            return {
                tracking,
            };
        }
        case CLEAR_CONSIGNMENT_TRACKING: {
            return initialState$5;
        }
    }
    return state;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialState$4 = {};
function reducer$4(state = initialState$4, action) {
    switch (action.type) {
        case LOAD_ORDER_DETAILS_SUCCESS: {
            const order = action.payload;
            return order;
        }
    }
    return state;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialState$3 = {
    returnRequests: [],
    pagination: {},
    sorts: [],
};
function reducer$3(state = initialState$3, action) {
    switch (action.type) {
        case LOAD_ORDER_RETURN_REQUEST_LIST_SUCCESS: {
            return action.payload ? action.payload : initialState$3;
        }
    }
    return state;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialState$2 = {
    orders: [],
    pagination: {},
    sorts: [],
};
function reducer$2(state = initialState$2, action) {
    switch (action.type) {
        case LOAD_USER_ORDERS_SUCCESS: {
            return action.payload ? action.payload : initialState$2;
        }
        case LOAD_USER_ORDERS_FAIL: {
            return initialState$2;
        }
    }
    return state;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialState$1 = {};
function reducer$1(state = initialState$1, action) {
    switch (action.type) {
        case LOAD_REPLENISHMENT_ORDER_DETAILS_SUCCESS:
        case CANCEL_REPLENISHMENT_ORDER_SUCCESS: {
            return action.payload ? action.payload : initialState$1;
        }
        default: {
            return state;
        }
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialState = {
    replenishmentOrders: [],
    pagination: {},
    sorts: [],
};
function reducer(state = initialState, action) {
    var _a;
    switch (action.type) {
        case LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS: {
            return action.payload ? action.payload : initialState;
        }
        case CANCEL_REPLENISHMENT_ORDER_SUCCESS: {
            const cancelledReplenishmentOrder = action.payload;
            const userReplenishmentOrders = [...((_a = state.replenishmentOrders) !== null && _a !== void 0 ? _a : [])];
            const index = userReplenishmentOrders.findIndex((replenishmentOrder) => replenishmentOrder.replenishmentOrderCode ===
                cancelledReplenishmentOrder.replenishmentOrderCode);
            if (index === -1) {
                return initialState;
            }
            else {
                userReplenishmentOrders[index] = Object.assign({}, cancelledReplenishmentOrder);
            }
            return Object.assign(Object.assign({}, state), { replenishmentOrders: userReplenishmentOrders });
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
        orders: StateUtils.loaderReducer(ORDERS, reducer$2),
        orderDetail: StateUtils.loaderReducer(ORDER_DETAILS, reducer$4),
        replenishmentOrders: StateUtils.loaderReducer(REPLENISHMENT_ORDERS, reducer),
        orderReturn: StateUtils.loaderReducer(RETURN_REQUEST_DETAILS),
        orderReturnList: StateUtils.loaderReducer(RETURN_REQUESTS, reducer$3),
        consignmentTracking: reducer$5,
        replenishmentOrder: StateUtils.loaderReducer(REPLENISHMENT_ORDER_DETAILS, reducer$1),
        orderById: StateUtils.entityLoaderReducer(ORDER_BY_ID_ENTITIES, reducer$6),
        consignmentTrackingById: StateUtils.entityLoaderReducer(CONSIGNMENT_TRACKING_BY_ID_ENTITIES, reducer$7),
    };
}
const reducerToken = new InjectionToken('OrderReducers');
const reducerProvider = {
    provide: reducerToken,
    useFactory: getReducers,
};

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
class MyAccountV2OrderHistoryService {
    constructor() {
        this.orderReturnRequestService = inject(OrderReturnRequestService);
        this.store = inject(Store);
        this.userIdService = inject(UserIdService);
        this.orderHistoryService = inject(OrderHistoryService);
    }
    clearOrderList() {
        this.orderHistoryService.clearOrderList();
    }
    getOrderDetailsWithTracking(orderCode) {
        return this.getOrderDetails(orderCode).pipe(switchMap((order) => {
            var _a;
            //-----------------> filling consignment tracking
            const orderView = Object.assign({}, order);
            orderView.consignments = [];
            const requests = ((_a = order.consignments) !== null && _a !== void 0 ? _a : []).map((consignment) => {
                var _a, _b;
                const consignmentView = Object.assign({}, consignment);
                if (consignment.code && consignment.trackingID) {
                    return this.getConsignmentTracking((_a = order === null || order === void 0 ? void 0 : order.code) !== null && _a !== void 0 ? _a : '', consignment.code).pipe(map((trackingInfo) => {
                        var _a;
                        consignmentView.consignmentTracking = trackingInfo;
                        (_a = orderView.consignments) === null || _a === void 0 ? void 0 : _a.push(consignmentView);
                        return orderView;
                    }));
                }
                else {
                    (_b = orderView.consignments) === null || _b === void 0 ? void 0 : _b.push(consignmentView);
                    return of(orderView);
                }
            });
            if (requests === undefined || requests.length < 1) {
                return of(orderView);
            }
            return combineLatest(requests).pipe(switchMap((orders) => {
                if (orders !== undefined) {
                    return of(orders[0]);
                }
                else {
                    return of(order);
                }
            }));
            //<-----------------
        }));
    }
    getOrderHistoryListWithDetails(pageSize) {
        const orderListView = {};
        return this.orderHistoryService.getOrderHistoryList(pageSize).pipe(switchMap((orderList) => {
            var _a;
            orderListView.pagination = orderList === null || orderList === void 0 ? void 0 : orderList.pagination;
            orderListView.sorts = orderList === null || orderList === void 0 ? void 0 : orderList.sorts;
            orderListView.orders = [];
            const requests = ((_a = orderList === null || orderList === void 0 ? void 0 : orderList.orders) !== null && _a !== void 0 ? _a : []).map((order) => {
                var _a;
                const orderView = Object.assign({}, order);
                return this.getOrderDetailsWithTracking((_a = order === null || order === void 0 ? void 0 : order.code) !== null && _a !== void 0 ? _a : '').pipe(map((orderDetail) => {
                    var _a;
                    /** filling extra fields ---> */
                    orderView.returnable = orderDetail === null || orderDetail === void 0 ? void 0 : orderDetail.returnable;
                    orderView.totalItems = orderDetail === null || orderDetail === void 0 ? void 0 : orderDetail.totalItems;
                    orderView.entries = orderDetail === null || orderDetail === void 0 ? void 0 : orderDetail.entries;
                    orderView.consignments = orderDetail === null || orderDetail === void 0 ? void 0 : orderDetail.consignments;
                    orderView.unconsignedEntries = orderDetail === null || orderDetail === void 0 ? void 0 : orderDetail.unconsignedEntries;
                    orderView.returnRequests = [];
                    /** filling extra fields <--- */
                    (_a = orderListView.orders) === null || _a === void 0 ? void 0 : _a.push(orderView);
                    return orderListView;
                }));
            });
            if (requests.length === 0) {
                // in case of no order
                requests.push(of(orderListView));
            }
            return combineLatest(requests);
        }), map((requests) => {
            if (requests !== undefined) {
                return requests[0];
            }
            else {
                return {};
            }
        }));
    }
    getOrderHistoryList(pageSize) {
        const orderHistoryListRequest = this.getOrderHistoryListWithDetails(pageSize);
        const returnRequestListRequest = this.orderReturnRequestService.getOrderReturnRequestList();
        return combineLatest([
            orderHistoryListRequest,
            returnRequestListRequest,
        ]).pipe(switchMap((responses) => {
            var _a, _b;
            const returnRequests = (_a = responses === null || responses === void 0 ? void 0 : responses[1]) === null || _a === void 0 ? void 0 : _a.returnRequests;
            const orderHistory = responses === null || responses === void 0 ? void 0 : responses[0];
            if (returnRequests && (orderHistory === null || orderHistory === void 0 ? void 0 : orderHistory.orders)) {
                if (((_b = orderHistory.pagination) === null || _b === void 0 ? void 0 : _b.totalResults) === 0) {
                    return of(orderHistory);
                }
                return orderHistory.orders.map((order) => {
                    const returnItems = returnRequests === null || returnRequests === void 0 ? void 0 : returnRequests.filter((returnItem) => { var _a; return ((_a = returnItem.order) === null || _a === void 0 ? void 0 : _a.code) === order.code; });
                    if (returnItems) {
                        order.returnRequests = returnItems;
                    }
                    return orderHistory;
                });
            }
            else {
                return of(orderHistory);
            }
        }));
    }
    getOrderDetailsValue(code) {
        return this.store
            .select(getOrderById(code))
            .pipe(filter((order) => Boolean(order)));
    }
    getOrderDetailsState(code) {
        return this.store.select(getOrderByIdEntity(code));
    }
    loadOrderDetails(code) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => this.store.dispatch(new LoadOrderById({
                userId,
                code,
            })),
        });
    }
    getOrderDetails(code) {
        const loading$ = this.getOrderDetailsState(code).pipe(auditTime(0), tap((state) => {
            if (!(state.loading || state.success || state.error)) {
                this.loadOrderDetails(code);
            }
        }));
        return using(() => loading$.subscribe(), () => this.getOrderDetailsValue(code));
    }
    getConsignmentTrackingValue(orderCode, consignmentCode) {
        return this.store
            .select(getConsignmentTrackingById(orderCode, consignmentCode))
            .pipe(filter((tracking) => Boolean(tracking)));
    }
    getConsignmentTrackingState(orderCode, consignmentCode) {
        return this.store.select(getConsignmentTrackingByIdEntity(orderCode, consignmentCode));
    }
    loadConsignmentTracking(orderCode, consignmentCode) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => this.store.dispatch(new LoadConsignmentTrackingById({
                orderCode,
                consignmentCode,
                userId,
            })),
        });
    }
    getConsignmentTracking(orderCode, consignmentCode) {
        const loading$ = this.getConsignmentTrackingState(orderCode, consignmentCode).pipe(auditTime(0), tap((state) => {
            if (!(state.loading || state.success || state.error)) {
                this.loadConsignmentTracking(orderCode, consignmentCode);
            }
        }));
        return using(() => loading$.subscribe(), () => this.getConsignmentTrackingValue(orderCode, consignmentCode));
    }
}
MyAccountV2OrderHistoryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrderHistoryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MyAccountV2OrderHistoryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrderHistoryService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrderHistoryService, decorators: [{
            type: Injectable
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
const facadeProviders = [
    OrderReturnRequestService,
    {
        provide: OrderReturnRequestFacade,
        useExisting: OrderReturnRequestService,
    },
    MyAccountV2OrderHistoryService,
    OrderHistoryService,
    {
        provide: OrderHistoryFacade,
        useExisting: OrderHistoryService,
    },
    ReplenishmentOrderHistoryService,
    {
        provide: ReplenishmentOrderHistoryFacade,
        useExisting: ReplenishmentOrderHistoryService,
    },
    ScheduledReplenishmentOrderService,
    {
        provide: ScheduledReplenishmentOrderFacade,
        useExisting: ScheduledReplenishmentOrderService,
    },
    OrderService,
    {
        provide: OrderFacade,
        useExisting: OrderService,
    },
    ReorderOrderService,
    {
        provide: ReorderOrderFacade,
        useExisting: ReorderOrderService,
    },
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderStoreModule {
}
OrderStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderStoreModule, imports: [i1$1.EffectsFeatureModule, i1.StoreFeatureModule] });
OrderStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderStoreModule, providers: [reducerProvider], imports: [EffectsModule.forFeature(effects),
        StoreModule.forFeature(ORDER_FEATURE, reducerToken)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        EffectsModule.forFeature(effects),
                        StoreModule.forFeature(ORDER_FEATURE, reducerToken),
                    ],
                    providers: [reducerProvider],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderCoreModule {
}
OrderCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderCoreModule, imports: [OrderStoreModule] });
OrderCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderCoreModule, providers: [
        ...facadeProviders,
        OrderHistoryConnector,
        ReplenishmentOrderHistoryConnector,
        OrderConnector,
        ScheduledReplenishmentOrderConnector,
        ReorderOrderConnector,
    ], imports: [OrderStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OrderStoreModule],
                    providers: [
                        ...facadeProviders,
                        OrderHistoryConnector,
                        ReplenishmentOrderHistoryConnector,
                        OrderConnector,
                        ScheduledReplenishmentOrderConnector,
                        ReorderOrderConnector,
                    ],
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

export { CANCEL_ORDER_PROCESS_ID, CANCEL_REPLENISHMENT_ORDER_PROCESS_ID, CANCEL_RETURN_PROCESS_ID, CONSIGNMENT_TRACKING_BY_ID_ENTITIES, MyAccountV2OrderHistoryService, ORDERS, ORDER_BY_ID_ENTITIES, ORDER_DETAILS, ORDER_FEATURE, orderGroup_actions as OrderActions, OrderAdapter, OrderConnector, OrderCoreModule, OrderHistoryAdapter, OrderHistoryConnector, OrderHistoryService, OrderReturnRequestService, orderGroup_selectors as OrderSelectors, OrderService, REPLENISHMENT_ORDERS, REPLENISHMENT_ORDER_DETAILS, RETURN_REQUESTS, RETURN_REQUEST_DETAILS, ReorderOrderAdapter, ReorderOrderConnector, ReorderOrderService, ReplenishmentOrderHistoryAdapter, ReplenishmentOrderHistoryConnector, ReplenishmentOrderHistoryService, ScheduledReplenishmentOrderAdapter, ScheduledReplenishmentOrderConnector, ScheduledReplenishmentOrderService, getConsignmentTrackingByIdEntityKey };
//# sourceMappingURL=spartacus-order-core.mjs.map
