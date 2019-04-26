import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { UICart } from '../../model/cart';

export const CART_NORMALIZER = new InjectionToken<Converter<any, UICart>>(
  'CartNormalizer'
);
