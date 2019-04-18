import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { CartModification } from '../../../occ/occ-models/occ.models';

export const CART_MODIFICATION_NORMALIZER = new InjectionToken<
  Converter<any, CartModification>
>('CartModificationNormalizer');
