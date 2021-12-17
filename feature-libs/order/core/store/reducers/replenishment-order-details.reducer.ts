import { ReplenishmentOrder } from '@spartacus/core';
import { OrderActions } from '../actions/index';

export const initialState: ReplenishmentOrder = {};

export function reducer(
  state = initialState,
  action: OrderActions.ReplenishmentOrderDetailsAction
): ReplenishmentOrder {
  switch (action.type) {
    case OrderActions.LOAD_REPLENISHMENT_ORDER_DETAILS_SUCCESS:
    case OrderActions.CANCEL_REPLENISHMENT_ORDER_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }

    default: {
      return state;
    }
  }
}
