/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ActiveConfiguration,
  AfterRedirectScriptResponse,
  CtaScriptsRequest,
  CtaScriptsResponse,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
  SubmitCompleteRequest,
  SubmitCompleteResponse,
  SubmitRequest,
  SubmitResponse,
} from '@spartacus/opf/base/root';
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
   * Abstract method used to get payment active configurations
   */
  abstract getActiveConfigurations(): Observable<ActiveConfiguration[]>;

  /**
   * Abstract method used to get CTA scripts list, used by QuickBuy functionality
   */
  abstract getCtaScripts(
    ctaScriptsRequest: CtaScriptsRequest
  ): Observable<CtaScriptsResponse>;
}
