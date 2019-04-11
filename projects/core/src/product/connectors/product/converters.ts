import { InjectionToken } from '@angular/core';
import { Product } from '../../../occ/occ-models/occ.models';
import { Converter } from '../../../util/converter.service';

export const PRODUCT_NORMALIZER = new InjectionToken<Converter<any, Product>>(
  'ProductNormalizer'
);
