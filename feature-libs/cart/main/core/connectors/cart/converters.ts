import { InjectionToken } from '@angular/core';
import { Cart, Converter } from '@spartacus/core';

export const CART_NORMALIZER = new InjectionToken<Converter<any, Cart>>(
  'CartNormalizer'
);
