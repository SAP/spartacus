import { InjectionToken, Provider } from '@angular/core';
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

export function getReducers(): ActionReducerMap<CartState> {
  return {
    active: fromCart.reducer
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<CartState>
> = new InjectionToken<ActionReducerMap<CartState>>('CartReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers
};

export const getCartState: MemoizedSelector<
  any,
  CartState
> = createFeatureSelector<CartState>('cart');

export function clearCartState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (
      action.type === '[Auth] Logout' ||
      action.type === '[Checkout] Place Order Success'
    ) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearCartState];
