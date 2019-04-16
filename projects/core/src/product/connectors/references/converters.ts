import { InjectionToken } from '@angular/core';
import { ProductReference } from '../../../occ/occ-models/occ.models';
import { Converter } from '../../../util/converter.service';

export const PRODUCT_REFERENCES_NORMALIZER = new InjectionToken<
  Converter<any, ProductReference[]>
>('ProductReferencesListNormalizer');
