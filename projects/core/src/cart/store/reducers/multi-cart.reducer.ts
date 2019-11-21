import { CheckoutActions } from '../../../checkout/store/actions/index';
import { LoaderAction } from '../../../state/utils/loader/loader.action';
import { CartActions } from '../actions/index';
import { CartWithCounter } from '../cart-state';
import * as DeprecatedCartActions from './../actions/cart.action';

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
    case CartActions.SET_ACTIVE_CART_ID:
      return action.payload;
  }
  return state;
}

export const cartEntitiesInitialState = {
  cart: undefined,
  counter: 0,
};

export function cartEntitiesReducer(
  state = cartEntitiesInitialState,
  action: LoaderAction
): CartWithCounter {
  switch (action.type) {
    case CartActions.LOAD_MULTI_CART_SUCCESS:
    case CartActions.CREATE_MULTI_CART_SUCCESS:
      return {
        cart: action.payload.cart,
        counter: state.counter,
      };
    case CartActions.SET_FRESH_CART:
      return {
        cart: action.payload,
        counter: state.counter,
      };
    case DeprecatedCartActions.MERGE_CART:
    case DeprecatedCartActions.ADD_EMAIL_TO_CART:
    case CartActions.CART_ADD_ENTRY:
    case CartActions.CART_UPDATE_ENTRY:
    case CartActions.CART_REMOVE_ENTRY:
    case CartActions.CART_ADD_VOUCHER:
    case CartActions.CART_REMOVE_VOUCHER:
    case CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE:
      console.log(state, action);
      if (
        state.cart &&
        (action.payload.cartId === state.cart.guid ||
          action.payload.cartId === state.cart.code)
      ) {
        return {
          ...state,
          counter: state.counter ? state.counter + 1 : 1,
        };
      }
      return state;
    case DeprecatedCartActions.MERGE_CART_SUCCESS:
    case DeprecatedCartActions.ADD_EMAIL_TO_CART_FAIL:
    case DeprecatedCartActions.ADD_EMAIL_TO_CART_SUCCESS:
    // ! Commented since load action is dispatched in the effect
    case CartActions.CART_ADD_ENTRY_FAIL:
    case CartActions.CART_ADD_ENTRY_SUCCESS:
    case CartActions.CART_UPDATE_ENTRY_FAIL:
    case CartActions.CART_UPDATE_ENTRY_SUCCESS:
    case CartActions.CART_REMOVE_ENTRY_FAIL:
    case CartActions.CART_REMOVE_ENTRY_SUCCESS:
    case CartActions.CART_ADD_VOUCHER_FAIL:
    case CartActions.CART_ADD_VOUCHER_SUCCESS:
    case CartActions.CART_REMOVE_VOUCHER_FAIL:
    case CartActions.CART_REMOVE_VOUCHER_SUCCESS:
    case CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE_FAIL:
    case CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE_SUCCESS:
      if (
        state.cart &&
        (action.payload.cartId === state.cart.guid ||
          action.payload.cartId === state.cart.code)
      ) {
        return {
          ...state,
          counter: state.counter ? state.counter - 1 : 0,
        };
      }
      return state;
  }
  return state;
}
