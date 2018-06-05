import * as fromAction from './trusted-client-token.action';
import { TrustedClientToken } from '../../../user/models/token-types.model';

describe('Trusted Client Token Actions', () => {
  describe('LoadTrustedClientTokenFail Action', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromAction.LoadTrustedClientTokenFail(error);

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_TRUSTED_CLIENT_TOKEN_FAIL,
        payload: error
      });
    });
  });

  describe('LoadTrustedClientTokenSuccess Action', () => {
    it('should create the action', () => {
      const token: TrustedClientToken = {
        access_token: 'abc-123',
        token_type: 'bearer',
        expires_in: 1000,
        scope: 'scope'
      };
      const action = new fromAction.LoadTrustedClientTokenSuccess(token);

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_TRUSTED_CLIENT_TOKEN_SUCCESS,
        payload: token
      });
    });
  });
});
