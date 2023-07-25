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
  SubmitCompleteInput,
  SubmitInput,
} from '../model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OpfPaymentFacade,
      feature: OPF_BASE_FEATURE,
      methods: ['verifyPayment', 'submitPayment'],
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

  /**
   * abstract method to submit payment for Hosted Fields pattern.
   *
   * @param submitInput
   */
  abstract submitPayment(submitInput: SubmitInput): Observable<boolean>;

  /**
   * abstract method to submit-complete payment for Hosted Fields pattern.
   *
   * @param submitInput
   */
  abstract submitCompletePayment(
    submitCompleteInput: SubmitCompleteInput
  ): Observable<boolean>;
}
