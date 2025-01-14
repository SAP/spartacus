/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  OpfPaymentAfterRedirectScriptResponse,
  OpfPaymentInitiationConfig,
  OpfPaymentSessionData,
  OpfPaymentSubmitCompleteRequest,
  OpfPaymentSubmitCompleteResponse,
  OpfPaymentSubmitRequest,
  OpfPaymentSubmitResponse,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
} from '@spartacus/opf/payment/root';

import { Observable } from 'rxjs';
import { OpfPaymentAdapter } from './opf-payment.adapter';

@Injectable()
export class OpfPaymentConnector {
  protected adapter = inject(OpfPaymentAdapter);

  public verifyPayment(
    paymentSessionId: string,
    payload: OpfPaymentVerificationPayload
  ): Observable<OpfPaymentVerificationResponse> {
    return this.adapter.verifyPayment(paymentSessionId, payload);
  }

  public submitPayment(
    submitRequest: OpfPaymentSubmitRequest,
    otpKey: string,
    paymentSessionId: string
  ): Observable<OpfPaymentSubmitResponse> {
    return this.adapter.submitPayment(submitRequest, otpKey, paymentSessionId);
  }

  public submitCompletePayment(
    submitCompleteRequest: OpfPaymentSubmitCompleteRequest,
    otpKey: string,
    paymentSessionId: string
  ): Observable<OpfPaymentSubmitCompleteResponse> {
    return this.adapter.submitCompletePayment(
      submitCompleteRequest,
      otpKey,
      paymentSessionId
    );
  }

  public getAfterRedirectScripts(
    paymentSessionId: string
  ): Observable<OpfPaymentAfterRedirectScriptResponse> {
    return this.adapter.getAfterRedirectScripts(paymentSessionId);
  }

  public initiatePayment(
    paymentConfig: OpfPaymentInitiationConfig
  ): Observable<OpfPaymentSessionData> {
    return this.adapter.initiatePayment(paymentConfig);
  }
}
