/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { UserIdService, backOff } from '@spartacus/core';
import {
  ApplePaySessionVerificationRequest,
  ApplePaySessionVerificationResponse,
  OpfCartFacade,
} from '@spartacus/opf/base/root';
import { Observable, combineLatest, throwError } from 'rxjs';
import { catchError, concatMap, filter, switchMap, take } from 'rxjs/operators';
import { OpfPaymentConnector } from '../connectors';
import {
  isAuthorizationError,
  opfAuthorizationErrorRetry,
} from '../utils/opf-occ-http-error-handlers';

@Injectable({ providedIn: 'root' })
export class OpfPaymentApplePayService {
  protected opfCartFacade = inject(OpfCartFacade);
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
        return this.opfCartFacade.generateOtpKey(userId, activeCartId);
      }),
      filter((response) => Boolean(response?.accessCode)),
      take(1),
      concatMap(({ accessCode: otpKey }) => {
        return this.opfPaymentConnector.getApplePayWebSession(
          applePayWebSessionRequest,
          otpKey
        );
      }),
      catchError((error) => throwError(error)),
      backOff({
        /**
         * We should retry this sequence only if the error is an authorization error.
         * It means that `accessCode` (OTP signature) is not valid or expired and we need to refresh it.
         */
        shouldRetry: isAuthorizationError,
        maxTries: opfAuthorizationErrorRetry,
      })
    );
  }
}
