import { createSelector, MemoizedSelector } from '@ngrx/store';
import { UserToken } from '../../models/token-types.model';
import { AuthState, StateWithAuth, UserTokenState } from '../auth-state';
import { getAuthState } from './feature.selector';

const getCustomerSupportAgentTokenSelector = (state: UserTokenState) =>
  state.token;

export const getCustomerSupportAgentTokenState: MemoizedSelector<
  StateWithAuth,
  UserTokenState
> = createSelector(
  getAuthState,
  (state: AuthState) => state.csagentToken
);

export const getCustomerSupportAgentToken: MemoizedSelector<
  StateWithAuth,
  UserToken
> = createSelector(
  getCustomerSupportAgentTokenState,
  getCustomerSupportAgentTokenSelector
);
