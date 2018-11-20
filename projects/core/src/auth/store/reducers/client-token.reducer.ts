import { ClientToken } from './../../models/token-types.model';
import * as fromActions from './../actions';
import { ClientTokenState } from '../auth-state';

export const initialState: ClientTokenState = {
  token: <ClientToken>{},
  loading: false,
  loaded: false
};

export function reducer(
  state = initialState,
  action: fromActions.ClientTokenAction
): ClientTokenState {
  switch (action.type) {
    case fromActions.LOAD_CLIENT_TOKEN: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromActions.LOAD_CLIENT_TOKEN_SUCCESS: {
      const token = action.payload;
      return {
        ...state,
        token,
        loading: false,
        loaded: true
      };
    }

    case fromActions.LOAD_CLIENT_TOKEN_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }
  }

  return state;
}
