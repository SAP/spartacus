/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartEntryGroupAdapter } from '@spartacus/cart/base/core';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  CartModification,
  CART_MODIFICATION_NORMALIZER,
} from '@spartacus/cart/base/root';

@Injectable()
export class OccCartEntryGroupAdapter implements CartEntryGroupAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  public remove(
    userId: string,
    cartId: string,
    entryGroupNumber: number
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const url = this.occEndpointsService.buildUrl('removeEntryGroup', {
      urlParams: {
        userId,
        cartId,
        entryGroupNumber,
      },
    });

    return this.http.delete(url, { headers });
  }

  public addTo(
    userId: string,
    cartId: string,
    entryGroupNumber: number,
    productCode: string,
    quantity: number = 1
  ): Observable<CartModification> {
    const url = this.occEndpointsService.buildUrl('addToEntryGroup', {
      urlParams: { userId, cartId, entryGroupNumber },
    });

    const toAdd = {
      quantity,
      product: { code: productCode },
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<CartModification>(url, toAdd, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }
}
