import { StateUtils } from '../../../state/utils/index';
import { CLIENT_TOKEN_DATA } from '../auth-state';
import { ClientToken } from './../../models/token-types.model';
import { AuthActions } from './index';

const clientToken: ClientToken = {
  access_token: 'xxx',
  token_type: 'xxx',
  expires_in: 1,
  scope: 'xxx',
};

describe('Client Token Actions', () => {
  describe('LoadClientToken', () => {
    it('should create the action', () => {
      const action = new AuthActions.LoadClientToken();
      expect({ ...action }).toEqual({
        type: AuthActions.LOAD_CLIENT_TOKEN,
        meta: StateUtils.loadMeta(CLIENT_TOKEN_DATA),
      });
    });
  });

  describe('LoadClientTokenFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new AuthActions.LoadClientTokenFail(error);
      expect({ ...action }).toEqual({
        type: AuthActions.LOAD_CLIENT_TOKEN_FAIL,
        payload: error,
        meta: StateUtils.failMeta(CLIENT_TOKEN_DATA, error),
      });
    });
  });

  describe('LoadClientTokenSuccess', () => {
    it('should create the action', () => {
      const action = new AuthActions.LoadClientTokenSuccess(clientToken);

      expect({ ...action }).toEqual({
        type: AuthActions.LOAD_CLIENT_TOKEN_SUCCESS,
        payload: clientToken,
        meta: StateUtils.successMeta(CLIENT_TOKEN_DATA),
      });
    });
  });
});
