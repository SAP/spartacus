/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CheckoutFiscalIdAdapter } from '@spartacus/checkout/base/core';
import {
  FiscalId,
  LoggerService,
  OccEndpointsService,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccCheckoutFiscalIdAdapter implements CheckoutFiscalIdAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected logger: LoggerService
  ) {}

  setFiscalId(
    userId: string,
    cartId: string,
    fiscalId: FiscalId
  ): Observable<unknown> {
    return this.http
      .put(
        this.occEndpoints.buildUrl('setCartFiscalId', {
          urlParams: { userId, cartId },
        }),
        fiscalId
      )
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        })
      );
  }
}
