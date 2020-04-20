import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { StateUtils } from '../../../state/utils/index';
import { UPDATE_PASSWORD_PROCESS_ID } from '../user-state';
import { UserActions } from './index';

describe('Update Password Actions', () => {
  describe('UpdatePassword Action', () => {
    it('should create the action', () => {
      const userId = 'user@email.com';
      const oldPassword = 'oldPass123';
      const newPassword = 'newPass456';
      const action = new UserActions.UpdatePassword({
        userId,
        oldPassword,
        newPassword,
      });

      expect({ ...action }).toEqual({
        type: UserActions.UPDATE_PASSWORD,
        payload: { userId, oldPassword, newPassword },
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
      const action = new UserActions.UpdatePasswordFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.UPDATE_PASSWORD_FAIL,
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
      const action = new UserActions.UpdatePasswordSuccess();

      expect({ ...action }).toEqual({
        type: UserActions.UPDATE_PASSWORD_SUCCESS,
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
      const action = new UserActions.UpdatePasswordReset();

      expect({ ...action }).toEqual({
        type: UserActions.UPDATE_PASSWORD_RESET,
        meta: StateUtils.entityResetMeta(
          PROCESS_FEATURE,
          UPDATE_PASSWORD_PROCESS_ID
        ),
      });
    });
  });
});
