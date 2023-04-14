/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../../model/product.model';
import { ProductAdapter } from '../../../product/connectors/product/product.adapter';

@Injectable()
export class WgProductAdapter implements ProductAdapter {
  constructor(protected http: HttpClient) {}

  load(productCode: string, _scope?: string): Observable<Product> {
    return this.http
      .get(
        `http://localhost:9991/operations/Product?baseSiteId=electronics&productCode=${productCode}`
      )
      .pipe(
        map((response) => {
          return (response as any).data.occ_getProduct;
        })
      );
  }
}
