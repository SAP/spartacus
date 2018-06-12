import { ClientAuthenticationToken } from '../../../user/models/token-types.model';
import * as fromAction from '../actions';

export interface ClientAuthenticationTokenState {
  token: ClientAuthenticationToken;
}

export const initialState: ClientAuthenticationTokenState = {
  token: <ClientAuthenticationToken>{}
};

export function reducer(
  state = initialState,
  action: fromAction.ClientAuthenticationTokenAction
): ClientAuthenticationTokenState {
  switch (action.type) {
    case fromAction.LOAD_CLIENT_AUTHENTICATION_TOKEN_SUCCESS: {
      const token = action.payload;

      return { ...state, token };
    }
  }
  return state;
}

export const getClientToken = (state: ClientAuthenticationTokenState) =>
  state.token;
