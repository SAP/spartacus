/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  backOff,
  ConverterService,
  InterceptorUtil,
  isJaloError,
  normalizeHttpError,
  Occ,
  OccEndpointsService,
  OCC_USER_ID_ANONYMOUS,
  USE_CLIENT_TOKEN,
} from '@spartacus/core';
import { OrderAdapter } from '@spartacus/order/core';
import { Order, ORDER_NORMALIZER } from '@spartacus/order/root';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccOrderAdapter implements OrderAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  public placeOrder(
    userId: string,
    cartId: string,
    termsChecked: boolean
  ): Observable<Order> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    if (userId === OCC_USER_ID_ANONYMOUS) {
      headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    }

    return this.http
      .post<Occ.Order>(
        this.getPlaceOrderEndpoint(userId, cartId, termsChecked.toString()),
        {},
        { headers }
      )
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        backOff({
          shouldRetry: isJaloError,
        }),
        this.converter.pipeable(ORDER_NORMALIZER)
      );
  }

  protected getPlaceOrderEndpoint(
    userId: string,
    cartId: string,
    termsChecked: string
  ): string {
    return this.occEndpoints.buildUrl('placeOrder', {
      urlParams: { userId },
      queryParams: { cartId, termsChecked },
    });
  }
}
