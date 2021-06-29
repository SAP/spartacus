import { User } from '../../../model/misc.model';

import { UserActions } from './index';

const mockUserDetails: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'UID',
};

describe('User Details Actions', () => {
  describe('LoadUserDetails Actions', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadUserDetails(mockUserDetails.name);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_USER_DETAILS,
        payload: mockUserDetails.name,
      });
    });
  });

  describe('LoadUserDetailsFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new UserActions.LoadUserDetailsFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_USER_DETAILS_FAIL,
        payload: error,
      });
    });
  });

  describe('LoadUserDetailsSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadUserDetailsSuccess(mockUserDetails);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_USER_DETAILS_SUCCESS,
        payload: mockUserDetails,
      });
    });
  });
});
