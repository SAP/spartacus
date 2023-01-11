/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CheckoutAdapter,
  CHECKOUT_NORMALIZER,
} from '@spartacus/checkout/base/core';
import { CheckoutState } from '@spartacus/checkout/base/root';
import {
  backOff,
  ConverterService,
  isJaloError,
  normalizeHttpError,
  OccEndpointsService,
} from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccCheckoutAdapter implements CheckoutAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  getCheckoutDetails(
    userId: string,
    cartId: string
  ): Observable<CheckoutState> {
    return this.http
      .get<CheckoutState>(this.getGetCheckoutDetailsEndpoint(userId, cartId))
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        backOff({
          shouldRetry: isJaloError,
        }),
        this.converter.pipeable(CHECKOUT_NORMALIZER)
      );
  }

  protected getGetCheckoutDetailsEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.buildUrl('getCheckoutDetails', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }
}
