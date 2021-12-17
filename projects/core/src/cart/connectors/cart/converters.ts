import { InjectionToken } from '@angular/core';
import { Cart } from '../../../model/cart.model';
import { Converter } from '../../../util/converter.service';

export const CART_NORMALIZER = new InjectionToken<Converter<any, Cart>>(
  'CartNormalizer'
);
