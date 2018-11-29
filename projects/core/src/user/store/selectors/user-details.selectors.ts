import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromUserDetailsReducer from '../reducers/user-details.reducer';
import { UserDetailsState, UserState } from '../user-state';

export const getDetailsState: MemoizedSelector<
  any,
  UserDetailsState
> = createSelector(
  fromFeature.getUserState,
  (state: UserState) => state.account
);

export const getDetails: MemoizedSelector<any, any> = createSelector(
  getDetailsState,
  fromUserDetailsReducer.getDetails
);
