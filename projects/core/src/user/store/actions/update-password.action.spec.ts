import { PROCESSID_UPDATE_PASSWORD } from '../user-state';
import {
  entityFailMeta,
  entityLoadMeta,
  entitySuccessMeta,
} from '../../../state';
import { PROCESS_FEATURE } from '../../../process/store/process-state';

import * as fromActions from './update-password.action';

describe('Update Password Actions', () => {
  describe('UpdatePassword Action', () => {
    it('should create the action', () => {
      const userId = 'user@email.com';
      const oldPassword = 'oldPass123';
      const newPassword = 'newPass456';
      const action = new fromActions.UpdatePassword({
        userId,
        oldPassword,
        newPassword,
      });

      expect({ ...action }).toEqual({
        type: fromActions.UPDATE_PASSWORD,
        payload: { userId, oldPassword, newPassword },
        meta: entityLoadMeta(PROCESS_FEATURE, PROCESSID_UPDATE_PASSWORD),
      });
    });
  });

  describe('UpdatePasswordFail Action', () => {
    it('should create the action', () => {
      const error = 'error';
      const action = new fromActions.UpdatePasswordFail(error);

      expect({ ...action }).toEqual({
        type: fromActions.UPDATE_PASSWORD_FAIL,
        payload: error,
        meta: entityFailMeta(PROCESS_FEATURE, PROCESSID_UPDATE_PASSWORD, error),
      });
    });
  });

  describe('UpdatePasswordSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromActions.UpdatePasswordSuccess();

      expect({ ...action }).toEqual({
        type: fromActions.UPDATE_PASSWORD_SUCCESS,
        meta: entitySuccessMeta(PROCESS_FEATURE, PROCESSID_UPDATE_PASSWORD),
        payload: undefined,
      });
    });
  });
});
