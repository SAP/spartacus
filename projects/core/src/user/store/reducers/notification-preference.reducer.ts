import { NotificationPreferenceState } from '../user-state';
import * as fromAction from '../actions/index';
import { BasicNotificationPreferenceList } from 'projects/core/src/model/notification-preference.model';

export const initialState: NotificationPreferenceState = {
  basicNotificationPreferenceList: {
    preferences: [],
  },
};

export function reducer(
  state = initialState,
  action: fromAction.NotificationPreferenceAction
): NotificationPreferenceState {
  switch (action.type) {
    case fromAction.LOAD_NOTIFICATION_PREFERENCES_SUCCESS: {
      const basicNotificationPreferenceList: BasicNotificationPreferenceList =
        action.payload;

      return {
        basicNotificationPreferenceList,
      };
    }
    case fromAction.UPDATE_NOTIFICATION_PREFERENCES_SUCCESS: {
      const basicNotificationPreferenceList: BasicNotificationPreferenceList =
        action.payload;

      return {
        ...state,
        basicNotificationPreferenceList,
      };
    }
  }

  return state;
}
