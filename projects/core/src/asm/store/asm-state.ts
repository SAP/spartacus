import { LoaderState } from '../../state/utils/loader/loader-state';
import { AsmUi, CustomerSearchPage } from '../models/asm.models';

/**
 * @deprecated since 3.2, use asm lib instead
 */
export const ASM_FEATURE = 'asm';
/**
 * @deprecated since 3.2, use asm lib instead
 */
export const CUSTOMER_SEARCH_DATA = '[asm] Customer search data';

/**
 * @deprecated since 3.2, use asm lib instead
 */
export interface StateWithAsm {
  [ASM_FEATURE]: AsmState;
}

/**
 * @deprecated since 3.2, use asm lib instead
 */
export interface AsmState {
  customerSearchResult: LoaderState<CustomerSearchPage>;
  asmUi: AsmUi;
}
