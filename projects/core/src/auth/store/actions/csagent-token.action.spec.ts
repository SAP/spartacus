import { UserToken } from '../../models/token-types.model';
import { AuthActions } from './index';

const token: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  userId: 'xxx',
};

describe('Customer Support Agent Token Actions', () => {
  describe('LoadCustomerSupportAgentToken Action', () => {
    it('should create the action', () => {
      const tokenRequest = {
        userId: 'xxx@xxx.xxx',
        password: '1234',
      };

      const action = new AuthActions.LoadCustomerSupportAgentToken(
        tokenRequest
      );
      expect({ ...action }).toEqual({
        type: AuthActions.LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN,
        payload: tokenRequest,
      });
    });
  });

  describe('LoadCustomerSupportAgentTokenFail Action', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new AuthActions.LoadCustomerSupportAgentTokenFail(error);

      expect({ ...action }).toEqual({
        type: AuthActions.LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_FAIL,
        payload: error,
      });
    });
  });

  describe('LoadCustomerSupportAgentTokenSuccess Action', () => {
    it('should create the action', () => {
      const action = new AuthActions.LoadCustomerSupportAgentTokenSuccess(
        token
      );

      expect({ ...action }).toEqual({
        type: AuthActions.LOAD_CUSTOMER_SUPPORT_AGENT_TOKEN_SUCCESS,
        payload: token,
      });
    });
  });
});
