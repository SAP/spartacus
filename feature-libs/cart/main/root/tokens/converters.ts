import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Cart, CartModification } from '../models/cart.model';

export const CART_NORMALIZER = new InjectionToken<Converter<any, Cart>>(
  'CartNormalizer'
);

export const CART_MODIFICATION_NORMALIZER = new InjectionToken<
  Converter<any, CartModification>
>('CartModificationNormalizer');
