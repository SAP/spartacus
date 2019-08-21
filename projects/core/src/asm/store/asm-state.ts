import { CustomerSearchPage } from '../models/asm.models';

export const ASM_FEATURE = 'asm';

export interface StateWithAsm {
  [ASM_FEATURE]: AsmState;
}

export interface AsmState {
  cusrtomerSearchResult: CustomerSearchPage;
}
