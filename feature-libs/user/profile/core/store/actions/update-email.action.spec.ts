import {
  PROCESS_FEATURE,
  StateUtils,
  UPDATE_EMAIL_PROCESS_ID,
} from '@spartacus/core';
import { UserProfileActions } from '.';

describe('Update Email Actions', () => {
  describe('UpdateEmailAction', () => {
    it('should create the action', () => {
      const uid = 'test@test.com';
      const password = 'Qwe123!';
      const newUid = 'tester@sap.com';

      const action = new UserProfileActions.UpdateEmailAction({
        uid,
        password,
        newUid,
      });

      expect({ ...action }).toEqual({
        type: UserProfileActions.UPDATE_EMAIL,
        payload: { uid, password, newUid },
        meta: StateUtils.entityLoadMeta(
          PROCESS_FEATURE,
          UPDATE_EMAIL_PROCESS_ID
        ),
      });
    });
  });

  describe('UpdateEmailSuccessAction', () => {
    it('should create the action', () => {
      const newUid = 'tester@sap.com';
      const action = new UserProfileActions.UpdateEmailSuccessAction(newUid);

      expect({ ...action }).toEqual({
        type: UserProfileActions.UPDATE_EMAIL_SUCCESS,
        newUid,
        meta: StateUtils.entitySuccessMeta(
          PROCESS_FEATURE,
          UPDATE_EMAIL_PROCESS_ID
        ),
        payload: undefined,
      });
    });
  });

  describe('UpdateEmailErrorAction', () => {
    it('should create the action', () => {
      const error = 'error';

      const action = new UserProfileActions.UpdateEmailErrorAction(error);

      expect({ ...action }).toEqual({
        type: UserProfileActions.UPDATE_EMAIL_ERROR,
        payload: error,
        meta: StateUtils.entityFailMeta(
          PROCESS_FEATURE,
          UPDATE_EMAIL_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('ResetEmailAction', () => {
    it('should create the action', () => {
      const action = new UserProfileActions.ResetUpdateEmailAction();

      expect({ ...action }).toEqual({
        type: UserProfileActions.RESET_EMAIL,
        meta: StateUtils.entityResetMeta(
          PROCESS_FEATURE,
          UPDATE_EMAIL_PROCESS_ID
        ),
      });
    });
  });
});
