import * as i0 from '@angular/core';
import { Injectable, inject, InjectionToken, NgModule, Optional, isDevMode } from '@angular/core';
import * as i2 from '@spartacus/core';
import { StateUtils, PROCESS_FEATURE, SiteContextActions, LoggerService, normalizeHttpError, withdrawOn, GlobalMessageType, OCC_USER_ID_ANONYMOUS, EMAIL_PATTERN, OCC_CART_ID_CURRENT, isNotUndefined, AuthActions, BASE_SITE_CONTEXT_ID, StorageSyncType, MODULE_INITIALIZER, ConfigInitializerService, createFrom, OAUTH_REDIRECT_FLOW_KEY, getLastValueSync, OCC_USER_ID_GUEST, CommandStrategy, ProcessSelectors, HttpErrorHandler, HttpResponseStatus, StateModule } from '@spartacus/core';
import * as i1$1 from '@ngrx/store';
import { createFeatureSelector, createSelector, select, META_REDUCERS, StoreModule } from '@ngrx/store';
import * as i1$2 from '@spartacus/cart/base/root';
import { CartType, CartAddEntryEvent, CartAddEntrySuccessEvent, CartAddEntryFailEvent, CartRemoveEntrySuccessEvent, CartRemoveEntryFailEvent, CartUpdateEntrySuccessEvent, CartUpdateEntryFailEvent, MergeCartSuccessEvent, CreateCartEvent, CreateCartSuccessEvent, CreateCartFailEvent, DeleteCartEvent, DeleteCartSuccessEvent, DeleteCartFailEvent, AddCartVoucherEvent, AddCartVoucherSuccessEvent, AddCartVoucherFailEvent, RemoveCartVoucherEvent, RemoveCartVoucherSuccessEvent, RemoveCartVoucherFailEvent, CartPageEvent, ActiveCartFacade, CartVoucherFacade, MultiCartFacade, SelectiveCartFacade, CartValidationFacade, CartValidationStatusCode, ProductImportStatus } from '@spartacus/cart/base/root';
import { map, concatMap, catchError, mergeMap, groupBy, switchMap, withLatestFrom, filter, distinctUntilKeyChanged, tap, take, distinctUntilChanged, shareReplay, pairwise, debounce } from 'rxjs/operators';
import { from, of, Subscription, using, combineLatest, ReplaySubject, timer, EMPTY } from 'rxjs';
import * as i1 from '@ngrx/effects';
import { ofType, createEffect, EffectsModule } from '@ngrx/effects';
import { NavigationEvent } from '@spartacus/storefront';
import * as i1$3 from '@spartacus/user/profile/root';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/router';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const MULTI_CART_FEATURE = 'cart';
const MULTI_CART_DATA = '[Multi Cart] Multi Cart Data';
/**
 * Add voucher process const
 */
const ADD_VOUCHER_PROCESS_ID = 'addVoucher';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CART_ADD_ENTRY = '[Cart-entry] Add Entry';
const CART_ADD_ENTRY_SUCCESS = '[Cart-entry] Add Entry Success';
const CART_ADD_ENTRY_FAIL = '[Cart-entry] Add Entry Fail';
const CART_REMOVE_ENTRY = '[Cart-entry] Remove Entry';
const CART_REMOVE_ENTRY_SUCCESS = '[Cart-entry] Remove Entry Success';
const CART_REMOVE_ENTRY_FAIL = '[Cart-entry] Remove Entry Fail';
const CART_UPDATE_ENTRY = '[Cart-entry] Update Entry';
const CART_UPDATE_ENTRY_SUCCESS = '[Cart-entry] Update Entry Success';
const CART_UPDATE_ENTRY_FAIL = '[Cart-entry] Update Entry Fail';
class CartAddEntry extends StateUtils.EntityProcessesIncrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = CART_ADD_ENTRY;
    }
}
class CartAddEntrySuccess extends StateUtils.EntityProcessesDecrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = CART_ADD_ENTRY_SUCCESS;
    }
}
class CartAddEntryFail extends StateUtils.EntityProcessesDecrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = CART_ADD_ENTRY_FAIL;
    }
}
class CartRemoveEntry extends StateUtils.EntityProcessesIncrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = CART_REMOVE_ENTRY;
    }
}
class CartRemoveEntrySuccess extends StateUtils.EntityProcessesDecrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = CART_REMOVE_ENTRY_SUCCESS;
    }
}
class CartRemoveEntryFail extends StateUtils.EntityProcessesDecrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = CART_REMOVE_ENTRY_FAIL;
    }
}
class CartUpdateEntry extends StateUtils.EntityProcessesIncrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = CART_UPDATE_ENTRY;
    }
}
class CartUpdateEntrySuccess extends StateUtils.EntityProcessesDecrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = CART_UPDATE_ENTRY_SUCCESS;
    }
}
class CartUpdateEntryFail extends StateUtils.EntityProcessesDecrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = CART_UPDATE_ENTRY_FAIL;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CART_ADD_VOUCHER = '[Cart-voucher] Add Cart Vouchers';
const CART_ADD_VOUCHER_FAIL = '[Cart-voucher] Add Cart Voucher Fail';
const CART_ADD_VOUCHER_SUCCESS = '[Cart-voucher] Add Cart Voucher Success';
const CART_RESET_ADD_VOUCHER = '[Cart-voucher] Reset Add Cart Voucher';
const CART_REMOVE_VOUCHER = '[Cart-voucher] Remove Cart Voucher';
const CART_REMOVE_VOUCHER_FAIL = '[Cart-voucher] Remove Cart Voucher Fail';
const CART_REMOVE_VOUCHER_SUCCESS = '[Cart-voucher] Remove Cart Voucher Success';
// Adding cart voucher actions
class CartAddVoucher extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID);
        this.payload = payload;
        this.type = CART_ADD_VOUCHER;
    }
}
class CartAddVoucherFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID, payload.error);
        this.payload = payload;
        this.type = CART_ADD_VOUCHER_FAIL;
    }
}
class CartAddVoucherSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID);
        this.payload = payload;
        this.type = CART_ADD_VOUCHER_SUCCESS;
    }
}
/**
 * Resets add voucher process
 */
class CartResetAddVoucher extends StateUtils.EntityLoaderResetAction {
    constructor() {
        super(PROCESS_FEATURE, ADD_VOUCHER_PROCESS_ID);
        this.type = CART_RESET_ADD_VOUCHER;
    }
}
// Deleting cart voucher
class CartRemoveVoucher extends StateUtils.EntityProcessesIncrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = CART_REMOVE_VOUCHER;
    }
}
class CartRemoveVoucherFail extends StateUtils.EntityProcessesDecrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = CART_REMOVE_VOUCHER_FAIL;
    }
}
class CartRemoveVoucherSuccess extends StateUtils.EntityProcessesDecrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = CART_REMOVE_VOUCHER_SUCCESS;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CREATE_CART = '[Cart] Create Cart';
const CREATE_CART_FAIL = '[Cart] Create Cart Fail';
const CREATE_CART_SUCCESS = '[Cart] Create Cart Success';
const LOAD_CART = '[Cart] Load Cart';
const LOAD_CART_FAIL = '[Cart] Load Cart Fail';
const LOAD_CART_SUCCESS = '[Cart] Load Cart Success';
const LOAD_CARTS_SUCCESS = '[Cart] Load Carts Success';
const ADD_EMAIL_TO_CART = '[Cart] Add Email to Cart';
const ADD_EMAIL_TO_CART_FAIL = '[Cart] Add Email to Cart Fail';
const ADD_EMAIL_TO_CART_SUCCESS = '[Cart] Add Email to Cart Success';
const MERGE_CART = '[Cart] Merge Cart';
const MERGE_CART_SUCCESS = '[Cart] Merge Cart Success';
const RESET_CART_DETAILS = '[Cart] Reset Cart Details';
const REMOVE_CART = '[Cart] Remove Cart';
const DELETE_CART = '[Cart] Delete Cart';
const DELETE_CART_SUCCESS = '[Cart] Delete Cart Success';
const DELETE_CART_FAIL = '[Cart] Delete Cart Fail';
class CreateCart extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.tempCartId);
        this.payload = payload;
        this.type = CREATE_CART;
    }
}
class CreateCartFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.tempCartId);
        this.payload = payload;
        this.type = CREATE_CART_FAIL;
    }
}
class CreateCartSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = CREATE_CART_SUCCESS;
    }
}
class AddEmailToCart extends StateUtils.EntityProcessesIncrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = ADD_EMAIL_TO_CART;
    }
}
class AddEmailToCartFail extends StateUtils.EntityProcessesDecrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = ADD_EMAIL_TO_CART_FAIL;
    }
}
class AddEmailToCartSuccess extends StateUtils.EntityProcessesDecrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = ADD_EMAIL_TO_CART_SUCCESS;
    }
}
class LoadCart extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = LOAD_CART;
    }
}
class LoadCartFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId, payload.error);
        this.payload = payload;
        this.type = LOAD_CART_FAIL;
    }
}
class LoadCartSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = LOAD_CART_SUCCESS;
    }
}
class LoadCartsSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.map((cart) => cart?.code ?? ''));
        this.payload = payload;
        this.type = LOAD_CARTS_SUCCESS;
    }
}
class MergeCart {
    constructor(payload) {
        this.payload = payload;
        this.type = MERGE_CART;
    }
}
class MergeCartSuccess extends StateUtils.EntityRemoveAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.oldCartId);
        this.payload = payload;
        this.type = MERGE_CART_SUCCESS;
    }
}
/**
 * On site context change we want to keep current list of entities, but we want to clear the value and flags.
 * With ProcessesLoaderResetAction we run it on every entity of this type.
 */
class ResetCartDetails extends StateUtils.ProcessesLoaderResetAction {
    constructor() {
        super(MULTI_CART_DATA);
        this.type = RESET_CART_DETAILS;
    }
}
/**
 * Used for cleaning cart in local state, when we get information that it no longer exists in the backend.
 * For removing particular cart in both places use DeleteCart actions.
 */
class RemoveCart extends StateUtils.EntityRemoveAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = REMOVE_CART;
    }
}
class DeleteCart {
    constructor(payload) {
        this.payload = payload;
        this.type = DELETE_CART;
    }
}
class DeleteCartSuccess extends StateUtils.EntityRemoveAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = DELETE_CART_SUCCESS;
    }
}
class DeleteCartFail {
    constructor(payload) {
        this.payload = payload;
        this.type = DELETE_CART_FAIL;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CART_PROCESSES_INCREMENT = '[Cart] Cart Processes Increment';
const CART_PROCESSES_DECREMENT = '[Cart] Cart Processes Decrement';
const SET_ACTIVE_CART_ID = '[Cart] Set Active Cart Id';
const CLEAR_CART_STATE = '[Cart] Clear Cart State';
const SET_CART_TYPE_INDEX = '[Cart] Set cart type index';
const SET_CART_DATA = '[Cart] Set cart data';
/**
 * Increases process counter on cart entities
 * All actions that cause computations on cart should extend EntityProcessesIncrementAction instead of dispatching this action.
 */
class CartProcessesIncrement extends StateUtils.EntityProcessesIncrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload);
        this.payload = payload;
        this.type = CART_PROCESSES_INCREMENT;
    }
}
/**
 * Decrement process counter on cart entities
 * All actions that cause computations on cart should extend EntityProcessesDecrementAction instead of dispatching this action.
 */
class CartProcessesDecrement extends StateUtils.EntityProcessesDecrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload);
        this.payload = payload;
        this.type = CART_PROCESSES_DECREMENT;
    }
}
/**
 * Only sets active cart property with id of active cart. Then services take care of loading that cart.
 */
class SetActiveCartId {
    constructor(payload) {
        this.payload = payload;
        this.type = SET_ACTIVE_CART_ID;
    }
}
/**
 * Clear whole cart store state: all entities + reset rest of the cart state.
 */
