import * as fromUserToken from './../../store/actions';
import { UserToken } from '../../token-types';

fdescribe('User Token Actions', () => {
  describe('LoadUserToken Actions', () => {
    it('should create the action', () => {
      const tokenRequest = {
        username: 'tobiasouwejan@gmail.com',
        password: '1234'
      };

      const action = new fromUserToken.LoadUserToken(tokenRequest);
      expect({ ...action }).toEqual({
        type: fromUserToken.LOAD_USER_TOKEN,
        payload: tokenRequest
      });
    });
  });

  describe('LoadUserTokenFail Action', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromUserToken.LoadUserTokenFail(error);

      expect({ ...action }).toEqual({
        type: fromUserToken.LOAD_USER_TOKEN_FAIL,
        payload: error
      });
    });
  });

  describe('LoadUserTokenSuccess Action', () => {
    it('should create the action', () => {
      const token: UserToken = {
        accessToken: 'xxx',
        tokenType: 'bearer',
        refreshToken: 'xxx',
        expiresIn: 1000,
        scope: ['xxx'],
        username: 'xxx'
      };
      const action = new fromUserToken.LoadUserTokenSuccess(token);

      expect({ ...action }).toEqual({
        type: fromUserToken.LOAD_USER_TOKEN_SUCCESS,
        payload: token
      });
    });
  });
});
