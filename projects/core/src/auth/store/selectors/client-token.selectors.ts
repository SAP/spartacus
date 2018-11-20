import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromFeature from './../reducers';
import { AuthState, ClientTokenState, StateWithAuth } from '../auth-state';

export const getClientTokenState: MemoizedSelector<
  StateWithAuth,
  ClientTokenState
> = createSelector(
  fromFeature.getAuthState,
  (state: AuthState) => state.clientToken
);
