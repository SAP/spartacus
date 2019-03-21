import * as fromUserDetailsAction from '../actions/user-details.action';
import { User } from '../../../occ/occ-models/index';

export const initialState: User = <User>{};

export function reducer(
  state = initialState,
  action: fromUserDetailsAction.UserDetailsAction
): User {
  switch (action.type) {
    case fromUserDetailsAction.LOAD_USER_DETAILS_SUCCESS: {
      return action.payload;
    }

    case fromUserDetailsAction.UPDATE_USER_DETAILS_SUCCESS: {
      return {
        ...state,
        ...action.userUpdates
      };
    }
  }

  return state;
}
