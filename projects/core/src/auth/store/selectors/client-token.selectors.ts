import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AuthState, StateWithAuth } from '../auth-state';
import { getAuthState } from './feature.selector';
import { LoaderState } from 'projects/core/src/state/utils/loader/loader-state';
import { ClientToken } from '../../models/token-types.model';

export const getClientTokenState: MemoizedSelector<
  StateWithAuth,
  LoaderState<ClientToken>
> = createSelector(
  getAuthState,
  (state: AuthState) => state.clientToken
);
