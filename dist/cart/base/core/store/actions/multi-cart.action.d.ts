import { Action } from '@ngrx/store';
import { Cart, CartType } from '@spartacus/cart/base/root';
import { StateUtils } from '@spartacus/core';
export declare const CART_PROCESSES_INCREMENT = "[Cart] Cart Processes Increment";
export declare const CART_PROCESSES_DECREMENT = "[Cart] Cart Processes Decrement";
export declare const SET_ACTIVE_CART_ID = "[Cart] Set Active Cart Id";
export declare const CLEAR_CART_STATE = "[Cart] Clear Cart State";
export declare const SET_CART_TYPE_INDEX = "[Cart] Set cart type index";
export declare const SET_CART_DATA = "[Cart] Set cart data";
/**
 * Increases process counter on cart entities
 * All actions that cause computations on cart should extend EntityProcessesIncrementAction instead of dispatching this action.
 */
export declare class CartProcessesIncrement extends StateUtils.EntityProcessesIncrementAction {
    payload: string;
    readonly type = "[Cart] Cart Processes Increment";
    constructor(payload: string);
}
/**
 * Decrement process counter on cart entities
 * All actions that cause computations on cart should extend EntityProcessesDecrementAction instead of dispatching this action.
 */
export declare class CartProcessesDecrement extends StateUtils.EntityProcessesDecrementAction {
    payload: string;
    readonly type = "[Cart] Cart Processes Decrement";
    constructor(payload: string);
}
/**
 * Only sets active cart property with id of active cart. Then services take care of loading that cart.
 */
export declare class SetActiveCartId implements Action {
    payload: string;
    readonly type = "[Cart] Set Active Cart Id";
    constructor(payload: string);
}
/**
 * Clear whole cart store state: all entities + reset rest of the cart state.
 */
export declare class ClearCartState extends StateUtils.EntityRemoveAllAction {
    readonly type = "[Cart] Clear Cart State";
    constructor();
}
export declare class SetCartTypeIndex implements Action {
    payload: {
        cartType: CartType;
        cartId: string | undefined;
    };
    readonly type = "[Cart] Set cart type index";
    constructor(payload: {
        cartType: CartType;
        cartId: string | undefined;
    });
}
export declare class SetCartData extends StateUtils.EntitySuccessAction {
    payload: {
        cart: Cart;
        cartId: string;
    };
    readonly type = "[Cart] Set cart data";
    constructor(payload: {
        cart: Cart;
        cartId: string;
    });
}
export type MultiCartActions = CartProcessesIncrement | CartProcessesDecrement | SetActiveCartId | ClearCartState | SetCartTypeIndex | SetCartData;
