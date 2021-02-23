import { Cart, StateUtils } from '@spartacus/core';
import { SavedCartActions } from '../actions/index';

export const savedCartInitialState = undefined;
export const savedCartsInitialState = undefined;

export function savedCartEntitiesReducer(
  state: Cart = savedCartInitialState,
  action: StateUtils.LoaderAction
): Cart {
  switch (action.type) {
    case SavedCartActions.LOAD_SAVED_CART_SUCCESS:
      return action.payload;
  }
  return state;
}

export function savedCartListReducer(
  state = savedCartsInitialState,
  action: StateUtils.LoaderAction
): any {
  switch (action.type) {
    case SavedCartActions.LOAD_SAVED_CARTS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
