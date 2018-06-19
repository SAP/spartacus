import * as fromUserOrdersAction from '../actions/user-orders.action';

export interface UserOrdersState {
  orders: any;
}

export const initialState: UserOrdersState = {
  orders: []
};

export function reducer(
  state = initialState,
  action: fromUserOrdersAction.UserOrdersAction
): UserOrdersState {
  switch (action.type) {
    case fromUserOrdersAction.LOAD_USER_ORDERS: {
      const orders = action.payload;
      return {
        ...state,
        orders
      };
    }
    case fromUserOrdersAction.LOAD_USER_ORDERS_SUCCESS: {
      const orders = action.payload;
      return {
        ...state,
        orders
      };
    }
    case fromUserOrdersAction.LOAD_USER_ORDERS_FAIL: {
      const orders = action.payload;
      return {
        ...state,
        orders
      };
    }
  }
  return state;
}

export const getOrders = (state: UserOrdersState) => state.orders;
