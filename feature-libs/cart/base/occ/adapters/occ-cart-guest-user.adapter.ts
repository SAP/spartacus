/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  CART_GUEST_USER_NORMALIZER,
  CartGuestUserAdapter,
} from '@spartacus/cart/base/core';
import { CartGuestUser } from '@spartacus/cart/base/root';
import {
  ConverterService,
  InterceptorUtil,
  LoggerService,
  OccEndpointsService,
  USE_CLIENT_TOKEN,
  backOff,
  isServerError,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { Observable, catchError } from 'rxjs';

const CONTENT_TYPE_JSON_HEADER = { 'Content-Type': 'application/json' };

@Injectable()
export class OccCartGuestUserAdapter implements CartGuestUserAdapter {
  protected logger = inject(LoggerService);
  protected http = inject(HttpClient);
  protected occEndpointsService = inject(OccEndpointsService);
  protected converterService = inject(ConverterService);

  protected getRequestHeaders(): HttpHeaders {
    return InterceptorUtil.createHeader(
      USE_CLIENT_TOKEN,
      true,
      new HttpHeaders({
        ...CONTENT_TYPE_JSON_HEADER,
      })
    );
  }

  createCartGuestUser(
    userId: string,
    cartId: string,
    guestUserDetails?: CartGuestUser
  ): Observable<CartGuestUser> {
    return this.http
      .post<CartGuestUser>(
        this.getCartGuestUserEndpoint(userId, cartId),
        guestUserDetails,
        { headers: this.getRequestHeaders() }
      )
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
        backOff({
          shouldRetry: isServerError,
          maxTries: 2,
        }),
        this.converterService.pipeable(CART_GUEST_USER_NORMALIZER)
      );
  }

  updateCartGuestUser(
    userId: string,
    cartId: string,
    guestUserDetails: CartGuestUser
  ): Observable<CartGuestUser> {
    return this.http
      .patch<CartGuestUser>(
        this.getCartGuestUserEndpoint(userId, cartId),
        guestUserDetails,
        { headers: this.getRequestHeaders() }
      )
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
        backOff({
          shouldRetry: isServerError,
          maxTries: 2,
        }),
        this.converterService.pipeable(CART_GUEST_USER_NORMALIZER)
      );
  }

  protected getCartGuestUserEndpoint(userId: string, cartId: string): string {
    return this.occEndpointsService.buildUrl('cartGuestUser', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }
}
