import * as i0 from '@angular/core';
import { Injectable, inject, NgModule } from '@angular/core';
import * as i3 from '@spartacus/cart/base/root';
import { CartType } from '@spartacus/cart/base/root';
import * as i4 from '@spartacus/core';
import { StateUtils, OCC_USER_ID_ANONYMOUS, LoggerService, normalizeHttpError, SiteContextActions, isNotUndefined } from '@spartacus/core';
import { combineLatest, from, EMPTY } from 'rxjs';
import { distinctUntilChanged, tap, filter, switchMap, map, withLatestFrom, take, catchError, concatMap } from 'rxjs/operators';
import * as i2$1 from '@spartacus/cart/base/core';
import { MULTI_CART_DATA, getCartIdByUserId, CartActions, MultiCartSelectors } from '@spartacus/cart/base/core';
import * as i1 from '@ngrx/store';
import { select } from '@ngrx/store';
import * as i2 from '@spartacus/user/account/root';
import { WishListFacade } from '@spartacus/cart/wish-list/root';
import * as i1$1 from '@ngrx/effects';
import { createEffect, ofType, EffectsModule } from '@ngrx/effects';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CREATE_WISH_LIST = '[Wish List] Create Wish List';
const CREATE_WISH_LIST_FAIL = '[Wish List] Create Wish List Fail';
const CREATE_WISH_LIST_SUCCESS = '[Wish List] Create Wish List Success';
const LOAD_WISH_LIST = '[Wish List] Load Wish List';
const LOAD_WISH_LIST_SUCCESS = '[Wish List] Load Wish List Success';
const LOAD_WISH_LIST_FAIL = '[Wish List] Load Wish List Fail';
class CreateWishList {
    constructor(payload) {
        this.payload = payload;
        this.type = CREATE_WISH_LIST;
    }
}
class CreateWishListSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = CREATE_WISH_LIST_SUCCESS;
    }
}
class CreateWishListFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId, payload.error);
        this.payload = payload;
        this.type = CREATE_WISH_LIST_FAIL;
    }
}
/**
 * When we try load wishlist for the first time we don't know cart id.
 * Instead we create temporary cartId from wishlist name to keep track of loading/error state.
 */
class LoadWishList extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = LOAD_WISH_LIST;
    }
}
class LoadWishListSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = LOAD_WISH_LIST_SUCCESS;
    }
}
class LoadWishListFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId, payload.error);
        this.payload = payload;
        this.type = LOAD_WISH_LIST_FAIL;
    }
}

var wishList_action = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CREATE_WISH_LIST: CREATE_WISH_LIST,
    CREATE_WISH_LIST_FAIL: CREATE_WISH_LIST_FAIL,
    CREATE_WISH_LIST_SUCCESS: CREATE_WISH_LIST_SUCCESS,
    CreateWishList: CreateWishList,
    CreateWishListFail: CreateWishListFail,
    CreateWishListSuccess: CreateWishListSuccess,
    LOAD_WISH_LIST: LOAD_WISH_LIST,
    LOAD_WISH_LIST_FAIL: LOAD_WISH_LIST_FAIL,
    LOAD_WISH_LIST_SUCCESS: LOAD_WISH_LIST_SUCCESS,
    LoadWishList: LoadWishList,
    LoadWishListFail: LoadWishListFail,
    LoadWishListSuccess: LoadWishListSuccess
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
/**
 * Compute wishlist cart name for customer.
 */
