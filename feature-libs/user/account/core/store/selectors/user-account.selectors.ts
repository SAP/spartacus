import { createSelector, MemoizedSelector } from '@ngrx/store';
import { User } from '@spartacus/user/account/root';
import {
  StateWithUserAccount,
  UserAccountDetailsState,
  UserAccountState,
} from '../user-account.state';
import { getUserState } from './feature.selector';

export const getDetailsState: MemoizedSelector<
  StateWithUserAccount,
  UserAccountDetailsState
> = createSelector(getUserState, (state: UserAccountState) => state.account);

export const getDetails: MemoizedSelector<
  StateWithUserAccount,
  User
> = createSelector(
  getDetailsState,
  (state: UserAccountDetailsState) => state.details
);
