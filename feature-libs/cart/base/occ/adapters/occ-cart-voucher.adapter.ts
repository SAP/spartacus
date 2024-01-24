/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CartVoucherAdapter } from '@spartacus/cart/base/core';
import { CART_VOUCHER_NORMALIZER } from '@spartacus/cart/base/root';
import {
  ConverterService,
  InterceptorUtil,
  LoggerService,
  OCC_USER_ID_ANONYMOUS,
  OccEndpointsService,
  USE_CLIENT_TOKEN,
  normalizeHttpError,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccCartVoucherAdapter implements CartVoucherAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  protected getCartVoucherEndpoint(userId: string, cartId: string): string {
    return this.occEndpoints.buildUrl('cartVoucher', {
      urlParams: { userId, cartId },
    });
  }

  protected getHeaders(userId: string): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (userId === OCC_USER_ID_ANONYMOUS) {
      headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    }

    return headers;
  }

  add(userId: string, cartId: string, voucherId: string): Observable<{}> {
    const url = this.getCartVoucherEndpoint(userId, cartId);

    const toAdd = JSON.stringify({});

    const params: HttpParams = new HttpParams().set('voucherId', voucherId);

    const headers = this.getHeaders(userId);

    return this.http.post(url, toAdd, { headers, params }).pipe(
      catchError((error: any) => {
        throw normalizeHttpError(error, this.logger);
      }),
      this.converter.pipeable(CART_VOUCHER_NORMALIZER)
    );
  }

  remove(userId: string, cartId: string, voucherId: string): Observable<{}> {
    const url =
      this.getCartVoucherEndpoint(userId, cartId) +
      '/' +
      encodeURIComponent(voucherId);

    const headers = this.getHeaders(userId);

    return this.http.delete(url, { headers }).pipe(
      catchError((error: any) => {
        throw normalizeHttpError(error, this.logger);
      })
    );
  }
}
