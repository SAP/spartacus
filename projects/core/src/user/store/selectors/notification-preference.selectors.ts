import { MemoizedSelector, createSelector } from '@ngrx/store';

import {
  UserState,
  StateWithUser,
  NotificationPreferenceState,
} from '../user-state';
import { getUserState } from './feature.selector';

export const getNotificationPreferenceState: MemoizedSelector<
  StateWithUser,
  NotificationPreferenceState
> = createSelector(
  getUserState,
  (state: UserState) => state.notificationPreference
);

export const getNotificationPreferenceList: MemoizedSelector<
  StateWithUser,
  any
> = createSelector(
  getNotificationPreferenceState,
  (state: NotificationPreferenceState) => state.preferences
);
