import { Cart } from '../../../model/cart.model';
import { LoaderAction } from '../../../state/utils/loader/loader.action';
import { CartActions } from '../actions/index';

export const activeCartInitialState = '';
export const wishListinitialState = '';

export function activeCartReducer(
  state = activeCartInitialState,
  action: CartActions.CartAction | CartActions.MultiCartActions
): string {
  switch (action.type) {
    case CartActions.LOAD_MULTI_CART_SUCCESS:
    case CartActions.CREATE_MULTI_CART_SUCCESS:
      if (
        action.payload &&
        action.payload.extraData &&
        action.payload.extraData.active
      ) {
        return action.meta.entityId as string;
      } else {
        return state;
      }
    case CartActions.REMOVE_CART:
      if (action.payload === state) {
        return activeCartInitialState;
      } else {
        return state;
      }
    case CartActions.SET_ACTIVE_CART_ID:
      return action.payload;
  }
  return state;
}

export const cartEntitiesInitialState = undefined;

export function cartEntitiesReducer(
  state = cartEntitiesInitialState,
  action: LoaderAction
): Cart {
  switch (action.type) {
    case CartActions.LOAD_MULTI_CART_SUCCESS:
    case CartActions.CREATE_MULTI_CART_SUCCESS:
    case CartActions.CREATE_WISH_LIST_SUCCESS:
    case CartActions.LOAD_WISH_LIST_SUCCESS:
      return action.payload.cart;
    case CartActions.SET_FRESH_CART:
      return action.payload;
  }
  return state;
}

export function wishListReducer(
  state = wishListinitialState,
  action: CartActions.WishListActions
): string {
  switch (action.type) {
    case CartActions.CREATE_WISH_LIST_SUCCESS:
    case CartActions.LOAD_WISH_LIST_SUCCESS:
      return action.meta.entityId as string;
  }
  return state;
}
