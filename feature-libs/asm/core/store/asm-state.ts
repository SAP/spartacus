import { CustomerSearchPage } from '@spartacus/asm/root';
import { StateUtils } from '@spartacus/core';
import { AsmUi } from '../models/asm.models';

export const ASM_FEATURE = 'asm';
export const CUSTOMER_SEARCH_DATA = '[asm] Customer search data';

export interface StateWithAsm {
  [ASM_FEATURE]: AsmState;
}

export interface AsmState {
  customerSearchResult: StateUtils.LoaderState<CustomerSearchPage>;
  asmUi: AsmUi;
}
