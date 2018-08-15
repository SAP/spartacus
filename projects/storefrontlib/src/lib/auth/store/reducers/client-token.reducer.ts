import { ClientAuthenticationToken } from './../../models/token-types.model';
import * as fromActions from './../actions';

export interface ClientTokenState {
  token: ClientAuthenticationToken;
  loading: boolean;
}

export const initialState: ClientTokenState = {
  token: <ClientAuthenticationToken>{},
  loading: false
};

export function reducer(
  state = initialState,
  action: fromActions.ClientTokenAction
): ClientTokenState {
  switch (action.type) {
    case fromActions.LOAD_CLIENT_TOKEN: {
      return {
        ...state,
        loading: true
      };
    }

    case fromActions.LOAD_CLIENT_TOKEN_SUCCESS: {
      const token = action.payload;
      return {
        ...state,
        token,
        loading: false
      };
    }

    case fromActions.LOAD_CLIENT_TOKEN_FAIL: {
      return {
        ...state,
        loading: false
      };
    }
  }

  return state;
}

export const getClientToken = (state: ClientTokenState) => state.token;
export const getClientTokenLoading = (state: ClientTokenState) => state.loading;
