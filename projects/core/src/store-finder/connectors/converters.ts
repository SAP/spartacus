import { Converter } from '../../util/converter.service';
import {
  PointOfService,
  StoreFinderSearchPage,
  StoreCount,
} from '../../model/store.model';
import { InjectionToken } from '@angular/core';

export const STORE_FINDER_POINT_OF_SERVICE_NORMALIZER = new InjectionToken<
  Converter<any, PointOfService>
>('StoreFinderPointOfServiceNormalizer');

export const STORE_FINDER_SEARCH_PAGE_NORMALIZER = new InjectionToken<
  Converter<any, StoreFinderSearchPage>
>('StoreFinderSearchPageNormalizer');

export const STORE_FINDER_COUNT_NORMALIZER = new InjectionToken<
  Converter<any, StoreCount>
>('StoreFinderCountNormalizer');
