import * as fromAction from './reset-password.action';

describe('ResetPassword Actions', () => {
  describe('ResetPassword', () => {
    it('should create the action', () => {
      const action = new fromAction.ResetPassword({
        token: 'test token',
        password: 'test password'
      });
      expect({ ...action }).toEqual({
        type: fromAction.RESET_PASSWORD,
        payload: { token: 'test token', password: 'test password' }
      });
    });
  });

  describe('ResetPasswordFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromAction.ResetPasswordFail(error);

      expect({ ...action }).toEqual({
        type: fromAction.RESET_PASSWORD_FAIL,
        payload: error
      });
    });
  });

  describe('ResetPasswordSuccess', () => {
    it('should create the action', () => {
      const action = new fromAction.ResetPasswordSuccess();
      expect({ ...action }).toEqual({
        type: fromAction.RESET_PASSWORD_SUCCESS
      });
    });
  });
});
