import { UserProfileActions } from './index';

describe('Forgot Password Actions', () => {
  describe('ForgotPasswordEmailRequest', () => {
    it('should create the action', () => {
      const action = new UserProfileActions.ForgotPasswordEmailRequest(
        'email@example.com'
      );
      expect({ ...action }).toEqual({
        type: UserProfileActions.FORGOT_PASSWORD_EMAIL_REQUEST,
        payload: 'email@example.com',
      });
    });
  });

  describe('ForgotPasswordEmailRequestFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new UserProfileActions.ForgotPasswordEmailRequestFail(
        error
      );

      expect({ ...action }).toEqual({
        type: UserProfileActions.FORGOT_PASSWORD_EMAIL_REQUEST_FAIL,
        payload: error,
      });
    });
  });

  describe('ForgotPasswordEmailRequestSuccess', () => {
    it('should create the action', () => {
      const action = new UserProfileActions.ForgotPasswordEmailRequestSuccess();
      expect({ ...action }).toEqual({
        type: UserProfileActions.FORGOT_PASSWORD_EMAIL_REQUEST_SUCCESS,
      });
    });
  });
});
