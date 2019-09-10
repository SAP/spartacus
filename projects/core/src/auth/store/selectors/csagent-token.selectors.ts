import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateLoaderSelectors } from '../../../state/utils/loader/loader-group.selectors';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { UserToken } from '../../models/token-types.model';
import { AuthState, StateWithAuth } from '../auth-state';
import { getAuthState } from './feature.selector';

export const getCustomerSupportAgentTokenState: MemoizedSelector<
  StateWithAuth,
  LoaderState<UserToken>
> = createSelector(
  getAuthState,
  (state: AuthState) => state.csagentToken
);

export const getCustomerSupportAgentToken: MemoizedSelector<
  StateWithAuth,
  UserToken
> = createSelector(
  getCustomerSupportAgentTokenState,
  state => StateLoaderSelectors.loaderValueSelector(state)
);

export const getCustomerSupportAgentTokenLoading: MemoizedSelector<
  StateWithAuth,
  boolean
> = createSelector(
  getCustomerSupportAgentTokenState,
  state => StateLoaderSelectors.loaderLoadingSelector(state)
);
