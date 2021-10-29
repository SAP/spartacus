import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { Cart } from '@spartacus/cart/main/root';
import { AuthActions, StateUtils } from '@spartacus/core';
import { MultiCartState, MULTI_CART_DATA } from '../multi-cart-state';
import { activeCartReducer, cartEntitiesReducer } from './multi-cart.reducer';

export function clearMultiCartState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function (state, action) {
    if (action.type === AuthActions.LOGOUT) {
      console.log(state);
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const multiCartMetaReducers: MetaReducer<any>[] = [clearMultiCartState];

export const multiCartReducers: ActionReducerMap<
  Partial<MultiCartState>,
  any
> = {
  carts: StateUtils.entityProcessesLoaderReducer<Cart | undefined>(
    MULTI_CART_DATA,
    cartEntitiesReducer
  ),
  active: activeCartReducer,
};
