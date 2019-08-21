import { createSelector, MemoizedSelector } from '@ngrx/store';
import { CustomerSearchPage } from '../../models/asm.models';
import { AsmState, StateWithAsm } from '../asm-state';
import { getAsmState } from './feature.selector';

export const getCustomerSearchResults: MemoizedSelector<
  StateWithAsm,
  CustomerSearchPage
> = createSelector(
  getAsmState,
  (state: AsmState) => state.cusrtomerSearchResult
);
