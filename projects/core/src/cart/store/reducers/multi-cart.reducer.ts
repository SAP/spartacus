import { CartActions } from '../actions/index';
import { LoaderAction } from '../../../state/utils/loader/loader.action';
import { Cart } from '../../../model/cart.model';

export const activeCartInitialState = '';

export function activeCartReducer(
  state = activeCartInitialState,
  action:
    | CartActions.CartAction
    | CartActions.CartEntryAction
    | CartActions.MultiCartActions
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
      return action.payload.cart;
    case CartActions.SET_FRESH_CART_ID:
      return action.payload;
  }
  return state;
}
