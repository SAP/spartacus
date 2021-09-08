import { ReplenishmentOrder } from '../../../model/replenishment-order.model';
import { UserActions } from '../actions/index';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const initialState: ReplenishmentOrder = {};

/**
 * @deprecated since 4.2 - use order lib instead
 */
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
