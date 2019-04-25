import { Cart } from '../../../occ/occ-models/occ.models';
import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';

export const CART_NORMALIZER = new InjectionToken<Converter<any, Cart>>(
  'CartNormalizer'
);
