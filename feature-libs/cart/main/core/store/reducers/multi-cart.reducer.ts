import { Cart, CartType } from '@spartacus/cart/main/root';
import { StateUtils } from '@spartacus/core';
import { CartActions } from '../actions/index';

export const cartTypeIndexInitialState = { [CartType.ACTIVE]: '' };
export function cartTypeIndexReducer(
  state: {
    [cartType: string]: string;
  } = cartTypeIndexInitialState,
  action: CartActions.MultiCartActions
): {
  [cartType: string]: string;
} {
  switch (action.type) {
    case CartActions.SET_CART_TYPE_INDEX:
      return {
        ...state,
        [action.payload.cartType]: action.payload.cartId as string,
      };
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
    case CartActions.SET_CART_DATA:
      return action.payload.cart;
  }
  return state;
}
