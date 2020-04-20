import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { StateUtils } from '../../../state/utils/index';
import { UPDATE_EMAIL_PROCESS_ID } from '../user-state';
import { UserActions } from './index';

describe('Update Email Actions', () => {
  describe('UpdateEmailAction', () => {
    it('should create the action', () => {
      const uid = 'test@test.com';
      const password = 'Qwe123!';
      const newUid = 'tester@sap.com';

      const action = new UserActions.UpdateEmailAction({
        uid,
        password,
        newUid,
      });

      expect({ ...action }).toEqual({
        type: UserActions.UPDATE_EMAIL,
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
      const action = new UserActions.UpdateEmailSuccessAction(newUid);

      expect({ ...action }).toEqual({
        type: UserActions.UPDATE_EMAIL_SUCCESS,
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

      const action = new UserActions.UpdateEmailErrorAction(error);

      expect({ ...action }).toEqual({
        type: UserActions.UPDATE_EMAIL_ERROR,
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
      const action = new UserActions.ResetUpdateEmailAction();

      expect({ ...action }).toEqual({
        type: UserActions.RESET_EMAIL,
        meta: StateUtils.entityResetMeta(
          PROCESS_FEATURE,
          UPDATE_EMAIL_PROCESS_ID
        ),
      });
    });
  });
});
