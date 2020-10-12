import { UserToken } from '../../../auth/models/token-types.model';
import { AsmActions } from '../actions/index';

export const initialState: UserToken = <UserToken>{};

export function reducer(
  state = initialState,
  action: AsmActions.CustomerSupportAgentTokenAction
): UserToken {
  switch (action.type) {
    case AsmActions.LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
  }
  return state;
}
