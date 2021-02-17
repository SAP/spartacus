import { User } from '@spartacus/user/account/root';
import { UserAccountActions } from '../actions/index';

export const initialState: User = <User>{};

export function reducer(
  state = initialState,
  action: UserAccountActions.UserAccountAction
): User {
  switch (action.type) {
    case UserAccountActions.LOAD_USER_ACCOUNT_SUCCESS: {
      return action.payload;
    }
  }

  return state;
}