class ClearCartState extends StateUtils.EntityRemoveAllAction {
    constructor() {
        super(MULTI_CART_DATA);
        this.type = CLEAR_CART_STATE;
    }
}
class SetCartTypeIndex {
    constructor(payload) {
        this.payload = payload;
        this.type = SET_CART_TYPE_INDEX;
    }
}
class SetCartData extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = SET_CART_DATA;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

var cartGroup_actions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ADD_EMAIL_TO_CART: ADD_EMAIL_TO_CART,
    ADD_EMAIL_TO_CART_FAIL: ADD_EMAIL_TO_CART_FAIL,
    ADD_EMAIL_TO_CART_SUCCESS: ADD_EMAIL_TO_CART_SUCCESS,
    AddEmailToCart: AddEmailToCart,
    AddEmailToCartFail: AddEmailToCartFail,
    AddEmailToCartSuccess: AddEmailToCartSuccess,
    CART_ADD_ENTRY: CART_ADD_ENTRY,
    CART_ADD_ENTRY_FAIL: CART_ADD_ENTRY_FAIL,
    CART_ADD_ENTRY_SUCCESS: CART_ADD_ENTRY_SUCCESS,
    CART_ADD_VOUCHER: CART_ADD_VOUCHER,
    CART_ADD_VOUCHER_FAIL: CART_ADD_VOUCHER_FAIL,
    CART_ADD_VOUCHER_SUCCESS: CART_ADD_VOUCHER_SUCCESS,
    CART_PROCESSES_DECREMENT: CART_PROCESSES_DECREMENT,
    CART_PROCESSES_INCREMENT: CART_PROCESSES_INCREMENT,
    CART_REMOVE_ENTRY: CART_REMOVE_ENTRY,
    CART_REMOVE_ENTRY_FAIL: CART_REMOVE_ENTRY_FAIL,
    CART_REMOVE_ENTRY_SUCCESS: CART_REMOVE_ENTRY_SUCCESS,
    CART_REMOVE_VOUCHER: CART_REMOVE_VOUCHER,
    CART_REMOVE_VOUCHER_FAIL: CART_REMOVE_VOUCHER_FAIL,
    CART_REMOVE_VOUCHER_SUCCESS: CART_REMOVE_VOUCHER_SUCCESS,
    CART_RESET_ADD_VOUCHER: CART_RESET_ADD_VOUCHER,
    CART_UPDATE_ENTRY: CART_UPDATE_ENTRY,
    CART_UPDATE_ENTRY_FAIL: CART_UPDATE_ENTRY_FAIL,
    CART_UPDATE_ENTRY_SUCCESS: CART_UPDATE_ENTRY_SUCCESS,
    CLEAR_CART_STATE: CLEAR_CART_STATE,
    CREATE_CART: CREATE_CART,
    CREATE_CART_FAIL: CREATE_CART_FAIL,
    CREATE_CART_SUCCESS: CREATE_CART_SUCCESS,
    CartAddEntry: CartAddEntry,
    CartAddEntryFail: CartAddEntryFail,
    CartAddEntrySuccess: CartAddEntrySuccess,
    CartAddVoucher: CartAddVoucher,
    CartAddVoucherFail: CartAddVoucherFail,
    CartAddVoucherSuccess: CartAddVoucherSuccess,
    CartProcessesDecrement: CartProcessesDecrement,
    CartProcessesIncrement: CartProcessesIncrement,
    CartRemoveEntry: CartRemoveEntry,
    CartRemoveEntryFail: CartRemoveEntryFail,
    CartRemoveEntrySuccess: CartRemoveEntrySuccess,
    CartRemoveVoucher: CartRemoveVoucher,
    CartRemoveVoucherFail: CartRemoveVoucherFail,
    CartRemoveVoucherSuccess: CartRemoveVoucherSuccess,
    CartResetAddVoucher: CartResetAddVoucher,
    CartUpdateEntry: CartUpdateEntry,
    CartUpdateEntryFail: CartUpdateEntryFail,
    CartUpdateEntrySuccess: CartUpdateEntrySuccess,
    ClearCartState: ClearCartState,
    CreateCart: CreateCart,
    CreateCartFail: CreateCartFail,
    CreateCartSuccess: CreateCartSuccess,
    DELETE_CART: DELETE_CART,
    DELETE_CART_FAIL: DELETE_CART_FAIL,
    DELETE_CART_SUCCESS: DELETE_CART_SUCCESS,
    DeleteCart: DeleteCart,
    DeleteCartFail: DeleteCartFail,
    DeleteCartSuccess: DeleteCartSuccess,
    LOAD_CART: LOAD_CART,
    LOAD_CARTS_SUCCESS: LOAD_CARTS_SUCCESS,
    LOAD_CART_FAIL: LOAD_CART_FAIL,
    LOAD_CART_SUCCESS: LOAD_CART_SUCCESS,
    LoadCart: LoadCart,
    LoadCartFail: LoadCartFail,
    LoadCartSuccess: LoadCartSuccess,
    LoadCartsSuccess: LoadCartsSuccess,
    MERGE_CART: MERGE_CART,
    MERGE_CART_SUCCESS: MERGE_CART_SUCCESS,
    MergeCart: MergeCart,
    MergeCartSuccess: MergeCartSuccess,
    REMOVE_CART: REMOVE_CART,
    RESET_CART_DETAILS: RESET_CART_DETAILS,
    RemoveCart: RemoveCart,
    ResetCartDetails: ResetCartDetails,
    SET_ACTIVE_CART_ID: SET_ACTIVE_CART_ID,
    SET_CART_DATA: SET_CART_DATA,
    SET_CART_TYPE_INDEX: SET_CART_TYPE_INDEX,
    SetActiveCartId: SetActiveCartId,
    SetCartData: SetCartData,
    SetCartTypeIndex: SetCartTypeIndex
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
class CartEntryAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartEntryConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    add(userId, cartId, productCode, quantity, pickupStore) {
        return this.adapter.add(userId, cartId, productCode, quantity, pickupStore);
    }
    update(userId, cartId, entryNumber, qty, pickupStore, pickupToDelivery = false) {
        return this.adapter.update(userId, cartId, entryNumber, qty, pickupStore, pickupToDelivery);
    }
    remove(userId, cartId, entryNumber) {
        return this.adapter.remove(userId, cartId, entryNumber);
    }
}
CartEntryConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartEntryConnector, deps: [{ token: CartEntryAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
CartEntryConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartEntryConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartEntryConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CartEntryAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartEntryEffects {
    constructor(actions$, cartEntryConnector) {
        this.actions$ = actions$;
        this.cartEntryConnector = cartEntryConnector;
        this.contextChange$ = this.actions$.pipe(ofType(SiteContextActions.CURRENCY_CHANGE, SiteContextActions.LANGUAGE_CHANGE));
        this.logger = inject(LoggerService);
        this.addEntry$ = createEffect(() => this.actions$.pipe(ofType(CART_ADD_ENTRY), map((action) => action.payload), concatMap((payload) => {
            return this.cartEntryConnector
                .add(payload.userId, payload.cartId, payload.productCode, payload.quantity, payload.pickupStore)
                .pipe(map((cartModification) => new CartAddEntrySuccess({
                ...payload,
                ...cartModification,
            })), catchError((error) => from([
                new CartAddEntryFail({
                    ...payload,
                    error: normalizeHttpError(error, this.logger),
                }),
                new LoadCart({
                    cartId: payload.cartId,
                    userId: payload.userId,
                }),
            ])));
        }), withdrawOn(this.contextChange$)));
        this.removeEntry$ = createEffect(() => this.actions$.pipe(ofType(CART_REMOVE_ENTRY), map((action) => action.payload), concatMap((payload) => this.cartEntryConnector
            .remove(payload.userId, payload.cartId, payload.entryNumber)
            .pipe(map(() => {
            return new CartRemoveEntrySuccess({
                ...payload,
            });
        }), catchError((error) => from([
            new CartRemoveEntryFail({
                ...payload,
                error: normalizeHttpError(error, this.logger),
            }),
            new LoadCart({
                cartId: payload.cartId,
                userId: payload.userId,
            }),
        ])))), withdrawOn(this.contextChange$)));
        this.updateEntry$ = createEffect(() => this.actions$.pipe(ofType(CART_UPDATE_ENTRY), map((action) => action.payload), concatMap((payload) => this.cartEntryConnector
            .update(payload.userId, payload.cartId, payload.entryNumber, payload.quantity, payload.pickupStore, payload.pickupToDelivery)
            .pipe(map(() => {
            return new CartUpdateEntrySuccess({
                ...payload,
            });
        }), catchError((error) => from([
            new CartUpdateEntryFail({
                ...payload,
                error: normalizeHttpError(error, this.logger),
            }),
            new LoadCart({
                cartId: payload.cartId,
                userId: payload.userId,
            }),
        ])))), withdrawOn(this.contextChange$)));
    }
}
CartEntryEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartEntryEffects, deps: [{ token: i1.Actions }, { token: CartEntryConnector }], target: i0.ɵɵFactoryTarget.Injectable });
CartEntryEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartEntryEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartEntryEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: CartEntryConnector }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartVoucherAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartVoucherConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    add(userId, cartId, voucherId) {
        return this.adapter.add(userId, cartId, voucherId);
    }
    remove(userId, cartId, voucherId) {
        return this.adapter.remove(userId, cartId, voucherId);
    }
}
CartVoucherConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartVoucherConnector, deps: [{ token: CartVoucherAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
CartVoucherConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartVoucherConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartVoucherConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CartVoucherAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartVoucherEffects {
    constructor(actions$, cartVoucherConnector, messageService) {
        this.actions$ = actions$;
        this.cartVoucherConnector = cartVoucherConnector;
        this.messageService = messageService;
        this.logger = inject(LoggerService);
        this.addCartVoucher$ = createEffect(() => this.actions$.pipe(ofType(CART_ADD_VOUCHER), map((action) => action.payload), mergeMap((payload) => {
            return this.cartVoucherConnector
                .add(payload.userId, payload.cartId, payload.voucherId)
                .pipe(map(() => {
                this.showGlobalMessage('voucher.applyVoucherSuccess', payload.voucherId, GlobalMessageType.MSG_TYPE_CONFIRMATION);
                return new CartAddVoucherSuccess({
                    ...payload,
                });
            }), catchError((error) => from([
                new CartAddVoucherFail({
                    ...payload,
                    error: normalizeHttpError(error, this.logger),
                }),
                new CartProcessesDecrement(payload.cartId),
                new LoadCart({
                    userId: payload.userId,
                    cartId: payload.cartId,
                }),
            ])));
        })));
        this.removeCartVoucher$ = createEffect(() => this.actions$.pipe(ofType(CART_REMOVE_VOUCHER), map((action) => action.payload), mergeMap((payload) => {
            return this.cartVoucherConnector
                .remove(payload.userId, payload.cartId, payload.voucherId)
                .pipe(map(() => {
                this.showGlobalMessage('voucher.removeVoucherSuccess', payload.voucherId, GlobalMessageType.MSG_TYPE_INFO);
                return new CartRemoveVoucherSuccess({
                    userId: payload.userId,
                    cartId: payload.cartId,
                    voucherId: payload.voucherId,
                });
            }), catchError((error) => from([
                new CartRemoveVoucherFail({
                    error: normalizeHttpError(error, this.logger),
                    cartId: payload.cartId,
                    userId: payload.userId,
                    voucherId: payload.voucherId,
                }),
                new LoadCart({
                    userId: payload.userId,
                    cartId: payload.cartId,
                }),
            ])));
        })));
    }
    showGlobalMessage(text, param, messageType) {
        this.messageService.add({ key: text, params: { voucherCode: param } }, messageType);
    }
}
CartVoucherEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartVoucherEffects, deps: [{ token: i1.Actions }, { token: CartVoucherConnector }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
CartVoucherEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartVoucherEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartVoucherEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: CartVoucherConnector }, { type: i2.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Extract cart identifier for current user. Anonymous calls use `guid` and for logged users `code` is used.
 */
function getCartIdByUserId(cart, userId) {
    if (userId === OCC_USER_ID_ANONYMOUS) {
        return cart?.guid ?? '';
    }
    return cart?.code ?? '';
}
/**
 * Check if cart is selective (save for later) based on id.
 */
function isSelectiveCart(cartId = '') {
    return cartId.startsWith('selectivecart');
}
/**
 * Check if the returned error is of type notFound.
 *
 * We additionally check if the cart is not a selective cart.
 * For selective cart this error can happen only when extension is disabled.
 * It should never happen, because in that case, selective cart should also be disabled in our configuration.
 * However if that happens we want to handle these errors silently.
 */
function isCartNotFoundError(error) {
    return (error.reason === 'notFound' &&
        error.subjectType === 'cart' &&
        !isSelectiveCart(error.subject));
}
function voucherExceededError(error) {
    return error.message === 'coupon.already.redeemed';
}
function voucherInvalidError(error) {
    return error.message === 'coupon.invalid.code.provided';
}
function isVoucherError(error) {
    return error.type === 'VoucherOperationError';
}
function isCartError(error) {
    return (error.type === 'CartError' ||
        error.type === 'CartAddressError' ||
        error.type === 'CartEntryError' ||
        error.type === 'CartEntryGroupError');
}
/**
 * What is a temporary cart?
 * - frontend only cart entity!
 * - can be identified in store by `temp-` prefix with some unique id (multiple carts can be created at the same time eg. active cart, wishlist)
 *
 * Why we need temporary carts?
 * - to have information about cart creation process (meta flags: loading, error - for showing loader, error message)
 * - to know if there is currently a cart creation process in progress (eg. so, we don't create more than one active cart at the same time)
 * - cart identifiers are created in the backend, so those are only known after cart is created
 *
 * Temporary cart life cycle
 * - create cart method invoked
 * - new `temp-${uuid}` cart is created with `loading=true` state
 * - backend returns created cart
 * - normal cart entity is saved under correct id (eg. for logged user under cart `code` key)
 * - temporary cart value is set to backend response (anyone observing this cart can read code/guid from it and switch selector to normal cart)
 * - in next tick temporary cart is removed
 */
function isTempCartId(cartId) {
    return cartId.startsWith('temp-');
}
/**
 * Indicates if given cart is empty.
 * Returns true is cart is undefined, null or is an empty object.
 */
function isEmpty(cart) {
    return !cart || (typeof cart === 'object' && Object.keys(cart).length === 0);
}
/**
 * Indicates if given string is matching email pattern
 */
function isEmail(str) {
    if (str) {
        return str.match(EMAIL_PATTERN) ? true : false;
    }
    return false;
}
/**
 * Indicates if a given user is logged in on account different than preceding user account
 */
function isJustLoggedIn(userId, previousUserId) {
    return (userId !== OCC_USER_ID_ANONYMOUS && // not logged out
        previousUserId !== userId // *just* logged in / switched to ASM emulation
    );
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getMultiCartState = createFeatureSelector(MULTI_CART_FEATURE);
const getMultiCartEntities = createSelector(getMultiCartState, (state) => state.carts);
const getCartEntitySelectorFactory = (cartId) => {
    return createSelector(getMultiCartEntities, (state) => StateUtils.entityProcessesLoaderStateSelector(state, cartId));
};
const getCartSelectorFactory = (cartId) => {
    return createSelector(getMultiCartEntities, (state) => StateUtils.entityValueSelector(state, cartId));
};
const getCartIsStableSelectorFactory = (cartId) => {
    return createSelector(getMultiCartEntities, (state) => StateUtils.entityIsStableSelector(state, cartId));
};
const getCartHasPendingProcessesSelectorFactory = (cartId) => {
    return createSelector(getMultiCartEntities, (state) => StateUtils.entityHasPendingProcessesSelector(state, cartId));
};
const getCartEntriesSelectorFactory = (cartId) => {
    return createSelector(getCartSelectorFactory(cartId), (state) => {
        return state && state.entries ? state.entries : [];
    });
};
const getCartEntrySelectorFactory = (cartId, productCode) => {
    return createSelector(getCartEntriesSelectorFactory(cartId), (state) => {
        return state.find((entry) => entry.product?.code === productCode);
    });
};
const getCartsSelectorFactory = createSelector(getMultiCartEntities, (state) => Object.keys(state.entities).map((key) => StateUtils.entityValueSelector(state, key)));
const getCartTypeIndex = createSelector(getMultiCartState, (state) => state.index);
const getCartIdByTypeFactory = (type) => {
    return createSelector(getCartTypeIndex, (state) => {
        return state && state[type];
    });
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    loadAll(userId) {
        return this.adapter.loadAll(userId);
    }
    load(userId, cartId) {
        return this.adapter.load(userId, cartId);
    }
    create(userId, oldCartId, toMergeCartGuid) {
        return this.adapter.create(userId, oldCartId, toMergeCartGuid);
    }
    delete(userId, cartId) {
        return this.adapter.delete(userId, cartId);
    }
    save(userId, cartId, saveCartName, saveCartDescription) {
        return this.adapter.save(userId, cartId, saveCartName, saveCartDescription);
    }
    addEmail(userId, cartId, email) {
        return this.adapter.addEmail(userId, cartId, email);
    }
}
CartConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartConnector, deps: [{ token: CartAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
CartConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CartAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartEffects {
    handleLoadCartError(payload, error) {
        if (error?.error?.errors) {
            const couponExpiredErrors = error.error.errors.filter((err) => err.reason === 'invalid');
            if (couponExpiredErrors.length > 0) {
                // Reload in case of expired coupon.
                return of(new LoadCart({ ...payload }));
            }
            const cartNotFoundErrors = error.error.errors.filter((err) => isCartNotFoundError(err) || err.reason === 'UnknownResourceError');
            if (cartNotFoundErrors.length > 0) {
                // Remove cart as it doesn't exist on backend (selective cart always exists).
                return of(new RemoveCart({ cartId: payload.cartId }));
            }
        }
        return of(new LoadCartFail({
            ...payload,
            error: normalizeHttpError(error, this.logger),
        }));
    }
    constructor(actions$, cartConnector, store) {
        this.actions$ = actions$;
        this.cartConnector = cartConnector;
        this.store = store;
        this.contextChange$ = this.actions$.pipe(ofType(SiteContextActions.CURRENCY_CHANGE, SiteContextActions.LANGUAGE_CHANGE));
        this.logger = inject(LoggerService);
        this.loadCart$ = createEffect(() => this.actions$.pipe(ofType(LOAD_CART), map((action) => action.payload), groupBy((payload) => payload.cartId), mergeMap((group$) => group$.pipe(switchMap((payload) => {
            return of(payload).pipe(withLatestFrom(this.store.pipe(select(getCartHasPendingProcessesSelectorFactory(payload.cartId)))));
        }), filter(([_, hasPendingProcesses]) => !hasPendingProcesses), map(([payload]) => payload), switchMap((payload) => {
            return this.cartConnector.load(payload.userId, payload.cartId).pipe(mergeMap((cart) => {
                let actions = [];
                if (cart) {
                    actions.push(new LoadCartSuccess({
                        ...payload,
                        cart,
                        cartId: getCartIdByUserId(cart, payload.userId),
                    }));
                    if (payload.cartId === OCC_CART_ID_CURRENT) {
                        // Removing cart from entity object under `current` key as it is no longer needed.
                        // Current cart is loaded under it's code entity.
                        actions.push(new RemoveCart({
                            cartId: OCC_CART_ID_CURRENT,
                        }));
                    }
                }
                else {
                    actions = [
                        new LoadCartFail({
                            ...payload,
                            error: {},
                        }),
                    ];
                }
                return actions;
            }), catchError((error) => this.handleLoadCartError(payload, error)));
        }))), withdrawOn(this.contextChange$)));
        this.createCart$ = createEffect(() => this.actions$.pipe(ofType(CREATE_CART), map((action) => action.payload), mergeMap((payload) => {
            return this.cartConnector
                .create(payload.userId, payload.oldCartId, payload.toMergeCartGuid)
                .pipe(switchMap((cart) => {
                const conditionalActions = [];
                if (payload.oldCartId) {
                    conditionalActions.push(new MergeCartSuccess({
                        extraData: payload.extraData,
                        userId: payload.userId,
                        tempCartId: payload.tempCartId,
                        cartId: getCartIdByUserId(cart, payload.userId),
                        oldCartId: payload.oldCartId,
                    }));
                }
                return [
                    new CreateCartSuccess({
                        ...payload,
                        cart,
                        cartId: getCartIdByUserId(cart, payload.userId),
                    }),
                    new RemoveCart({ cartId: payload.tempCartId }),
                    ...conditionalActions,
                ];
            }), catchError((error) => of(new CreateCartFail({
                ...payload,
                error: normalizeHttpError(error, this.logger),
            }))));
        }), withdrawOn(this.contextChange$)));
        this.mergeCart$ = createEffect(() => this.actions$.pipe(ofType(MERGE_CART), map((action) => action.payload), switchMap((payload) => {
            return this.cartConnector
                .load(payload.userId, OCC_CART_ID_CURRENT)
                .pipe(map((currentCart) => {
                if (currentCart?.code !== payload.cartId) {
                    return new CreateCart({
                        userId: payload.userId,
                        oldCartId: payload.cartId,
                        toMergeCartGuid: currentCart ? currentCart.guid : undefined,
                        extraData: payload.extraData,
                        tempCartId: payload.tempCartId,
                    });
                }
            }), filter(isNotUndefined));
        }), withdrawOn(this.contextChange$)));
        // TODO(#7241): Remove when AddVoucherSuccess actions will extend processes actions
        this.refresh$ = createEffect(() => this.actions$.pipe(ofType(CART_ADD_VOUCHER_SUCCESS), map((action) => action.payload), concatMap((payload) => from([
            new CartProcessesDecrement(payload.cartId),
            new LoadCart({
                userId: payload.userId,
                cartId: payload.cartId,
            }),
        ]))));
        // TODO: Switch to automatic cart reload on processes count reaching 0 for cart entity
        this.refreshWithoutProcesses$ = createEffect(() => this.actions$.pipe(ofType(CART_ADD_ENTRY_SUCCESS, CART_REMOVE_ENTRY_SUCCESS, CART_UPDATE_ENTRY_SUCCESS, CART_REMOVE_VOUCHER_SUCCESS), map((action) => action.payload), map((payload) => new LoadCart({
            userId: payload.userId,
            cartId: payload.cartId,
        }))));
        this.resetCartDetailsOnSiteContextChange$ = createEffect(() => this.actions$.pipe(ofType(SiteContextActions.LANGUAGE_CHANGE, SiteContextActions.CURRENCY_CHANGE), mergeMap(() => {
            return [new ResetCartDetails()];
        })));
        this.addEmail$ = createEffect(() => this.actions$.pipe(ofType(ADD_EMAIL_TO_CART), map((action) => action.payload), mergeMap((payload) => this.cartConnector
            .addEmail(payload.userId, payload.cartId, payload.email)
            .pipe(mergeMap(() => {
            return [
                new AddEmailToCartSuccess({
                    ...payload,
                }),
                new LoadCart({
                    userId: payload.userId,
                    cartId: payload.cartId,
                }),
            ];
        }), catchError((error) => from([
            new AddEmailToCartFail({
                ...payload,
                error: normalizeHttpError(error, this.logger),
            }),
            new LoadCart({
                userId: payload.userId,
                cartId: payload.cartId,
            }),
        ])))), withdrawOn(this.contextChange$)));
        this.deleteCart$ = createEffect(() => this.actions$.pipe(ofType(DELETE_CART), map((action) => action.payload), mergeMap((payload) => this.cartConnector.delete(payload.userId, payload.cartId).pipe(map(() => {
            return new DeleteCartSuccess({ ...payload });
        }), catchError((error) => from([
            new DeleteCartFail({
                ...payload,
                error: normalizeHttpError(error, this.logger),
            }),
            // Error might happen in higher backend layer and cart could still be removed.
            // When load fail with NotFound error then RemoveCart action will kick in and clear that cart in our state.
            new LoadCart({
                ...payload,
            }),
        ]))))));
    }
}
CartEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartEffects, deps: [{ token: i1.Actions }, { token: CartConnector }, { token: i1$1.Store }], target: i0.ɵɵFactoryTarget.Injectable });
CartEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: CartConnector }, { type: i1$1.Store }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MultiCartEffectsService {
    /**
     * Verifies if cart is the active cart or saved cart and returns the appropriate cart type
     * @param action
     * @returns cart type
     */
    getActiveCartTypeOnLoadSuccess(action) {
        if (action?.payload?.extraData?.active) {
            // saved cart is not active cart
            if (action.payload?.cart.saveTime) {
                return new SetCartTypeIndex({
                    cartType: CartType.ACTIVE,
                    cartId: '',
                });
            }
            return new SetCartTypeIndex({
                cartType: CartType.ACTIVE,
                cartId: action.meta.entityId,
            });
        }
    }
}
MultiCartEffectsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartEffectsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MultiCartEffectsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartEffectsService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartEffectsService, decorators: [{
            type: Injectable
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MultiCartEffects {
    /**
     * Verifies if cart is the current cart and returns the appropriate cart type
     * @param action
     * @returns cart type needed on load
     */
    getActiveCartTypeOnLoad(action) {
        if (action?.payload?.cartId === OCC_CART_ID_CURRENT) {
            return new SetCartTypeIndex({
                cartType: CartType.ACTIVE,
                cartId: '',
            });
        }
        return undefined;
    }
    /**
     * Verifies if cart is the active cart or saved cart and returns the appropriate cart type
     * @param action
     * @returns cart type
     */
    getActiveCartTypeOnLoadSuccess(action) {
        // Extracted small portion of private effect's logic to a public service
        // to allow FSA for customizing it (for more, see CXSPA-3551)
        return this.multiCartEffectsService.getActiveCartTypeOnLoadSuccess(action);
    }
    /**
     * Verifies if cart is active and returns the appropriate cart type
     * @param action
     * @returns cart type needed on creation
     */
    getActiveCartTypeOnCreate(action) {
        if (action?.payload?.extraData?.active) {
            return new SetCartTypeIndex({
                cartType: CartType.ACTIVE,
                cartId: action.meta.entityId,
            });
        }
        return undefined;
    }
    constructor(actions$, multiCartEffectsService) {
        this.actions$ = actions$;
        this.multiCartEffectsService = multiCartEffectsService;
        // TODO(#7241): Remove when we drop ADD_VOUCHER process and we sort out checkout and cart dependencies
        this.processesIncrement$ = createEffect(() => this.actions$.pipe(ofType(CART_ADD_VOUCHER), map((action) => action.payload), map((payload) => new CartProcessesIncrement(payload.cartId))));
        this.setSelectiveId$ = createEffect(() => this.actions$.pipe(ofType(LOAD_CART_SUCCESS), map((action) => {
            switch (action.type) {
                case LOAD_CART_SUCCESS: {
                    const payload = action.payload;
                    if (isSelectiveCart(payload.cartId)) {
                        return new SetCartTypeIndex({
                            cartType: CartType.SELECTIVE,
                            cartId: payload.cartId,
                        });
                    }
                    break;
                }
            }
        }), filter(isNotUndefined)));
        this.setActiveCartId$ = createEffect(() => this.actions$.pipe(ofType(LOAD_CART_SUCCESS, LOAD_CART, CREATE_CART_SUCCESS, CREATE_CART, SET_ACTIVE_CART_ID), map((action) => {
            switch (action.type) {
                case LOAD_CART: {
                    return this.getActiveCartTypeOnLoad(action);
                }
                case LOAD_CART_SUCCESS: {
                    return this.getActiveCartTypeOnLoadSuccess(action);
                }
                case CREATE_CART: {
                    return this.getActiveCartTypeOnCreate(action);
                }
                case CREATE_CART_SUCCESS: {
                    return new SetCartTypeIndex({
                        cartType: action?.payload?.extraData?.active
                            ? CartType.ACTIVE
                            : CartType.NEW_CREATED,
                        cartId: action.meta.entityId,
                    });
                }
                case SET_ACTIVE_CART_ID:
                    return new SetCartTypeIndex({
                        cartType: CartType.ACTIVE,
                        cartId: action.payload,
                    });
            }
            return undefined;
        }), filter(isNotUndefined)));
    }
}
MultiCartEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartEffects, deps: [{ token: i1.Actions }, { token: MultiCartEffectsService }], target: i0.ɵɵFactoryTarget.Injectable });
MultiCartEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: MultiCartEffectsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const effects = [
    CartEntryEffects,
    CartVoucherEffects,
    CartEffects,
    MultiCartEffects,
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const cartTypeIndexInitialState = { [CartType.ACTIVE]: '' };
function cartTypeIndexReducer(state = cartTypeIndexInitialState, action) {
    switch (action.type) {
        case SET_CART_TYPE_INDEX:
            return {
                ...state,
                [action.payload.cartType]: action.payload.cartId,
            };
        case REMOVE_CART:
        case DELETE_CART_SUCCESS: {
            if (action.payload?.cartId === state[CartType.ACTIVE]) {
                return {
                    ...state,
                    [CartType.ACTIVE]: '',
                };
            }
            return state;
        }
        case CLEAR_CART_STATE:
            return cartTypeIndexInitialState;
    }
    return state;
}
const cartEntitiesInitialState = undefined;
function cartEntitiesReducer(state = cartEntitiesInitialState, action) {
    switch (action.type) {
        case LOAD_CARTS_SUCCESS:
            return action.payload;
        case LOAD_CART_SUCCESS:
        case CREATE_CART_SUCCESS:
        case SET_CART_DATA:
            return action.payload.cart;
    }
    return state;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function clearMultiCartState(reducer) {
    return function (state, action) {
        if (action.type === AuthActions.LOGOUT) {
            state = undefined;
        }
        return reducer(state, action);
    };
}
const multiCartMetaReducers = [clearMultiCartState];
const multiCartReducerToken = new InjectionToken('MultiCartReducers');
function getMultiCartReducers() {
    return {
        carts: StateUtils.entityProcessesLoaderReducer(MULTI_CART_DATA, cartEntitiesReducer),
        index: cartTypeIndexReducer,
    };
}
const multiCartReducerProvider = {
    provide: multiCartReducerToken,
    useFactory: getMultiCartReducers,
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

var multiCartGroup_selectors = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getCartEntitySelectorFactory: getCartEntitySelectorFactory,
    getCartEntriesSelectorFactory: getCartEntriesSelectorFactory,
    getCartEntrySelectorFactory: getCartEntrySelectorFactory,
    getCartHasPendingProcessesSelectorFactory: getCartHasPendingProcessesSelectorFactory,
    getCartIdByTypeFactory: getCartIdByTypeFactory,
    getCartIsStableSelectorFactory: getCartIsStableSelectorFactory,
    getCartSelectorFactory: getCartSelectorFactory,
    getCartTypeIndex: getCartTypeIndex,
    getCartsSelectorFactory: getCartsSelectorFactory,
    getMultiCartEntities: getMultiCartEntities,
    getMultiCartState: getMultiCartState
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
class MultiCartStatePersistenceService {
    constructor(statePersistenceService, store, siteContextParamsService) {
        this.statePersistenceService = statePersistenceService;
        this.store = store;
        this.siteContextParamsService = siteContextParamsService;
        this.subscription = new Subscription();
    }
    initSync() {
        this.subscription.add(this.statePersistenceService.syncWithStorage({
            key: 'cart',
            state$: this.getCartState(),
            context$: this.siteContextParamsService.getValues([
                BASE_SITE_CONTEXT_ID,
            ]),
            storageType: StorageSyncType.LOCAL_STORAGE,
            onRead: (state) => this.onRead(state),
        }));
    }
    getCartState() {
        return this.store.pipe(
        // Since getCartState() may be called while the module is lazy loded
        // The cart state slice may not exist yet in the first store emissions.
        filter((store) => !!store.cart), select(getMultiCartState), filter((state) => !!state), map((state) => state.index), distinctUntilKeyChanged('Active'), map((indexState) => {
            return {
                active: indexState[CartType.ACTIVE] ?? '',
            };
        }));
    }
    onRead(state) {
        this.store.dispatch(new ClearCartState());
        if (state) {
            this.store.dispatch(new SetActiveCartId(state.active));
        }
        else {
            this.store.dispatch(new SetActiveCartId(''));
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
MultiCartStatePersistenceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartStatePersistenceService, deps: [{ token: i2.StatePersistenceService }, { token: i1$1.Store }, { token: i2.SiteContextParamsService }], target: i0.ɵɵFactoryTarget.Injectable });
MultiCartStatePersistenceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartStatePersistenceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartStatePersistenceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.StatePersistenceService }, { type: i1$1.Store }, { type: i2.SiteContextParamsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function cartStatePersistenceFactory(cartStatePersistenceService, configInit) {
    const result = () => configInit
        .getStable('context')
        .pipe(tap(() => {
        cartStatePersistenceService.initSync();
    }))
        .toPromise();
    return result;
}
/**
 * Before `MultiCartStatePersistenceService` restores the active cart id `ActiveCartService`
 * will use `current` cart instead of the one saved in browser. This meta reducer
 * sets the value on store initialization to undefined cart which holds active cart loading
 * until the data from storage is restored.
 */
function uninitializeActiveCartMetaReducerFactory() {
    const metaReducer = (reducer) => (state, action) => {
        const newState = { ...state };
        if (action.type === '@ngrx/store/init') {
            newState.cart = {
                ...newState.cart,
                ...{ index: { [CartType.ACTIVE]: undefined } },
            };
        }
        return reducer(newState, action);
    };
    return metaReducer;
}
/**
 * Complimentary module for cart to store cart id in browser storage.
 * This makes it possible to work on the same anonymous cart even after page refresh.
 */
class CartPersistenceModule {
}
CartPersistenceModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPersistenceModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartPersistenceModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartPersistenceModule });
CartPersistenceModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPersistenceModule, providers: [
        {
            provide: MODULE_INITIALIZER,
            useFactory: cartStatePersistenceFactory,
            deps: [MultiCartStatePersistenceService, ConfigInitializerService],
            multi: true,
        },
        {
            provide: META_REDUCERS,
            useFactory: uninitializeActiveCartMetaReducerFactory,
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPersistenceModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    providers: [
                        {
                            provide: MODULE_INITIALIZER,
                            useFactory: cartStatePersistenceFactory,
                            deps: [MultiCartStatePersistenceService, ConfigInitializerService],
                            multi: true,
                        },
                        {
                            provide: META_REDUCERS,
                            useFactory: uninitializeActiveCartMetaReducerFactory,
                            multi: true,
                        },
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartValidationAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartValidationConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    validate(cartId, userId) {
        return this.adapter.validate(cartId, userId);
    }
}
CartValidationConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationConnector, deps: [{ token: CartValidationAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
CartValidationConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CartValidationAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Registers events for the active cart
 */
class CartEventBuilder {
    constructor(actionsSubject, event, activeCartService, stateEventService) {
        this.actionsSubject = actionsSubject;
        this.event = event;
        this.activeCartService = activeCartService;
        this.stateEventService = stateEventService;
        this.register();
    }
    /**
     * Registers events for the active cart
     */
    register() {
        this.registerCreateCart();
        this.registerAddEntry();
        this.registerRemoveEntry();
        this.registerUpdateEntry();
        this.registerDeleteCart();
        this.registerAddCartVoucher();
        this.registerRemoveCartVoucher();
        this.registerMergeCartSuccess();
    }
    /**
     * Register events for adding entry to the active cart
     */
    registerAddEntry() {
        this.registerMapped({
            action: CART_ADD_ENTRY,
            event: CartAddEntryEvent,
        });
        this.registerMapped({
            action: CART_ADD_ENTRY_SUCCESS,
            event: CartAddEntrySuccessEvent,
        });
        this.registerMapped({
            action: CART_ADD_ENTRY_FAIL,
            event: CartAddEntryFailEvent,
        });
    }
    registerRemoveEntry() {
        this.registerMapped({
            action: CART_REMOVE_ENTRY_SUCCESS,
            event: CartRemoveEntrySuccessEvent,
        });
        this.registerMapped({
            action: CART_REMOVE_ENTRY_FAIL,
            event: CartRemoveEntryFailEvent,
        });
    }
    registerUpdateEntry() {
        this.registerMapped({
            action: CART_UPDATE_ENTRY_SUCCESS,
            event: CartUpdateEntrySuccessEvent,
        });
        this.registerMapped({
            action: CART_UPDATE_ENTRY_FAIL,
            event: CartUpdateEntryFailEvent,
        });
    }
    registerMergeCartSuccess() {
        this.registerMapped({
            action: MERGE_CART_SUCCESS,
            event: MergeCartSuccessEvent,
        });
    }
    registerCreateCart() {
        this.stateEventService.register({
            action: CREATE_CART,
            event: CreateCartEvent,
        });
        this.stateEventService.register({
            action: CREATE_CART_SUCCESS,
            event: CreateCartSuccessEvent,
        });
        this.stateEventService.register({
            action: CREATE_CART_FAIL,
            event: CreateCartFailEvent,
        });
    }
    /**
     * Registers delete cart events
     */
    registerDeleteCart() {
        this.stateEventService.register({
            action: DELETE_CART,
            event: DeleteCartEvent,
            factory: (action) => createFrom(DeleteCartEvent, {
                ...action.payload,
                cartCode: action.payload.cartId,
            }),
        });
        this.stateEventService.register({
            action: DELETE_CART_SUCCESS,
            event: DeleteCartSuccessEvent,
            factory: (action) => createFrom(DeleteCartSuccessEvent, {
                ...action.payload,
                cartCode: action.payload.cartId,
            }),
        });
        this.stateEventService.register({
            action: DELETE_CART_FAIL,
            event: DeleteCartFailEvent,
            factory: (action) => createFrom(DeleteCartFailEvent, {
                ...action.payload,
                cartCode: action.payload.cartId,
            }),
        });
    }
    registerAddCartVoucher() {
        this.stateEventService.register({
            action: CART_ADD_VOUCHER,
            event: AddCartVoucherEvent,
        });
        this.stateEventService.register({
            action: CART_ADD_VOUCHER_SUCCESS,
            event: AddCartVoucherSuccessEvent,
        });
        this.stateEventService.register({
            action: CART_ADD_VOUCHER_FAIL,
            event: AddCartVoucherFailEvent,
        });
    }
    registerRemoveCartVoucher() {
        this.stateEventService.register({
            action: CART_REMOVE_VOUCHER,
            event: RemoveCartVoucherEvent,
        });
        this.stateEventService.register({
            action: CART_REMOVE_VOUCHER_SUCCESS,
            event: RemoveCartVoucherSuccessEvent,
        });
        this.stateEventService.register({
            action: CART_REMOVE_VOUCHER_FAIL,
            event: RemoveCartVoucherFailEvent,
        });
    }
    /**
     * Registers a stream of target events mapped from the source actions that contain the cart id equal to the active cart id.
     *
     * @param mapping mapping declaration - from `action` string type to `event` class type
     *   (an with optional `factory` function - by default `action.payload` will be assigned to the properties of the event instance).
     */
    registerMapped(mapping) {
        const eventStream$ = this.getAction(mapping.action).pipe(switchMap((action) => {
            // SwitchMap was used instead of withLatestFrom, because we only want to subscribe to cart stream when action is dispatched.
            // Using withLatestFrom would trigger subscription to cart observables on event subscription and that causes side effects,
            // such as loading cart when we don't yet need it.
            return of(action).pipe(withLatestFrom(this.activeCartService.getActive(), this.activeCartService.getActiveCartId()));
        }), filter(([action, _activeCart, activeCartId]) => action.payload['cartId'] === activeCartId), map(([action, activeCart]) => createFrom(mapping.event, {
            ...action.payload,
            cartCode: activeCart.code,
            entry: action.payload.entry
                ? action.payload.entry
                : activeCart.entries?.[Number(action.payload.entryNumber)],
        })));
        return this.event.register(mapping.event, eventStream$);
    }
    /**
     * Returns a stream of actions only of a given type(s)
     *
     * @param actionType type(s) of actions
     */
    getAction(actionType) {
        return this.actionsSubject.pipe(ofType(...[].concat(actionType)));
    }
}
CartEventBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartEventBuilder, deps: [{ token: i1$1.ActionsSubject }, { token: i2.EventService }, { token: i1$2.ActiveCartFacade }, { token: i2.StateEventService }], target: i0.ɵɵFactoryTarget.Injectable });
CartEventBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartEventBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartEventBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$1.ActionsSubject }, { type: i2.EventService }, { type: i1$2.ActiveCartFacade }, { type: i2.StateEventService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartEventModule {
    constructor(_CartEventBuilder) {
        // Intentional empty constructor
    }
}
CartEventModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartEventModule, deps: [{ token: CartEventBuilder }], target: i0.ɵɵFactoryTarget.NgModule });
CartEventModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartEventModule });
CartEventModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartEventModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartEventModule, decorators: [{
            type: NgModule,
            args: [{}]
        }], ctorParameters: function () { return [{ type: CartEventBuilder }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartPageEventBuilder {
    constructor(eventService) {
        this.eventService = eventService;
        this.register();
    }
    register() {
        this.eventService.register(CartPageEvent, this.buildCartPageEvent());
    }
    buildCartPageEvent() {
        return this.eventService.get(NavigationEvent).pipe(filter((navigationEvent) => navigationEvent.semanticRoute === 'cart'), map((navigationEvent) => createFrom(CartPageEvent, {
            navigation: navigationEvent,
        })));
    }
}
CartPageEventBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPageEventBuilder, deps: [{ token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
CartPageEventBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPageEventBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPageEventBuilder, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.EventService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartPageEventModule {
    constructor(_cartPageEventBuilder) {
        // Intentional empty constructor
    }
}
CartPageEventModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPageEventModule, deps: [{ token: CartPageEventBuilder }], target: i0.ɵɵFactoryTarget.NgModule });
CartPageEventModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartPageEventModule });
CartPageEventModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPageEventModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPageEventModule, decorators: [{
            type: NgModule,
            args: [{}]
        }], ctorParameters: function () { return [{ type: CartPageEventBuilder }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ActiveCartService {
    constructor(multiCartFacade, userIdService, winRef) {
        this.multiCartFacade = multiCartFacade;
        this.userIdService = userIdService;
        this.winRef = winRef;
        this.subscription = new Subscription();
        // This stream is used for referencing carts in API calls.
        this.activeCartId$ = this.userIdService.getUserId().pipe(
        // We want to wait the initialization of cartId until the userId is initialized
        // We have take(1) to not trigger this stream, when userId changes.
        take(1), switchMap(() => this.multiCartFacade.getCartIdByType(CartType.ACTIVE)), 
        // We also wait until we initialize cart from localStorage
        filter((cartId) => cartId !== undefined), 
        // fallback to current when we don't have particular cart id
        map((cartId) => (cartId === '' ? OCC_CART_ID_CURRENT : cartId)));
        // Stream with active cart entity
        this.cartEntity$ = this.activeCartId$.pipe(switchMap((cartId) => this.multiCartFacade.getCartEntity(cartId)));
        // Flag to prevent cart loading when logged in with code flow
        // Instead of loading cart will run loadOrMerge method
        this.shouldLoadCartOnCodeFlow = true;
        // When the function `requireLoadedCart` is first called, the init cart loading for login user may not be done
        this.checkInitLoad = undefined;
        this.initActiveCart();
        this.detectUserChange();
    }
    initActiveCart() {
        // Stream for getting the cart value
        const cartValue$ = this.cartEntity$.pipe(map((cartEntity) => {
            return {
                cart: cartEntity.value,
                isStable: !cartEntity.loading && cartEntity.processesCount === 0,
                loaded: Boolean((cartEntity.error || cartEntity.success) && !cartEntity.loading),
            };
        }), 
        // we want to emit empty carts even if those are not stable
        // on merge cart action we want to switch to empty cart so no one would use old cartId which can be already obsolete
        // so on merge action the resulting stream looks like this: old_cart -> {} -> new_cart
        filter(({ isStable, cart }) => isStable || isEmpty(cart)));
        // Responsible for loading cart when it does not exist (eg. app initialization when we have only cartId)
        const loading = cartValue$.pipe(withLatestFrom(this.activeCartId$, this.userIdService.getUserId()), tap(([{ cart, loaded, isStable }, cartId, userId]) => {
            if (isStable &&
                isEmpty(cart) &&
                !loaded &&
                !isTempCartId(cartId) &&
                this.shouldLoadCartOnCodeFlow) {
                this.load(cartId, userId);
            }
        }));
        this.activeCart$ = using(() => loading.subscribe(), () => cartValue$).pipe(
        // Normalization for empty cart value returned as empty object.
        map(({ cart }) => (cart ? cart : {})), distinctUntilChanged(), shareReplay({ bufferSize: 1, refCount: true }));
    }
    detectUserChange() {
        // Any changes of userId is interesting for us, because we have to merge/load/switch cart in those cases.
        this.subscription.add(this.userIdService
            .getUserId()
            .pipe(
        // We never trigger cart merge/load on app initialization here and that's why we wait with pairwise for a change of userId.
        pairwise(), 
        // We need cartId once we have the previous and current userId. We don't want to subscribe to cartId stream before.
        withLatestFrom(this.activeCartId$))
            .subscribe(([[previousUserId, userId], cartId]) => {
            // Only change of user and not logout (current userId !== anonymous) should trigger loading mechanism
            if (isJustLoggedIn(userId, previousUserId)) {
                this.loadOrMerge(cartId, userId, previousUserId);
            }
        }));
        // Detect user logged in with code flow.
        if (this.isLoggedInWithCodeFlow()) {
            // Prevent loading cart while merging.
            this.shouldLoadCartOnCodeFlow = false;
            this.subscription.add(this.userIdService
                .getUserId()
                .pipe(withLatestFrom(this.activeCartId$))
                .subscribe(([userId, cartId]) => {
                this.loadOrMerge(cartId, userId, OCC_USER_ID_ANONYMOUS);
                this.winRef?.localStorage?.removeItem(OAUTH_REDIRECT_FLOW_KEY);
            }));
        }
    }
    /**
     * Returns active cart
     */
    getActive() {
        return this.activeCart$;
    }
    /**
     * Waits for the cart to be stable before returning the active cart.
     */
    takeActive() {
        return this.isStable().pipe(filter((isStable) => isStable), switchMap(() => this.getActive()), filter((cart) => !!cart), take(1));
    }
    /**
     * Returns active cart id
     */
    getActiveCartId() {
        return this.activeCart$.pipe(withLatestFrom(this.userIdService.getUserId()), map(([cart, userId]) => getCartIdByUserId(cart, userId)), distinctUntilChanged());
    }
    /**
     * Waits for the cart to be stable before returning the active cart's ID.
     */
    takeActiveCartId() {
        return this.isStable().pipe(filter((isStable) => isStable), switchMap(() => this.getActiveCartId()), filter((cartId) => !!cartId), take(1));
    }
    /**
     * Returns cart entries
     */
    getEntries() {
        return this.activeCartId$.pipe(switchMap((cartId) => this.multiCartFacade.getEntries(cartId)), distinctUntilChanged());
    }
    /**
     * Returns last cart entry for provided product code.
     * Needed to cover processes where multiple entries can share the same product code
     * (e.g. promotions or configurable products)
     *
     * @param productCode
     */
    getLastEntry(productCode) {
        return this.activeCartId$.pipe(switchMap((cartId) => this.multiCartFacade.getLastEntry(cartId, productCode)), distinctUntilChanged());
    }
    /**
     * Returns cart loading state
     */
    getLoading() {
        return this.cartEntity$.pipe(map((cartEntity) => Boolean(cartEntity.loading)), distinctUntilChanged());
    }
    /**
     * Returns true when cart is stable (not loading and not pending processes on cart)
     */
    isStable() {
        return this.activeCartId$.pipe(switchMap((cartId) => this.multiCartFacade.isStable(cartId)));
    }
    /**
     * Loads cart in every case except anonymous user and current cart combination
     */
    load(cartId, userId) {
        if (!(userId === OCC_USER_ID_ANONYMOUS && cartId === OCC_CART_ID_CURRENT)) {
            this.multiCartFacade.loadCart({
                userId,
                cartId,
                extraData: {
                    active: true,
                },
            });
        }
    }
    /**
     * Loads cart upon login, whenever there's an existing cart, merge it into the current user cart
     * cartId will be defined (not '', null, undefined)
     */
    loadOrMerge(cartId, userId, previousUserId) {
        if (cartId === OCC_CART_ID_CURRENT ||
            // It covers the case when you are logged in and then asm user login, you don't want to merge, but only load emulated user cart
            // Similarly when you are logged in as asm user and you logout and want to resume previous user session
            previousUserId !== OCC_USER_ID_ANONYMOUS) {
            this.multiCartFacade.loadCart({
                userId,
                cartId,
                extraData: {
                    active: true,
                },
            });
        }
        else if (Boolean(getLastValueSync(this.isGuestCart()))) {
            this.guestCartMerge(cartId);
        }
        else {
            // We have particular cart locally, but we logged in, so we need to combine this with current cart or make it ours.
            this.multiCartFacade.mergeToCurrentCart({
                userId,
                cartId,
                extraData: {
                    active: true,
                },
            });
        }
    }
    // TODO: Remove once backend is updated
    /**
     * Temporary method to merge guest cart with user cart because of backend limitation
     * This is for an edge case
     */
    guestCartMerge(cartId) {
        this.getEntries()
            .pipe(take(1))
            .subscribe((entries) => {
            this.multiCartFacade.deleteCart(cartId, OCC_USER_ID_ANONYMOUS);
            this.addEntriesGuestMerge(entries);
        });
    }
    /**
     * Adds entries from guest cart to user cart
     */
    addEntriesGuestMerge(cartEntries) {
        const entriesToAdd = cartEntries.map((entry) => ({
            productCode: entry.product?.code ?? '',
            quantity: entry.quantity ?? 0,
        }));
        this.requireLoadedCart(true)
            .pipe(withLatestFrom(this.userIdService.getUserId()))
            .subscribe(([cart, userId]) => {
            this.multiCartFacade.addEntries(userId, getCartIdByUserId(cart, userId), entriesToAdd);
        });
    }
    isCartCreating(cartState, cartId) {
        // cart creating is always represented with loading flags
        // when all loading flags are false it means that we restored wrong cart id
        // could happen on context change or reload right in the middle on cart create call
        return (isTempCartId(cartId) &&
            (cartState.loading || cartState.success || cartState.error));
    }
    /**
     * Check if user is just logged in with code flow
     */
    isLoggedInWithCodeFlow() {
        return !!this.winRef?.localStorage?.getItem(OAUTH_REDIRECT_FLOW_KEY);
    }
    requireLoadedCart(forGuestMerge = false) {
        this.checkInitLoad = this.checkInitLoad === undefined;
        // For guest cart merge we want to filter guest cart in the whole stream
        // We have to wait with load/create/addEntry after guest cart will be deleted.
        const cartSelector$ = (forGuestMerge
            ? this.cartEntity$.pipe(filter(() => !Boolean(getLastValueSync(this.isGuestCart()))))
            : this.cartEntity$).pipe(filter((cartState) => !cartState.loading || !!this.checkInitLoad));
        return this.activeCartId$
            .pipe(
        // Avoid load/create call when there are new cart creating at the moment
        withLatestFrom(cartSelector$), filter(([cartId, cartState]) => !this.isCartCreating(cartState, cartId)), map(([, cartState]) => cartState), take(1))
            .pipe(withLatestFrom(this.userIdService.getUserId()), tap(([cartState, userId]) => {
            // Try to load the cart, because it might have been created on another device between our login and add entry call
            if (isEmpty(cartState.value) &&
                userId !== OCC_USER_ID_ANONYMOUS &&
                !cartState.loading) {
                this.load(OCC_CART_ID_CURRENT, userId);
            }
            this.checkInitLoad = false;
        }), switchMap(() => cartSelector$), 
        // create cart can happen to anonymous user if it is empty or to any other user if it is loaded and empty
        withLatestFrom(this.userIdService.getUserId()), filter(([cartState, userId]) => Boolean(userId === OCC_USER_ID_ANONYMOUS ||
            cartState.success ||
            cartState.error)), take(1))
            .pipe(tap(([cartState, userId]) => {
            if (isEmpty(cartState.value)) {
                this.multiCartFacade.createCart({
                    userId,
                    extraData: {
                        active: true,
                    },
                });
            }
        }), switchMap(() => cartSelector$), filter((cartState) => Boolean(cartState.success || cartState.error)), 
        // wait for active cart id to point to code/guid to avoid some work on temp cart entity
        withLatestFrom(this.activeCartId$), filter(([cartState, cartId]) => !this.isCartCreating(cartState, cartId)), map(([cartState]) => cartState.value), filter((cart) => !isEmpty(cart)), take(1));
    }
    /**
     * Add entry to active cart
     *
     * @param productCode
     * @param quantity
     * @param pickupStore
     */
    addEntry(productCode, quantity, pickupStore) {
        this.requireLoadedCart()
            .pipe(withLatestFrom(this.userIdService.getUserId()))
            .subscribe(([cart, userId]) => {
            this.multiCartFacade.addEntry(userId, getCartIdByUserId(cart, userId), productCode, quantity, pickupStore);
        });
    }
    /**
     * Remove entry
     *
     * @param entry
     */
    removeEntry(entry) {
        this.activeCartId$
            .pipe(withLatestFrom(this.userIdService.getUserId()), take(1))
            .subscribe(([cartId, userId]) => {
            this.multiCartFacade.removeEntry(userId, cartId, entry.entryNumber);
        });
    }
    /**
     * Update entry
     *
     * @param entryNumber
     * @param quantity
     * @param pickupStore
     * @param pickupToDelivery
     */
    updateEntry(entryNumber, quantity, pickupStore, pickupToDelivery = false) {
        this.activeCartId$
            .pipe(withLatestFrom(this.userIdService.getUserId()), take(1))
            .subscribe(([cartId, userId]) => {
            this.multiCartFacade.updateEntry(userId, cartId, entryNumber, quantity, pickupStore, pickupToDelivery);
        });
    }
    /**
     * Returns cart entry
     *
     * @param productCode
     */
    getEntry(productCode) {
        return this.activeCartId$.pipe(switchMap((cartId) => this.multiCartFacade.getEntry(cartId, productCode)), distinctUntilChanged());
    }
    /**
     * Assign email to cart
     *
     * @param email
     */
    addEmail(email) {
        this.activeCartId$
            .pipe(withLatestFrom(this.userIdService.getUserId()), take(1))
            .subscribe(([cartId, userId]) => {
            this.multiCartFacade.assignEmail(cartId, userId, email);
        });
    }
    /**
     * Get assigned user to cart
     */
    getAssignedUser() {
        return this.activeCart$.pipe(map((cart) => cart.user));
    }
    // TODO: Make cart required param in 4.0
    /**
     * Returns observable of true for guest cart
     */
    isGuestCart(cart) {
        return cart
            ? of(this.isCartUserGuest(cart))
            : this.activeCart$.pipe(map((activeCart) => this.isCartUserGuest(activeCart)), distinctUntilChanged());
    }
    isCartUserGuest(cart) {
        const cartUser = cart.user;
        return Boolean(cartUser &&
            (cartUser.name === OCC_USER_ID_GUEST ||
                isEmail(cartUser.uid?.split('|').slice(1).join('|'))));
    }
    /**
     * Add multiple entries to a cart
     *
     * @param cartEntries : list of entries to add (OrderEntry[])
     */
    addEntries(cartEntries) {
        const entriesToAdd = cartEntries.map((entry) => ({
            productCode: entry.product?.code ?? '',
            quantity: entry.quantity ?? 0,
        }));
        this.requireLoadedCart()
            .pipe(withLatestFrom(this.userIdService.getUserId()))
            .subscribe(([cart, userId]) => {
            if (cart) {
                this.multiCartFacade.addEntries(userId, getCartIdByUserId(cart, userId), entriesToAdd);
            }
        });
    }
    /**
     * Reloads active cart
     */
    reloadActiveCart() {
        combineLatest([this.getActiveCartId(), this.userIdService.takeUserId()])
            .pipe(take(1), map(([cartId, userId]) => {
            this.multiCartFacade.loadCart({
                cartId,
                userId,
                extraData: { active: true },
            });
        }))
            .subscribe();
    }
    hasPickupItems() {
        return this.getActive().pipe(map((cart) => cart.pickupItemsQuantity ? cart.pickupItemsQuantity > 0 : false));
    }
    hasDeliveryItems() {
        return this.getActive().pipe(map((cart) => cart.deliveryItemsQuantity ? cart.deliveryItemsQuantity > 0 : false));
    }
    getPickupEntries() {
        return this.getEntries().pipe(map((entries) => entries.filter((entry) => entry.deliveryPointOfService !== undefined)));
    }
    getDeliveryEntries() {
        return this.getEntries().pipe(map((entries) => entries.filter((entry) => entry.deliveryPointOfService === undefined)));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
ActiveCartService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveCartService, deps: [{ token: i1$2.MultiCartFacade }, { token: i2.UserIdService }, { token: i2.WindowRef, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
ActiveCartService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveCartService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveCartService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$2.MultiCartFacade }, { type: i2.UserIdService }, { type: i2.WindowRef, decorators: [{
                    type: Optional
                }] }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartValidationStateService {
    constructor(routingService) {
        this.routingService = routingService;
        this.NAVIGATION_SKIPS = 2;
        this.navigationIdCount = 0;
        this.subscription = new Subscription();
        this.cartValidationResult$ = new ReplaySubject(1);
        this.checkForValidationResultClear$ = this.routingService
            .getRouterState()
            .pipe(withLatestFrom(this.cartValidationResult$), tap(([routerState, cartModifications]) => {
            if (this.navigationIdCount + this.NAVIGATION_SKIPS <=
                routerState.navigationId &&
                cartModifications.length) {
                this.cartValidationResult$.next([]);
                this.navigationIdCount = routerState.navigationId;
            }
        }));
        this.setInitialState();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    setInitialState() {
        this.setNavigationIdStep();
        this.subscription.add(this.checkForValidationResultClear$.subscribe());
    }
    updateValidationResultAndRoutingId(cartModification) {
        this.cartValidationResult$.next(cartModification);
        this.setNavigationIdStep();
    }
    setNavigationIdStep() {
        this.routingService
            .getRouterState()
            .pipe(take(1))
            .subscribe((routerState) => (this.navigationIdCount = routerState.navigationId));
    }
}
CartValidationStateService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationStateService, deps: [{ token: i2.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
CartValidationStateService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationStateService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationStateService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.RoutingService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartValidationService {
    constructor(cartValidationConnector, command, userIdService, activeCartFacade, cartValidationStateService) {
        this.cartValidationConnector = cartValidationConnector;
        this.command = command;
        this.userIdService = userIdService;
        this.activeCartFacade = activeCartFacade;
        this.cartValidationStateService = cartValidationStateService;
        this.validateCartCommand = this.command.create(() => combineLatest([
            this.activeCartFacade.getActiveCartId(),
            this.userIdService.takeUserId(),
            this.activeCartFacade.isStable(),
        ]).pipe(filter(([_, __, loaded]) => loaded), take(1), switchMap(([cartId, userId]) => this.cartValidationConnector.validate(cartId, userId))), {
            strategy: CommandStrategy.CancelPrevious,
        });
    }
    /**
     * Validates cart and returns cart modification list.
     */
    validateCart() {
        return this.validateCartCommand.execute();
    }
    /**
     * Returns cart modification results
     */
    getValidationResults() {
        return this.cartValidationStateService.cartValidationResult$;
    }
}
CartValidationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationService, deps: [{ token: CartValidationConnector }, { token: i2.CommandService }, { token: i2.UserIdService }, { token: i1$2.ActiveCartFacade }, { token: CartValidationStateService }], target: i0.ɵɵFactoryTarget.Injectable });
CartValidationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: CartValidationConnector }, { type: i2.CommandService }, { type: i2.UserIdService }, { type: i1$2.ActiveCartFacade }, { type: CartValidationStateService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartVoucherService {
    constructor(store, activeCartFacade, userIdService) {
        this.store = store;
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
    }
    addVoucher(voucherId, cartId) {
        this.combineUserAndCartId(cartId).subscribe(([occUserId, cartIdentifier]) => this.store.dispatch(new CartAddVoucher({
            userId: occUserId,
            cartId: cartIdentifier,
            voucherId: voucherId,
        })));
    }
    removeVoucher(voucherId, cartId) {
        this.combineUserAndCartId(cartId).subscribe(([occUserId, cartIdentifier]) => this.store.dispatch(new CartRemoveVoucher({
            userId: occUserId,
            cartId: cartIdentifier,
            voucherId: voucherId,
        })));
    }
    /**
     * Get add voucher process error flag
     */
    getAddVoucherResultError() {
        return this.store.pipe(select(ProcessSelectors.getProcessErrorFactory(ADD_VOUCHER_PROCESS_ID)));
    }
    /**
     * Get add voucher process success flag
     */
    getAddVoucherResultSuccess() {
        return this.store.pipe(select(ProcessSelectors.getProcessSuccessFactory(ADD_VOUCHER_PROCESS_ID)));
    }
    /**
     * Get add voucher process loading flag
     */
    getAddVoucherResultLoading() {
        return this.store.pipe(select(ProcessSelectors.getProcessLoadingFactory(ADD_VOUCHER_PROCESS_ID)));
    }
    /**
     * Reset add voucher process
     */
    resetAddVoucherProcessingState() {
        this.store.dispatch(new CartResetAddVoucher());
    }
    combineUserAndCartId(cartId) {
        if (cartId) {
            return this.userIdService.getUserId().pipe(take(1), map((userId) => [userId, cartId]));
        }
        else {
            return combineLatest([
                this.userIdService.getUserId(),
                this.activeCartFacade.getActiveCartId(),
            ]).pipe(take(1));
        }
    }
}
CartVoucherService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartVoucherService, deps: [{ token: i1$1.Store }, { token: i1$2.ActiveCartFacade }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
CartVoucherService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartVoucherService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartVoucherService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Store }, { type: i1$2.ActiveCartFacade }, { type: i2.UserIdService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MultiCartService {
    constructor(store, userIdService) {
        this.store = store;
        this.userIdService = userIdService;
    }
    /**
     * Returns cart from store as an observable
     *
     * @param cartId
     */
    getCart(cartId) {
        return this.store.pipe(select(getCartSelectorFactory(cartId)));
    }
    /**
     * Returns a list of carts from store as an observable
     *
     */
    getCarts() {
        return this.store.pipe(select(getCartsSelectorFactory));
    }
    /**
     * Returns cart entity from store (cart with loading, error, success flags) as an observable
     *
     * @param cartId
     */
    getCartEntity(cartId) {
        return this.store.pipe(select(getCartEntitySelectorFactory(cartId)));
    }
    /**
     * Returns true when there are no operations on that in progress and it is not currently loading
     *
     * @param cartId
     */
    isStable(cartId) {
        return this.store.pipe(select(getCartIsStableSelectorFactory(cartId)), 
        // We dispatch a lot of actions just after finishing some process or loading, so we want this flag not to flicker.
        // This flickering should only be avoided when switching from false to true
        // Start of loading should be showed instantly (no debounce)
        // Extra actions are only dispatched after some loading
        debounce((isStable) => (isStable ? timer(0) : EMPTY)), distinctUntilChanged());
    }
    /**
     * Simple random temp cart id generator
     */
    generateTempCartId() {
        const pseudoUuid = Math.random().toString(36).substring(2, 11);
        return `temp-${pseudoUuid}`;
    }
    /**
     * Create or merge cart
     *
     * @param params Object with userId, oldCartId, toMergeCartGuid and extraData
     */
    createCart({ userId, oldCartId, toMergeCartGuid, extraData, }) {
        // to support creating multiple carts at the same time we need to use different entity for every process
        // simple random uuid generator is used here for entity names
        const tempCartId = this.generateTempCartId();
        this.store.dispatch(new CreateCart({
            extraData,
            userId,
            oldCartId,
            toMergeCartGuid,
            tempCartId,
        }));
        return this.getCartIdByType(extraData?.active ? CartType.ACTIVE : CartType.NEW_CREATED).pipe(switchMap((cartId) => this.getCart(cartId)), filter(isNotUndefined));
    }
    /**
     * Merge provided cart to current user cart
     *
     * @param params Object with userId, cartId and extraData
     */
    mergeToCurrentCart({ userId, cartId, extraData, }) {
        const tempCartId = this.generateTempCartId();
        this.store.dispatch(new MergeCart({
            userId,
            cartId,
            extraData,
            tempCartId,
        }));
    }
    /**
     * Load cart
     *
     * @param params Object with userId, cartId and extraData
     */
    loadCart({ cartId, userId, extraData, }) {
        this.store.dispatch(new LoadCart({
            userId,
            cartId,
            extraData,
        }));
    }
    /**
     * Get cart entries as an observable
     * @param cartId
     */
    getEntries(cartId) {
        return this.store.pipe(select(getCartEntriesSelectorFactory(cartId)));
    }
    /**
     * Get last entry for specific product code from cart.
     * Needed to cover processes where multiple entries can share the same product code
     * (e.g. promotions or configurable products)
     *
     * @param cartId
     * @param productCode
     */
    getLastEntry(cartId, productCode) {
        return this.store.pipe(select(getCartEntriesSelectorFactory(cartId)), map((entries) => {
            const filteredEntries = entries.filter((entry) => entry.product?.code === productCode);
            return filteredEntries
                ? filteredEntries[filteredEntries.length - 1]
                : undefined;
        }));
    }
    /**
     * Add entry to cart
     *
     * @param userId
     * @param cartId
     * @param productCode
     * @param quantity
     * @param pickupStore
     */
    addEntry(userId, cartId, productCode, quantity, pickupStore) {
        this.store.dispatch(new CartAddEntry({
            userId,
            cartId,
            productCode,
            quantity,
            pickupStore,
        }));
    }
    /**
     * Add multiple entries to cart
     *
     * @param userId
     * @param cartId
     * @param products Array with items (productCode and quantity)
     */
    addEntries(userId, cartId, products) {
        products.forEach((product) => {
            this.store.dispatch(new CartAddEntry({
                userId,
                cartId,
                productCode: product.productCode,
                quantity: product.quantity,
            }));
        });
    }
    /**
     * Remove entry from cart
     *
     * @param userId
     * @param cartId
     * @param entryNumber
     */
    removeEntry(userId, cartId, entryNumber) {
        this.store.dispatch(new CartRemoveEntry({
            userId,
            cartId,
            entryNumber: `${entryNumber}`,
        }));
    }
    /**
     * Update entry in cart. For quantity = 0 it removes entry
     *
     * @param userId
     * @param cartId
     * @param entryNumber
     * @param quantity
     * @param pickupStore
     * @param pickupToDelivery
     */
    updateEntry(userId, cartId, entryNumber, quantity, pickupStore, pickupToDelivery = false) {
        if (quantity !== undefined && quantity <= 0) {
            this.removeEntry(userId, cartId, entryNumber);
        }
        else {
            this.store.dispatch(new CartUpdateEntry({
                userId,
                cartId,
                pickupStore,
                pickupToDelivery,
                entryNumber: `${entryNumber}`,
                quantity: quantity,
            }));
        }
    }
    /**
     * Get first entry from cart matching the specified product code
     *
     * @param cartId
     * @param productCode
     */
    getEntry(cartId, productCode) {
        return this.store.pipe(select(getCartEntrySelectorFactory(cartId, productCode)));
    }
    /**
     * Assign email to the cart
     *
     * @param cartId
     * @param userId
     * @param email
     */
    assignEmail(cartId, userId, email) {
        this.store.dispatch(new AddEmailToCart({
            userId,
            cartId,
            email,
        }));
    }
    removeCart(cartId) {
        this.store.dispatch(new RemoveCart({ cartId }));
    }
    /**
     * Delete cart
     *
     * @param cartId
     * @param userId
     */
    deleteCart(cartId, userId) {
        this.store.dispatch(new DeleteCart({
            userId,
            cartId,
        }));
    }
    /**
     * Reloads the cart with specified id.
     *
     * @param cartId
     * @param extraData
     */
    reloadCart(cartId, extraData) {
        this.userIdService.takeUserId().subscribe((userId) => this.store.dispatch(new LoadCart({
            userId,
            cartId,
            extraData,
        })));
    }
    /**
     * Get the cart id based on cart type
     *
     * @param cartType
     */
    getCartIdByType(cartType) {
        return this.store.pipe(select(getCartIdByTypeFactory(cartType)), distinctUntilChanged());
    }
}
MultiCartService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartService, deps: [{ token: i1$1.Store }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
MultiCartService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Store }, { type: i2.UserIdService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SelectiveCartService {
    constructor(userProfileFacade, multiCartFacade, baseSiteService, userIdService) {
        this.userProfileFacade = userProfileFacade;
        this.multiCartFacade = multiCartFacade;
        this.baseSiteService = baseSiteService;
        this.userIdService = userIdService;
    }
    /**
     * Initialize the stream when first call this function
     */
    getCart() {
        if (!this.selectiveCart$) {
            this.selectiveCart$ = combineLatest([
                this.getSelectiveCartId(),
                this.userProfileFacade.get(),
                this.userIdService.getUserId(),
                this.baseSiteService.getActive(),
            ]).pipe(distinctUntilChanged(), tap(([selectiveId, user, userId, activeBaseSite]) => {
                if (!Boolean(selectiveId) &&
                    userId !== OCC_USER_ID_ANONYMOUS &&
                    user?.customerId) {
                    this.multiCartFacade.loadCart({
                        userId: userId,
                        cartId: `selectivecart${activeBaseSite}${user.customerId}`,
                    });
                }
            }), filter(([selectiveId]) => Boolean(selectiveId)), switchMap(([selectiveId]) => this.multiCartFacade.getCart(selectiveId)), shareReplay({ bufferSize: 1, refCount: true }));
        }
        return this.selectiveCart$;
    }
    getEntries() {
        return this.getSelectiveCartId().pipe(switchMap((selectiveId) => this.multiCartFacade.getEntries(selectiveId)));
    }
    isStable() {
        return this.getSelectiveCartId().pipe(switchMap((selectiveId) => this.multiCartFacade.isStable(selectiveId)));
    }
    addEntry(productCode, quantity) {
        this.getSelectiveIdWithUserId().subscribe(([selectiveId, userId]) => {
            this.multiCartFacade.addEntry(userId, selectiveId, productCode, quantity);
        });
    }
    removeEntry(entry) {
        this.getSelectiveIdWithUserId().subscribe(([selectiveId, userId]) => {
            this.multiCartFacade.removeEntry(userId, selectiveId, entry.entryNumber);
        });
    }
    updateEntry(entryNumber, quantity) {
        this.getSelectiveIdWithUserId().subscribe(([selectiveId, userId]) => {
            this.multiCartFacade.updateEntry(userId, selectiveId, entryNumber, quantity);
        });
    }
    getEntry(productCode) {
        return this.getSelectiveCartId().pipe(switchMap((selectiveId) => this.multiCartFacade.getEntry(selectiveId, productCode)));
    }
    getSelectiveCartId() {
        return this.multiCartFacade.getCartIdByType(CartType.SELECTIVE);
    }
    getSelectiveIdWithUserId() {
        return this.getSelectiveCartId().pipe(distinctUntilChanged(), withLatestFrom(this.userIdService.getUserId()), take(1));
    }
}
SelectiveCartService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SelectiveCartService, deps: [{ token: i1$3.UserProfileFacade }, { token: i1$2.MultiCartFacade }, { token: i2.BaseSiteService }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
SelectiveCartService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SelectiveCartService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SelectiveCartService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$3.UserProfileFacade }, { type: i1$2.MultiCartFacade }, { type: i2.BaseSiteService }, { type: i2.UserIdService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const facadeProviders = [
    ActiveCartService,
    {
        provide: ActiveCartFacade,
        useExisting: ActiveCartService,
    },
    CartVoucherService,
    {
        provide: CartVoucherFacade,
        useExisting: CartVoucherService,
    },
    MultiCartService,
    {
        provide: MultiCartFacade,
        useExisting: MultiCartService,
    },
    SelectiveCartService,
    {
        provide: SelectiveCartFacade,
        useExisting: SelectiveCartService,
    },
    CartValidationService,
    {
        provide: CartValidationFacade,
        useExisting: CartValidationService,
    },
];

class BadCartRequestHandler extends HttpErrorHandler {
    constructor() {
        super(...arguments);
        this.responseStatus = HttpResponseStatus.BAD_REQUEST;
    }
    getPriority() {
        return 0 /* Priority.NORMAL */;
    }
    hasMatch(errorResponse) {
        return (super.hasMatch(errorResponse) &&
            this.getErrors(errorResponse).some(isCartError));
    }
    handleError(request, response) {
        this.handleCartNotFoundError(request, response);
        this.handleOtherCartErrors(request, response);
    }
    handleCartNotFoundError(_request, response) {
        this.getErrors(response)
            .filter((e) => isCartNotFoundError(e))
            .forEach(() => {
            this.globalMessageService.add({ key: 'httpHandlers.cartNotFound' }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    handleOtherCartErrors(_request, response) {
        this.getErrors(response)
            .filter((e) => e.reason !== 'notFound' || e.subjectType !== 'cart')
            .forEach((error) => {
            this.globalMessageService.add(error.message
                ? error.message
                : { key: 'httpHandlers.otherCartErrors' }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    getErrors(response) {
        return (response.error?.errors || []).filter((error) => error.type !== 'JaloObjectNoLongerValidError');
    }
}
BadCartRequestHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadCartRequestHandler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
BadCartRequestHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadCartRequestHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadCartRequestHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class BadVoucherRequestHandler extends HttpErrorHandler {
    constructor() {
        super(...arguments);
        this.responseStatus = HttpResponseStatus.BAD_REQUEST;
    }
    getPriority() {
        return 0 /* Priority.NORMAL */;
    }
    hasMatch(errorResponse) {
        return (super.hasMatch(errorResponse) &&
            this.getErrors(errorResponse).some(isVoucherError));
    }
    handleError(request, response) {
        this.handleVoucherExceededError(request, response);
        this.handleVoucherInvalidError(request, response);
    }
    handleVoucherExceededError(_request, response) {
        this.getErrors(response)
            .filter((e) => voucherExceededError(e))
            .forEach(() => {
            this.globalMessageService.add({ key: 'httpHandlers.voucherExceeded' }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    handleVoucherInvalidError(_request, response) {
        this.getErrors(response)
            .filter((e) => voucherInvalidError(e))
            .forEach(() => {
            this.globalMessageService.add({ key: 'httpHandlers.invalidCodeProvided' }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    getErrors(response) {
        return (response.error?.errors || []).filter((error) => error.type !== 'JaloObjectNoLongerValidError');
    }
}
BadVoucherRequestHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadVoucherRequestHandler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
BadVoucherRequestHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadVoucherRequestHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadVoucherRequestHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MultiCartStoreModule {
}
MultiCartStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MultiCartStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MultiCartStoreModule, imports: [CommonModule,
        StateModule, i1$1.StoreFeatureModule, i1.EffectsFeatureModule] });
MultiCartStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartStoreModule, providers: [multiCartReducerProvider, MultiCartEffectsService], imports: [CommonModule,
        StateModule,
        StoreModule.forFeature(MULTI_CART_FEATURE, multiCartReducerToken, {
            metaReducers: multiCartMetaReducers,
        }),
        EffectsModule.forFeature(effects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        StateModule,
                        StoreModule.forFeature(MULTI_CART_FEATURE, multiCartReducerToken, {
                            metaReducers: multiCartMetaReducers,
                        }),
                        EffectsModule.forFeature(effects),
                    ],
                    providers: [multiCartReducerProvider, MultiCartEffectsService],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartBaseCoreModule {
}
CartBaseCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartBaseCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartBaseCoreModule, imports: [CartEventModule,
        MultiCartStoreModule,
        CartPersistenceModule,
        CartPageEventModule] });
CartBaseCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseCoreModule, providers: [
        CartConnector,
        CartEntryConnector,
        CartVoucherConnector,
        CartValidationConnector,
        ...facadeProviders,
        {
            provide: HttpErrorHandler,
            useExisting: BadCartRequestHandler,
            multi: true,
        },
        {
            provide: HttpErrorHandler,
            useExisting: BadVoucherRequestHandler,
            multi: true,
        },
    ], imports: [CartEventModule,
        MultiCartStoreModule,
        CartPersistenceModule,
        CartPageEventModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CartEventModule,
                        MultiCartStoreModule,
                        CartPersistenceModule,
                        CartPageEventModule,
                    ],
                    providers: [
                        CartConnector,
                        CartEntryConnector,
                        CartVoucherConnector,
                        CartValidationConnector,
                        ...facadeProviders,
                        {
                            provide: HttpErrorHandler,
                            useExisting: BadCartRequestHandler,
                            multi: true,
                        },
                        {
                            provide: HttpErrorHandler,
                            useExisting: BadVoucherRequestHandler,
                            multi: true,
                        },
                    ],
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
const CART_VALIDATION_NORMALIZER = new InjectionToken('CartValidationNormalizer');

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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartConfigService {
    constructor(config) {
        this.config = config;
    }
    isSelectiveCartEnabled() {
        return Boolean(this.config?.cart?.selectiveCart?.enabled);
    }
    isCartValidationEnabled() {
        return Boolean(this.config?.cart?.validation?.enabled);
    }
}
CartConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartConfigService, deps: [{ token: i1$2.CartConfig }], target: i0.ɵɵFactoryTarget.Injectable });
CartConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartConfigService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartConfigService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$2.CartConfig }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartValidationGuard {
    constructor(cartValidationService, semanticPathService, router, globalMessageService, activeCartService, cartValidationStateService, cartConfigService) {
        this.cartValidationService = cartValidationService;
        this.semanticPathService = semanticPathService;
        this.router = router;
        this.globalMessageService = globalMessageService;
        this.activeCartService = activeCartService;
        this.cartValidationStateService = cartValidationStateService;
        this.cartConfigService = cartConfigService;
        this.GLOBAL_MESSAGE_TIMEOUT = 10000;
    }
    canActivate() {
        return !this.cartConfigService.isCartValidationEnabled()
            ? of(true)
            : this.cartValidationService.validateCart().pipe(withLatestFrom(this.activeCartService.getEntries()), map(([cartModificationList, cartEntries]) => {
                this.cartValidationStateService.updateValidationResultAndRoutingId(cartModificationList.cartModifications ?? []);
                if (cartModificationList.cartModifications !== undefined &&
                    cartModificationList.cartModifications.length !== 0) {
                    let validationResultMessage;
                    const modification = cartModificationList.cartModifications[0];
                    if (cartEntries.length === 1 &&
                        cartEntries[0].product?.code ===
                            modification.entry?.product?.code &&
                        modification.statusCode === CartValidationStatusCode.NO_STOCK) {
                        validationResultMessage = {
                            key: 'validation.cartEntryRemoved',
                            params: {
                                name: modification.entry?.product?.name,
                            },
                        };
                    }
                    else {
                        validationResultMessage = {
                            key: 'validation.cartEntriesChangeDuringCheckout',
                        };
                    }
                    this.globalMessageService.add(validationResultMessage, GlobalMessageType.MSG_TYPE_ERROR, this.GLOBAL_MESSAGE_TIMEOUT);
                    this.activeCartService.reloadActiveCart();
                    return this.router.parseUrl(this.semanticPathService.get('cart') ?? '');
                }
                return true;
            }));
    }
}
CartValidationGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationGuard, deps: [{ token: i1$2.CartValidationFacade }, { token: i2.SemanticPathService }, { token: i3.Router }, { token: i2.GlobalMessageService }, { token: i1$2.ActiveCartFacade }, { token: CartValidationStateService }, { token: CartConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
CartValidationGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$2.CartValidationFacade }, { type: i2.SemanticPathService }, { type: i3.Router }, { type: i2.GlobalMessageService }, { type: i1$2.ActiveCartFacade }, { type: CartValidationStateService }, { type: CartConfigService }]; } });

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
class ProductImportInfoService {
    constructor(actionsSubject) {
        this.actionsSubject = actionsSubject;
        this.logger = inject(LoggerService);
    }
    /**
     * Get emission of add entry results from actions subject
     *
     * @param {string} cartId
     * @returns {Observable<ProductImportInfo>}
     */
    getResults(cartId) {
        return this.actionsSubject.pipe(ofType(CART_ADD_ENTRY_SUCCESS, CART_ADD_ENTRY_FAIL), filter((action) => action.payload.cartId === cartId), map((action) => this.mapMessages(action)));
    }
    /**
     * Map actions to summary messages
     *
     * @param {CartActions.CartAddEntrySuccess | CartActions.CartAddEntryFail} action
     * @returns ProductImportInfo
     */
    mapMessages(action) {
        const { productCode } = action.payload;
        if (action instanceof CartAddEntrySuccess) {
            const { quantity, quantityAdded, entry, statusCode } = action.payload;
            if (statusCode === ProductImportStatus.LOW_STOCK) {
                return {
                    productCode,
                    statusCode,
                    productName: entry?.product?.name,
                    quantity,
                    quantityAdded,
                };
            }
            if (statusCode === ProductImportStatus.SUCCESS ||
                statusCode === ProductImportStatus.NO_STOCK) {
                return { productCode, statusCode, productName: entry?.product?.name };
            }
        }
        else if (action instanceof CartAddEntryFail) {
            const { error } = action.payload;
            if (error?.details[0]?.type === 'UnknownIdentifierError') {
                return {
                    productCode,
                    statusCode: ProductImportStatus.UNKNOWN_IDENTIFIER,
                };
            }
        }
        if (isDevMode()) {
            this.logger.warn('Unrecognized cart add entry action type while mapping messages', action);
        }
        return { productCode, statusCode: ProductImportStatus.UNKNOWN_ERROR };
    }
}
ProductImportInfoService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImportInfoService, deps: [{ token: i1$1.ActionsSubject }], target: i0.ɵɵFactoryTarget.Injectable });
ProductImportInfoService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImportInfoService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImportInfoService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActionsSubject }]; } });

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
 * Generated bundle index. Do not edit.
 */

export { ADD_VOUCHER_PROCESS_ID, ActiveCartService, CART_VALIDATION_NORMALIZER, cartGroup_actions as CartActions, CartAdapter, CartBaseCoreModule, CartConfigService, CartConnector, CartEntryAdapter, CartEntryConnector, CartEventBuilder, CartEventModule, CartPageEventBuilder, CartPageEventModule, CartPersistenceModule, CartValidationAdapter, CartValidationConnector, CartValidationGuard, CartValidationService, CartValidationStateService, CartVoucherAdapter, CartVoucherConnector, CartVoucherService, MULTI_CART_DATA, MULTI_CART_FEATURE, MultiCartEffectsService, multiCartGroup_selectors as MultiCartSelectors, MultiCartService, MultiCartStatePersistenceService, ProductImportInfoService, SelectiveCartService, cartStatePersistenceFactory, getCartIdByUserId, isCartError, isCartNotFoundError, isEmail, isEmpty, isJustLoggedIn, isSelectiveCart, isTempCartId, isVoucherError, uninitializeActiveCartMetaReducerFactory, voucherExceededError, voucherInvalidError };
//# sourceMappingURL=spartacus-cart-base-core.mjs.map
