import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateWithUser, UserDetailsState, UserState } from '../user-state';
import { getUserState } from './feature.selector';
import { User } from '../../../model/misc.model';

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
