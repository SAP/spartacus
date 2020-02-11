import { AuthActions } from '@spartacus/core';
import { UserToken } from '../../../auth/models/token-types.model';
import { StateLoaderActions } from '../../../state/utils/index';
import { CSAGENT_TOKEN_DATA } from '../asm-state';
import { AsmActions } from './index';

const token: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
};

describe('Customer Support Agent Token Actions', () => {
  describe('LoadCustomerSupportAgentToken Action', () => {
    it('should create the action', () => {
      const tokenRequest = {
        userId: 'xxx@xxx.xxx',
        password: '1234',
      };

      const action = new AsmActions.LoadCustomerSupportAgentToken(tokenRequest);
      expect({ ...action }).toEqual({
        type: AsmActions.LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN,
        meta: StateLoaderActions.loadMeta(CSAGENT_TOKEN_DATA),
        payload: tokenRequest,
      });
    });
  });

  describe('LoadCustomerSupportAgentTokenFail Action', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new AsmActions.LoadCustomerSupportAgentTokenFail(error);

      expect({ ...action }).toEqual({
        type: AsmActions.LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_FAIL,
        meta: StateLoaderActions.failMeta(CSAGENT_TOKEN_DATA),
        payload: error,
      });
    });
  });

  describe('LoadCustomerSupportAgentTokenSuccess Action', () => {
    it('should create the action', () => {
      const action = new AsmActions.LoadCustomerSupportAgentTokenSuccess(token);

      expect({ ...action }).toEqual({
        type: AsmActions.LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_SUCCESS,
        meta: StateLoaderActions.successMeta(CSAGENT_TOKEN_DATA),
        payload: token,
      });
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
