/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pipe, PipeTransform, inject } from '@angular/core';
import { SemanticPathService } from './semantic-path.service';
import { Product } from '../../../model/product.model';
@Pipe({
  name: 'cxProductUrl',
  standalone: false,
})
export class ProductURLPipe implements PipeTransform {
  private semanticPath = inject(SemanticPathService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}
  transform(product: Product) {
    return this.semanticPath.transform({ cxRoute: 'product', params: product });
  }
}
