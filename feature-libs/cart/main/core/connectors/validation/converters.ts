import { InjectionToken } from '@angular/core';
import { CartModificationList } from '@spartacus/cart/main/root';
import { Converter } from '@spartacus/core';

export const CART_VALIDATION_NORMALIZER = new InjectionToken<
  Converter<any, CartModificationList>
>('CartValidationNormalizer');
