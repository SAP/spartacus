import { User } from '../../model/index';
import { UserAccountActions } from './index';

const mockUserDetails: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'UID',
};

describe('UserAccountActions', () => {
  describe('LoadUserDetails Actions', () => {
    it('should create the action', () => {
      const action = new UserAccountActions.LoadUserAccount(
        mockUserDetails.name
      );

      expect({ ...action }).toEqual({
        type: UserAccountActions.LOAD_USER_ACCOUNT,
        payload: mockUserDetails.name,
      });
    });
  });

  describe('LoadUserDetailsFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new UserAccountActions.LoadUserAccountFail(error);

      expect({ ...action }).toEqual({
        type: UserAccountActions.LOAD_USER_ACCOUNT_FAIL,
        payload: error,
      });
    });
  });

  describe('LoadUserDetailsSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserAccountActions.LoadUserAccountSuccess(
        mockUserDetails
      );

      expect({ ...action }).toEqual({
        type: UserAccountActions.LOAD_USER_ACCOUNT_SUCCESS,
        payload: mockUserDetails,
      });
    });
  });
});
