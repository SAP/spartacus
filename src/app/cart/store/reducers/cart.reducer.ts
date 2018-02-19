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
  }
}
