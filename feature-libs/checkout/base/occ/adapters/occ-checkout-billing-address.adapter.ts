/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CheckoutBillingAddressAdapter } from '@spartacus/checkout/base/core';
import {
  Address,
  backOff,
  ConverterService,
  isJaloError,
  LoggerService,
  normalizeHttpError,
  OccEndpointsService,
} from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccCheckoutBillingAddressAdapter
  implements CheckoutBillingAddressAdapter
{
  protected logger = inject(LoggerService);
  protected http = inject(HttpClient);
  protected occEndpoints = inject(OccEndpointsService);
  protected converter = inject(ConverterService);

  public setBillingAddress(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<unknown> {
    return this.http
      .put<unknown>(this.getSetBillingAddressEndpoint(userId, cartId), address)
      .pipe(
        catchError((error) =>
          throwError(normalizeHttpError(error, this.logger))
        ),
        backOff({
          shouldRetry: isJaloError,
        })
      );
  }

  protected getSetBillingAddressEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.buildUrl('setBillingAddress', {
      urlParams: { userId, cartId },
    });
  }
}
