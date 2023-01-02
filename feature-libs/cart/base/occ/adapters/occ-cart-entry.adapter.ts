/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartEntryAdapter } from '@spartacus/cart/base/core';
import {
  CartModification,
  CART_MODIFICATION_NORMALIZER,
} from '@spartacus/cart/base/root';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable()
export class OccCartEntryAdapter implements CartEntryAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  public add(
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number = 1
  ): Observable<CartModification> {
    const url = this.occEndpointsService.buildUrl('addEntries', {
      urlParams: { userId, cartId, quantity },
    });

    // Handle b2b case where the x-www-form-urlencoded is still used
    if (url.includes(`quantity=${quantity}`)) {
      const httpHeaders = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      });

      return this.http
        .post<CartModification>(
          url,
          {},
          { headers: httpHeaders, params: { code: productCode } }
        )
        .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }

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

  public update(
    userId: string,
    cartId: string,
    entryNumber: string,
    qty: number,
    pickupStore?: string
  ): Observable<CartModification> {
    let params = {};
    if (pickupStore) {
      params = {
        deliveryPointOfService: {
          name: pickupStore,
        },
      };
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = this.occEndpointsService.buildUrl('updateEntries', {
      urlParams: {
        userId,
        cartId,
        entryNumber,
      },
    });

    return this.http
      .patch<CartModification>(url, { quantity: qty, ...params }, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  public remove(
    userId: string,
    cartId: string,
    entryNumber: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const url = this.occEndpointsService.buildUrl('removeEntries', {
      urlParams: {
        userId,
        cartId,
        entryNumber,
      },
    });

    return this.http.delete(url, { headers });
  }
}
