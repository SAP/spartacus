import { InjectionToken } from '@angular/core';
import { SaveCartResult } from '@spartacus/cart/main/root';
import { Converter } from '@spartacus/core';

export const SAVE_CART_NORMALIZER = new InjectionToken<
  Converter<any, SaveCartResult>
>('SaveCartNormalizer');
