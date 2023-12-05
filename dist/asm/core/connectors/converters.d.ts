import { InjectionToken } from '@angular/core';
import { CustomerListsPage, CustomerSearchPage } from '@spartacus/asm/root';
import { Converter } from '@spartacus/core';
export declare const CUSTOMER_SEARCH_PAGE_NORMALIZER: InjectionToken<Converter<any, CustomerSearchPage>>;
export declare const CUSTOMER_LISTS_NORMALIZER: InjectionToken<Converter<any, CustomerListsPage>>;
