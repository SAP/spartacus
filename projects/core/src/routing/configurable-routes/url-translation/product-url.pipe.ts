/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../../model/product.model';
import { SemanticPathService } from './semantic-path.service';
@Pipe({
  name: 'cxProductUrl',
})
export class ProductURLPipe implements PipeTransform {
  constructor(private semanticPath: SemanticPathService) {}
  transform(product: Product) {
    return this.semanticPath.transform({ cxRoute: 'product', params: product });
  }
}
