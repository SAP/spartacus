import * as fromAction from './../actions/user-token.action';
import { UserToken } from '../../models/token-types.model';
import { UserTokenState } from '../auth-state';

export const initialState: UserTokenState = {
  token: <UserToken>{}
};

export function reducer(
  state = initialState,
  action: fromAction.UserTokenAction
): UserTokenState {
  switch (action.type) {
    case fromAction.LOAD_USER_TOKEN:
    case fromAction.REFRESH_USER_TOKEN: {
      return {
        ...state
      };
    }

    case fromAction.LOAD_USER_TOKEN_SUCCESS:
    case fromAction.REFRESH_USER_TOKEN_SUCCESS: {
      const token = action.payload;

      return {
        ...state,
        token
      };
    }

    case fromAction.LOAD_USER_TOKEN_FAIL:
    case fromAction.REFRESH_USER_TOKEN_FAIL: {
      return {
        ...state
      };
    }
  }
  return state;
}
