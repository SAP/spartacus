import { createSelector, MemoizedSelector } from '@ngrx/store';

import { UserDetailsState, UserState, StateWithUser } from '../user-state';
import {
  LoaderState,
  loaderLoadingSelector,
  loaderErrorSelector,
  loaderSuccessSelector
} from '../../../state';
import { User } from '../../../occ/occ-models/index';

import { getUserState } from './feature.selector';

export const getDetailsState: MemoizedSelector<
  StateWithUser,
  UserDetailsState
> = createSelector(
  getUserState,
  (state: UserState) => state.account
);

export const getDetails: MemoizedSelector<StateWithUser, User> = createSelector(
  getDetailsState,
  (state: UserDetailsState) => state.details
);

// TODO:#1145 - test this selector, `state.update` might be `undefined`
export const getUpdateDetailsState: MemoizedSelector<
  StateWithUser,
  LoaderState<void>
> = createSelector(
  getDetailsState,
  state => state.update.details
);

export const getUpdateDetailsLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getUpdateDetailsState,
  loaderLoadingSelector
);

export const getUpdateDetailsError: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getUpdateDetailsState,
  loaderErrorSelector
);

export const getUpdateDetailsSuccess: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getUpdateDetailsState,
  loaderSuccessSelector
);
