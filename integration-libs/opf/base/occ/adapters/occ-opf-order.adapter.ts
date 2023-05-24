/*
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
import { OpfOrderAdapter } from '@spartacus/opf/base/core';
import { Order, ORDER_NORMALIZER } from '@spartacus/order/root';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isHttp500Error } from '../utils/opf-occ-http-error-handlers';

@Injectable()
export class OccOpfOrderAdapter implements OpfOrderAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  public placeOpfOrder(
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
        this.getPlaceOpfOrderEndpoint(userId, cartId, termsChecked.toString()),
        {},
        { headers }
      )
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        backOff({
          shouldRetry: isJaloError,
        }),
        backOff({
          shouldRetry: isHttp500Error,
          maxTries: 2,
        }),
        this.converter.pipeable(ORDER_NORMALIZER)
      );
  }

  protected getPlaceOpfOrderEndpoint(
    userId: string,
    cartId: string,
    termsChecked: string
  ): string {
    return this.occEndpoints.buildUrl('placeOpfOrder', {
      urlParams: { userId },
      queryParams: { cartId, termsChecked },
    });
  }
}
