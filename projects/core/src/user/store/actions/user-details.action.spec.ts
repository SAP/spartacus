import { User } from '../../../model/misc.model';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { StateUtils } from '../../../state/utils/index';
import { UPDATE_USER_DETAILS_PROCESS_ID } from '../user-state';
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

  describe('UpdateUserDetails Action', () => {
    it('should create the action', () => {
      const username = 'xxx';
      const userDetails: User = {
        title: 'mr',
      };
      const action = new UserActions.UpdateUserDetails({
        username,
        userDetails,
      });

      expect({ ...action }).toEqual({
        type: UserActions.UPDATE_USER_DETAILS,
        payload: { username, userDetails },
        meta: StateUtils.entityLoadMeta(
          PROCESS_FEATURE,
          UPDATE_USER_DETAILS_PROCESS_ID
        ),
      });
    });
  });

  describe('UpdateUserDetailsFail Action', () => {
    it('should create the action', () => {
      const error = 'error';
      const action = new UserActions.UpdateUserDetailsFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.UPDATE_USER_DETAILS_FAIL,
        payload: error,
        meta: StateUtils.entityFailMeta(
          PROCESS_FEATURE,
          UPDATE_USER_DETAILS_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('UpdateUserDetailsSuccess Action', () => {
    it('should create the action', () => {
      const userUpdates: User = {
        title: 'mr',
      };
      const action = new UserActions.UpdateUserDetailsSuccess(userUpdates);

      expect({ ...action }).toEqual({
        type: UserActions.UPDATE_USER_DETAILS_SUCCESS,
        userUpdates,
        meta: StateUtils.entitySuccessMeta(
          PROCESS_FEATURE,
          UPDATE_USER_DETAILS_PROCESS_ID
        ),
        payload: undefined,
      });
    });
  });

  describe('ResetUpdateUserDetails Action', () => {
    it('should create the action', () => {
      const action = new UserActions.ResetUpdateUserDetails();

      expect({ ...action }).toEqual({
        type: UserActions.RESET_USER_DETAILS,
        meta: StateUtils.entityResetMeta(
          PROCESS_FEATURE,
          UPDATE_USER_DETAILS_PROCESS_ID
        ),
      });
    });
  });
});
