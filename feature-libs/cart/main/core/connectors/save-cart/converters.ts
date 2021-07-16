import { InjectionToken } from '@angular/core';
import { Converter, SaveCartResult } from '@spartacus/core';

export const SAVE_CART_NORMALIZER = new InjectionToken<
  Converter<any, SaveCartResult>
>('SaveCartNormalizer');
