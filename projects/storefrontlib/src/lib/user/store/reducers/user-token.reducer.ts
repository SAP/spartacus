import { UserToken } from '../../models/token-types.model';
import * as fromAction from './../actions/user-token.action';

export interface UserTokenState {
  token: UserToken;
  loading: boolean;
}

export const initialState: UserTokenState = {
  token: <UserToken>{},
  loading: false
};

export function reducer(
  state = initialState,
  action: fromAction.UserTokenAction
): UserTokenState {
  switch (action.type) {
    case fromAction.LOAD_USER_TOKEN:
    case fromAction.REFRESH_USER_TOKEN: {
      return {
        ...state,
        loading: true
      };
    }

    case fromAction.LOAD_USER_TOKEN_SUCCESS:
    case fromAction.REFRESH_USER_TOKEN_SUCCESS: {
      const token = action.payload;

      return {
        ...state,
        token,
        loading: false
      };
    }

    case fromAction.LOAD_USER_TOKEN_FAIL:
    case fromAction.REFRESH_USER_TOKEN_FAIL: {
      return {
        ...state,
        loading: false
      };
    }
  }
  return state;
}

export const getUserToken = (state: UserTokenState) => state.token;
export const getUserTokenLoading = (state: UserTokenState) => state.loading;
