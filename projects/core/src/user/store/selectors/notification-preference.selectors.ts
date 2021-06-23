import { createSelector, MemoizedSelector } from '@ngrx/store';
import { NotificationPreference } from '../../../model/notification-preference.model';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';
import {
  loaderValueSelector,
  loaderLoadingSelector,
} from '../../../state/utils/loader/loader.selectors';

export const getPreferencesLoaderState: MemoizedSelector<
  StateWithUser,
  LoaderState<NotificationPreference[]>
> = createSelector(
  getUserState,
  (state: UserState) => state.notificationPreferences
);

export const getPreferences: MemoizedSelector<
  StateWithUser,
  NotificationPreference[]
> = createSelector(
  getPreferencesLoaderState,
  (state: LoaderState<NotificationPreference[]>) => loaderValueSelector(state)
);

export const getEnabledPreferences: MemoizedSelector<
  StateWithUser,
  NotificationPreference[]
> = createSelector(
  getPreferencesLoaderState,
  (state: LoaderState<NotificationPreference[]>) =>
    loaderValueSelector(state).filter((p) => p.enabled)
);

export const getPreferencesLoading: MemoizedSelector<StateWithUser, boolean> =
  createSelector(
    getPreferencesLoaderState,
    (state: LoaderState<NotificationPreference[]>) =>
      loaderLoadingSelector(state)
  );
