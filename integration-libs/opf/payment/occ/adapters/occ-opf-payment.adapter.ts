/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CART_NORMALIZER, Cart } from '@spartacus/cart/base/root';
import {
  ConverterService,
  LoggerService,
  OccEndpointsService,
  backOff,
  isJaloError,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { OpfPaymentOccAdapter } from '@spartacus/opf/payment/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccOpfPaymentAdapter implements OpfPaymentOccAdapter {
  protected logger = inject(LoggerService);
  protected occEndpoints = inject(OccEndpointsService);
  protected http = inject(HttpClient);
  protected converter = inject(ConverterService);

  setCartPaymentOption(
    userId: string,
    cartId: string,
    sapPaymentOptionId: string,
    purchaseOrderNumber?: string
  ): Observable<Cart> {
    const CONTENT_TYPE_JSON_HEADER = { 'Content-Type': 'application/json' };
    const headers = new HttpHeaders({
      ...CONTENT_TYPE_JSON_HEADER,
    });

    return this.http
      .put<Cart>(
        this.getSetCartPaymentOptionEndpoint(userId, cartId),
        JSON.stringify({
          sapPaymentOptionId: sapPaymentOptionId,
          purchaseOrderNumber: purchaseOrderNumber,
        }),
        { headers }
      )
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
        backOff({ shouldRetry: isJaloError }),
        this.converter.pipeable(CART_NORMALIZER)
      );
  }

  protected getSetCartPaymentOptionEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.buildUrl('setCartPaymentOption', {
      urlParams: {
        userId,
        cartId,
      },
      queryParams: {
        fields: 'DEFAULT',
      },
    });
  }
}
