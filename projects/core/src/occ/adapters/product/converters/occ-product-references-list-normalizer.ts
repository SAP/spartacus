import { Injectable } from '@angular/core';
import { ProductReference } from '../../../../model/product.model';
import { Occ } from '../../../occ-models/occ.models';
import { PRODUCT_NORMALIZER } from '../../../../product/connectors/product/converters';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';

@Injectable({ providedIn: 'root' })
export class OccProductReferencesListNormalizer
  implements Converter<Occ.ProductReferenceList, ProductReference[]>
{
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
