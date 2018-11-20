import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AuthState, ClientTokenState, StateWithAuth } from '../auth-state';
import { getAuthState } from './feature.selector';

export const getClientTokenState: MemoizedSelector<
  StateWithAuth,
  ClientTokenState
> = createSelector(
  getAuthState,
  (state: AuthState) => state.clientToken
);
