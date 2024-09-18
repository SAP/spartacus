/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AfterRedirectScriptResponse,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
  PaymentInitiationConfig,
  PaymentSessionData,
  SubmitCompleteRequest,
  SubmitCompleteResponse,
  SubmitRequest,
  SubmitResponse,
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
    submitRequest: SubmitRequest,
    otpKey: string,
    paymentSessionId: string
  ): Observable<SubmitResponse>;

  /**
   * Abstract method to submit-complete payment
   * for Hosted Fields pattern.
   *
   */
  abstract submitCompletePayment(
    submitRequest: SubmitCompleteRequest,
    otpKey: string,
    paymentSessionId: string
  ): Observable<SubmitCompleteResponse>;

  /**
   * Abstract method to retrieve the dynamic scripts after redirect
   * used in hosted-fields pattern.
   *
   */
  abstract afterRedirectScripts(
    paymentSessionId: string
  ): Observable<AfterRedirectScriptResponse>;

  /**
   * Abstract method used to initiate payment session
   * or call the PSP to initiate.
   *
   */
  abstract initiatePayment(
    paymentConfig: PaymentInitiationConfig
  ): Observable<PaymentSessionData>;
}
