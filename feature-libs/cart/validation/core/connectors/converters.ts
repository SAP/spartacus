import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { CartModificationList } from '../model/index';

export const CART_VALIDATION_NORMALIZER = new InjectionToken<
  Converter<any, CartModificationList>
>('CartValidationNormalizer');
