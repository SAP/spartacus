/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CheckoutDeliveryAddressAdapter } from '@spartacus/checkout/base/core';
import {
  ADDRESS_NORMALIZER,
  ADDRESS_SERIALIZER,
  Address,
  ConverterService,
  LoggerService,
  Occ,
  OccEndpointsService,
  backOff,
  isJaloError,
  normalizeHttpError,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccCheckoutDeliveryAddressAdapter
  implements CheckoutDeliveryAddressAdapter
{
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  public createAddress(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<Address> {
    address = this.converter.convert(address, ADDRESS_SERIALIZER);

    return this.http
      .post<Occ.Address>(
        this.getCreateDeliveryAddressEndpoint(userId, cartId),
        address,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        }
      )
      .pipe(
        catchError((error) => {
          throw normalizeHttpError(error, this.logger);
        }),
        backOff({
          shouldRetry: isJaloError,
        }),
        this.converter.pipeable(ADDRESS_NORMALIZER)
      );
  }

  protected getCreateDeliveryAddressEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.buildUrl('createDeliveryAddress', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }

  public setAddress(
    userId: string,
    cartId: string,
    addressId: string
  ): Observable<unknown> {
    return this.http
      .put<unknown>(
        this.getSetDeliveryAddressEndpoint(userId, cartId, addressId),
        {}
      )
      .pipe(
        catchError((error) => {
          throw normalizeHttpError(error, this.logger);
        }),
        backOff({
          shouldRetry: isJaloError,
        })
      );
  }

  protected getSetDeliveryAddressEndpoint(
    userId: string,
    cartId: string,
    addressId?: string
  ): string {
    return this.occEndpoints.buildUrl('setDeliveryAddress', {
      urlParams: { userId, cartId },
      queryParams: { addressId },
    });
  }

  clearCheckoutDeliveryAddress(
    userId: string,
    cartId: string
  ): Observable<unknown> {
    return this.http
      .delete<unknown>(this.getRemoveDeliveryAddressEndpoint(userId, cartId))
      .pipe(
        catchError((error) => {
          throw normalizeHttpError(error, this.logger);
        }),
        backOff({
          shouldRetry: isJaloError,
        })
      );
  }

  protected getRemoveDeliveryAddressEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.buildUrl('removeDeliveryAddress', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }
}
