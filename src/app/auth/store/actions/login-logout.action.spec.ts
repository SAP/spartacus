import * as fromAction from './login-logout.action';

fdescribe('User Details Actions', () => {
  describe('LoadUserDetails Actions', () => {
    it('should create the action', () => {
      const action = new fromAction.Logout();

      expect({ ...action }).toEqual({
        type: fromAction.LOGOUT
      });
    });
  });
});
