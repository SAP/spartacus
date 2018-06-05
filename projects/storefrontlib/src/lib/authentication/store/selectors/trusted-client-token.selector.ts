import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import { TrustedClientTokenState } from '../reducers';
import { TrustedClientToken } from '../../../user/models/token-types.model';

export const getTrustedClientAuthState: MemoizedSelector<
  any,
  TrustedClientTokenState
> = createSelector(
  fromFeature.getApplicationAuthState,
  (state: fromFeature.AuthenticationState) => state.trustedClient
);

export const getTrustedToken: MemoizedSelector<
  any,
  TrustedClientToken
> = createSelector(
  getTrustedClientAuthState,
  fromFeature.getTrustedClientToken
);
