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
    // case CartActions.LOAD_MULTI_CART_SUCCESS:
    //   if (isActiveCart(action.payload)) {
    //     return action.payload.guid;
    //   }
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
  console.log(action);
  switch (action.type) {
    case CartActions.LOAD_MULTI_CART_SUCCESS:
      return {
        content: action.payload,
      }
    case CartActions.SET_FRESH_CART_ID:
      return {
        content: action.payload
      }
  }
  return state;
}
