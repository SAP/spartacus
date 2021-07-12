import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { CartModification } from '../../../model/cart.model';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_MODIFICATION_NORMALIZER = new InjectionToken<
  Converter<any, CartModification>
>('CartModificationNormalizer');
