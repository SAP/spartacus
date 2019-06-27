import { User } from '../../../model/misc.model';
import { UserActions } from '../actions/index';

export const initialState: User = <User>{};

export function reducer(
  state = initialState,
  action: UserActions.UserDetailsAction | UserActions.EmailActions
): User {
  switch (action.type) {
    case UserActions.LOAD_USER_DETAILS_SUCCESS: {
      return action.payload;
    }

    case UserActions.UPDATE_USER_DETAILS_SUCCESS: {
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
