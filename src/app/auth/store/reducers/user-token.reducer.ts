import { UserToken } from '../../token-types';
import * as fromAction from './../actions/user-token.action';

export interface UserTokenState {
  token: UserToken;
}

export const initialState: UserTokenState = {
  token: <UserToken>{}
};

export function reducer(
  state = initialState,
  action: fromAction.UserTokenAction
): UserTokenState {
  switch (action.type) {
    case fromAction.LOAD_USER_TOKEN_SUCCESS: {
      const token = action.payload;

      return {
        ...state,
        token
      };
    }
    case fromAction.LOAD_USER_TOKEN_FAIL: {
      return {
        ...state,
        token: <UserToken>{}
      };
    }
  }
  return state;
}

export const getUserToken = (state: UserTokenState) => state.token;
