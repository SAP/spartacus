import { UserToken } from '../../models/token-types.model';
import * as fromAction from './../actions';

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
  }
  return state;
}

export const getUserToken = (state: UserTokenState) => state.token;
