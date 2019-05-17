import { Converter } from '../../util/converter.service';
import { PointOfService } from '../../model/point-of-service.model';
import { InjectionToken } from '@angular/core';
import {
  StoreFinderSearchPage,
  StoreCount,
} from '../../model/store-finder.model';

export const POINT_OF_SERVICE_NORMALIZER = new InjectionToken<
  Converter<any, PointOfService>
>('PointOfServiceNormalizer');

export const STORE_FINDER_SEARCH_PAGE_NORMALIZER = new InjectionToken<
  Converter<any, StoreFinderSearchPage>
>('StoreFinderSearchPageNormalizer');

export const STORE_COUNT_NORMALIZER = new InjectionToken<
  Converter<any, StoreCount>
>('StoreCountNormalizer');
