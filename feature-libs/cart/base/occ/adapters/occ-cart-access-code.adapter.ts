/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  CART_ACCESS_CODE_NORMALIZER,
  CartAccessCodeAdapter,
} from '@spartacus/cart/base/core';
import {
  ConverterService,
  LoggerService,
  OccEndpointsService,
  backOff,
  isServerError,
  normalizeHttpError,
} from '@spartacus/core';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class OccCartAccessCodeAdapter implements CartAccessCodeAdapter {
  protected logger = inject(LoggerService);
  protected http = inject(HttpClient);
  protected occEndpointsService = inject(OccEndpointsService);
  protected converterService = inject(ConverterService);

  getCartAccessCode(
    userId: string,
    cartId: string
  ): Observable<string | undefined> {
    return this.http
      .post<
        string | undefined
      >(this.getCartAccessCodeEndpoint(userId, cartId), null)
      .pipe(
        catchError((error) => {
          throw normalizeHttpError(error, this.logger);
        }),
        backOff({
          shouldRetry: isServerError,
          maxTries: 2,
        }),
        this.converterService.pipeable(CART_ACCESS_CODE_NORMALIZER)
      );
  }

  protected getCartAccessCodeEndpoint(userId: string, cartId: string): string {
    return this.occEndpointsService.buildUrl('cartAccessCode', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }
}
