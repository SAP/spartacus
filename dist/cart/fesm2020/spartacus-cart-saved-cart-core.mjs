import * as i0 from '@angular/core';
import { Injectable, NgModule, inject } from '@angular/core';
import * as i1$1 from '@ngrx/effects';
import { ofType, createEffect, EffectsModule } from '@ngrx/effects';
import { RestoreSavedCartEvent, RestoreSavedCartSuccessEvent, RestoreSavedCartFailEvent, SaveCartSuccessEvent, SaveCartFailEvent, SaveCartEvent, EditSavedCartSuccessEvent, EditSavedCartFailEvent, EditSavedCartEvent, CloneSavedCartEvent, CloneSavedCartSuccessEvent, CloneSavedCartFailEvent, SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import * as i2 from '@spartacus/core';
import { StateUtils, PROCESS_FEATURE, createFrom, LoggerService, normalizeHttpError, GlobalMessageType, ProcessSelectors } from '@spartacus/core';
import { of, queueScheduler, EMPTY, combineLatest } from 'rxjs';
import { switchMap, withLatestFrom, map, filter, catchError, observeOn, startWith, tap, shareReplay, distinctUntilChanged } from 'rxjs/operators';
import * as i5 from '@spartacus/cart/base/core';
import { MULTI_CART_DATA, CartActions, isSelectiveCart } from '@spartacus/cart/base/core';
import * as i1 from '@ngrx/store';
import { select } from '@ngrx/store';
import * as i3 from '@spartacus/cart/base/root';
import { DeleteCartEvent } from '@spartacus/cart/base/root';
import * as i3$1 from '@spartacus/user/account/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SavedCartAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SavedCartConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    get(userId, cartId) {
        return this.adapter.load(userId, cartId);
    }
    getList(userId) {
        return this.adapter.loadList(userId);
    }
    restoreSavedCart(userId, cartId) {
        return this.adapter.restoreSavedCart(userId, cartId);
    }
    cloneSavedCart(userId, cartId, saveCartName) {
        return this.adapter.cloneSavedCart(userId, cartId, saveCartName);
    }
}
SavedCartConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartConnector, deps: [{ token: SavedCartAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
SavedCartConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: SavedCartAdapter }]; } });

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
const SAVED_CART_LIST_PROCESS_ID = 'saved-cart-list';
const SAVED_CART_RESTORE_CART_PROCESS_ID = 'saved-cart-restore-cart';
const SAVED_CART_SAVE_CART_PROCESS_ID = 'saved-cart-save-cart';
const SAVED_CART_CLONE_CART_PROCESS_ID = 'saved-cart-clone-cart';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const LOAD_SAVED_CART = '[Saved Cart] Load Saved Cart';
const LOAD_SAVED_CART_SUCCESS = '[Saved Cart] Load Saved Cart Success';
const LOAD_SAVED_CART_FAIL = '[Saved Cart] Load Saved Cart Fail';
const LOAD_SAVED_CARTS = '[Saved Cart] Load Saved Carts';
const LOAD_SAVED_CARTS_SUCCESS = '[Saved Cart] Load Saved Carts Success';
const LOAD_SAVED_CARTS_FAIL = '[Saved Cart] Load Saved Carts Fail';
const CLEAR_SAVED_CARTS = '[Saved Cart] Clear Saved Carts';
const RESTORE_SAVED_CART = '[Saved Cart] Restore Saved Cart';
const RESTORE_SAVED_CART_SUCCESS = '[Saved Cart] Restore Saved Cart Success';
const RESTORE_SAVED_CART_FAIL = '[Saved Cart] Restore Saved Cart Fail';
const CLEAR_RESTORE_SAVED_CART = '[Saved Cart] Clear Restore Saved Cart';
const SAVE_CART = '[Saved Cart] Save Cart';
const SAVE_CART_SUCCESS = '[Saved Cart] Save Cart Success';
const SAVE_CART_FAIL = '[Saved Cart] Save Cart Fail';
const CLEAR_SAVE_CART = '[Saved Cart] Clear Save Cart';
const EDIT_SAVED_CART = '[Saved Cart] Edit Saved Cart';
const EDIT_SAVED_CART_SUCCESS = '[Saved Cart] Edit Saved Cart Success';
const EDIT_SAVED_CART_FAIL = '[Saved Cart] Edit Saved Cart Fail';
const CLONE_SAVED_CART = '[Saved Cart] Clone Saved Cart';
const CLONE_SAVED_CART_SUCCESS = '[Saved Cart] Clone Saved Cart Success';
const CLONE_SAVED_CART_FAIL = '[Saved Cart] Clone Saved Cart Fail';
const CLEAR_CLONE_SAVED_CART = '[Saved Cart] Clear Clone Saved Cart';
class LoadSavedCart extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = LOAD_SAVED_CART;
    }
}
class LoadSavedCartSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = LOAD_SAVED_CART_SUCCESS;
    }
}
class LoadSavedCartFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId, payload?.error);
        this.payload = payload;
        this.type = LOAD_SAVED_CART_FAIL;
    }
}
class LoadSavedCarts extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(PROCESS_FEATURE, SAVED_CART_LIST_PROCESS_ID);
        this.payload = payload;
        this.type = LOAD_SAVED_CARTS;
    }
}
class LoadSavedCartsSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(PROCESS_FEATURE, SAVED_CART_LIST_PROCESS_ID);
        this.payload = payload;
        this.type = LOAD_SAVED_CARTS_SUCCESS;
    }
}
class LoadSavedCartsFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(PROCESS_FEATURE, SAVED_CART_LIST_PROCESS_ID, payload.error);
        this.payload = payload;
        this.type = LOAD_SAVED_CARTS_FAIL;
    }
}
class ClearSavedCarts extends StateUtils.EntityLoaderResetAction {
    constructor() {
        super(PROCESS_FEATURE, SAVED_CART_LIST_PROCESS_ID);
        this.type = CLEAR_SAVED_CARTS;
    }
}
class RestoreSavedCart extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(PROCESS_FEATURE, SAVED_CART_RESTORE_CART_PROCESS_ID);
        this.payload = payload;
        this.type = RESTORE_SAVED_CART;
    }
}
class RestoreSavedCartSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(PROCESS_FEATURE, SAVED_CART_RESTORE_CART_PROCESS_ID);
        this.payload = payload;
        this.type = RESTORE_SAVED_CART_SUCCESS;
    }
}
class RestoreSavedCartFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(PROCESS_FEATURE, SAVED_CART_RESTORE_CART_PROCESS_ID, payload.error);
        this.payload = payload;
        this.type = RESTORE_SAVED_CART_FAIL;
    }
}
class ClearRestoreSavedCart extends StateUtils.EntityLoaderResetAction {
    constructor() {
        super(PROCESS_FEATURE, SAVED_CART_RESTORE_CART_PROCESS_ID);
        this.type = CLEAR_RESTORE_SAVED_CART;
    }
}
class SaveCart extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(PROCESS_FEATURE, SAVED_CART_SAVE_CART_PROCESS_ID);
        this.payload = payload;
        this.type = SAVE_CART;
    }
}
class SaveCartSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(PROCESS_FEATURE, SAVED_CART_SAVE_CART_PROCESS_ID);
        this.payload = payload;
        this.type = SAVE_CART_SUCCESS;
    }
}
class SaveCartFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(PROCESS_FEATURE, SAVED_CART_SAVE_CART_PROCESS_ID, payload.error);
        this.payload = payload;
        this.type = SAVE_CART_FAIL;
    }
}
class ClearSaveCart extends StateUtils.EntityLoaderResetAction {
    constructor() {
        super(PROCESS_FEATURE, SAVED_CART_SAVE_CART_PROCESS_ID);
        this.type = CLEAR_SAVE_CART;
    }
}
class EditSavedCart extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(PROCESS_FEATURE, SAVED_CART_SAVE_CART_PROCESS_ID);
        this.payload = payload;
        this.type = EDIT_SAVED_CART;
    }
}
class EditSavedCartSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(PROCESS_FEATURE, SAVED_CART_SAVE_CART_PROCESS_ID);
        this.payload = payload;
        this.type = EDIT_SAVED_CART_SUCCESS;
    }
}
class EditSavedCartFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(PROCESS_FEATURE, SAVED_CART_SAVE_CART_PROCESS_ID, payload.error);
        this.payload = payload;
        this.type = EDIT_SAVED_CART_FAIL;
    }
}
class CloneSavedCart extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(PROCESS_FEATURE, SAVED_CART_CLONE_CART_PROCESS_ID);
        this.payload = payload;
        this.type = CLONE_SAVED_CART;
    }
}
class CloneSavedCartSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(PROCESS_FEATURE, SAVED_CART_CLONE_CART_PROCESS_ID);
        this.payload = payload;
        this.type = CLONE_SAVED_CART_SUCCESS;
    }
}
class CloneSavedCartFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(PROCESS_FEATURE, SAVED_CART_CLONE_CART_PROCESS_ID, payload.error);
        this.payload = payload;
        this.type = CLONE_SAVED_CART_FAIL;
    }
}
class ClearCloneSavedCart extends StateUtils.EntityLoaderResetAction {
    constructor() {
        super(PROCESS_FEATURE, SAVED_CART_CLONE_CART_PROCESS_ID);
        this.type = CLEAR_CLONE_SAVED_CART;
    }
}

