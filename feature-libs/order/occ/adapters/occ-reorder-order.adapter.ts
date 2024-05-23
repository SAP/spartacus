/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CartModificationList } from '@spartacus/cart/base/root';
import {
  ConverterService,
  LoggerService,
  OccEndpointsService,
  normalizeHttpError,
} from '@spartacus/core';
import { ReorderOrderAdapter } from '@spartacus/order/core';
import { REORDER_ORDER_NORMALIZER } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccReorderOrderAdapter implements ReorderOrderAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  reorder(orderId: string, userId: string): Observable<CartModificationList> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .post(this.getReorderOrderEndpoint(orderId, userId), {}, { headers })
      .pipe(
        catchError((error) => {
          throw normalizeHttpError(error, this.logger);
        }),
        this.converter.pipeable(REORDER_ORDER_NORMALIZER)
      );
  }

  protected getReorderOrderEndpoint(orderCode: string, userId: string): string {
    return this.occEndpoints.buildUrl('reorder', {
      urlParams: {
        userId,
      },
      queryParams: { orderCode },
    });
  }
}
