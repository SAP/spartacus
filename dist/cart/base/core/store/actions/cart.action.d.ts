import { Action } from '@ngrx/store';
import { Cart } from '@spartacus/cart/base/root';
import { StateUtils } from '@spartacus/core';
export declare const CREATE_CART = "[Cart] Create Cart";
export declare const CREATE_CART_FAIL = "[Cart] Create Cart Fail";
export declare const CREATE_CART_SUCCESS = "[Cart] Create Cart Success";
export declare const LOAD_CART = "[Cart] Load Cart";
export declare const LOAD_CART_FAIL = "[Cart] Load Cart Fail";
export declare const LOAD_CART_SUCCESS = "[Cart] Load Cart Success";
export declare const LOAD_CARTS_SUCCESS = "[Cart] Load Carts Success";
export declare const ADD_EMAIL_TO_CART = "[Cart] Add Email to Cart";
export declare const ADD_EMAIL_TO_CART_FAIL = "[Cart] Add Email to Cart Fail";
export declare const ADD_EMAIL_TO_CART_SUCCESS = "[Cart] Add Email to Cart Success";
export declare const MERGE_CART = "[Cart] Merge Cart";
export declare const MERGE_CART_SUCCESS = "[Cart] Merge Cart Success";
export declare const RESET_CART_DETAILS = "[Cart] Reset Cart Details";
export declare const REMOVE_CART = "[Cart] Remove Cart";
export declare const DELETE_CART = "[Cart] Delete Cart";
export declare const DELETE_CART_SUCCESS = "[Cart] Delete Cart Success";
export declare const DELETE_CART_FAIL = "[Cart] Delete Cart Fail";
interface CreateCartPayload {
    userId: string;
    /** Used as a unique key in ngrx carts store (we don't know cartId at that time) */
    tempCartId: string;
    extraData?: {
        active?: boolean;
    };
    /** Anonymous cart which should be merged to new cart */
    oldCartId?: string;
    /** Cart to which should we merge (not passing this will create new cart) */
    toMergeCartGuid?: string;
}
export declare class CreateCart extends StateUtils.EntityLoadAction {
    payload: CreateCartPayload;
    readonly type = "[Cart] Create Cart";
    constructor(payload: CreateCartPayload);
}
interface CreateCartFailPayload extends CreateCartPayload {
    error: any;
}
export declare class CreateCartFail extends StateUtils.EntityFailAction {
    payload: CreateCartFailPayload;
    readonly type = "[Cart] Create Cart Fail";
    constructor(payload: CreateCartFailPayload);
}
interface CreateCartSuccessPayload extends CreateCartPayload {
    cart: Cart;
    cartId: string;
}
export declare class CreateCartSuccess extends StateUtils.EntitySuccessAction {
    payload: CreateCartSuccessPayload;
    readonly type = "[Cart] Create Cart Success";
    constructor(payload: CreateCartSuccessPayload);
}
export declare class AddEmailToCart extends StateUtils.EntityProcessesIncrementAction {
    payload: {
        userId: string;
        cartId: string;
        email: string;
    };
    readonly type = "[Cart] Add Email to Cart";
    constructor(payload: {
        userId: string;
        cartId: string;
        email: string;
    });
}
export declare class AddEmailToCartFail extends StateUtils.EntityProcessesDecrementAction {
    payload: {
        userId: string;
        cartId: string;
        error: any;
        email: string;
    };
    readonly type = "[Cart] Add Email to Cart Fail";
    constructor(payload: {
        userId: string;
        cartId: string;
        error: any;
        email: string;
    });
}
export declare class AddEmailToCartSuccess extends StateUtils.EntityProcessesDecrementAction {
    payload: {
        userId: string;
        cartId: string;
        email: string;
    };
    readonly type = "[Cart] Add Email to Cart Success";
    constructor(payload: {
        userId: string;
        cartId: string;
        email: string;
    });
}
interface LoadCartPayload {
    userId: string;
    cartId: string;
    extraData?: {
        active?: boolean;
    };
}
export declare class LoadCart extends StateUtils.EntityLoadAction {
    payload: LoadCartPayload;
    readonly type = "[Cart] Load Cart";
    constructor(payload: LoadCartPayload);
}
interface LoadCartFailPayload extends LoadCartPayload {
    error: any;
}
export declare class LoadCartFail extends StateUtils.EntityFailAction {
    payload: LoadCartFailPayload;
    readonly type = "[Cart] Load Cart Fail";
    constructor(payload: LoadCartFailPayload);
}
interface LoadCartSuccessPayload extends LoadCartPayload {
    cart: Cart;
}
export declare class LoadCartSuccess extends StateUtils.EntitySuccessAction {
    payload: LoadCartSuccessPayload;
    readonly type = "[Cart] Load Cart Success";
    constructor(payload: LoadCartSuccessPayload);
}
export declare class LoadCartsSuccess extends StateUtils.EntitySuccessAction {
    payload: Cart[];
    readonly type = "[Cart] Load Carts Success";
    constructor(payload: Cart[]);
}
interface MergeCartPayload {
    cartId: string;
    userId: string;
    extraData?: {
        active?: boolean;
    };
    /**
     * MergeCart actions triggers CreateCart which requires this parameter, so that's why it is required.
     */
    tempCartId: string;
}
export declare class MergeCart implements Action {
    payload: MergeCartPayload;
    readonly type = "[Cart] Merge Cart";
    constructor(payload: MergeCartPayload);
}
interface MergeCartSuccessPayload extends MergeCartPayload {
    /**
     * Previous cart id which was merged with new/user cart.
     * Needed to know which obsolete entity should be removed.
     */
    oldCartId: string;
}
export declare class MergeCartSuccess extends StateUtils.EntityRemoveAction {
    payload: MergeCartSuccessPayload;
    readonly type = "[Cart] Merge Cart Success";
    constructor(payload: MergeCartSuccessPayload);
}
/**
 * On site context change we want to keep current list of entities, but we want to clear the value and flags.
 * With ProcessesLoaderResetAction we run it on every entity of this type.
 */
