import { UserToken } from '../../../auth/models/token-types.model';
import { AsmActions } from '../actions/index';
import * as fromCustomerSupportAgentTokenReducer from './csagent-token.reducer';

const testToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
};

describe('Customer Support Agent Token reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromCustomerSupportAgentTokenReducer;
      const action = {} as AsmActions.CustomerSupportAgentTokenAction;
      const state = fromCustomerSupportAgentTokenReducer.reducer(
        undefined,
        action
      );

      expect(state).toBe(initialState);
    });
  });

  describe('LoadCustomerSupportAgentTokenSuccess action', () => {
    it('should store token', () => {
      const { initialState } = fromCustomerSupportAgentTokenReducer;

      const action = new AsmActions.LoadCustomerSupportAgentTokenSuccess(
        testToken
      );
      const state = fromCustomerSupportAgentTokenReducer.reducer(
        initialState,
        action
      );

      expect(state).toEqual(testToken);
    });
  });
});
