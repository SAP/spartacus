import { UserToken } from '../../models/token-types.model';
import { AuthActions } from '../actions/index';
import * as fromCustomerSupportAgentTokenReducer from './csagent-token.reducer';

const testToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  userId: 'xxx',
};

describe('Customer Support Agent Token reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromCustomerSupportAgentTokenReducer;
      const action = {} as AuthActions.CustomerSupportAgentTokenAction;
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

      const action = new AuthActions.LoadCustomerSupportAgentTokenSuccess(
        testToken
      );
      const state = fromCustomerSupportAgentTokenReducer.reducer(
        initialState,
        action
      );

      expect(state).toEqual(testToken);
    });
  });

  describe('LoadCustomerSupportAgentToken action', () => {
    it('should load token', () => {
      const { initialState } = fromCustomerSupportAgentTokenReducer;

      const action = new AuthActions.LoadCustomerSupportAgentToken({
        userId: 'user',
        password: 'pass',
      });
      const state = fromCustomerSupportAgentTokenReducer.reducer(
        initialState,
        action
      );

      expect(state).toEqual(initialState);
    });
  });

  describe('LoadCustomerSupportAgentTokenFail action', () => {
    it('should fail load token', () => {
      const { initialState } = fromCustomerSupportAgentTokenReducer;

      const action = new AuthActions.LoadCustomerSupportAgentTokenFail({});
      const state = fromCustomerSupportAgentTokenReducer.reducer(
        initialState,
        action
      );

      expect(state).toEqual(initialState);
    });
  });
});
