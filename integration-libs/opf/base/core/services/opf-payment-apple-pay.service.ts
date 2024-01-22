/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { UserIdService } from '@spartacus/core';
import {
  ApplePaySessionVerificationRequest,
  ApplePaySessionVerificationResponse,
  OpfOtpFacade,
} from '@spartacus/opf/base/root';
import { Observable, combineLatest } from 'rxjs';
import { concatMap, filter, switchMap, take } from 'rxjs/operators';
import { OpfPaymentConnector } from '../connectors';

@Injectable({ providedIn: 'root' })
export class OpfPaymentApplePayService {
  protected opfOtpFacade = inject(OpfOtpFacade);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected userIdService = inject(UserIdService);
  protected opfPaymentConnector = inject(OpfPaymentConnector);

  getApplePayWebSession(
    applePayWebSessionRequest: ApplePaySessionVerificationRequest
  ): Observable<ApplePaySessionVerificationResponse> {
    return combineLatest([
      this.userIdService.getUserId(),
      this.activeCartFacade.getActiveCartId(),
    ]).pipe(
      filter(
        ([userId, activeCartId]: [string, string]) => !!activeCartId && !!userId
      ),
      switchMap(([userId, activeCartId]: [string, string]) => {
        return this.opfOtpFacade.generateOtpKey(userId, activeCartId);
      }),
      filter((response) => Boolean(response?.accessCode)),
      take(1),
      concatMap(({ accessCode: otpKey }) => {
        return this.opfPaymentConnector.getApplePayWebSession(
          applePayWebSessionRequest,
          otpKey
        );
      })
    );
  }
}
