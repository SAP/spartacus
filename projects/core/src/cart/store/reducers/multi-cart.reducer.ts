import { CartActions } from '../actions/index';
// import { isActiveCart } from '../../utils/utils';
import { LoaderAction } from '../../../state/utils/loader/loader.action';
import { NewCartState } from '../cart-state';

export const initialState2 = '';

export function multiCartReducer(
  state = initialState2,
  action:
    | CartActions.CartAction
    | CartActions.CartEntryAction
    | CartActions.MultiCartActions
): string {
  switch (action.type) {
    case CartActions.LOAD_MULTI_CART_SUCCESS:
    case CartActions.CREATE_MULTI_CART_SUCCESS:
      if (action.payload && action.payload.extraData && action.payload.extraData.active) {
        return action.meta.entityId as string;
      } else {
        return state;
      }
    case CartActions.REMOVE_CART:
      if (action.payload === state) {
        return initialState2;
      } else {
        return state;
      }
  }
  return state;
}

export const initialState: NewCartState = {
  content: {},
};

export function cartEntitiesReducer(
  state = initialState,
  action: LoaderAction
): NewCartState {
  switch (action.type) {
    case CartActions.LOAD_MULTI_CART_SUCCESS:
      return {
        content: action.payload.cart,
      };
    case CartActions.CREATE_MULTI_CART_SUCCESS:
      return {
        content: action.payload.cart,
      };
    case CartActions.SET_FRESH_CART_ID:
      return {
        content: action.payload,
      };
  }
  return state;
}
