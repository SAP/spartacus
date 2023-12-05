import { Action } from '@ngrx/store';
import { Cart } from '@spartacus/cart/base/root';
import { StateUtils } from '@spartacus/core';
export declare const CREATE_WISH_LIST = "[Wish List] Create Wish List";
export declare const CREATE_WISH_LIST_FAIL = "[Wish List] Create Wish List Fail";
export declare const CREATE_WISH_LIST_SUCCESS = "[Wish List] Create Wish List Success";
export declare const LOAD_WISH_LIST = "[Wish List] Load Wish List";
export declare const LOAD_WISH_LIST_SUCCESS = "[Wish List] Load Wish List Success";
export declare const LOAD_WISH_LIST_FAIL = "[Wish List] Load Wish List Fail";
export declare class CreateWishList implements Action {
    payload: {
        userId: string;
        name?: string;
        description?: string;
    };
    readonly type = "[Wish List] Create Wish List";
    constructor(payload: {
        userId: string;
        name?: string;
        description?: string;
    });
}
export declare class CreateWishListSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        cart: Cart;
        cartId: string;
    };
    readonly type = "[Wish List] Create Wish List Success";
    constructor(payload: {
        cart: Cart;
        cartId: string;
    });
}
export declare class CreateWishListFail extends StateUtils.EntityFailAction {
    payload: {
        cartId: string;
        error?: any;
    };
    readonly type = "[Wish List] Create Wish List Fail";
    constructor(payload: {
        cartId: string;
        error?: any;
    });
}
interface LoadWishListPayload {
    userId: string;
    /**
     * This is tempCartId which is exact the wishlist name computed from customerId
     */
    cartId: string;
}
/**
 * When we try load wishlist for the first time we don't know cart id.
 * Instead we create temporary cartId from wishlist name to keep track of loading/error state.
 */
export declare class LoadWishList extends StateUtils.EntityLoadAction {
    payload: LoadWishListPayload;
    readonly type = "[Wish List] Load Wish List";
    constructor(payload: LoadWishListPayload);
}
export declare class LoadWishListSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        cart: Cart;
        cartId: string;
    };
    readonly type = "[Wish List] Load Wish List Success";
    constructor(payload: {
        cart: Cart;
        cartId: string;
    });
}
interface LoadWishListFailPayload {
    /**
     * Cart id used as a store entity key. This could point either to some
     * temporary cart used to track loading/error state or to normal wish list entity.
     */
    cartId: string;
    error: any;
}
export declare class LoadWishListFail extends StateUtils.EntityFailAction {
    payload: LoadWishListFailPayload;
    readonly type = "[Wish List] Load Wish List Fail";
    constructor(payload: LoadWishListFailPayload);
}
export type WishListActions = CreateWishList | CreateWishListSuccess | CreateWishListFail | LoadWishList | LoadWishListSuccess | LoadWishListFail;
export {};
