import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { CartModification } from '../../../model/cart.model';

export const CART_MODIFICATION_NORMALIZER = new InjectionToken<
  Converter<any, CartModification>
>('CartModificationNormalizer');
