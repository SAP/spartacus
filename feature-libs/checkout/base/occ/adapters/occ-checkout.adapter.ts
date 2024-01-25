/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  CHECKOUT_NORMALIZER,
  CheckoutAdapter,
} from '@spartacus/checkout/base/core';
import { CheckoutState } from '@spartacus/checkout/base/root';
import {
  ConverterService,
  LoggerService,
  OccEndpointsService,
  backOff,
  isJaloError,
  normalizeHttpError,
} from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccCheckoutAdapter implements CheckoutAdapter {
  protected logger = inject(LoggerService);

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
        catchError((error) =>
          throwError(normalizeHttpError(error, this.logger))
        ),
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
