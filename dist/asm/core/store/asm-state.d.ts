import { AsmUi, CustomerSearchPage } from '@spartacus/asm/root';
import { StateUtils } from '@spartacus/core';
export declare const ASM_FEATURE = "asm";
export declare const CUSTOMER_SEARCH_DATA = "[asm] Customer search data";
export declare const CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA = "[asm] Customer list customers search data";
export interface StateWithAsm {
    [ASM_FEATURE]: AsmState;
}
export interface AsmState {
    customerSearchResult: StateUtils.LoaderState<CustomerSearchPage>;
    customerListCustomersSearchResult: StateUtils.LoaderState<CustomerSearchPage>;
    asmUi: AsmUi;
}
