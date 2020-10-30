import { createSelector, MemoizedSelector } from '@ngrx/store';
import { LoaderState } from '../../../../state/utils/loader/loader-state';
import { ClientToken } from '../../models/client-token.model';
import { ClientAuthState, StateWithClientAuth } from '../client-auth-state';
import { getClientAuthState } from './feature.selector';

export const getClientTokenState: MemoizedSelector<
  StateWithClientAuth,
  LoaderState<ClientToken>
> = createSelector(
  getClientAuthState,
  (state: ClientAuthState) => state.clientToken
);
