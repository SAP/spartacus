import { ClientAuthenticationToken } from './../../models/token-types.model';
import * as fromActions from './../actions';

export interface ClientTokenState {
  token: ClientAuthenticationToken;
}

export const initialState: ClientTokenState = {
  token: <ClientAuthenticationToken>{}
};

export function reducer(
  state = initialState,
  action: fromActions.ClientTokenAction
): ClientTokenState {
  switch (action.type) {
    case fromActions.LOAD_CLIENT_TOKEN: {
      return {
        ...state
      };
    }

    case fromActions.LOAD_CLIENT_TOKEN_SUCCESS: {
      const token = action.payload;
      return {
        ...state,
        token
      };
    }

    case fromActions.LOAD_CLIENT_TOKEN_FAIL: {
      return {
        ...state
      };
    }
  }

  return state;
}

export const getClientToken = (state: ClientTokenState) => state.token;
