import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AuthState, StateWithAuth } from '../../../store/auth-state';
import { getAuthState } from '../../../store/selectors/feature.selector';

export const getOccUserId: MemoizedSelector<
  StateWithAuth,
  string
> = createSelector(
  getAuthState,
  (state: AuthState) => state.occUserId
);
