import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers';
import * as fromUserToken from './../reducers/user-token.reducer';
import { UserToken } from '../../models/token-types.model';
import { UserTokenState } from '../reducers/user-token.reducer';

export const getUserTokenState: MemoizedSelector<
  any,
  UserTokenState
> = createSelector(
  fromFeature.getUserState,
  (state: fromFeature.UserState) => state.token
);

export const getUserToken: MemoizedSelector<any, UserToken> = createSelector(
  getUserTokenState,
  fromUserToken.getUserToken
);
