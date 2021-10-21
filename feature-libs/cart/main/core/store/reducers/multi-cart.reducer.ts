import { Cart } from '@spartacus/cart/main/root';
import { StateUtils } from '@spartacus/core';
import { CartActions } from '../actions/index';

export const activeCartInitialState = null;
export const activeCartDefaultState = '';
export const wishListInitialState = '';

export function activeCartReducer(
  state: string | null = activeCartDefaultState,
  action: CartActions.CartAction | CartActions.MultiCartActions
): string | null {
  switch (action.type) {
    case CartActions.LOAD_CART_SUCCESS:
    case CartActions.CREATE_CART_SUCCESS:
    // point to `temp-${uuid}` cart when we are creating/merging cart
    case CartActions.CREATE_CART:
      if (action?.payload?.extraData?.active) {
        return action.meta.entityId as string;
      } else {
        return state;
      }
    case CartActions.SET_ACTIVE_CART_ID:
      return action.payload;
    case CartActions.REMOVE_CART:
    case CartActions.DELETE_CART_SUCCESS:
      if (action.payload?.cartId === state) {
        return activeCartDefaultState;
      }
      return state;
    case CartActions.CLEAR_CART_STATE:
      return state === activeCartInitialState
        ? activeCartInitialState
        : activeCartDefaultState;
  }
  return state;
}

export const cartEntitiesInitialState = undefined;

export function cartEntitiesReducer(
  state: Cart | undefined = cartEntitiesInitialState,
  action: StateUtils.LoaderAction
): Cart | undefined {
  switch (action.type) {
    case CartActions.LOAD_CARTS_SUCCESS:
      return action.payload;

    case CartActions.LOAD_CART_SUCCESS:
    case CartActions.CREATE_CART_SUCCESS:
    case CartActions.CREATE_WISH_LIST_SUCCESS:
    case CartActions.LOAD_WISH_LIST_SUCCESS:
    case CartActions.SET_TEMP_CART:
      return action.payload.cart;
  }
  return state;
}

export function wishListReducer(
  state = wishListInitialState,
  action: CartActions.WishListActions | CartActions.ClearCartState
): string {
  switch (action.type) {
    case CartActions.CREATE_WISH_LIST_SUCCESS:
    case CartActions.LOAD_WISH_LIST_SUCCESS:
      return action.meta.entityId as string;
    case CartActions.CLEAR_CART_STATE:
      return wishListInitialState;
  }
  return state;
}
