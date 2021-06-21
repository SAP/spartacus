import { InjectionToken } from '@angular/core';
import { Converter, CartModification } from '@spartacus/core';

export const CART_VALIDATION_NORMALIZER = new InjectionToken<
  Converter<any, CartModification>
>('CartValidationNormalizer');
