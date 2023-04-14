/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../../model/product.model';
import { ProductAdapter } from '../../../product/connectors/product/product.adapter';
import { WUNDERGRAPH } from '../../../wundergraph/wundergraph';

@Injectable()
export class WuProductAdapter implements ProductAdapter {
  wunder = inject(WUNDERGRAPH);

  constructor(protected http: HttpClient) {}

  /**
   * ng http client
   */
  // load(productCode: string, _scope?: string): Observable<Product> {
  //   return this.http
  //     .get(
  //       `http://localhost:9991/operations/Product?baseSiteId=electronics&productCode=${productCode}`
  //     )
  //     .pipe(
  //       map((response) => {
  //         return (response as any).data.occ_getProduct;
  //       })
  //     );
  // }

  /**
   * wu client
   */
  load(productCode: string, _scope?: string): Observable<Product> {
    return from(
      this.wunder.query({
        operationName: 'Product',
        input: {
          baseSiteId: 'electronics-spa',
          productCode,
        },
      })
    ).pipe(
      map((result) => (result.data?.ccv2_getProduct ?? {}) as any as Product)
    );
  }
}
