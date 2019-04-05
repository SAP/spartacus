import { PROCESS_FEATURE } from '../../../process/store/process-state';
import {
  entityFailMeta,
  entityLoadMeta,
  entityResetMeta,
  entitySuccessMeta,
} from '../../../state';
import { UPDATE_EMAIL_PROCESS_ID } from '../user-state';
import * as fromAction from './update-email.action';

describe('Update Email Actions', () => {
  describe('UpdateEmailAction', () => {
    it('should create the action', () => {
      const userId = 'test@test.com';
      const currentPassword = 'Qwe123!';
      const newUserId = 'tester@sap.com';

      const action = new fromAction.UpdateEmailAction({
        userId,
        currentPassword,
        newUserId,
      });

      expect({ ...action }).toEqual({
        type: fromAction.UPDATE_EMAIL,
        payload: { userId, currentPassword, newUserId },
        meta: entityLoadMeta(PROCESS_FEATURE, UPDATE_EMAIL_PROCESS_ID),
      });
    });
  });

  describe('UpdateEmailSuccessAction', () => {
    it('should create the action', () => {
      const newUserId = 'tester@sap.com';
      const action = new fromAction.UpdateEmailSuccessAction(newUserId);

      expect({ ...action }).toEqual({
        type: fromAction.UPDATE_EMAIL_SUCCESS,
        newUserId,
        meta: entitySuccessMeta(PROCESS_FEATURE, UPDATE_EMAIL_PROCESS_ID),
        payload: undefined,
      });
    });
  });

  describe('UpdateEmailErrorAction', () => {
    it('should create the action', () => {
      const error = 'error';

      const action = new fromAction.UpdateEmailErrorAction(error);

      expect({ ...action }).toEqual({
        type: fromAction.UPDATE_EMAIL_ERROR,
        payload: error,
        meta: entityFailMeta(PROCESS_FEATURE, UPDATE_EMAIL_PROCESS_ID, error),
      });
    });
  });

  describe('ResetEmailAction', () => {
    it('should create the action', () => {
      const action = new fromAction.ResetUpdateEmailAction();

      expect({ ...action }).toEqual({
        type: fromAction.RESET_EMAIL,
        meta: entityResetMeta(PROCESS_FEATURE, UPDATE_EMAIL_PROCESS_ID),
      });
    });
  });
});
