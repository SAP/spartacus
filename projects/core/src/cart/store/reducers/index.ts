import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthActions } from '../../../auth/user-auth/store/actions/index';
import { Cart } from '../../../model/cart.model';
import { entityProcessesLoaderReducer } from '../../../state/utils/entity-processes-loader/entity-processes-loader.reducer';
import { MultiCartState, MULTI_CART_DATA } from '../multi-cart-state';
import {
  activeCartReducer,
  cartEntitiesReducer,
  wishListReducer,
} from './multi-cart.reducer';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export function clearMultiCartState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function (state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const multiCartMetaReducers: MetaReducer<any>[] = [clearMultiCartState];

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const multiCartReducerToken: InjectionToken<
  ActionReducerMap<MultiCartState>
> = new InjectionToken<ActionReducerMap<MultiCartState>>('MultiCartReducers');

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export function getMultiCartReducers(): ActionReducerMap<MultiCartState> {
  return {
    carts: entityProcessesLoaderReducer<Cart>(
      MULTI_CART_DATA,
      cartEntitiesReducer
    ),
    active: activeCartReducer,
    wishList: wishListReducer,
  };
}

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const multiCartReducerProvider: Provider = {
  provide: multiCartReducerToken,
  useFactory: getMultiCartReducers,
};
