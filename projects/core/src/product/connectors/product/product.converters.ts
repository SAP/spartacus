import { InjectionToken } from '@angular/core';
import { Converter, Product } from '@spartacus/core';

export const PRODUCT_NORMALIZER = new InjectionToken<Converter<any, Product>>(
  'ProductNormalizer'
);
