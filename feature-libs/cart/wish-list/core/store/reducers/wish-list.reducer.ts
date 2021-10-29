import { CartActions } from '@spartacus/cart/main/core';
import { WishListActions } from '../actions/index';

export const wishListInitialState = '';

export function wishListReducer(
  state = wishListInitialState,
  action: WishListActions.WishListActions | CartActions.ClearCartState
): string {
  switch (action.type) {
    case WishListActions.CREATE_WISH_LIST_SUCCESS:
    case WishListActions.LOAD_WISH_LIST_SUCCESS:
      return action.meta.entityId as string;
    case CartActions.CLEAR_CART_STATE:
      return wishListInitialState;
  }
  return state;
}
