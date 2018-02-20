import { UserToken } from '../../models/token-types.model';
import * as fromActions from './../actions';

export interface UserTokenState {
  token: UserToken;
}

export const initialState: UserTokenState = {
  token: <UserToken>{}
};

export function reducer(
  state = initialState,
  action: fromActions.UserTokenAction
): UserTokenState {
  switch (action.type) {
    case fromActions.LOAD_USER_TOKEN_SUCCESS || fromActions.LOGIN: {
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
