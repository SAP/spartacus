import { TrustedClientToken } from '../../../user/models/token-types.model';
import * as fromAction from '../actions';

export interface TrustedClientTokenState {
  token: TrustedClientToken;
}

export const initialState: TrustedClientTokenState = {
  token: <TrustedClientToken>{}
};

export function reducer(
  state = initialState,
  action: fromAction.TrustedClientTokenAction
): TrustedClientTokenState {
  switch (action.type) {
    case fromAction.LOAD_TRUSTED_CLIENT_TOKEN_SUCCESS: {
      const token = action.payload;

      return { ...state, token };
    }
  }
  return state;
}

export const getTrustedClientToken = (state: TrustedClientTokenState) =>
  state.token;
