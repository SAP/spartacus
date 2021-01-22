import { createSelector, MemoizedSelector } from '@ngrx/store';
import { User } from '../../model/user.model';
import {
  StateWithUser,
  UserAccountState,
  UserState,
} from '../user-account.state';
import { getUserState } from './feature.selector';

export const getDetailsState: MemoizedSelector<
  StateWithUser,
  UserAccountState
> = createSelector(getUserState, (state: UserState) => state.account);

export const getDetails: MemoizedSelector<StateWithUser, User> = createSelector(
  getDetailsState,
  (state: UserAccountState) => state.details
);
