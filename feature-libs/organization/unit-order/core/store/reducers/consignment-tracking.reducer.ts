import { ConsignmentTrackingState } from '@spartacus/order/core';
import { ConsignmentTracking } from '@spartacus/order/root';
import { UnitOrderActions } from '../actions';

export const initialState: ConsignmentTrackingState = { tracking: {} };

export function reducer(
  state = initialState,
  action: UnitOrderActions.ConsignmentTrackingAction
): ConsignmentTrackingState {
  switch (action.type) {
    case UnitOrderActions.LOAD_CONSIGNMENT_TRACKING_SUCCESS: {
      const tracking: ConsignmentTracking = action.payload;
      return {
        tracking,
      };
    }
    case UnitOrderActions.CLEAR_CONSIGNMENT_TRACKING: {
      return initialState;
    }
  }
  return state;
}
