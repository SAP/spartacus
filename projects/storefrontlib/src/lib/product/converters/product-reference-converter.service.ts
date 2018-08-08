import { Injectable } from '@angular/core';

@Injectable()
export class ProductReferenceConverterService {
  convertProduct(product) {
    if (product.productReferences) {
      product.productReferences = this.populate(product.productReferences);
    }
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