function getWishlistName(customerId) {
    return `wishlist${customerId}`;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class WishListService {
    constructor(store, userAccountFacade, multiCartFacade, userIdService) {
        this.store = store;
        this.userAccountFacade = userAccountFacade;
        this.multiCartFacade = multiCartFacade;
        this.userIdService = userIdService;
    }
    createWishList(userId, name, description) {
        this.store.dispatch(new CreateWishList({ userId, name, description }));
    }
    getWishList() {
        return combineLatest([
            this.getWishListId(),
            this.userAccountFacade.get(),
            this.userIdService.getUserId(),
        ]).pipe(distinctUntilChanged(), tap(([wishListId, user, userId]) => {
            if (!Boolean(wishListId) &&
                userId !== OCC_USER_ID_ANONYMOUS &&
                (user === null || user === void 0 ? void 0 : user.customerId)) {
                this.loadWishList(userId, user.customerId);
            }
        }), filter(([wishListId]) => Boolean(wishListId)), switchMap(([wishListId]) => this.multiCartFacade.getCart(wishListId)));
    }
    loadWishList(userId, customerId) {
        this.store.dispatch(new LoadWishList({
            userId,
            cartId: getWishlistName(customerId),
        }));
    }
    addEntry(productCode) {
        this.getWishListIdWithUserId().subscribe(([wishListId, userId]) => this.multiCartFacade.addEntry(userId, wishListId, productCode, 1));
    }
    removeEntry(entry) {
        this.getWishListIdWithUserId().subscribe(([wishListId, userId]) => this.multiCartFacade.removeEntry(userId, wishListId, entry.entryNumber));
    }
    getWishListLoading() {
        return this.getWishListId().pipe(switchMap((wishListId) => this.multiCartFacade.isStable(wishListId).pipe(map((stable) => !stable))));
    }
    getWishListId() {
        return this.multiCartFacade.getCartIdByType(CartType.WISH_LIST);
    }
    getWishListIdWithUserId() {
        return this.getWishListId().pipe(distinctUntilChanged(), withLatestFrom(this.userIdService.getUserId(), this.userAccountFacade.get()), tap(([wishListId, userId, user]) => {
            if (!Boolean(wishListId) && (user === null || user === void 0 ? void 0 : user.customerId)) {
                this.loadWishList(userId, user.customerId);
            }
        }), filter(([wishListId]) => Boolean(wishListId)), map(([wishListId, userId]) => [wishListId, userId]), take(1));
    }
}
WishListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListService, deps: [{ token: i1.Store }, { token: i2.UserAccountFacade }, { token: i3.MultiCartFacade }, { token: i4.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
WishListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.UserAccountFacade }, { type: i3.MultiCartFacade }, { type: i4.UserIdService }]; } });

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
    WishListService,
    {
        provide: WishListFacade,
        useExisting: WishListService,
    },
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class WishListEffects {
    constructor(actions$, cartConnector, userIdService, store) {
        this.actions$ = actions$;
        this.cartConnector = cartConnector;
        this.userIdService = userIdService;
        this.store = store;
        this.logger = inject(LoggerService);
        this.createWishList$ = createEffect(() => this.actions$.pipe(ofType(CREATE_WISH_LIST), map((action) => action.payload), switchMap((payload) => {
            return this.cartConnector.create(payload.userId).pipe(switchMap((cart) => {
                var _a;
                return this.cartConnector
                    .save(payload.userId, (_a = cart.code) !== null && _a !== void 0 ? _a : '', payload.name, payload.description)
                    .pipe(switchMap((savedCart) => [
                    new CreateWishListSuccess({
                        cart: savedCart,
                        cartId: getCartIdByUserId(savedCart, payload.userId),
                    }),
                ]), catchError((error) => {
                    var _a;
                    return from([
                        new CreateWishListFail({
                            cartId: (_a = cart.code) !== null && _a !== void 0 ? _a : '',
                            error: normalizeHttpError(error, this.logger),
                        }),
                    ]);
                }));
            }));
        })));
        this.loadWishList$ = createEffect(() => this.actions$.pipe(ofType(LOAD_WISH_LIST), map((action) => action.payload), concatMap((payload) => {
            const { userId, cartId } = payload;
            return this.cartConnector.loadAll(userId).pipe(switchMap((carts) => {
                const wishListName = cartId;
                const wishList = carts.find((cart) => cart.name === wishListName);
                const actions = [];
                actions.push(wishList
                    ? new LoadWishListSuccess({
                        cart: wishList,
                        cartId: getCartIdByUserId(wishList, userId),
                    })
                    : new CreateWishList({
                        userId,
                        name: wishListName,
                    }));
                // remove temp wishlist, which id is whishlist name
                actions.push(new CartActions.RemoveCart({ cartId: wishListName }));
                return actions;
            }), catchError((error) => from([
                new LoadWishListFail({
                    cartId: cartId,
                    error: normalizeHttpError(error, this.logger),
                }),
            ])));
        })));
        this.resetWishList$ = createEffect(() => this.actions$.pipe(ofType(SiteContextActions.LANGUAGE_CHANGE, SiteContextActions.CURRENCY_CHANGE), withLatestFrom(this.userIdService.getUserId(), this.store.pipe(filter((store) => !!store.cart), select(MultiCartSelectors.getCartIdByTypeFactory(CartType.WISH_LIST)))), switchMap(([, userId, wishListId]) => {
            if (Boolean(wishListId)) {
                return this.cartConnector.load(userId, wishListId).pipe(switchMap((wishList) => [
                    new LoadWishListSuccess({
                        cart: wishList !== null && wishList !== void 0 ? wishList : {},
                        cartId: getCartIdByUserId(wishList, userId),
                    }),
                ]), catchError((error) => from([
                    new LoadWishListFail({
                        cartId: wishListId,
                        error: normalizeHttpError(error, this.logger),
                    }),
                ])));
            }
            return EMPTY;
        })));
        this.setWishListId$ = createEffect(() => this.actions$.pipe(ofType(CREATE_WISH_LIST_SUCCESS, LOAD_WISH_LIST_SUCCESS), map((action) => {
            switch (action.type) {
                case CREATE_WISH_LIST_SUCCESS:
                case LOAD_WISH_LIST_SUCCESS: {
                    return new CartActions.SetCartTypeIndex({
                        cartType: CartType.WISH_LIST,
                        cartId: action.meta
                            .entityId,
                    });
                }
            }
        }), filter(isNotUndefined)));
        this.setWishListData$ = createEffect(() => this.actions$.pipe(ofType(CREATE_WISH_LIST_SUCCESS, LOAD_WISH_LIST_SUCCESS), map((action) => {
            switch (action.type) {
                case CREATE_WISH_LIST_SUCCESS:
                case LOAD_WISH_LIST_SUCCESS: {
                    return new CartActions.SetCartData({
                        cart: action.payload.cart,
                        cartId: action.payload.cartId,
                    });
                }
            }
        }), filter(isNotUndefined)));
    }
}
WishListEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListEffects, deps: [{ token: i1$1.Actions }, { token: i2$1.CartConnector }, { token: i4.UserIdService }, { token: i1.Store }], target: i0.ɵɵFactoryTarget.Injectable });
WishListEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Actions }, { type: i2$1.CartConnector }, { type: i4.UserIdService }, { type: i1.Store }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const effects = [WishListEffects];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class WishListStoreModule {
}
WishListStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
WishListStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: WishListStoreModule, imports: [i1$1.EffectsFeatureModule] });
WishListStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListStoreModule, imports: [EffectsModule.forFeature(effects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListStoreModule, decorators: [{
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
class WishListCoreModule {
}
WishListCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
WishListCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: WishListCoreModule, imports: [WishListStoreModule] });
WishListCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListCoreModule, providers: [...facadeProviders], imports: [WishListStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [WishListStoreModule],
                    providers: [...facadeProviders],
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

export { wishList_action as WishListActions, WishListCoreModule, WishListService, getWishlistName };
//# sourceMappingURL=spartacus-cart-wish-list-core.mjs.map
