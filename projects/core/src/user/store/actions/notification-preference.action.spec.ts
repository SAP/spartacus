import { UserActions } from './index';
import { NotificationPreference } from '../../../model/notification-preference.model';
import { StateUtils } from '../../../state/utils/index';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import {
  UPDATE_NOTIFICATION_PREFERENCES_PROCESS_ID,
  NOTIFICATION_PREFERENCES,
} from '../user-state';
import { resetMeta } from '../../../state/utils/loader/loader.action';

const userId = 'testUser';
const mockNotificationPreference: NotificationPreference[] = [
  {
    channel: 'EMAIL',
    value: 'test@sap.com',
    enabled: false,
    visible: true,
  },
];
const error = 'anError';

describe('Notification Preference Actions', () => {
  describe('LoadNotificationPreferences', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadNotificationPreferences(userId);
      expect({ ...action }).toEqual({
        type: UserActions.LOAD_NOTIFICATION_PREFERENCES,
        payload: userId,
        meta: StateUtils.loadMeta(NOTIFICATION_PREFERENCES),
      });
    });
  });

  describe('LoadNotificationPreferencesFail', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadNotificationPreferencesFail(error);
      expect({ ...action }).toEqual({
        type: UserActions.LOAD_NOTIFICATION_PREFERENCES_FAIL,
        payload: error,
        meta: StateUtils.failMeta(NOTIFICATION_PREFERENCES, error),
      });
    });
  });

  describe('LoadNotificationPreferencesSuccess', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadNotificationPreferencesSuccess(
        mockNotificationPreference
      );
      expect({ ...action }).toEqual({
        type: UserActions.LOAD_NOTIFICATION_PREFERENCES_SUCCESS,
        payload: mockNotificationPreference,
        meta: StateUtils.successMeta(NOTIFICATION_PREFERENCES),
      });
    });
  });

  describe('UpdateNotificationPreferences', () => {
    it('should create the action', () => {
      const action = new UserActions.UpdateNotificationPreferences({
        userId: userId,
        preferences: mockNotificationPreference,
      });
      expect({ ...action }).toEqual({
        type: UserActions.UPDATE_NOTIFICATION_PREFERENCES,
        payload: {
          userId: userId,
          preferences: mockNotificationPreference,
        },
        meta: StateUtils.entityLoadMeta(
          PROCESS_FEATURE,
          UPDATE_NOTIFICATION_PREFERENCES_PROCESS_ID
        ),
      });
    });
  });

  describe('UpdateNotificationPreferencesFail', () => {
    it('should create the action', () => {
      const action = new UserActions.UpdateNotificationPreferencesFail(error);
      expect({ ...action }).toEqual({
        type: UserActions.UPDATE_NOTIFICATION_PREFERENCES_FAIL,
        payload: error,
        meta: StateUtils.entityFailMeta(
          PROCESS_FEATURE,
          UPDATE_NOTIFICATION_PREFERENCES_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('UpdateNotificationPreferencesSuccess', () => {
    it('should create the action', () => {
      const action = new UserActions.UpdateNotificationPreferencesSuccess(
        mockNotificationPreference
      );
      expect({ ...action }).toEqual({
        type: UserActions.UPDATE_NOTIFICATION_PREFERENCES_SUCCESS,
        payload: mockNotificationPreference,
        meta: StateUtils.entitySuccessMeta(
          PROCESS_FEATURE,
          UPDATE_NOTIFICATION_PREFERENCES_PROCESS_ID
        ),
      });
    });
  });

  describe('UpdateNotificationPreferencesReset', () => {
    it('should create the action', () => {
      const action = new UserActions.ResetNotificationPreferences();
      expect({ ...action }).toEqual({
        type: UserActions.RESET_NOTIFICATION_PREFERENCES,
        meta: StateUtils.entityResetMeta(
          PROCESS_FEATURE,
          UPDATE_NOTIFICATION_PREFERENCES_PROCESS_ID
        ),
      });
    });
  });

  describe('ClearNotificationPreferences', () => {
    it('should create the action', () => {
      const action = new UserActions.ClearNotificationPreferences();
      expect({ ...action }).toEqual({
        type: UserActions.CLEAR_NOTIFICATION_PREFERENCES,
        meta: resetMeta(NOTIFICATION_PREFERENCES),
      });
    });
  });
});
