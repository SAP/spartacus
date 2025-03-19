/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OPF_PAYMENT_FEATURE } from '../feature-name';
import {
  OpfPaymentAfterRedirectScriptResponse,
  OpfPaymentInitiationConfig,
  OpfPaymentSessionData,
  OpfPaymentSubmitCompleteInput,
  OpfPaymentSubmitInput,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
} from '../model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OpfPaymentFacade,
      feature: OPF_PAYMENT_FEATURE,
      methods: [
        'verifyPayment',
        'submitPayment',
        'submitCompletePayment',
        'getAfterRedirectScripts',
        'initiatePayment',
      ],
    }),
})
export abstract class OpfPaymentFacade {
  /**
   * Abstract method to verify a response from PSP for Full Page Redirect
   * and iframe integration patterns.
   *
   * @param {string} paymentSessionId
   * @param {OpfPaymentVerificationPayload} paymentVerificationPayload
   *
   */
  abstract verifyPayment(
    paymentSessionId: string,
    paymentVerificationPayload: OpfPaymentVerificationPayload
  ): Observable<OpfPaymentVerificationResponse>;

  /**
   * Abstract method to submit payment for Hosted Fields pattern.
   *
   * @param {OpfPaymentSubmitInput} submitInput
   *
   */
  abstract submitPayment(
    submitInput: OpfPaymentSubmitInput
  ): Observable<boolean>;

  /**
   * Abstract method to submit-complete payment
   * for Hosted Fields pattern.
   *
   * @param {OpfPaymentSubmitCompleteInput} submitCompleteInput
   *
   */
  abstract submitCompletePayment(
    submitCompleteInput: OpfPaymentSubmitCompleteInput
  ): Observable<boolean>;

  /**
   * Abstract method to retrieve the dynamic scripts after redirect
   * used in hosted-fields pattern.
   *
   * @param {string} paymentSessionId
   *
   */
  abstract getAfterRedirectScripts(
    paymentSessionId: string
  ): Observable<OpfPaymentAfterRedirectScriptResponse>;

  /**
   * Abstract method used to initiate payment session
   * or call the PSP to initiate.
   *
   * @param {OpfPaymentInitiationConfig} paymentConfig
   *
   */
  abstract initiatePayment(
    paymentConfig: OpfPaymentInitiationConfig
  ): Observable<OpfPaymentSessionData>;
}
