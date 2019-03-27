import { MemoizedSelector, createSelector } from '@ngrx/store';

import { StateWithProcess } from '../process-state';
import {
  LoaderState,
  loaderLoadingSelector,
  loaderErrorSelector,
  loaderSuccessSelector
} from '../../../state';

import { getProcessState } from './feature.selector';

export const getUpdateUserDetailsState: MemoizedSelector<
  StateWithProcess,
  LoaderState<void>
> = createSelector(
  getProcessState,
  state => state.updateUserDetails
);

export const getUpdateUserDetailsLoading: MemoizedSelector<
  StateWithProcess,
  boolean
> = createSelector(
  getUpdateUserDetailsState,
  loaderLoadingSelector
);

export const getUpdateUserDetailsError: MemoizedSelector<
  StateWithProcess,
  boolean
> = createSelector(
  getUpdateUserDetailsState,
  loaderErrorSelector
);

export const getUpdateUserDetailsSuccess: MemoizedSelector<
  StateWithProcess,
  boolean
> = createSelector(
  getUpdateUserDetailsState,
  loaderSuccessSelector
);
