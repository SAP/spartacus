import { InjectionToken } from '@angular/core';
import { CartModification } from '@spartacus/cart/main/root';
import { Converter } from '@spartacus/core';

export const CART_MODIFICATION_NORMALIZER = new InjectionToken<
  Converter<any, CartModification>
>('CartModificationNormalizer');
