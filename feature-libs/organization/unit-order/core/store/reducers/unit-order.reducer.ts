import { OrderHistoryList } from "@spartacus/order/root";
import { UnitOrderActions } from "../actions";


export const initialState: OrderHistoryList = {
  orders: [],
  pagination: {},
  sorts: [],
};

export function reducer(
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

