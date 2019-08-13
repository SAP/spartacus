import { AuthActions } from './index';

describe('Login and Logout Actions', () => {
  describe('Logout Action', () => {
    it('should create the action', () => {
      const action = new AuthActions.Logout();

      expect({ ...action }).toEqual({
        type: AuthActions.LOGOUT,
      });
    });
  });

  describe('Login Action', () => {
    it('should create the action', () => {
      const action = new AuthActions.Login();

      expect({ ...action }).toEqual({
        type: AuthActions.LOGIN,
      });
    });
  });

  describe('Logout Customer Support Agent Action', () => {
    it('should create the action', () => {
      const action = new AuthActions.LogoutCustomerSupportAgent();

      expect({ ...action }).toEqual({
        type: AuthActions.LOGOUT_CUSTOMER_SUPPORT_AGENT,
      });
    });
  });
});
