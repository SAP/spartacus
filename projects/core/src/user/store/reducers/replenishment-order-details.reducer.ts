import { ReplenishmentOrder } from '../../../model/replenishment-order.model';
import { UserActions } from '../actions/index';

export const initialState: ReplenishmentOrder = {};

export function reducer(
  state = initialState,
  action: UserActions.ReplenishmentOrderDetailsAction
): ReplenishmentOrder {
  switch (action.type) {
    case UserActions.LOAD_REPLENISHMENT_ORDER_DETAILS_SUCCESS:
    case UserActions.CANCEL_REPLENISHMENT_ORDER_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }

    default: {
      return state;
    }
  }
}
