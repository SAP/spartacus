import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { CustomerSearchPage } from '../models/asm.models';

export const CUSTOMER_SEARCH_PAGE_NORMALIZER = new InjectionToken<
  Converter<any, CustomerSearchPage>
>('CustomerSearchPageNormalizer');
