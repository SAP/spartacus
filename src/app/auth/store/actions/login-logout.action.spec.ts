import * as fromAction from './login-logout.action';

const pageContext = {
  id: '1',
  type: null
};

fdescribe('Login and Logout Actions', () => {
  describe('Logout Action', () => {
    it('should create the action', () => {
      const action = new fromAction.Logout(pageContext);

      expect({ ...action }).toEqual({
        type: fromAction.LOGOUT,
        payload: pageContext
      });
    });
  });

  describe('Login Action', () => {
    it('should create the action', () => {
      const action = new fromAction.Login(pageContext);

      expect({ ...action }).toEqual({
        type: fromAction.LOGIN,
        payload: pageContext
      });
    });
  });
});
