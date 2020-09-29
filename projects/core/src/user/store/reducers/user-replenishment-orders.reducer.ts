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
      const userReplenishmentOrders = new Array<ReplenishmentOrder>(
        state.replenishmentOrders.length
      );
      state.replenishmentOrders.forEach(
        (replenishmentOrder: ReplenishmentOrder, index) =>
          replenishmentOrder.replenishmentOrderCode ===
          cancelledReplenishmentOrder.replenishmentOrderCode
            ? (userReplenishmentOrders[index] = {
                ...cancelledReplenishmentOrder,
              })
            : (userReplenishmentOrders[index] = replenishmentOrder)
      );
      return { ...state, replenishmentOrders: userReplenishmentOrders };
    }
  }
  return state;
}
