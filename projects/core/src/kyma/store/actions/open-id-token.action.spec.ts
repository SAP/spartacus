import { StateUtils } from '../../../state/utils/index';
import { OpenIdToken } from '../../models/kyma-token-types.model';
import { OPEN_ID_TOKEN_DATA } from '../kyma-state';
import { KymaActions } from './index';

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

      const action = new KymaActions.LoadOpenIdToken(tokenRequest);
      expect({ ...action }).toEqual({
        type: KymaActions.LOAD_OPEN_ID_TOKEN,
        payload: tokenRequest,
        meta: StateUtils.loadMeta(OPEN_ID_TOKEN_DATA),
      });
    });
  });

  describe('LoadOpenIdTokenFail Action', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new KymaActions.LoadOpenIdTokenFail(error);

      expect({ ...action }).toEqual({
        type: KymaActions.LOAD_OPEN_ID_TOKEN_FAIL,
        payload: error,
        meta: StateUtils.failMeta(OPEN_ID_TOKEN_DATA, error),
      });
    });
  });

  describe('LoadOpenIdTokenSuccess Action', () => {
    it('should create the action', () => {
      const action = new KymaActions.LoadOpenIdTokenSuccess(token);

      expect({ ...action }).toEqual({
        type: KymaActions.LOAD_OPEN_ID_TOKEN_SUCCESS,
        payload: token,
        meta: StateUtils.successMeta(OPEN_ID_TOKEN_DATA),
      });
    });
  });
});
