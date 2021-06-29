import { User } from '../../../model/misc.model';
import { UserActions } from '../actions/index';

export const initialState: User = <User>{};

export function reducer(
  state = initialState,
  action: UserActions.UserDetailsAction
): User {
  switch (action.type) {
    case UserActions.LOAD_USER_DETAILS_SUCCESS: {
      return action.payload;
    }
  }

  return state;
}
