import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { ProductInterestSearchResult } from '../../../model/product-interest.model';

export const PRODUCT_INTERESTS_NORMALIZER = new InjectionToken<
  Converter<any, ProductInterestSearchResult>
>('ProductInterestsNormalizer');
