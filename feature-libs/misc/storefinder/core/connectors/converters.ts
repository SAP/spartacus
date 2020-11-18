import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { StoreCount, StoreFinderSearchPage } from '../model/store-finder.model';

export const STORE_FINDER_SEARCH_PAGE_NORMALIZER = new InjectionToken<
  Converter<any, StoreFinderSearchPage>
>('StoreFinderSearchPageNormalizer');

export const STORE_COUNT_NORMALIZER = new InjectionToken<
  Converter<any, StoreCount>
>('StoreCountNormalizer');
