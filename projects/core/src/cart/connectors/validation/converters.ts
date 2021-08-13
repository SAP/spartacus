import { InjectionToken } from '@angular/core';
import { CartModificationList } from '../../../model/cart.model';
import { Converter } from '../../../util';

export const CART_VALIDATION_NORMALIZER = new InjectionToken<
  Converter<any, CartModificationList>
>('CartValidationNormalizer');
