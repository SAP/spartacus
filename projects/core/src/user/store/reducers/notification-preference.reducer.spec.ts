import * as fromNotificationPreferenceAction from '../actions/notification-preference.action';
import * as fromNotificationPreferenceReducer from './notification-preference.reducer';
import { BasicNotificationPreferenceList } from '../../../model/notification-preference.model';
describe('Notification Preference Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromNotificationPreferenceReducer;
      const action = {} as fromNotificationPreferenceAction.NotificationPreferenceAction;
      const state = fromNotificationPreferenceReducer.reducer(
        undefined,
        action
      );

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_NOTIFICATION_PREFERENCES action', () => {
    it('should populate the notification preference when load', () => {
      const userId = 'userId';
      const { initialState } = fromNotificationPreferenceReducer;
      const action = new fromNotificationPreferenceAction.LoadNotificationPreferences(
        userId
      );

      const state = fromNotificationPreferenceReducer.reducer(
        initialState,
        action
      );
      expect(state).toEqual(initialState);
    });
  });

  describe('LOAD_NOTIFICATION_PREFERENCES_SUCCESS action', () => {
    it('should populate the notification preference when load success', () => {
      const payload: BasicNotificationPreferenceList = {
        preferences: [],
      };
      const { initialState } = fromNotificationPreferenceReducer;
      const action = new fromNotificationPreferenceAction.LoadNotificationPreferencesSuccess(
        payload
      );

      const state = fromNotificationPreferenceReducer.reducer(
        initialState,
        action
      );
      expect(state.basicNotificationPreferenceList).toEqual(payload);
    });
  });

  describe('UPDATE_NOTIFICATION_PREFERENCES_SUCCESS action', () => {
    it('should populate the notification preference when load success', () => {
      const payload: BasicNotificationPreferenceList = {
        preferences: [
          {
            channel: 'EMAIL',
            enabled: true,
            value: 'test@sap.com',
            visible: true,
          },
        ],
      };
      const { initialState } = fromNotificationPreferenceReducer;
      const action = new fromNotificationPreferenceAction.UpdateNotificationPreferencesSuccess(
        payload
      );

      const state = fromNotificationPreferenceReducer.reducer(
        initialState,
        action
      );
      expect(state.basicNotificationPreferenceList).toEqual(payload);
    });
  });
});
