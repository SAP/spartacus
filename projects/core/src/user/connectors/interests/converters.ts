import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { ProductInterestList } from '../../../model/product-interest.model';

export const PRODUCT_INTERESTS_NORMALIZER = new InjectionToken<
  Converter<any, ProductInterestList>
>('ProductInterestsNormalizer');
