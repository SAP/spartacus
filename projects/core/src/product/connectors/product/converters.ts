import { InjectionToken } from '@angular/core';

import { Product } from '../../../model/product.model';
import { Converter } from '../../../util/converter.service';

export const PRODUCT_NORMALIZER = new InjectionToken<Converter<any, Product>>(
  'ProductNormalizer'
);
