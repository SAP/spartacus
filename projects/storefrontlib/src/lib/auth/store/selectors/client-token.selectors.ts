import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers';
import * as fromClientToken from './../reducers/client-token.reducer';
import { ClientAuthenticationToken } from '../../models/token-types.model';

export const getClientTokenState: MemoizedSelector<
  any,
  fromClientToken.ClientTokenState
> = createSelector(
  fromFeature.getAuthState,
  (state: fromFeature.AuthState) => state.clientToken
);

export const getClientToken: MemoizedSelector<
  any,
  ClientAuthenticationToken
> = createSelector(getClientTokenState, fromClientToken.getClientToken);
