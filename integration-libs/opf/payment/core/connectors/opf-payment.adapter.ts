/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  OpfPaymentAfterRedirectScriptResponse,
  OpfPaymentInitiationConfig,
  OpfPaymentSessionData,
  OpfPaymentSubmitCompleteResponse,
  OpfPaymentSubmitRequest,
  OpfPaymentSubmitResponse,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
} from '@spartacus/opf/payment/root';
import { Observable } from 'rxjs';

export abstract class OpfPaymentAdapter {
  /**
   * Abstract method to verify a response from PSP for Full Page Redirect
   * and iframe integration patterns.
   *
   */
  abstract verifyPayment(
    paymentSessionId: string,
    payload: OpfPaymentVerificationPayload
  ): Observable<OpfPaymentVerificationResponse>;

  /**
   * Abstract method used to submit payment for hosted-fields pattern.
   *
   */
  abstract submitPayment(
    submitRequest: OpfPaymentSubmitRequest,
    otpKey: string,
    paymentSessionId: string
  ): Observable<OpfPaymentSubmitResponse>;

  /**
   * Abstract method to submit-complete payment
   * for Hosted Fields pattern.
   *
   */
  abstract submitCompletePayment(
    submitRequest: OpfPaymentSubmitRequest,
    otpKey: string,
    paymentSessionId: string
  ): Observable<OpfPaymentSubmitCompleteResponse>;

  /**
   * Abstract method to retrieve the dynamic scripts after redirect
   * used in hosted-fields pattern.
   *
   */
  abstract getAfterRedirectScripts(
    paymentSessionId: string
  ): Observable<OpfPaymentAfterRedirectScriptResponse>;

  /**
   * Abstract method used to initiate payment session
   * or call the PSP to initiate.
   *
   */
  abstract initiatePayment(
    paymentConfig: OpfPaymentInitiationConfig
  ): Observable<OpfPaymentSessionData>;
}
