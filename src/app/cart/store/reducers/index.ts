import {
  ActionReducerMap,
  MemoizedSelector,
  createFeatureSelector
} from '@ngrx/store';
import * as fromCart from './cart.reducer';

export interface CartState {
  active: fromCart.CartState;
}

export const reducers: ActionReducerMap<CartState> = {
  active: fromCart.reducer
};

export const getCartState: MemoizedSelector<
  any,
  CartState
> = createFeatureSelector<CartState>('cart');
