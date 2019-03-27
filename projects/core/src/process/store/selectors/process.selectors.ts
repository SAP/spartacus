import { MemoizedSelector, createSelector } from '@ngrx/store';

import { StateWithProcess } from '../process-state';
import { LoaderState } from '../../../state';

import { getProcessState } from './feature.selector';

export const getUpdateUserDetailsState: MemoizedSelector<
  StateWithProcess,
  LoaderState<void>
> = createSelector(
  getProcessState,
  state => state.updateUserDetails
);
