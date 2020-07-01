import * as fromUpdateEmailAction from '../../../user/store/actions/update-email.action';
import { UserToken } from '../../models/token-types.model';
import { AuthActions } from '../actions/index';

export const initialState: UserToken = <UserToken>{};

export function reducer(
  state = initialState,
  action:
    | AuthActions.UserTokenAction
    | fromUpdateEmailAction.UpdateEmailSuccessAction
): UserToken {
  switch (action.type) {
    case AuthActions.LOAD_USER_TOKEN_SUCCESS:
    case AuthActions.REFRESH_USER_TOKEN_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case AuthActions.CLEAR_USER_TOKEN: {
      return {
        ...initialState,
      };
    }
  }
  return state;
}