var savedCart_action = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CLEAR_CLONE_SAVED_CART: CLEAR_CLONE_SAVED_CART,
    CLEAR_RESTORE_SAVED_CART: CLEAR_RESTORE_SAVED_CART,
    CLEAR_SAVED_CARTS: CLEAR_SAVED_CARTS,
    CLEAR_SAVE_CART: CLEAR_SAVE_CART,
    CLONE_SAVED_CART: CLONE_SAVED_CART,
    CLONE_SAVED_CART_FAIL: CLONE_SAVED_CART_FAIL,
    CLONE_SAVED_CART_SUCCESS: CLONE_SAVED_CART_SUCCESS,
    ClearCloneSavedCart: ClearCloneSavedCart,
    ClearRestoreSavedCart: ClearRestoreSavedCart,
    ClearSaveCart: ClearSaveCart,
    ClearSavedCarts: ClearSavedCarts,
    CloneSavedCart: CloneSavedCart,
    CloneSavedCartFail: CloneSavedCartFail,
    CloneSavedCartSuccess: CloneSavedCartSuccess,
    EDIT_SAVED_CART: EDIT_SAVED_CART,
    EDIT_SAVED_CART_FAIL: EDIT_SAVED_CART_FAIL,
    EDIT_SAVED_CART_SUCCESS: EDIT_SAVED_CART_SUCCESS,
    EditSavedCart: EditSavedCart,
    EditSavedCartFail: EditSavedCartFail,
    EditSavedCartSuccess: EditSavedCartSuccess,
    LOAD_SAVED_CART: LOAD_SAVED_CART,
    LOAD_SAVED_CARTS: LOAD_SAVED_CARTS,
    LOAD_SAVED_CARTS_FAIL: LOAD_SAVED_CARTS_FAIL,
    LOAD_SAVED_CARTS_SUCCESS: LOAD_SAVED_CARTS_SUCCESS,
    LOAD_SAVED_CART_FAIL: LOAD_SAVED_CART_FAIL,
    LOAD_SAVED_CART_SUCCESS: LOAD_SAVED_CART_SUCCESS,
    LoadSavedCart: LoadSavedCart,
    LoadSavedCartFail: LoadSavedCartFail,
    LoadSavedCartSuccess: LoadSavedCartSuccess,
    LoadSavedCarts: LoadSavedCarts,
    LoadSavedCartsFail: LoadSavedCartsFail,
    LoadSavedCartsSuccess: LoadSavedCartsSuccess,
    RESTORE_SAVED_CART: RESTORE_SAVED_CART,
    RESTORE_SAVED_CART_FAIL: RESTORE_SAVED_CART_FAIL,
    RESTORE_SAVED_CART_SUCCESS: RESTORE_SAVED_CART_SUCCESS,
    RestoreSavedCart: RestoreSavedCart,
    RestoreSavedCartFail: RestoreSavedCartFail,
    RestoreSavedCartSuccess: RestoreSavedCartSuccess,
    SAVE_CART: SAVE_CART,
    SAVE_CART_FAIL: SAVE_CART_FAIL,
    SAVE_CART_SUCCESS: SAVE_CART_SUCCESS,
    SaveCart: SaveCart,
    SaveCartFail: SaveCartFail,
    SaveCartSuccess: SaveCartSuccess
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
class SavedCartEventBuilder {
    constructor(actionsSubject, eventService, stateEventService, multiCartService) {
        this.actionsSubject = actionsSubject;
        this.eventService = eventService;
        this.stateEventService = stateEventService;
        this.multiCartService = multiCartService;
        this.register();
    }
    /**
     * Registers events for the saved cart
     */
    register() {
        this.registerRestoreSavedCartEvents();
        this.registerSaveCartEvents();
        this.registerEditSavedCartEvents();
        this.registerCloneSavedCartEvents();
    }
    /**
     * Registers restore saved cart events
     */
    registerRestoreSavedCartEvents() {
        this.buildRestoreSavedCartEvents({
            action: RESTORE_SAVED_CART,
            event: RestoreSavedCartEvent,
        });
        this.buildRestoreSavedCartEvents({
            action: RESTORE_SAVED_CART_SUCCESS,
            event: RestoreSavedCartSuccessEvent,
        });
        this.buildRestoreSavedCartEvents({
            action: RESTORE_SAVED_CART_FAIL,
            event: RestoreSavedCartFailEvent,
        });
    }
    /**
     * Registers save cart events
     */
    registerSaveCartEvents() {
        this.buildSaveCartSuccessEvent({
            action: SAVE_CART_SUCCESS,
            event: SaveCartSuccessEvent,
        });
        this.stateEventService.register({
            action: SAVE_CART_FAIL,
            event: SaveCartFailEvent,
            factory: (action) => createFrom(SaveCartFailEvent, {
                ...action.payload,
                cartCode: action.payload.cartId,
            }),
        });
        this.stateEventService.register({
            action: SAVE_CART,
            event: SaveCartEvent,
            factory: (action) => {
                return createFrom(SaveCartEvent, {
                    ...action.payload,
                    cartCode: action.payload.cartId,
                });
            },
        });
    }
    /**
     * Registers edit saved cart events
     */
    registerEditSavedCartEvents() {
        this.buildSaveCartSuccessEvent({
            action: EDIT_SAVED_CART_SUCCESS,
            event: EditSavedCartSuccessEvent,
        });
        this.stateEventService.register({
            action: EDIT_SAVED_CART_FAIL,
            event: EditSavedCartFailEvent,
            factory: (action) => createFrom(EditSavedCartFailEvent, {
                ...action.payload,
                cartCode: action.payload.cartId,
            }),
        });
        this.stateEventService.register({
            action: EDIT_SAVED_CART,
            event: EditSavedCartEvent,
            factory: (action) => {
                return createFrom(EditSavedCartEvent, {
                    ...action.payload,
                    cartCode: action.payload.cartId,
                });
            },
        });
    }
    /**
     * Registers clone saved cart events
     */
    registerCloneSavedCartEvents() {
        this.buildRestoreSavedCartEvents({
            action: CLONE_SAVED_CART,
            event: CloneSavedCartEvent,
        });
        this.buildRestoreSavedCartEvents({
            action: CLONE_SAVED_CART_SUCCESS,
            event: CloneSavedCartSuccessEvent,
        });
        this.buildRestoreSavedCartEvents({
            action: CLONE_SAVED_CART_FAIL,
            event: CloneSavedCartFailEvent,
        });
    }
    /**
     * Builds the restore save cart events from the action and cart
     *
     * @param mapping mapping declaration from `action` string type to `event` class type
     * @param saveTime should the saveTime attribute be added to the event
     * @returns
     */
    buildRestoreSavedCartEvents(mapping) {
        const eventStream$ = this.getAction(mapping.action).pipe(switchMap((action) => of(action).pipe(withLatestFrom(this.multiCartService.getCart(action.payload.cartId)))), map(([action, cart]) => createFrom(mapping.event, {
            ...action.payload,
            cartCode: cart.code,
            saveCartName: cart.name,
            saveCartDescription: cart.description,
            ...(cart.saveTime && { saveTime: cart.saveTime }),
        })));
        return this.eventService.register(mapping.event, eventStream$);
    }
    /**
     * Builds save cart event by adding the saveTime from the cart
     *
     * @param mapping mapping declaration from `action` string type to `event` class type
     * @returns events register function
     */
    buildSaveCartSuccessEvent(mapping) {
        const eventStream$ = this.getAction(mapping.action).pipe(switchMap((action) => of(action).pipe(withLatestFrom(this.multiCartService.getCart(action.payload.cartId)))), filter(([, cart]) => Boolean(cart)), map(([action, cart]) => createFrom(mapping.event, {
            ...action.payload,
            cartCode: cart.code,
            saveTime: cart.saveTime,
        })));
        return this.eventService.register(mapping.event, eventStream$);
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
SavedCartEventBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartEventBuilder, deps: [{ token: i1.ActionsSubject }, { token: i2.EventService }, { token: i2.StateEventService }, { token: i3.MultiCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
SavedCartEventBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartEventBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartEventBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ActionsSubject }, { type: i2.EventService }, { type: i2.StateEventService }, { type: i3.MultiCartFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SavedCartEventsModule {
    constructor(_savedCartEventBuilder) {
        // Intentional empty constructor
    }
}
SavedCartEventsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartEventsModule, deps: [{ token: SavedCartEventBuilder }], target: i0.ɵɵFactoryTarget.NgModule });
SavedCartEventsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SavedCartEventsModule });
SavedCartEventsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartEventsModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartEventsModule, decorators: [{
            type: NgModule,
            args: [{}]
        }], ctorParameters: function () { return [{ type: SavedCartEventBuilder }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

class SavedCartEffects {
    constructor(actions$, savedCartConnector, activeCartService, globalMessageService, cartConnector) {
        this.actions$ = actions$;
        this.savedCartConnector = savedCartConnector;
        this.activeCartService = activeCartService;
        this.globalMessageService = globalMessageService;
        this.cartConnector = cartConnector;
        this.logger = inject(LoggerService);
        this.loadSavedCart$ = createEffect(() => this.actions$.pipe(ofType(LOAD_SAVED_CART), map((action) => action.payload), switchMap(({ userId, cartId }) => this.savedCartConnector.get(userId, cartId).pipe(switchMap((savedCart) => {
            return [
                new CartActions.LoadCartSuccess({
                    userId,
                    cartId,
                    cart: savedCart,
                }),
                new LoadSavedCartSuccess({ userId, cartId }),
            ];
        }), catchError((error) => of(new LoadSavedCartFail({
            userId,
            cartId,
            error: normalizeHttpError(error, this.logger),
        })))))));
        this.loadSavedCarts$ = createEffect(() => this.actions$.pipe(ofType(LOAD_SAVED_CARTS), map((action) => action.payload), switchMap(({ userId }) => this.savedCartConnector.getList(userId).pipe(switchMap((savedCarts) => {
            return [
                new CartActions.LoadCartsSuccess(savedCarts),
                new LoadSavedCartsSuccess({ userId }),
            ];
        }), catchError((error) => of(new LoadSavedCartsFail({
            userId,
            error: normalizeHttpError(error, this.logger),
        })))))));
        this.restoreSavedCart$ = createEffect(() => this.actions$.pipe(ofType(RESTORE_SAVED_CART), map((action) => action.payload), withLatestFrom(this.activeCartService.getActive()), switchMap(([{ userId, cartId }, activeCart]) => {
            const actions = [];
            if ((activeCart?.entries ?? []).length > 0) {
                if (activeCart.code) {
                    /**
                     * Instead of calling the SaveCartAction, we are calling the edit saved cart
                     * because we do not want to clear the state when we swap carts between active and saved cart
                     */
                    actions.push(new EditSavedCart({
                        userId,
                        cartId: activeCart.code,
                        saveCartName: '',
                        saveCartDescription: '',
                    }));
                }
            }
            return this.savedCartConnector.restoreSavedCart(userId, cartId).pipe(switchMap((savedCart) => {
                this.globalMessageService.add({
                    key: (activeCart?.entries ?? []).length > 0
                        ? 'savedCartList.swapCartWithActiveCart'
                        : 'savedCartList.swapCartNoActiveCart',
                    params: {
                        cartName: cartId,
                        previousCartName: activeCart.code,
                    },
                }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
                return [
                    ...actions,
                    new CartActions.LoadCartSuccess({
                        userId,
                        cartId,
                        cart: savedCart,
                        extraData: { active: true },
                    }),
                    new RestoreSavedCartSuccess({ userId, cartId }),
                ];
            }), catchError((error) => of(new RestoreSavedCartFail({
                userId,
                cartId,
                error: normalizeHttpError(error, this.logger),
            }))));
        })));
        this.saveCart$ = createEffect(() => this.actions$.pipe(ofType(SAVE_CART), map((action) => action.payload), switchMap(({ userId, cartId, saveCartName, saveCartDescription }) => {
            return this.cartConnector
                .save(userId, cartId, saveCartName, saveCartDescription)
                .pipe(switchMap((savedCart) => {
                return [
                    new CartActions.ClearCartState(),
                    new CartActions.LoadCartSuccess({
                        userId,
                        cartId,
                        cart: savedCart,
                    }),
                    new SaveCartSuccess({
                        userId,
                        cartId,
                        saveCartName,
                        saveCartDescription,
                    }),
                ];
            }), catchError((error) => of(new SaveCartFail({
                userId,
                cartId,
                saveCartName,
                saveCartDescription,
                error: normalizeHttpError(error, this.logger),
            }))));
        })));
        this.editSavedCart$ = createEffect(() => this.actions$.pipe(ofType(EDIT_SAVED_CART), map((action) => action.payload), switchMap(({ userId, cartId, saveCartName, saveCartDescription }) => {
            return this.cartConnector
                .save(userId, cartId, saveCartName, saveCartDescription)
                .pipe(switchMap((savedCart) => {
                return [
                    new CartActions.LoadCartSuccess({
                        userId,
                        cartId,
                        cart: savedCart,
                    }),
                    new EditSavedCartSuccess({
                        userId,
                        cartId,
                        saveCartName,
                        saveCartDescription,
                    }),
                ];
            }), catchError((error) => of(new EditSavedCartFail({
                userId,
                cartId,
                saveCartName,
                saveCartDescription,
                error: normalizeHttpError(error, this.logger),
            }))));
        })));
        this.cloneSavedCart$ = createEffect(() => this.actions$.pipe(ofType(CLONE_SAVED_CART), map((action) => action.payload), switchMap(({ userId, cartId, saveCartName }) => {
            return this.savedCartConnector
                .cloneSavedCart(userId, cartId, saveCartName)
                .pipe(switchMap((_) => {
                return [
                    new CloneSavedCartSuccess({
                        userId,
                        cartId,
                        saveCartName,
                    }),
                    new RestoreSavedCart({
                        userId,
                        cartId,
                    }),
                    new LoadSavedCarts({ userId }),
                ];
            }), catchError((error) => of(new CloneSavedCartFail({
                userId,
                cartId,
                saveCartName,
                error: normalizeHttpError(error, this.logger),
            }))));
        })));
    }
}
SavedCartEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartEffects, deps: [{ token: i1$1.Actions }, { token: SavedCartConnector }, { token: i3.ActiveCartFacade }, { token: i2.GlobalMessageService }, { token: i5.CartConnector }], target: i0.ɵɵFactoryTarget.Injectable });
SavedCartEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Actions }, { type: SavedCartConnector }, { type: i3.ActiveCartFacade }, { type: i2.GlobalMessageService }, { type: i5.CartConnector }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const effects = [SavedCartEffects];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SavedCartStoreModule {
}
SavedCartStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SavedCartStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SavedCartStoreModule, imports: [i1$1.EffectsFeatureModule] });
SavedCartStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartStoreModule, imports: [EffectsModule.forFeature(effects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [EffectsModule.forFeature(effects)],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SavedCartService {
    constructor(store, userIdService, userAccountFacade, multiCartService, eventService) {
        this.store = store;
        this.userIdService = userIdService;
        this.userAccountFacade = userAccountFacade;
        this.multiCartService = multiCartService;
        this.eventService = eventService;
    }
    /**
     * Loads a single saved cart
     */
    loadSavedCart(cartId) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                return this.store.dispatch(new LoadSavedCart({ userId, cartId }));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Gets a single saved cart
     * it won't emit if the delete saved cart event gets triggered to avoid race condition between actions
     *
     * @param cartId
     * @returns observable with cart
     */
    get(cartId) {
        return this.getSavedCart(cartId).pipe(observeOn(queueScheduler), withLatestFrom(this.eventService.get(DeleteCartEvent).pipe(startWith({}))), filter(([state, _event]) => !!state), tap(([state, event]) => {
            if (Object.keys(event).length > 0) {
                return EMPTY;
            }
            if (!(state.loading || state.success || state.error)) {
                this.loadSavedCart(cartId);
            }
        }), filter(([state]) => state.success || !!state.error), map(([state]) => state.value));
    }
    /**
     * Gets the selected cart state
     *
     * @param cartId
     * @returns observable of selected cart with loader state
     */
    getSavedCart(cartId) {
        return this.multiCartService.getCartEntity(cartId);
    }
    /**
     * Returns true when there are no operations on that in progress and it is not currently loading
     *
     * @param cartId
     */
    isStable(cartId) {
        return this.multiCartService.isStable(cartId);
    }
    /**
     * Loads a list of saved carts
     */
    loadSavedCarts() {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                return this.store.dispatch(new LoadSavedCarts({ userId }));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Gets a list of saved carts
     *
     * @returns observable with list of saved carts
     */
    getList() {
        return this.getSavedCartList().pipe(withLatestFrom(this.getSavedCartListProcess()), tap(([_, state]) => {
            if (!(state.loading || state.success || state.error)) {
                this.loadSavedCarts();
            }
        }), map(([savedCartList, _]) => savedCartList), shareReplay({ bufferSize: 1, refCount: true }));
    }
    /**
     * Gets a list of saved carts from all carts in the state
     * by filtering through the carts that are not wishlist and not saved cart
     *
     * @returns observable with list of saved carts
     */
    getSavedCartList() {
        return combineLatest([
            this.multiCartService.getCarts(),
            this.userAccountFacade.get(),
        ]).pipe(distinctUntilChanged(), map(([carts, user]) => carts.filter((cart) => (user?.customerId !== undefined
            ? cart?.name !== `wishlist${user?.customerId}`
            : true) &&
            !isSelectiveCart(cart?.code) &&
            cart?.saveTime)));
    }
    /**
     * Gets the loading flag of getting a list of saved carts
     *
     * @returns observable with boolean of the loading state
     */
    getSavedCartListProcessLoading() {
        return this.store.pipe(select(ProcessSelectors.getProcessLoadingFactory(SAVED_CART_LIST_PROCESS_ID)));
    }
    /**
     * Gets the loading state of getting a list of saved carts
     *
     * @returns observable with boolean of the loader state
     */
    getSavedCartListProcess() {
        return this.store.pipe(select(ProcessSelectors.getProcessStateFactory(SAVED_CART_LIST_PROCESS_ID)));
    }
    /**
     * Clears the process state of performing a saved cart
     */
    clearSavedCarts() {
        this.store.dispatch(new ClearSavedCarts());
    }
    /**
     * Triggers a restore saved cart
     *
     * @param cartId
     */
    restoreSavedCart(cartId) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                return this.store.dispatch(new RestoreSavedCart({
                    userId,
                    cartId,
                }));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Gets the loading state of restoring saved cart
     *
     * @returns observable with boolean of the loading state
     */
    getRestoreSavedCartProcessLoading() {
        return this.store.pipe(select(ProcessSelectors.getProcessLoadingFactory(SAVED_CART_RESTORE_CART_PROCESS_ID)));
    }
    /**
     * Gets the success state of restoring saved cart
     *
     * @returns observable with boolean of the success state
     */
    getRestoreSavedCartProcessSuccess() {
        return this.store.pipe(select(ProcessSelectors.getProcessSuccessFactory(SAVED_CART_RESTORE_CART_PROCESS_ID)));
    }
    /**
     * Gets the error state of restoring saved cart
     *
     * @returns observable with boolean of the error state
     */
    getRestoreSavedCartProcessError() {
        return this.store.pipe(select(ProcessSelectors.getProcessErrorFactory(SAVED_CART_RESTORE_CART_PROCESS_ID)));
    }
    /**
     * Clears the process state of performing a restore saved cart
     */
    clearRestoreSavedCart() {
        this.store.dispatch(new ClearRestoreSavedCart());
    }
    /**
     * Triggers delete saved cart
     * @param cartId
     */
    deleteSavedCart(cartId) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                return this.multiCartService.deleteCart(cartId, userId);
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Triggers a saved cart
     *
     */
    saveCart({ cartId, saveCartName, saveCartDescription, }) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                return this.store.dispatch(new SaveCart({
                    userId,
                    cartId,
                    saveCartName,
                    saveCartDescription,
                }));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Gets the loading state of saving a cart
     *
     * @returns observable with boolean of the loading state
     */
    getSaveCartProcessLoading() {
        return this.store.pipe(select(ProcessSelectors.getProcessLoadingFactory(SAVED_CART_SAVE_CART_PROCESS_ID)));
    }
    /**
     * Gets the success state of saving a cart
     *
     * @returns observable with boolean of the success state
     */
    getSaveCartProcessSuccess() {
        return this.store.pipe(select(ProcessSelectors.getProcessSuccessFactory(SAVED_CART_SAVE_CART_PROCESS_ID)));
    }
    /**
     * Gets the error state of saving a cart
     *
     * @returns observable with boolean of the error state
     */
    getSaveCartProcessError() {
        return this.store.pipe(select(ProcessSelectors.getProcessErrorFactory(SAVED_CART_SAVE_CART_PROCESS_ID)));
    }
    /**
     * Clears the process state of performing a save cart
     */
    clearSaveCart() {
        this.store.dispatch(new ClearSaveCart());
    }
    /**
     * Triggers an edit saved cart
     *
     */
    editSavedCart({ cartId, saveCartName, saveCartDescription, }) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                return this.store.dispatch(new EditSavedCart({
                    userId,
                    cartId,
                    saveCartName,
                    saveCartDescription,
                }));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Triggers a clone saved cart
     *
     * @param cartId
     */
    cloneSavedCart(cartId, saveCartName) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                return this.store.dispatch(new CloneSavedCart({ userId, cartId, saveCartName }));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Gets the loading state of cloning a saved cart
     *
     * @returns observable with boolean of the loading state
     */
    getCloneSavedCartProcessLoading() {
        return this.store.pipe(select(ProcessSelectors.getProcessLoadingFactory(SAVED_CART_CLONE_CART_PROCESS_ID)));
    }
    /**
     * Gets the success state of cloning a saved cart
     *
     * @returns observable with boolean of the success state
     */
    getCloneSavedCartProcessSuccess() {
        return this.store.pipe(select(ProcessSelectors.getProcessSuccessFactory(SAVED_CART_CLONE_CART_PROCESS_ID)));
    }
    /**
     * Gets the error state of cloning a saved cart
     *
     * @returns observable with boolean of the error state
     */
    getCloneSavedCartProcessError() {
        return this.store.pipe(select(ProcessSelectors.getProcessErrorFactory(SAVED_CART_CLONE_CART_PROCESS_ID)));
    }
    /**
     * Clears the process state of cloning a saved cart
     */
    clearCloneSavedCart() {
        this.store.dispatch(new ClearCloneSavedCart());
    }
}
SavedCartService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartService, deps: [{ token: i1.Store }, { token: i2.UserIdService }, { token: i3$1.UserAccountFacade }, { token: i3.MultiCartFacade }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
SavedCartService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.UserIdService }, { type: i3$1.UserAccountFacade }, { type: i3.MultiCartFacade }, { type: i2.EventService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const facadeProviders = [
    SavedCartService,
    {
        provide: SavedCartFacade,
        useExisting: SavedCartService,
    },
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SavedCartCoreModule {
}
SavedCartCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SavedCartCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SavedCartCoreModule, imports: [SavedCartStoreModule, SavedCartEventsModule] });
SavedCartCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartCoreModule, providers: [SavedCartConnector, ...facadeProviders], imports: [SavedCartStoreModule, SavedCartEventsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [SavedCartStoreModule, SavedCartEventsModule],
                    providers: [SavedCartConnector, ...facadeProviders],
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

/**
 * Generated bundle index. Do not edit.
 */

export { SAVED_CART_CLONE_CART_PROCESS_ID, SAVED_CART_LIST_PROCESS_ID, SAVED_CART_RESTORE_CART_PROCESS_ID, SAVED_CART_SAVE_CART_PROCESS_ID, savedCart_action as SavedCartActions, SavedCartAdapter, SavedCartConnector, SavedCartCoreModule, SavedCartEventBuilder, SavedCartEventsModule, SavedCartService };
//# sourceMappingURL=spartacus-cart-saved-cart-core.mjs.map
