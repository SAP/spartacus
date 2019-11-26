import { ReturnRequest } from '../../../model/order.model';
import { UserActions } from '../actions/index';
import { OrderReturnRequestState } from '../user-state';

export const initialState: OrderReturnRequestState = {};

export function reducer(
  state = initialState,
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
