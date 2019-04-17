import { NotificationPreferenceState } from '../user-state';
import * as fromAction from '../actions/index';

export const initialState: NotificationPreferenceState = {
  preferences: {},
};

export function reducer(
  state = initialState,
  action: fromAction.NotificationPreferenceAction
): NotificationPreferenceState {
  switch (action.type) {
    case fromAction.LOAD_NOTIFICATION_PREFERENCES_SUCCESS: {
      const preferences: any = action.payload;

      return {
        ...state,
        preferences,
      };
    }

    case fromAction.UPDATE_NOTIFICATION_PREFERENCES_FAIL: {
      return initialState;
    }
  }

  return state;
}
