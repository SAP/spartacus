import { UserToken } from '../../models/token-types.model';
import * as fromUpdateEmailAction from './../../../user/store/actions/update-email.action';
import * as fromAction from './../actions/user-token.action';

export const initialState: UserToken = <UserToken>{};

export function reducer(
  state = initialState,
  action:
    | fromAction.UserTokenAction
    | fromUpdateEmailAction.UpdateEmailSuccessAction
): UserToken {
  switch (action.type) {
    case fromAction.LOAD_USER_TOKEN:
    case fromAction.REFRESH_USER_TOKEN: {
      return {
        ...state,
      };
    }

    case fromAction.LOAD_USER_TOKEN_SUCCESS:
    case fromAction.REFRESH_USER_TOKEN_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case fromAction.LOAD_USER_TOKEN_FAIL:
    case fromAction.REFRESH_USER_TOKEN_FAIL: {
      return {
        ...state,
      };
    }
  }
  return state;
}
