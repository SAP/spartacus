import { Injectable } from '@angular/core';
import { ProductReference } from '../../../../../../../../../projects/core/src/model/product.model';
import { Occ } from '../../../../../../../../../projects/core/src/occ/occ-models/occ.models';
import { PRODUCT_NORMALIZER } from '../../../../../../../../../projects/core/src/product/connectors/product/converters';
import {
  Converter,
  ConverterService,
} from '../../../../../../../../../projects/core/src/util/converter.service';

@Injectable({ providedIn: 'root' })
export class OccProductReferencesListNormalizer
  implements Converter<Occ.ProductReferenceList, ProductReference[]> {
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.ProductReferenceList,
    target: ProductReference[] = []
  ): ProductReference[] {
    if (target === undefined) {
      target = { ...(source as any) };
    }

    if (source && source.references) {
      target = source.references.map((reference) => ({
        ...reference,
        target: this.converter.convert(reference.target, PRODUCT_NORMALIZER),
      }));

      return target;
    }
  }
}
