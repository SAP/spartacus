import { InjectionToken } from '@angular/core';
import { Cart, Converter } from '@spartacus/core';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_NORMALIZER = new InjectionToken<Converter<any, Cart>>(
  'CartNormalizer'
);
