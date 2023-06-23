/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OPF_BASE_FEATURE } from '../feature-name';
import {
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
  SubmitCompleteRequest,
  SubmitCompleteResponse,
  SubmitInput,
  SubmitRequest,
  SubmitResponse,
} from '../model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OpfPaymentFacade,
      feature: OPF_BASE_FEATURE,
      methods: [
        'verifyPayment',
        'submitPayment',
        'submitPayment2',
        'submitCompletePayment',
      ],
    }),
})
export abstract class OpfPaymentFacade {
  /**
   * Endpoint to verify a response from PSP for Full Page Redirect and iFrame integration patterns.
   *
   * @param paymentSessionId
   * @param paymentVerificationPayload
   */
  abstract verifyPayment(
    paymentSessionId: string,
    paymentVerificationPayload: OpfPaymentVerificationPayload
  ): Observable<OpfPaymentVerificationResponse>;

  abstract submitPayment(
    submitRequest: SubmitRequest
  ): Observable<SubmitResponse>;

  abstract submitPayment2(submitRequest: SubmitInput): Observable<boolean>;

  abstract submitCompletePayment(
    submitCompleteRequest: SubmitCompleteRequest
  ): Observable<SubmitCompleteResponse>;
}
