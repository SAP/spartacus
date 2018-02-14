import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromUserDetailsReducer from '../reducers/user-details.reducer';
import { UserDetailsState } from '../reducers/user-details.reducer';
import { UserDetails } from '../../models/user-details.model';


export const getUserDetailsState: MemoizedSelector<
  any,
  UserDetailsState
  > = createSelector(
    fromFeature.getUserState,
    (state: fromFeature.UserState) => state.userDetails
  );

export const getUserDetails: MemoizedSelector<any, UserDetails> = createSelector(
  getUserDetailsState,
  fromUserDetailsReducer.getUserDetailsEntities
);
