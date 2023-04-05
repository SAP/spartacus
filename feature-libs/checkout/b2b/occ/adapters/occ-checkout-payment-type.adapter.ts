/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart, CART_NORMALIZER, PaymentType } from '@spartacus/cart/base/root';
import {
  CheckoutPaymentTypeAdapter,
  CHECKOUT_PAYMENT_TYPE_NORMALIZER,
} from '@spartacus/checkout/b2b/core';
import {
  backOff,
  ConverterService,
  isJaloError,
  normalizeHttpError,
  Occ,
  OccEndpointsService,
  OCC_HTTP_TOKEN,
} from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class OccCheckoutPaymentTypeAdapter
  implements CheckoutPaymentTypeAdapter
{
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  getPaymentTypes(): Observable<PaymentType[]> {
    const context = new HttpContext().set(OCC_HTTP_TOKEN, {
      sendUserIdAsHeader: true,
    });

    return this.http
      .get<Occ.PaymentTypeList>(this.getPaymentTypesEndpoint(), { context })
      .pipe(
        catchError((error) => throwError(() => normalizeHttpError(error))),
        backOff({ shouldRetry: isJaloError }),
        map((paymentTypeList) => paymentTypeList.paymentTypes ?? []),
        this.converter.pipeableMany(CHECKOUT_PAYMENT_TYPE_NORMALIZER)
      );
  }

  protected getPaymentTypesEndpoint(): string {
    return this.occEndpoints.buildUrl('paymentTypes');
  }

  setPaymentType(
    userId: string,
    cartId: string,
    paymentType: string,
    purchaseOrderNumber?: string
  ): Observable<Cart> {
    return this.http
      .put(
        this.getSetCartPaymentTypeEndpoint(
          userId,
          cartId,
          paymentType,
          purchaseOrderNumber
        ),
        {}
      )
      .pipe(
        catchError((error) => throwError(() => normalizeHttpError(error))),
        backOff({ shouldRetry: isJaloError }),
        this.converter.pipeable(CART_NORMALIZER)
      );
  }

  protected getSetCartPaymentTypeEndpoint(
    userId: string,
    cartId: string,
    paymentType: string,
    purchaseOrderNumber?: string
  ): string {
    const queryParams = { paymentType, purchaseOrderNumber };
    return this.occEndpoints.buildUrl('setCartPaymentType', {
      urlParams: { userId, cartId },
      queryParams,
    });
  }
}
