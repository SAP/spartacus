import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
  ActionReducer,
  MemoizedSelector
} from '@ngrx/store';
import * as fromCheckout from './checkout.reducer';

export interface CheckoutState {
  steps: fromCheckout.CheckoutState;
}

export const reducers: ActionReducerMap<CheckoutState> = {
  steps: fromCheckout.reducer
};

export const getCartState: MemoizedSelector<
  any,
  CheckoutState
> = createFeatureSelector<CheckoutState>('checkout');

export function clearCheckoutState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (action.type === '[Auth] Logout') {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearCheckoutState];
