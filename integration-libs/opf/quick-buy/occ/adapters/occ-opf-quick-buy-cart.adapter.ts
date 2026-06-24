/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DeliveryMode } from '@spartacus/cart/base/root';
import { DELIVERY_MODE_NORMALIZER } from '@spartacus/checkout/base/core';
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
  tryNormalizeHttpError,
} from '@spartacus/core';
import { OpfQuickBuyCartAdapter } from '@spartacus/opf/quick-buy/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class OccOpfQuickBuyCartAdapter implements OpfQuickBuyCartAdapter {
  protected logger = inject(LoggerService);
  protected http = inject(HttpClient);
  protected occEndpoints = inject(OccEndpointsService);
  protected converter = inject(ConverterService);

  createDeliveryAddress(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<Address> {
    const serializedAddress = this.converter.convert(
      address,
      ADDRESS_SERIALIZER
    );

    return this.http
      .post<Occ.Address>(
        this.getCreateDeliveryAddressEndpoint(userId, cartId),
        serializedAddress,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        }
      )
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
        backOff({
          shouldRetry: isJaloError,
        }),
        this.converter.pipeable(ADDRESS_NORMALIZER)
      );
  }

  setBillingAddress(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<unknown> {
    return this.http
      .put<unknown>(this.getSetBillingAddressEndpoint(userId, cartId), address)
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
        backOff({
          shouldRetry: isJaloError,
        })
      );
  }

  getSupportedDeliveryModes(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode[]> {
    return this.http
      .get<Occ.DeliveryModeList>(this.getDeliveryModesEndpoint(userId, cartId))
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
        backOff({
          shouldRetry: isJaloError,
        }),
        map((listResponse) => listResponse.deliveryModes ?? []),
        this.converter.pipeableMany(DELIVERY_MODE_NORMALIZER)
      );
  }

  setDeliveryMode(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): Observable<unknown> {
    return this.http
      .put(this.getSetDeliveryModeEndpoint(userId, cartId, deliveryModeId), {})
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
        backOff({
          shouldRetry: isJaloError,
        })
      );
  }

  getSelectedDeliveryMode(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode | undefined> {
    return this.http
      .get<Occ.Cart>(this.getSelectedDeliveryModeEndpoint(userId, cartId))
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
        backOff({
          shouldRetry: isJaloError,
        }),
        map((cart) =>
          cart.deliveryMode
            ? this.converter.convert(cart.deliveryMode, DELIVERY_MODE_NORMALIZER)
            : undefined
        )
      );
  }

  protected getCreateDeliveryAddressEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.buildUrl('quickBuyCreateDeliveryAddress', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }

  protected getSetBillingAddressEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.buildUrl('quickBuySetBillingAddress', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }

  protected getDeliveryModesEndpoint(userId: string, cartId: string): string {
    return this.occEndpoints.buildUrl('quickBuyDeliveryModes', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }

  protected getSetDeliveryModeEndpoint(
    userId: string,
    cartId: string,
    deliveryModeId?: string
  ): string {
    return this.occEndpoints.buildUrl('quickBuySetDeliveryMode', {
      urlParams: {
        userId,
        cartId,
      },
      queryParams: { deliveryModeId },
    });
  }

  protected getSelectedDeliveryModeEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.buildUrl('quickBuySelectedDeliveryMode', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }
}
