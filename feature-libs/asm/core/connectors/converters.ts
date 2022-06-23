import { InjectionToken } from '@angular/core';
import { CustomerSearchPage } from '@spartacus/asm/root';
import { Converter } from '@spartacus/core';

export const CUSTOMER_SEARCH_PAGE_NORMALIZER = new InjectionToken<
  Converter<any, CustomerSearchPage>
>('CustomerSearchPageNormalizer');
