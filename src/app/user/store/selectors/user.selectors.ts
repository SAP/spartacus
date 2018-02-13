import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromReducers from '../reducers';
import * as fromUserReducer from '../reducers/user.reducer';

export const getUserState = createSelector(
  fromReducers.getUsersState,
  (state: fromReducers.UserState) => state.users
);

export const getUsersEntities: MemoizedSelector<any, any> = createSelector(
  getUserState,
  fromUserReducer.getUserEntities
);
