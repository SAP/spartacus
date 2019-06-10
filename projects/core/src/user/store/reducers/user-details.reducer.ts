import * as fromUpdateEmailAction from '../actions/update-email.action';
import * as fromUserDetailsAction from '../actions/user-details.action';
import { User } from '../../../model/misc.model';

export const initialState: User = <User>{};

export function reducer(
  state = initialState,
  action:
    | fromUserDetailsAction.UserDetailsAction
    | fromUpdateEmailAction.EmailActions
): User {
  switch (action.type) {
    case fromUserDetailsAction.LOAD_USER_DETAILS_SUCCESS: {
      return action.payload;
    }

    case fromUserDetailsAction.UPDATE_USER_DETAILS_SUCCESS: {
      const updatedDetails: User = {
        ...state,
        ...action.userUpdates,
      };
      return {
        ...updatedDetails,
        name: `${updatedDetails.firstName} ${updatedDetails.lastName}`,
      };
    }
  }

  return state;
}
