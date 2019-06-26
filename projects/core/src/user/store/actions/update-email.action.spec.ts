import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { StateEntityLoaderActions } from '../../../state/index';
import { UPDATE_EMAIL_PROCESS_ID } from '../user-state';
import * as fromAction from './update-email.action';

describe('Update Email Actions', () => {
  describe('UpdateEmailAction', () => {
    it('should create the action', () => {
      const uid = 'test@test.com';
      const password = 'Qwe123!';
      const newUid = 'tester@sap.com';

      const action = new fromAction.UpdateEmailAction({
        uid,
        password,
        newUid,
      });

      expect({ ...action }).toEqual({
        type: fromAction.UPDATE_EMAIL,
        payload: { uid, password, newUid },
        meta: StateEntityLoaderActions.entityLoadMeta(
          PROCESS_FEATURE,
          UPDATE_EMAIL_PROCESS_ID
        ),
      });
    });
  });

  describe('UpdateEmailSuccessAction', () => {
    it('should create the action', () => {
      const newUid = 'tester@sap.com';
      const action = new fromAction.UpdateEmailSuccessAction(newUid);

      expect({ ...action }).toEqual({
        type: fromAction.UPDATE_EMAIL_SUCCESS,
        newUid,
        meta: StateEntityLoaderActions.entitySuccessMeta(
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

      const action = new fromAction.UpdateEmailErrorAction(error);

      expect({ ...action }).toEqual({
        type: fromAction.UPDATE_EMAIL_ERROR,
        payload: error,
        meta: StateEntityLoaderActions.entityFailMeta(
          PROCESS_FEATURE,
          UPDATE_EMAIL_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('ResetEmailAction', () => {
    it('should create the action', () => {
      const action = new fromAction.ResetUpdateEmailAction();

      expect({ ...action }).toEqual({
        type: fromAction.RESET_EMAIL,
        meta: StateEntityLoaderActions.entityResetMeta(
          PROCESS_FEATURE,
          UPDATE_EMAIL_PROCESS_ID
        ),
      });
    });
  });
});
