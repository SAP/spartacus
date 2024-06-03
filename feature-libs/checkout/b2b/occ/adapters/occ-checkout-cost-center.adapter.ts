/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cart, CART_NORMALIZER } from '@spartacus/cart/base/root';
import { CheckoutCostCenterAdapter } from '@spartacus/checkout/b2b/core';
import {
  backOff,
  ConverterService,
  isJaloError,
  LoggerService,
  normalizeHttpError,
  OccEndpointsService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccCheckoutCostCenterAdapter implements CheckoutCostCenterAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  setCostCenter(
    userId: string,
    cartId: string,
    costCenterId: string
  ): Observable<Cart> {
    return this.http
      .put(this.getSetCartCostCenterEndpoint(userId, cartId, costCenterId), {})
      .pipe(
        catchError((error) => {
          throw normalizeHttpError(error, this.logger);
        }),
        backOff({ shouldRetry: isJaloError }),
        this.converter.pipeable(CART_NORMALIZER)
      );
  }

  protected getSetCartCostCenterEndpoint(
    userId: string,
    cartId: string,
    costCenterId: string
  ): string {
    return this.occEndpoints.buildUrl('setCartCostCenter', {
      urlParams: { userId, cartId },
      queryParams: { costCenterId },
    });
  }
}
