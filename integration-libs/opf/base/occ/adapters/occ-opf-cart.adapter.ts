/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DeliveryMode } from '@spartacus/cart/base/root';
import {
  Address,
  ConverterService,
  LoggerService,
  OccEndpointsService,
  backOff,
  normalizeHttpError,
} from '@spartacus/core';
import {
  OPF_CART_ACCESS_TOKEN_NORMALIZER,
  OPF_CART_BILLING_ADDRESS_NORMALIZER,
  OPF_CART_DELIVERY_ADDRESS_NORMALIZER,
  OPF_CART_DELIVERY_MODES_NORMALIZER,
  OPF_CART_DELIVERY_MODE_NORMALIZER,
  OpfCartAdapter,
  isHttp500Error,
} from '@spartacus/opf/base/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class OccOpfCartAdapter implements OpfCartAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  generateOtpKey(
    userId: string,
    cartId: string
  ): Observable<string | undefined> {
    return this.http
      .post<
        string | undefined
      >(this.getGenerateOtpKeyEndpoint(userId, cartId), null)
      .pipe(
        catchError((error) =>
          throwError(normalizeHttpError(error, this.logger))
        ),
        backOff({
          shouldRetry: isHttp500Error,
          maxTries: 2,
        }),
        this.converterService.pipeable(OPF_CART_ACCESS_TOKEN_NORMALIZER)
      );
  }

  setCartBillingAddress(
    userId: string,
    cartId: string,
    billingAddress: Address
  ): Observable<Address> {
    return this.http
      .put<Address>(
        this.getSetCartBillingAddressEndpoint(userId, cartId),
        billingAddress
      )
      .pipe(
        catchError((error) =>
          throwError(normalizeHttpError(error, this.logger))
        ),
        backOff({
          shouldRetry: isHttp500Error,
        }),
        this.converterService.pipeable(OPF_CART_BILLING_ADDRESS_NORMALIZER)
      );
  }

  setCartDeliveryAddress(
    userId: string,
    cartId: string,
    addressId: string
  ): Observable<Address> {
    return this.http
      .put<Address>(
        this.getSetCartDeliveryAddressEndpoint(userId, cartId, addressId),
        null
      )
      .pipe(
        catchError((error) =>
          throwError(normalizeHttpError(error, this.logger))
        ),
        backOff({
          shouldRetry: isHttp500Error,
        }),
        this.converterService.pipeable(OPF_CART_DELIVERY_ADDRESS_NORMALIZER)
      );
  }

  createCartDeliveryAddress(
    userId: string,
    cartId: string,
    deliveryAddress: Address
  ): Observable<Address> {
    return this.http
      .post<Address>(
        this.getCartDeliveryAddressEndpoint(userId, cartId),
        deliveryAddress
      )
      .pipe(
        catchError((error) =>
          throwError(normalizeHttpError(error, this.logger))
        ),
        backOff({
          shouldRetry: isHttp500Error,
        }),
        this.converterService.pipeable(OPF_CART_DELIVERY_ADDRESS_NORMALIZER)
      );
  }

  deleteCartDeliveryAddress(
    userId: string,
    cartId: string
  ): Observable<Address> {
    return this.http
      .delete<Address>(this.getCartDeliveryAddressEndpoint(userId, cartId))
      .pipe(
        catchError((error) =>
          throwError(normalizeHttpError(error, this.logger))
        ),
        backOff({
          shouldRetry: isHttp500Error,
        }),
        this.converterService.pipeable(OPF_CART_DELIVERY_ADDRESS_NORMALIZER)
      );
  }

  setCartDeliveryMode(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): Observable<DeliveryMode> {
    return this.http
      .put<DeliveryMode>(
        this.getSetCartDeliveryModeEndpoint(userId, cartId, deliveryModeId),
        null
      )
      .pipe(
        catchError((error) =>
          throwError(normalizeHttpError(error, this.logger))
        ),
        backOff({
          shouldRetry: isHttp500Error,
        }),
        this.converterService.pipeable(OPF_CART_DELIVERY_MODE_NORMALIZER)
      );
  }

  deleteCartDeliveryMode(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode> {
    return this.http
      .delete<DeliveryMode>(this.getCartDeliveryModeEndpoint(userId, cartId))
      .pipe(
        catchError((error) =>
          throwError(normalizeHttpError(error, this.logger))
        ),
        backOff({
          shouldRetry: isHttp500Error,
        }),
        this.converterService.pipeable(OPF_CART_DELIVERY_MODE_NORMALIZER)
      );
  }

  getCartDeliveryMode(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode> {
    return this.http
      .get<DeliveryMode>(this.getCartDeliveryModeEndpoint(userId, cartId))
      .pipe(this.converterService.pipeable(OPF_CART_DELIVERY_MODE_NORMALIZER));
  }

  getPossibleCartDeliveryModeOptions(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode[]> {
    return this.http
      .get<DeliveryMode[]>(this.getCartDeliveryModesEndpoint(userId, cartId))
      .pipe(this.converterService.pipeable(OPF_CART_DELIVERY_MODES_NORMALIZER));
  }

  protected getGenerateOtpKeyEndpoint(userId: string, cartId: string): string {
    return this.occEndpointsService.buildUrl('generateOtpKey', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }

  protected getSetCartBillingAddressEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpointsService.buildUrl('setCartBillingAddress', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }

  protected getSetCartDeliveryAddressEndpoint(
    userId: string,
    cartId: string,
    addressId: string
  ): string {
    return this.occEndpointsService.buildUrl('setCartDeliveryAddress', {
      urlParams: {
        userId,
        cartId,
        addressId,
      },
    });
  }

  protected getCartDeliveryAddressEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpointsService.buildUrl('cartDeliveryAddress', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }

  protected getCartDeliveryModesEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpointsService.buildUrl('cartDeliveryModes', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }

  protected getSetCartDeliveryModeEndpoint(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): string {
    return this.occEndpointsService.buildUrl('setCartDeliveryMode', {
      urlParams: {
        userId,
        cartId,
        deliveryModeId,
      },
    });
  }

  protected getCartDeliveryModeEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpointsService.buildUrl('cartDeliveryMode', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }
}
