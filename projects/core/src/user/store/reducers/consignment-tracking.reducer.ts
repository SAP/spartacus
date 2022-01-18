import { ConsignmentTracking } from '../../../model/index';
import { UserActions } from '../actions/index';
import { ConsignmentTrackingState } from '../user-state';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const initialState: ConsignmentTrackingState = {};

/**
 * @deprecated since 4.2 - use order lib instead
 */
export function reducer(
  state = initialState,
  action: UserActions.ConsignmentTrackingAction
): ConsignmentTrackingState {
  switch (action.type) {
    case UserActions.LOAD_CONSIGNMENT_TRACKING_SUCCESS: {
      const tracking: ConsignmentTracking = action.payload;
      return {
        tracking,
      };
    }
    case UserActions.CLEAR_CONSIGNMENT_TRACKING: {
      return initialState;
    }
  }
  return state;
}
