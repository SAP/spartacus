/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CheckoutBillingAddressAdapter } from '@spartacus/checkout/base/core';
import {
  Address,
  backOff,
  ConverterService,
  isJaloError,
  normalizeHttpError,
  OccEndpointsService,
} from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError, pluck } from 'rxjs/operators';

@Injectable()
export class OccCheckoutBillingAddressAdapter
  implements CheckoutBillingAddressAdapter
{
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  public setAddress(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<unknown> {
    return this.http
      .put<unknown>(this.getSetBillingAddressEndpoint(userId, cartId), address)
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        backOff({
          shouldRetry: isJaloError,
        })
      );
  }

  public getAddress(
    userId: string,
    cartId: string
  ): Observable<Address | undefined> {
    return this.http
      .get<unknown>(this.getLoadCartEndpoint(userId, cartId))
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        backOff({
          shouldRetry: isJaloError,
        }),
        pluck('paymentAddress')
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

  protected getLoadCartEndpoint(userId: string, cartId: string): string {
    return this.occEndpoints.buildUrl('getCart', {
      urlParams: { userId, cartId },
    });
  }
}
