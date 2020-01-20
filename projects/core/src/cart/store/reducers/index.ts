import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthActions } from '../../../auth/store/actions/index';
import { CheckoutActions } from '../../../checkout/store/actions/index';
import { Cart } from '../../../model/cart.model';
import { entityProcessesLoaderReducer } from '../../../state/utils/entity-processes-loader/entity-processes-loader.reducer';
import { loaderReducer } from '../../../state/utils/loader/loader.reducer';
import { CartsState, CartState, CART_DATA } from '../cart-state';
import { MultiCartState, MULTI_CART_FEATURE } from '../multi-cart-state';
import { reducer as cartReducer } from './cart.reducer';
import {
  activeCartReducer,
  cartEntitiesReducer,
  wishListReducer,
} from './multi-cart.reducer';

export function getReducers(): ActionReducerMap<CartsState> {
  return {
    active: loaderReducer<CartState>(CART_DATA, cartReducer),
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<CartsState>
> = new InjectionToken<ActionReducerMap<CartsState>>('CartReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearCartState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (
      action.type === AuthActions.LOGOUT ||
      action.type === CheckoutActions.PLACE_ORDER_SUCCESS
    ) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearCartState];

export function clearMultiCartState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const multiCartMetaReducers: MetaReducer<any>[] = [clearMultiCartState];

export const multiCartReducerToken: InjectionToken<
  ActionReducerMap<MultiCartState>
> = new InjectionToken<ActionReducerMap<MultiCartState>>('MultiCartReducers');

export function getMultiCartReducers(): ActionReducerMap<MultiCartState> {
  return {
    carts: entityProcessesLoaderReducer<Cart>(
      MULTI_CART_FEATURE,
      cartEntitiesReducer
    ),
    active: activeCartReducer,
    wishList: wishListReducer,
  };
}

export const multiCartReducerProvider: Provider = {
  provide: multiCartReducerToken,
  useFactory: getMultiCartReducers,
};
