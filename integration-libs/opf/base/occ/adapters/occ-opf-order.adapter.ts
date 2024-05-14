/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ConverterService,
  InterceptorUtil,
  LoggerService,
  OCC_USER_ID_ANONYMOUS,
  Occ,
  OccEndpointsService,
  USE_CLIENT_TOKEN,
  backOff,
  isJaloError,
  normalizeHttpError,
} from '@spartacus/core';
import {
  OpfOrderAdapter,
  isHttp500Error,
  opfHttp500ErrorRetry,
} from '@spartacus/opf/base/core';
import { ORDER_NORMALIZER, Order } from '@spartacus/order/root';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccOpfOrderAdapter implements OpfOrderAdapter {
  protected http = inject(HttpClient);
  protected occEndpoints = inject(OccEndpointsService);
  protected converter = inject(ConverterService);
  protected logger = inject(LoggerService);

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
        catchError((error) =>
          throwError(normalizeHttpError(error, this.logger))
        ),
        backOff({
          shouldRetry: isJaloError,
        }),
        backOff({
          shouldRetry: isHttp500Error,
          maxTries: opfHttp500ErrorRetry,
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
