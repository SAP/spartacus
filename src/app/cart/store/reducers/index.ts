import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
  ActionReducer,
  MemoizedSelector
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

export function clearCartState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (action.type === '[Auth] Logout') {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearCartState];
