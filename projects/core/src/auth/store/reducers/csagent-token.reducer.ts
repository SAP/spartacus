import { UserToken } from '../../models/token-types.model';
import { AuthActions } from '../actions/index';

export const initialState: UserToken = <UserToken>{};

export function reducer(
  state = initialState,
  action: AuthActions.CustomerSupportAgentTokenAction
): UserToken {
  switch (action.type) {
    case AuthActions.LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN: {
      return {
        ...state,
      };
    }

    case AuthActions.LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case AuthActions.LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_FAIL: {
      return {
        ...state,
      };
    }
  }
  return state;
}
