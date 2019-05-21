import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Product } from '../../../model/product.model';

export const PRODUCT_NORMALIZER = new InjectionToken<Converter<any, Product>>(
  'ProductNormalizer'
);
