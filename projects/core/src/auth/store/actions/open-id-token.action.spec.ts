import { failMeta, loadMeta, successMeta } from '../../../state';
import { OpenIdToken } from '../../models/token-types.model';
import { OPEN_ID_TOKEN_DATA } from '../auth-state';
import * as fromUserToken from './open-id-token.action';

const token = {
  access_token: 'xxx',
} as OpenIdToken;

describe('Open ID Token Actions', () => {
  describe('LoadOpenIdToken Actions', () => {
    it('should create the action', () => {
      const tokenRequest: { username: string; password: string } = {
        username: 'xxx@xxx.xxx',
        password: '1234',
      };

      const action = new fromUserToken.LoadOpenIdToken(tokenRequest);
      expect({ ...action }).toEqual({
        type: fromUserToken.LOAD_OPEN_ID_TOKEN,
        payload: tokenRequest,
        meta: loadMeta(OPEN_ID_TOKEN_DATA),
      });
    });
  });

  describe('LoadOpenIdTokenFail Action', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromUserToken.LoadOpenIdTokenFail(error);

      expect({ ...action }).toEqual({
        type: fromUserToken.LOAD_OPEN_ID_TOKEN_FAIL,
        payload: error,
        meta: failMeta(OPEN_ID_TOKEN_DATA, error),
      });
    });
  });

  describe('LoadOpenIdTokenSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromUserToken.LoadOpenIdTokenSuccess(token);

      expect({ ...action }).toEqual({
        type: fromUserToken.LOAD_OPEN_ID_TOKEN_SUCCESS,
        payload: token,
        meta: successMeta(OPEN_ID_TOKEN_DATA),
      });
    });
  });
});
