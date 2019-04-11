import { Injectable } from '@angular/core';

import { Product } from '../../../occ/occ-models/occ.models';
import { Converter } from '../../../util/converter.service';

@Injectable()
export class ProductReferenceNormalizer implements Converter<Product, Product> {
  convert(source: Product, target?: Product): Product {
    if (target === undefined) {
      target = { ...source };
    }
    if (source.productReferences) {
      target.productReferences = this.populate(source.productReferences);
    }
    return target;
  }

  /**
   * @desc
   * Creates the reference structue we'd like to have. Instead of
   * having a single list with all references we create a proper structure.
   * With that we have a semantic API for the clients
   * - product.references.SIMILAR[0].code
   */
  protected populate(source: Array<any>): any {
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
