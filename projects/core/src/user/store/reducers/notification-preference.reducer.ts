import { NotificationPreference } from '../../../model';
import { UserActions } from '../actions/index';

export const initialState: NotificationPreference[] = [];

export function reducer(
  state = initialState,
  action: UserActions.NotificationPreferenceAction
): NotificationPreference[] {
  switch (action.type) {
    case UserActions.LOAD_NOTIFICATION_PREFERENCES_FAIL: {
      return initialState;
    }

    case UserActions.LOAD_NOTIFICATION_PREFERENCES_SUCCESS:
    case UserActions.UPDATE_NOTIFICATION_PREFERENCES_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }
  }

  return state;
}
