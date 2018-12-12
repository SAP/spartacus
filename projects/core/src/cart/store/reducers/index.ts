import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';
import { CartsState } from './../cart-state';
import { reducer as rootReducer } from './cart.reducer';

export function getReducers(): ActionReducerMap<CartsState> {
  return {
    active: rootReducer
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<CartsState>
> = new InjectionToken<ActionReducerMap<CartsState>>('CartReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers
};

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
