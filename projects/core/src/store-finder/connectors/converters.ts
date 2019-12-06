import { InjectionToken } from '@angular/core';

import { PointOfService } from '../../model/point-of-service.model';
import {
  StoreCount,
  StoreFinderSearchPage,
} from '../../model/store-finder.model';
import { Converter } from '../../util/converter.service';

export const POINT_OF_SERVICE_NORMALIZER = new InjectionToken<
  Converter<any, PointOfService>
>('PointOfServiceNormalizer');

export const STORE_FINDER_SEARCH_PAGE_NORMALIZER = new InjectionToken<
  Converter<any, StoreFinderSearchPage>
>('StoreFinderSearchPageNormalizer');

export const STORE_COUNT_NORMALIZER = new InjectionToken<
  Converter<any, StoreCount>
>('StoreCountNormalizer');
