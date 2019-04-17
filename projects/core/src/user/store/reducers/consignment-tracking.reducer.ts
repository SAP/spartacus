import * as fromAction from '../actions/consignment-tracking.action';
import { ConsignmentTrackingState } from '../user-state';
import { ConsignmentTracking } from '../../index';

export const initialState: ConsignmentTrackingState = {
  tracking: {},
};

export function reducer(
  state = initialState,
  action: fromAction.ConsignmentTrackingAction
): ConsignmentTrackingState {
  switch (action.type) {
    case fromAction.LOAD_CONSIGNMENT_TRACKING_SUCCESS: {
      const tracking: ConsignmentTracking = action.payload;

      return {
        ...state,
        tracking,
      };
    }
    case fromAction.CLEAR_CONSIGNMENT_TRACKING: {
      return initialState;
    }
  }
  return state;
}
