import {
  ReplenishmentOrder,
  ReplenishmentOrderList,
} from '../../../model/replenishment-order.model';
import { UserActions } from '../actions/index';
export const initialState: ReplenishmentOrderList = {
  replenishmentOrders: [],
  pagination: {},
  sorts: [],
};

/**
 * @deprecated since 4.2 - use order lib instead
 */
export function reducer(
  state = initialState,
  action:
    | UserActions.UserReplenishmentOrdersAction
    | UserActions.ReplenishmentOrderDetailsAction
): ReplenishmentOrderList {
  switch (action.type) {
    case UserActions.LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }

    case UserActions.CANCEL_REPLENISHMENT_ORDER_SUCCESS: {
      const cancelledReplenishmentOrder = action.payload;
      const userReplenishmentOrders = [...state.replenishmentOrders];

      const index = userReplenishmentOrders.findIndex(
        (replenishmentOrder: ReplenishmentOrder) =>
          replenishmentOrder.replenishmentOrderCode ===
          cancelledReplenishmentOrder.replenishmentOrderCode
      );

      if (index === -1) {
        return initialState;
      } else {
        userReplenishmentOrders[index] = {
          ...cancelledReplenishmentOrder,
        };
      }

      return { ...state, replenishmentOrders: userReplenishmentOrders };
    }
  }
  return state;
}
