import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers';
import { UserToken } from '../../models/token-types.model';
import { UserTokenState } from '../reducers/user-token.reducer';

export const getUserTokenSelector = (state: UserTokenState) => state.token;
export const getUserTokenLoadingSelector = (state: UserTokenState) => state.loading;

export const getUserTokenState: MemoizedSelector<
  any,
  UserTokenState
> = createSelector(
  fromFeature.getAuthState,
  (state: fromFeature.AuthState) => state.userToken
);

export const getUserToken: MemoizedSelector<any, UserToken> = createSelector(
  getUserTokenState,
  getUserTokenSelector
);

export const getUserTokenLoading: MemoizedSelector<
  any,
  boolean
> = createSelector(getUserTokenState, getUserTokenLoadingSelector);
