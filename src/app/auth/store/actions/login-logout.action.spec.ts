import * as fromAction from './login-logout.action';

const pageContext = {
  id: '1',
  type: null
};

describe('Login and Logout Actions', () => {
  describe('Logout Action', () => {
    it('should create the action', () => {
      const action = new fromAction.Logout();

      expect({ ...action }).toEqual({
        type: fromAction.LOGOUT
      });
    });
  });

  describe('Login Action', () => {
    it('should create the action', () => {
      const action = new fromAction.Login();

      expect({ ...action }).toEqual({
        type: fromAction.LOGIN
      });
    });
  });
});
