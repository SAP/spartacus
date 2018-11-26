import { createSelector, MemoizedSelector } from '@ngrx/store';
import { UserToken } from '../../models/token-types.model';
import { AuthState, StateWithAuth, UserTokenState } from '../auth-state';
import { getAuthState } from './feature.selector';

export const getUserTokenSelector = (state: UserTokenState) => state.token;

export const getUserTokenState: MemoizedSelector<
  StateWithAuth,
  UserTokenState
> = createSelector(
  getAuthState,
  (state: AuthState) => state.userToken
);

export const getUserToken: MemoizedSelector<any, UserToken> = createSelector(
  getUserTokenState,
  getUserTokenSelector
);
