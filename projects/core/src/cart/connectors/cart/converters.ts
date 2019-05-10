import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Cart } from '../../../model/cart.model';

export const CART_NORMALIZER = new InjectionToken<Converter<any, Cart>>(
  'CartNormalizer'
);
