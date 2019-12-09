import { createSelector, MemoizedSelector } from '@ngrx/store';

import { UserToken } from '../../../auth/models/token-types.model';
import { StateLoaderSelectors } from '../../../state/utils/loader/loader-group.selectors';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { AsmState, StateWithAsm } from '../asm-state';
import { getAsmState } from './feature.selector';

export const getCustomerSupportAgentTokenState: MemoizedSelector<
  StateWithAsm,
  LoaderState<UserToken>
> = createSelector(
  getAsmState,
  (state: AsmState) => state.csagentToken
);

export const getCustomerSupportAgentToken: MemoizedSelector<
  StateWithAsm,
  UserToken
> = createSelector(
  getCustomerSupportAgentTokenState,
  state => StateLoaderSelectors.loaderValueSelector(state)
);

export const getCustomerSupportAgentTokenLoading: MemoizedSelector<
  StateWithAsm,
  boolean
> = createSelector(
  getCustomerSupportAgentTokenState,
  state => StateLoaderSelectors.loaderLoadingSelector(state)
);
