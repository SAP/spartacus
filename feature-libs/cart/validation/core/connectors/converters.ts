import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { CartModificationList } from '@spartacus/cart/validation/root';

export const CART_VALIDATION_NORMALIZER = new InjectionToken<
  Converter<any, CartModificationList>
>('CartValidationNormalizer');
