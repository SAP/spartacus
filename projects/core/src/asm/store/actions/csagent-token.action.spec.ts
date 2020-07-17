import { AuthActions } from '@spartacus/core';
import { AsmActions } from './index';

describe('SetCSAgentTokenData Action', () => {
  it('should create the action', () => {
    const tokenRequest = {
      access_token: 'some-token-here',
    };

    const action = new AsmActions.SetCSAgentTokenData(tokenRequest);
    expect({ ...action }).toEqual({
      type: AsmActions.SET_CSAGENT_TOKEN_DATA,
      payload: tokenRequest,
    });
  });
});

describe('Logout Customer Support Agent Action', () => {
  it('should create the action', () => {
    const action = new AsmActions.LogoutCustomerSupportAgent();

    expect({ ...action }).toEqual({
      type: AuthActions.LOGOUT_CUSTOMER_SUPPORT_AGENT,
    });
  });
});
