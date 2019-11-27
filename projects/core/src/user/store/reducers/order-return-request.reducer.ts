import { ReturnRequest, ReturnRequestList } from '../../../model/order.model';
import { UserActions } from '../actions/index';
import { OrderReturnRequestState } from '../user-state';

export const returnRequestInitialState: OrderReturnRequestState = {};

export function returnRequestReducer(
  state = returnRequestInitialState,
  action: UserActions.OrderReturnRequestAction
): OrderReturnRequestState {
  switch (action.type) {
    case UserActions.CREATE_ORDER_RETURN_REQUEST_SUCCESS: {
      const returnRequest: ReturnRequest = action.payload;

      return {
        returnRequest,
      };
    }
  }
  return state;
}

export const returnRequestListInitialState: ReturnRequestList = {
  returnRequests: [],
  pagination: {},
  sorts: [],
};

export function returnRequestListReducer(
  state = returnRequestListInitialState,
  action: UserActions.OrderReturnRequestAction
): ReturnRequestList {
  switch (action.type) {
    case UserActions.LOAD_ORDER_RETURN_REQUESTS_SUCCESS: {
      return action.payload ? action.payload : returnRequestListInitialState;
    }
  }

  return state;
}
