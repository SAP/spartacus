/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../model/product.model';
import { ProductAdapter } from './product.adapter';
import { ScopedProductData } from './scoped-product-data';

@Injectable({
  providedIn: 'root',
})
export class ProductConnector {
  protected adapter = inject(ProductAdapter);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  get(productCode: string, scope = ''): Observable<Product> {
    return this.adapter.load(productCode, scope);
  }

  getMany(products: ScopedProductData[]): ScopedProductData[] {
    if (!this.adapter.loadMany) {
      return products.map((product) => ({
        ...product,
        data$: this.adapter.load(product.code, product.scope),
      }));
    }

    return this.adapter.loadMany(products);
  }
}
