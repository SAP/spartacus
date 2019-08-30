import { UserActions } from './index';

describe('ResetPassword Actions', () => {
  describe('ResetPassword', () => {
    it('should create the action', () => {
      const action = new UserActions.ResetPassword({
        token: 'test token',
        password: 'test password',
      });
      expect({ ...action }).toEqual({
        type: UserActions.RESET_PASSWORD,
        payload: { token: 'test token', password: 'test password' },
      });
    });
  });

  describe('ResetPasswordFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new UserActions.ResetPasswordFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.RESET_PASSWORD_FAIL,
        payload: error,
      });
    });
  });

  describe('ResetPasswordSuccess', () => {
    it('should create the action', () => {
      const action = new UserActions.ResetPasswordSuccess();
      expect({ ...action }).toEqual({
        type: UserActions.RESET_PASSWORD_SUCCESS,
      });
    });
  });
});
