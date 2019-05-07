import { Injectable } from '@angular/core';
import { ProductReferenceList } from '../../../occ/occ-models/occ.models';
import { PRODUCT_NORMALIZER } from '../../../product/connectors/product/converters';
import { Converter, ConverterService } from '../../../util/converter.service';
import { UIProductReference } from '../../model/product-reference-list';

@Injectable()
export class OccProductReferencesListNormalizer
  implements Converter<ProductReferenceList, UIProductReference[]> {
  constructor(private converter: ConverterService) {}

  convert(
    source: ProductReferenceList,
    target: UIProductReference[] = []
  ): UIProductReference[] {
    if (target === undefined) {
      target = { ...(source as any) };
    }

    if (source && source.references) {
      target = source.references.map(reference => ({
        ...reference,
        target: this.converter.convert(reference.target, PRODUCT_NORMALIZER),
      }));

      return target;
    }
  }
}
