import { PROCESS_FEATURE, StateUtils } from '@spartacus/core';
import { UPDATE_PASSWORD_PROCESS_ID } from '../user-profile.state';
import { UserProfileActions } from './index';

describe('Update Password Actions', () => {
  describe('UpdatePassword Action', () => {
    it('should create the action', () => {
      const uid = 'user@email.com';
      const oldPassword = 'oldPass123';
      const newPassword = 'newPass456';
      const action = new UserProfileActions.UpdatePassword({
        uid,
        oldPassword,
        newPassword,
      });

      expect({ ...action }).toEqual({
        type: UserProfileActions.UPDATE_PASSWORD,
        payload: { uid, oldPassword, newPassword },
        meta: StateUtils.entityLoadMeta(
          PROCESS_FEATURE,
          UPDATE_PASSWORD_PROCESS_ID
        ),
      });
    });
  });

  describe('UpdatePasswordFail Action', () => {
    it('should create the action', () => {
      const error = 'error';
      const action = new UserProfileActions.UpdatePasswordFail(error);

      expect({ ...action }).toEqual({
        type: UserProfileActions.UPDATE_PASSWORD_FAIL,
        payload: error,
        meta: StateUtils.entityFailMeta(
          PROCESS_FEATURE,
          UPDATE_PASSWORD_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('UpdatePasswordSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserProfileActions.UpdatePasswordSuccess();

      expect({ ...action }).toEqual({
        type: UserProfileActions.UPDATE_PASSWORD_SUCCESS,
        meta: StateUtils.entitySuccessMeta(
          PROCESS_FEATURE,
          UPDATE_PASSWORD_PROCESS_ID
        ),
        payload: undefined,
      });
    });
  });

  describe('UpdatePasswordReset Action', () => {
    it('should create the action', () => {
      const action = new UserProfileActions.UpdatePasswordReset();

      expect({ ...action }).toEqual({
        type: UserProfileActions.UPDATE_PASSWORD_RESET,
        meta: StateUtils.entityResetMeta(
          PROCESS_FEATURE,
          UPDATE_PASSWORD_PROCESS_ID
        ),
      });
    });
  });
});
