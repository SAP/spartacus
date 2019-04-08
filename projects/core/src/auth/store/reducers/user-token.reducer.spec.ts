import { UserToken } from '../../models/token-types.model';
import * as fromUpdateEmailAction from './../../../user/store/actions/update-email.action';
import * as fromActions from './../actions/user-token.action';
import * as fromUserToken from './user-token.reducer';

const testToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  userId: 'xxx',
};

describe('UserToken reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromUserToken;
      const action = {} as fromActions.UserTokenAction;
      const state = fromUserToken.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_USER_TOKEN_SUCCESS action', () => {
    it('should store a user token', () => {
      const { initialState } = fromUserToken;

      const action = new fromActions.LoadUserTokenSuccess(testToken);
      const state = fromUserToken.reducer(initialState, action);

      expect(state).toEqual(testToken);
    });
  });

  describe('REFRESH_USER_TOKEN_SUCCESS action', () => {
    it('should store a user token', () => {
      const { initialState } = fromUserToken;

      const action = new fromActions.RefreshUserTokenSuccess(testToken);
      const state = fromUserToken.reducer(initialState, action);

      expect(state).toEqual(testToken);
    });
  });

  describe('UPDATE_EMAIL_SUCCESS action', () => {
    it('should update the existing userId/email ', () => {
      const updatedEmail: UserToken = {
        access_token: 'xxx',
        token_type: 'bearer',
        refresh_token: 'xxx',
        expires_in: 1000,
        scope: ['xxx'],
        userId: 'tester@sap.com',
      };

      const action = new fromUpdateEmailAction.UpdateEmailSuccessAction(
        updatedEmail.userId
      );

      const state = fromUserToken.reducer(testToken, action);
      expect(state).toEqual({
        ...testToken,
        ...updatedEmail,
        userId: updatedEmail.userId,
      });
    });
  });
});
