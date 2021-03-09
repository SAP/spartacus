import { InjectionToken } from '@angular/core';
import { CartModification, Converter } from '@spartacus/core';

export const CART_MODIFICATION_NORMALIZER = new InjectionToken<
  Converter<any, CartModification>
>('CartModificationNormalizer');
