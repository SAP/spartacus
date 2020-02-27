import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

export const getResetPassword: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(getUserState, (state: UserState) => state.resetPassword);
