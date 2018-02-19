import {
  ActionReducerMap,
  MemoizedSelector,
  createFeatureSelector
} from '@ngrx/store';
import * as fromCart from './cart.reducer';

export interface CartState {
  state: fromCart.CartContentState;
}

export const reducers: ActionReducerMap<CartState> = {
  state: fromCart.reducer
};

export const getCartState: MemoizedSelector<
  any,
  CartState
> = createFeatureSelector<CartState>('cart');
