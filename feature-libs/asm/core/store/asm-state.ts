import {
  AsmCustomer360Response,
  AsmUi,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import { StateUtils } from '@spartacus/core';

export const ASM_FEATURE = 'asm';
export const CUSTOMER_SEARCH_DATA = '[asm] Customer search data';
export const CUSTOMER_360_DATA = '[asm] Customer 360 data';

export interface StateWithAsm {
  [ASM_FEATURE]: AsmState;
}

export interface AsmState {
  customerSearchResult: StateUtils.LoaderState<CustomerSearchPage>;
  customer360Response: StateUtils.LoaderState<AsmCustomer360Response>;
  asmUi: AsmUi;
}
