import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers/index';
import * as fromUserDetailsReducer from '../reducers/user-details.reducer';
import { UserDetailsState, UserState } from '../user-state';
import { User } from '../../../occ/occ-models/index';

export const getDetailsState: MemoizedSelector<
  any,
  UserDetailsState
> = createSelector(
  fromFeature.getUserState,
  (state: UserState) => state.account
);

export const getDetails: MemoizedSelector<any, User> = createSelector(
  getDetailsState,
  fromUserDetailsReducer.getDetails
);
