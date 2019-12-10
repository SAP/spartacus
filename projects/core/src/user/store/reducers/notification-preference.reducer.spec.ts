import { UserActions } from '../actions/index';
import * as fromReducer from './notification-preference.reducer';
import { NotificationPreference } from '../../../model/notification-preference.model';

const mockNotificationPreference: NotificationPreference[] = [
  {
    channel: 'EMAIL',
    value: 'test@sap.com',
    enabled: false,
    visible: true,
  },
];
const error = 'anError';

describe('Notification Preference Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state when state undefined', () => {
      const { initialState } = fromReducer;
      const action = {} as UserActions.NotificationPreferenceAction;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_NOTIFICATION_PREFERENCES_SUCCESS action', () => {
    it('should populate the notification preference when load success', () => {
      const { initialState } = fromReducer;
      const action = new UserActions.LoadNotificationPreferencesSuccess(
        mockNotificationPreference
      );
      const state = fromReducer.reducer(initialState, action);

      expect(state).toEqual(mockNotificationPreference);
    });
  });

  describe('LOAD_NOTIFICATION_PREFERENCES_FAIL action', () => {
    it('should return the initial state when load fail', () => {
      const { initialState } = fromReducer;
      const action = new UserActions.LoadNotificationPreferencesFail(error);
      const state = fromReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('UPDATE_NOTIFICATION_PREFERENCES_SUCCESS action', () => {
    it('should populate the notification preference when update success', () => {
      const { initialState } = fromReducer;
      const action = new UserActions.UpdateNotificationPreferencesSuccess(
        mockNotificationPreference
      );
      const state = fromReducer.reducer(initialState, action);

      expect(state).toEqual(mockNotificationPreference);
    });
  });

  describe('UPDATE_NOTIFICATION_PREFERENCES_FAIL action', () => {
    it('should return the initial state when update fail', () => {
      const { initialState } = fromReducer;
      const action = new UserActions.UpdateNotificationPreferencesFail(error);
      const state = fromReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});
