/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  backOff,
  ConverterService,
  isServerError,
  LoggerService,
  OccEndpointsService,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { catchError, Observable } from 'rxjs';
import { OpfCheckoutAdapter } from '../connectors';
import { CartUserEmailResponse } from '../model';
import { OPF_GET_CART_USER_EMAIL_NORMALIZER } from '../tokens';

@Injectable()
export class OpfApiCheckoutAdapter implements OpfCheckoutAdapter {
  protected http = inject(HttpClient);
  protected converter = inject(ConverterService);
  protected occEndpointsService = inject(OccEndpointsService);
  protected logger = inject(LoggerService);

  /**
   * Retrieves the email associated with a specific cart for a given user.
   *
   * @param {string} userId - The unique identifier of the user.
   * @param {string} cartId - The unique identifier of the cart.
   * @returns {Observable<CartUserEmailResponse>} - An observable containing the cart user email response.
   */
  getCartUserEmail(
    userId: string,
    cartId: string
  ): Observable<CartUserEmailResponse> {
    return this.http
      .get<CartUserEmailResponse>(
        this.occEndpointsService.buildUrl('cartUserEmail', {
          urlParams: { userId, cartId },
        })
      )
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
        backOff({
          shouldRetry: isServerError,
          maxTries: 2,
        }),
        this.converter.pipeable(OPF_GET_CART_USER_EMAIL_NORMALIZER)
      );
  }
}
