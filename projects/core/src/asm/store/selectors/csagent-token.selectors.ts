import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '../../../state/utils/index';
import { UserToken } from '../../../auth/models/token-types.model';
import { getAsmState } from './feature.selector';
import { AsmState, StateWithAsm } from '../asm-state';

export const getCustomerSupportAgentTokenState: MemoizedSelector<
  StateWithAsm,
  StateUtils.LoaderState<UserToken>
> = createSelector(getAsmState, (state: AsmState) => state.csagentToken);

export const getCustomerSupportAgentToken: MemoizedSelector<
  StateWithAsm,
  UserToken
> = createSelector(getCustomerSupportAgentTokenState, (state) =>
  StateUtils.loaderValueSelector(state)
);

export const getCustomerSupportAgentTokenLoading: MemoizedSelector<
  StateWithAsm,
  boolean
> = createSelector(getCustomerSupportAgentTokenState, (state) =>
  StateUtils.loaderLoadingSelector(state)
);
