import { createSelector, MemoizedSelector } from '@ngrx/store';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { ClientToken } from '../../models/token-types.model';
import { AuthState, StateWithAuth } from '../auth-state';
import { getAuthState } from './feature.selector';

export const getClientTokenState: MemoizedSelector<
  StateWithAuth,
  LoaderState<ClientToken>
> = createSelector(getAuthState, (state: AuthState) => state.clientToken);