export declare class ResetCartDetails extends StateUtils.ProcessesLoaderResetAction {
    readonly type = "[Cart] Reset Cart Details";
    constructor();
}
/**
 * Used for cleaning cart in local state, when we get information that it no longer exists in the backend.
 * For removing particular cart in both places use DeleteCart actions.
 */
export declare class RemoveCart extends StateUtils.EntityRemoveAction {
    payload: {
        cartId: string;
    };
    readonly type = "[Cart] Remove Cart";
    constructor(payload: {
        cartId: string;
    });
}
export declare class DeleteCart implements Action {
    payload: {
        userId: string;
        cartId: string;
    };
    readonly type = "[Cart] Delete Cart";
    constructor(payload: {
        userId: string;
        cartId: string;
    });
}
export declare class DeleteCartSuccess extends StateUtils.EntityRemoveAction {
    payload: {
        userId: string;
        cartId: string;
    };
    readonly type = "[Cart] Delete Cart Success";
    constructor(payload: {
        userId: string;
        cartId: string;
    });
}
export declare class DeleteCartFail implements Action {
    payload: {
        userId: string;
        cartId: string;
        error: any;
    };
    readonly type = "[Cart] Delete Cart Fail";
    constructor(payload: {
        userId: string;
        cartId: string;
        error: any;
    });
}
export type CartAction = CreateCart | CreateCartFail | CreateCartSuccess | LoadCart | LoadCartFail | LoadCartSuccess | LoadCartsSuccess | MergeCart | MergeCartSuccess | ResetCartDetails | AddEmailToCart | AddEmailToCartFail | AddEmailToCartSuccess | DeleteCart | DeleteCartSuccess | DeleteCartFail | RemoveCart;
export {};
