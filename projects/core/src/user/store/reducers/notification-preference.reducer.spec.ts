import * as fromNotificationPreferenceAction from '../actions/notification-preference.action';
import * as fromNotificationPreferenceReducer from './notification-preference.reducer';

describe('Notification Preference Reducer', () => {
  describe('undefined action', () => {
    it('test failed', () => {
      expect(false).toBeTruthy();
    });

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
      const payload = 'payload';
      const { initialState } = fromNotificationPreferenceReducer;
      const action = new fromNotificationPreferenceAction.LoadNotificationPreferencesSuccess(
        payload
      );

      const state = fromNotificationPreferenceReducer.reducer(
        initialState,
        action
      );
      expect(state.preferences).toEqual(payload);
    });
  });
});
