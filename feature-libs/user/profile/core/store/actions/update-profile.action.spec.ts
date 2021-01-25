import { PROCESS_FEATURE, StateUtils } from '@spartacus/core';
import { User } from '@spartacus/user/account/core';
import { UPDATE_USER_PROFILE_PROCESS_ID } from '../user-profile.state';
import { UserProfileActions } from './index';

describe('User Details Actions', () => {
  describe('UpdateUserDetails Action', () => {
    it('should create the action', () => {
      const uid = 'xxx';
      const details: User = {
        title: 'mr',
      };
      const action = new UserProfileActions.UpdateUserProfile({
        uid,
        details,
      });

      expect({ ...action }).toEqual({
        type: UserProfileActions.UPDATE_USER_PROFILE,
        payload: { uid, details },
        meta: StateUtils.entityLoadMeta(
          PROCESS_FEATURE,
          UPDATE_USER_PROFILE_PROCESS_ID
        ),
      });
    });
  });

  describe('UpdateUserDetailsFail Action', () => {
    it('should create the action', () => {
      const error = 'error';
      const action = new UserProfileActions.UpdateUserProfileFail(error);

      expect({ ...action }).toEqual({
        type: UserProfileActions.UPDATE_USER_PROFILE_FAIL,
        payload: error,
        meta: StateUtils.entityFailMeta(
          PROCESS_FEATURE,
          UPDATE_USER_PROFILE_PROCESS_ID,
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
      const action = new UserProfileActions.UpdateUserProfileSuccess(
        userUpdates
      );

      expect({ ...action }).toEqual({
        type: UserProfileActions.UPDATE_USER_PROFILE_SUCCESS,
        userUpdates,
        meta: StateUtils.entitySuccessMeta(
          PROCESS_FEATURE,
          UPDATE_USER_PROFILE_PROCESS_ID
        ),
        payload: undefined,
      });
    });
  });

  describe('ResetUpdateUserDetails Action', () => {
    it('should create the action', () => {
      const action = new UserProfileActions.ResetUpdateUserProfile();

      expect({ ...action }).toEqual({
        type: UserProfileActions.RESET_USER_PROFILE,
        meta: StateUtils.entityResetMeta(
          PROCESS_FEATURE,
          UPDATE_USER_PROFILE_PROCESS_ID
        ),
      });
    });
  });
});
