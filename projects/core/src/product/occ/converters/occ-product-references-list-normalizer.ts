import { Injectable } from '@angular/core';
import { ProductReferenceList } from '../../../occ/occ-models/occ.models';
import { PRODUCT_NORMALIZER } from '../../../product/connectors/product/converters';
import { Converter, ConverterService } from '../../../util/converter.service';
import {
  UIProductReference,
  UIProductReferenceList,
} from '../../model/product-reference-list';

@Injectable()
export class OccProductReferencesListNormalizer
  implements Converter<ProductReferenceList, UIProductReferenceList> {
  constructor(private converter: ConverterService) {}

  convert(
    source: ProductReferenceList,
    target: UIProductReferenceList
  ): UIProductReferenceList {
    // needs to be continued
    if (target === undefined) {
      target = { ...(source as any) };
    }

    if (source && source.references) {
      target.references = source.references.map(reference => ({
        ...reference,
        // referenceType: this.normalize(source.references),
        target: this.converter.convert(reference.target, PRODUCT_NORMALIZER),
      }));

      target = this.normalize(target.references);
      return target;
    }
  }

  /**
   * @desc
   * Creates the reference structure we'd like to have. Instead of
   * having a single list with all references we create a proper structure.
   * With that we have a semantic API for the clients
   * - product.references.SIMILAR[0].code
   */
  protected normalize(source: UIProductReference[]): UIProductReferenceList {
    const references = {};

    if (source) {
      for (const reference of source) {
        if (!references.hasOwnProperty(reference.referenceType)) {
          references[reference.referenceType] = [];
        }
        references[reference.referenceType].push(reference);
      }
    }
    return references;
  }
}
