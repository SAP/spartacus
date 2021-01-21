import { UserActions } from './index';

describe('Forgot Password Actions', () => {
  describe('ForgotPasswordEmailRequest', () => {
    it('should create the action', () => {
      const action = new UserActions.ForgotPasswordEmailRequest(
        'email@example.com'
      );
      expect({ ...action }).toEqual({
        type: UserActions.FORGOT_PASSWORD_EMAIL_REQUEST,
        payload: 'email@example.com',
      });
    });
  });

  describe('ForgotPasswordEmailRequestFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new UserActions.ForgotPasswordEmailRequestFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.FORGOT_PASSWORD_EMAIL_REQUEST_FAIL,
        payload: error,
      });
    });
  });

  describe('ForgotPasswordEmailRequestSuccess', () => {
    it('should create the action', () => {
      const action = new UserActions.ForgotPasswordEmailRequestSuccess();
      expect({ ...action }).toEqual({
        type: UserActions.FORGOT_PASSWORD_EMAIL_REQUEST_SUCCESS,
      });
    });
  });
});
