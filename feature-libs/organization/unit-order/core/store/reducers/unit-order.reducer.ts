import { Order, OrderHistoryList } from '@spartacus/order/root';
import { UnitOrderActions } from '../actions';

export const initialState: OrderHistoryList = {
  orders: [],
  pagination: {},
  sorts: [],
};

export const detailInitialState: Order = {};

export function historyReducer(
  state = initialState,
  action: UnitOrderActions.UnitOrdersAction
): OrderHistoryList {
  switch (action.type) {
    case UnitOrderActions.LOAD_UNIT_ORDERS_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }
    case UnitOrderActions.LOAD_UNIT_ORDERS_FAIL: {
      return initialState;
    }
  }

  return state;
}

export function detailReducer(
  state = detailInitialState,
  action: UnitOrderActions.UnitOrdersAction
): Order {
  switch (action.type) {
    case UnitOrderActions.LOAD_ORDER_DETAILS_SUCCESS: {
      const order: Order = action.payload;
      return order;
    }
  }
  return state;
}
