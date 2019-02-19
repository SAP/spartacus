import { InjectionToken, Provider } from '@angular/core';

import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';

import { CartsState, CartState, CART_DATA } from './../cart-state';
import { LOGOUT } from '../../../auth/store/actions/login-logout.action';
import { PLACE_ORDER_SUCCESS } from '../../../checkout/store/actions/checkout.action';
import { loaderReducer } from '../../../state/utils/loader/loader.reducer';

import { reducer as cartReducer } from './cart.reducer';

export function getReducers(): ActionReducerMap<CartsState> {
  return {
    active: loaderReducer<CartState>(CART_DATA, cartReducer)
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
    if (action.type === LOGOUT || action.type === PLACE_ORDER_SUCCESS) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearCartState];
