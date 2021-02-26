import { User } from '@spartacus/user/account/root';
import { UserAccountActions } from '../actions/index';
import { Action } from '@ngrx/store';

export const initialState: User = <User>{};

export function reducer(state = initialState, action: Action): User {
  switch (action.type) {
    case UserAccountActions.LOAD_USER_ACCOUNT_SUCCESS: {
      return (action as UserAccountActions.UserAccountAction).payload;
    }
  }

  return state;
}
