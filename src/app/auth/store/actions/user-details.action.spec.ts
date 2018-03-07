import * as fromUserDetailsAction from './user-details.action';

const mockUserDetails: any = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  type: 'Mock Type',
  uid: 'UID'
};

describe('User Details Actions', () => {
  describe('LoadUserDetails Actions', () => {
    it('should create the action', () => {
      const action = new fromUserDetailsAction.LoadUserDetails(
        mockUserDetails.name
      );

      expect({ ...action }).toEqual({
        type: fromUserDetailsAction.LOAD_USER_DETAILS,
        payload: mockUserDetails.name
      });
    });
  });

  describe('LoadUserDetailsFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new fromUserDetailsAction.LoadUserDetailsFail(error);

      expect({ ...action }).toEqual({
        type: fromUserDetailsAction.LOAD_USER_DETAILS_FAIL,
        payload: error
      });
    });
  });

  describe('LoadUserDetailsSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromUserDetailsAction.LoadUserDetailsSuccess(
        mockUserDetails
      );

      expect({ ...action }).toEqual({
        type: fromUserDetailsAction.LOAD_USER_DETAILS_SUCCESS,
        payload: mockUserDetails
      });
    });
  });
});
