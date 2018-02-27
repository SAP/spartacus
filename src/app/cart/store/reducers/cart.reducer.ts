import { Cart } from '../../models/cart-types.model';
import * as fromAction from './../actions';

export interface CartContentState {
  content: Cart;
}

export const initialState: CartContentState = {
  content: <Cart>{}
};

export function reducer(
  state = initialState,
  action: fromAction.CartAction
): CartContentState {
  switch (action.type) {
    case fromAction.CREATE_CART_SUCCESSS: {
      const content = action.payload;

      return {
        ...state,
        content
      };
    }
    case fromAction.CREATE_CART_FAIL: {
      return initialState;
    }
  }
  return state;
}

export const getCartContent = (state: CartContentState) => state.content;
