import * as fromAction from './client-authentication-token.action';
import { ClientAuthenticationToken } from '../../../user/models/token-types.model';

describe('Client Authentication Token Actions', () => {
  describe('LoadClientAuthenticationToken Action', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadClientAuthenticationToken();

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_CLIENT_AUTHENTICATION_TOKEN
      });
    });
  });
  describe('LoadClientAuthenticationTokenFail Action', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromAction.LoadClientAuthenticationTokenFail(error);

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_CLIENT_AUTHENTICATION_TOKEN_FAIL,
        payload: error
      });
    });
  });

  describe('LoadClientAuthenticationTokenSuccess Action', () => {
    it('should create the action', () => {
      const token: ClientAuthenticationToken = {
        access_token: 'abc-123',
        token_type: 'bearer',
        expires_in: 1000,
        scope: 'scope'
      };
      const action = new fromAction.LoadClientAuthenticationTokenSuccess(token);

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_CLIENT_AUTHENTICATION_TOKEN_SUCCESS,
        payload: token
      });
    });
  });
});
