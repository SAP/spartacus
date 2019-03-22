import * as fromAction from './forgot-password.action';

describe('Forgot Password Actions', () => {
  describe('ForgotPasswordEmailRequest', () => {
    it('should create the action', () => {
      const action = new fromAction.ForgotPasswordEmailRequest(
        'email@example.com'
      );
      expect({ ...action }).toEqual({
        type: fromAction.FORGOT_PASSWORD_EMAIL_REQUEST,
        payload: 'email@example.com'
      });
    });
  });

  describe('ForgotPasswordEmailRequestFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromAction.ForgotPasswordEmailRequestFail(error);

      expect({ ...action }).toEqual({
        type: fromAction.FORGOT_PASSWORD_EMAIL_REQUEST_FAIL,
        payload: error
      });
    });
  });

  describe('ForgotPasswordEmailRequestSuccess', () => {
    it('should create the action', () => {
      const action = new fromAction.ForgotPasswordEmailRequestSuccess();
      expect({ ...action }).toEqual({
        type: fromAction.FORGOT_PASSWORD_EMAIL_REQUEST_SUCCESS
      });
    });
  });
});
