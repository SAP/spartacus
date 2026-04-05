/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  LoggerService,
  OccEndpointsService,
  backOff,
  isJaloError,
  tryNormalizeHttpError,
} from '@spartacus/core';
import {
  OpfGiftCardBalanceRequest,
  OpfGiftCardResponse,
} from '@spartacus/opf/gift-card/root';

import { Observable } from 'rxjs';
import { OccCartAdapter } from '@spartacus/cart/base/occ';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OccOpfGiftCardAdapter extends OccCartAdapter {
  protected logger = inject(LoggerService);
  protected occEndpoints = inject(OccEndpointsService);
  protected http = inject(HttpClient);
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  applyGiftCard(
    userId: string,
    cartId: string,
    request: OpfGiftCardBalanceRequest
  ): Observable<OpfGiftCardResponse> {
    return this.http
      .post<OpfGiftCardResponse>(
        this.getApplyGiftCardEndpoint(userId, cartId),
        request,
        { headers: this.headers }
      )
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
        backOff({ shouldRetry: isJaloError })
      );
  }

  removeGiftCard(
    userId: string,
    cartId: string,
    giftCardId: string
  ): Observable<void> {
    const url = this.getRemoveGiftCardEndpoint(userId, cartId, giftCardId);
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      }),
      backOff({ shouldRetry: isJaloError })
    );
  }

  protected getApplyGiftCardEndpoint(userId: string, cartId: string): string {
    return this.occEndpoints.buildUrl('applyGiftCard', {
      urlParams: { userId, cartId },
    });
  }

  protected getRemoveGiftCardEndpoint(
    userId: string,
    cartId: string,
    giftCardId: string
  ): string {
    return this.occEndpoints.buildUrl('removeGiftCard', {
      urlParams: { userId, cartId, giftCardId },
    });
  }
}
