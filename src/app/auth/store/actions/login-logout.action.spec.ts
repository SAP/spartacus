import * as fromAction from './login-logout.action';

const mockUserDetails: any = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  type: 'Mock Type',
  uid: 'UID'
};

fdescribe('User Details Actions', () => {
  describe('LoadUserDetails Actions', () => {
    it('should create the action', () => {
      const action = new fromAction.Logout(mockUserDetails);

      expect({ ...action }).toEqual({
        type: fromAction.LOGOUT,
        payload: mockUserDetails
      });
    });
  });
});
