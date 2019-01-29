import { createSelector, MemoizedSelector } from '@ngrx/store';

import { LoaderState } from 'projects/core/src/state/utils/loader/loader-state';

import { AuthState, StateWithAuth } from '../auth-state';
import { ClientToken } from '../../models/token-types.model';

import { getAuthState } from './feature.selector';

export const getClientTokenState: MemoizedSelector<
  StateWithAuth,
  LoaderState<ClientToken>
> = createSelector(
  getAuthState,
  (state: AuthState) => state.clientToken
);
