import { InjectionToken } from '@angular/core';

import { ProductInterestSearchResult } from '../../../model/product-interest.model';
import { Converter } from '../../../util/converter.service';

export const PRODUCT_INTERESTS_NORMALIZER = new InjectionToken<
  Converter<any, ProductInterestSearchResult>
>('ProductInterestsNormalizer');
