/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Product, ProductReferences } from '../../../../model/product.model';
import { Converter } from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';

@Injectable()
export class ProductReferenceNormalizer
  implements Converter<Occ.Product, Product>
{
  convert(source: Occ.Product, target?: Product): Product {
    if (target === undefined) {
      target = { ...(source as any) } as Product;
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
  protected normalize(source: Occ.ProductReference[]): ProductReferences {
    const references: any = {};

    if (source) {
      for (const reference of source) {
        if (reference.referenceType) {
          if (!references.hasOwnProperty(reference.referenceType)) {
            references[reference.referenceType] = [];
          }
          references[reference.referenceType].push(reference);
        }
      }
    }
    return references;
  }
}
