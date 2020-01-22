import { InjectionToken } from '@angular/core';
import { SaveCartResult } from '../../../model/cart.model';
import { Converter } from '../../../util/converter.service';

export const SAVE_CART_NORMALIZER = new InjectionToken<
  Converter<any, SaveCartResult>
>('SaveCartNormalizer');
