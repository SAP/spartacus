import { createSelector, MemoizedSelector } from '@ngrx/store';
import { UserToken } from '../../../auth/models/token-types.model';
import { StateWithAsm } from '../asm-state';
import { getAsmState } from './feature.selector';

export const getCustomerSupportAgentToken: MemoizedSelector<
  StateWithAsm,
  UserToken
> = createSelector(getAsmState, (state) => state.csagentToken.token);
