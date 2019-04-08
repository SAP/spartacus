import { User } from '../../../occ/occ-models/index';
import * as fromUpdateEmailAction from '../actions/update-email.action';
import * as fromUserDetailsAction from '../actions/user-details.action';

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
    case fromUpdateEmailAction.UPDATE_EMAIL_SUCCESS: {
      const updatedUser: User = {
        ...state,
        uid: action.newUid,
        displayUid: action.newUid,
      };

      return {
        ...updatedUser,
        uid: updatedUser.uid,
        displayUid: updatedUser.displayUid,
      };
    }
  }
  return state;
}
