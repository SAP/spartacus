import { UserToken } from '../../../auth/models/token-types.model';
import { AsmActions } from '../actions/index';

export const initialState: UserToken = <UserToken>{};

export function reducer(
  state = initialState,
  action: AsmActions.CustomerSupportAgentTokenAction
): UserToken {
  switch (action.type) {
    case AsmActions.SET_CSAGENT_TOKEN_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
  }
  return state;
}
