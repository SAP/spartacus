import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import { ClientAuthenticationTokenState } from '../reducers';
import { ClientAuthenticationToken } from '../../../user/models/token-types.model';

export const getClientAuthState: MemoizedSelector<
  any,
  ClientAuthenticationTokenState
> = createSelector(
  fromFeature.getApplicationAuthState,
  (state: fromFeature.ClientAuthenticationState) => state.clientTokenState
);

export const getAuthClient: MemoizedSelector<
  any,
  ClientAuthenticationToken
> = createSelector(getClientAuthState, fromFeature.getClientToken);
