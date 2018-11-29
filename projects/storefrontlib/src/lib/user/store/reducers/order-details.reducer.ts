import * as fromOrderDetailsAction from '../actions/order-details.action';
import { Order } from '@spartacus/core';

export interface OrderDetailsState {
  order: Order;
}

export const initialState: OrderDetailsState = {
  order: {}
};

export function reducer(
  state = initialState,
  action: fromOrderDetailsAction.OrderDetailsAction
): OrderDetailsState {
  switch (action.type) {
    case fromOrderDetailsAction.LOAD_ORDER_DETAILS_SUCCESS: {
      const order: Order = action.payload;

      return {
        ...state,
        order
      };
    }
    case fromOrderDetailsAction.CLEAR_ORDER_DETAILS: {
      return initialState;
    }
  }
  return state;
}

export const getOrderDetails = (state: OrderDetailsState) => state.order;
