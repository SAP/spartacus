import { createSelector, MemoizedSelector } from '@ngrx/store';

import { UserState, StateWithUser } from '../user-state';
import { getUserState } from './feature.selector';

export const getResetPassword: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getUserState,
  (state: UserState) => state.resetPassword
);
