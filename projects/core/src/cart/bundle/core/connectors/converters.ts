import { InjectionToken } from '@angular/core';
import { CartModification } from 'projects/core/src/model/cart.model';
import { Converter } from 'projects/core/src/util/converter.service';

export const CART_MODIFICATION_NORMALIZER = new InjectionToken<
  Converter<any, CartModification>
>('CartModificationNormalizer');
