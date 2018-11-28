import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromUserDetailsReducer from '../reducers/user-details.reducer';
import { UserDetailsState } from '../reducers/user-details.reducer';
import { User } from '@spartacus/core';

export const getDetailsState: MemoizedSelector<
  any,
  UserDetailsState
> = createSelector(
  fromFeature.getUserState,
  (state: fromFeature.UserState) => state.account
);

export const getDetails: MemoizedSelector<any, User> = createSelector(
  getDetailsState,
  fromUserDetailsReducer.getDetails
);
