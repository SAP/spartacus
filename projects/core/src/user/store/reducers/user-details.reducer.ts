import * as fromUserDetailsAction from '../actions/user-details.action';
import { UserDetailsState } from '../user-state';
import { User } from '../../../occ/occ-models/index';

export const initialState: UserDetailsState = {
  details: <User>{}
};

export function reducer(
  state = initialState,
  action: fromUserDetailsAction.UserDetailsAction
): UserDetailsState {
  switch (action.type) {
    case fromUserDetailsAction.LOAD_USER_DETAILS_SUCCESS: {
      const details: User = action.payload;

      return {
        ...state,
        details
      };
    }
  }
  return state;
}
