/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeliveryMode } from '@spartacus/cart/base/root';
import {
  CheckoutDeliveryModesAdapter,
  DELIVERY_MODE_NORMALIZER,
} from '@spartacus/checkout/base/core';
import {
  ConverterService,
  Occ,
  OccEndpointsService,
  backOff,
  isJaloError,
  normalizeHttpError,
} from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class OccCheckoutDeliveryModesAdapter
  implements CheckoutDeliveryModesAdapter
{
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  public setMode(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): Observable<unknown> {
    return this.http
      .put(this.getSetDeliveryModeEndpoint(userId, cartId, deliveryModeId), {})
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        backOff({
          shouldRetry: isJaloError,
        })
      );
  }

  protected getSetDeliveryModeEndpoint(
    userId: string,
    cartId: string,
    deliveryModeId?: string
  ): string {
    return this.occEndpoints.buildUrl('setDeliveryMode', {
      urlParams: {
        userId,
        cartId,
      },
      queryParams: { deliveryModeId },
    });
  }

  public getSupportedModes(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode[]> {
    return this.http
      .get<Occ.DeliveryModeList>(this.getDeliveryModesEndpoint(userId, cartId))
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        backOff({
          shouldRetry: isJaloError,
        }),
        map((listResponse) => listResponse.deliveryModes),
        map((modes) => modes ?? []),
        this.converter.pipeableMany(DELIVERY_MODE_NORMALIZER)
      );
  }

  protected getDeliveryModesEndpoint(userId: string, cartId: string): string {
    return this.occEndpoints.buildUrl('deliveryModes', {
      urlParams: { userId, cartId },
    });
  }

  clearCheckoutDeliveryMode(
    userId: string,
    cartId: string
  ): Observable<unknown> {
    return this.http
      .delete<unknown>(this.getClearDeliveryModeEndpoint(userId, cartId))
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        backOff({
          shouldRetry: isJaloError,
        })
      );
  }

  protected getClearDeliveryModeEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.buildUrl('clearDeliveryMode', {
      urlParams: { userId, cartId },
    });
  }
}
