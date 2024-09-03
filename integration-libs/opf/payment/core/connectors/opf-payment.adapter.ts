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
   * Abstract method used to verify payment
   */

  abstract verifyPayment(
    paymentSessionId: string,
    payload: OpfPaymentVerificationPayload
  ): Observable<OpfPaymentVerificationResponse>;

  /**
   * Abstract method used to submit payment for hosted-fields pattern
   */

  abstract submitPayment(
    submitRequest: SubmitRequest,
    otpKey: string,
    paymentSessionId: string
  ): Observable<SubmitResponse>;

  /**
   * Abstract method used to submit-complete payment for hosted-fields pattern
   */

  abstract submitCompletePayment(
    submitRequest: SubmitCompleteRequest,
    otpKey: string,
    paymentSessionId: string
  ): Observable<SubmitCompleteResponse>;

  /**
   * Abstract method used to get AfterRedirect scripts used in hosted-fields pattern
   */
  abstract afterRedirectScripts(
    paymentSessionId: string
  ): Observable<AfterRedirectScriptResponse>;

  /**
   * Abstract method used to initiate payment session
   * or call the PSP to initiate.
   *
   * @param {PaymentInitiationConfig} paymentConfig
   *
   */
  abstract initiatePayment(
    paymentConfig: PaymentInitiationConfig
  ): Observable<PaymentSessionData>;
}
