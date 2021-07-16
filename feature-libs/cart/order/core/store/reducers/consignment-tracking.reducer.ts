import { ConsignmentTracking } from '@spartacus/cart/order/root';
import { ConsignmentTrackingState } from '@spartacus/core';
import { OrderActions } from '../actions/index';

export const initialState: ConsignmentTrackingState = {};

export function reducer(
  state = initialState,
  action: OrderActions.ConsignmentTrackingAction
): ConsignmentTrackingState {
  switch (action.type) {
    case OrderActions.LOAD_CONSIGNMENT_TRACKING_SUCCESS: {
      const tracking: ConsignmentTracking = action.payload;
      return {
        tracking,
      };
    }
    case OrderActions.CLEAR_CONSIGNMENT_TRACKING: {
      return initialState;
    }
  }
  return state;
}
