import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromFeature from './../reducers';
import { UserToken } from '../../models/token-types.model';
import { AuthState, StateWithAuth, UserTokenState } from '../auth-state';

export const getUserTokenSelector = (state: UserTokenState) => state.token;

export const getUserTokenState: MemoizedSelector<
  StateWithAuth,
  UserTokenState
> = createSelector(
  fromFeature.getAuthState,
  (state: AuthState) => state.userToken
);

export const getUserToken: MemoizedSelector<any, UserToken> = createSelector(
  getUserTokenState,
  getUserTokenSelector
);
