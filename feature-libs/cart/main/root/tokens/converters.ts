import { InjectionToken } from '@angular/core';
import { Cart } from '@spartacus/cart/main/root';
import { Converter } from '@spartacus/core';

export const CART_NORMALIZER = new InjectionToken<Converter<any, Cart>>(
  'CartNormalizer'
);
