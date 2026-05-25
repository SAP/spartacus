import { AuthActions } from '.';

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
});
