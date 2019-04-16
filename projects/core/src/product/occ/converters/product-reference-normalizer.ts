import { Injectable } from '@angular/core';
import { Product, ProductReference } from '../../../occ/occ-models/occ.models';
import { Converter } from '../../../util/converter.service';
import { UIProduct, UIProductReferences } from '../../model/product-model';

@Injectable()
export class ProductReferenceNormalizer
  implements Converter<Product, UIProduct> {
  convert(source: Product, target?: UIProduct): UIProduct {
    if (target === undefined) {
      target = { ...(source as any) };
    }

    if (source.productReferences) {
      target.productReferences = this.normalize(source.productReferences);
    }
    return target;
  }

  /**
   * @desc
   * Creates the reference structure we'd like to have. Instead of
   * having a single list with all references we create a proper structure.
   * With that we have a semantic API for the clients
   * - product.references.SIMILAR[0].code
   */
  protected normalize(source: ProductReference[]): UIProductReferences {
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
