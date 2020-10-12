import { UserToken } from '../../models/token-types.model';
import { AuthActions } from './index';

const token: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_at: '1000',
  granted_scopes: [],
  access_token_stored_at: '900',
};

describe('User Token Actions', () => {
  describe('SetUserTokenData Action', () => {
    it('should create the action', () => {
      const action = new AuthActions.SetUserTokenData(token);

      expect({ ...action }).toEqual({
        type: AuthActions.SET_USER_TOKEN_DATA,
        payload: token,
      });
    });
  });
});
