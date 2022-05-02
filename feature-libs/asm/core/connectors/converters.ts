import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { CustomerSearchPage } from '../models/asm.models';
import { CustomerListsPage } from '@spartacus/asm/root';

export const CUSTOMER_SEARCH_PAGE_NORMALIZER = new InjectionToken<
  Converter<any, CustomerSearchPage>
>('CustomerSearchPageNormalizer');

export const CUSTOMER_LISTS_NORMALIZER = new InjectionToken<
  Converter<any, CustomerListsPage>
>('CustomerListsNormalizer');
