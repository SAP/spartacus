import { createSelector, MemoizedSelector } from '@ngrx/store';
import { NotificationPreference } from 'projects/core/src/model';
import { StateLoaderSelectors } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

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
  (state: LoaderState<NotificationPreference[]>) =>
    StateLoaderSelectors.loaderValueSelector(state)
);

export const getPreferencesLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getPreferencesLoaderState,
  (state: LoaderState<NotificationPreference[]>) =>
    StateLoaderSelectors.loaderLoadingSelector(state)
);
