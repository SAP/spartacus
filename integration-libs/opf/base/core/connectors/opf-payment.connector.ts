/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  ActiveConfiguration,
  AfterRedirectScriptResponse,
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
  SubmitCompleteRequest,
  SubmitCompleteResponse,
  SubmitRequest,
  SubmitResponse,
} from '@spartacus/opf/base/root';

import { Observable } from 'rxjs';
import { OpfPaymentAdapter } from './opf-payment.adapter';

@Injectable()
export class OpfPaymentConnector {
  constructor(protected adapter: OpfPaymentAdapter) {}

  public verifyPayment(
    paymentSessionId: string,
    payload: OpfPaymentVerificationPayload
  ): Observable<OpfPaymentVerificationResponse> {
    return this.adapter.verifyPayment(paymentSessionId, payload);
  }

  public submitPayment(
    submitRequest: SubmitRequest,
    otpKey: string,
    paymentSessionId: string
  ): Observable<SubmitResponse> {
    return this.adapter.submitPayment(submitRequest, otpKey, paymentSessionId);
  }

  public submitCompletePayment(
    submitCompleteRequest: SubmitCompleteRequest,
    otpKey: string,
    paymentSessionId: string
  ): Observable<SubmitCompleteResponse> {
    return this.adapter.submitCompletePayment(
      submitCompleteRequest,
      otpKey,
      paymentSessionId
    );
  }

  public afterRedirectScripts(
    paymentSessionId: string
  ): Observable<AfterRedirectScriptResponse> {
    return this.adapter.afterRedirectScripts(paymentSessionId);
  }

  public getActiveConfigurations(): Observable<ActiveConfiguration[]> {
    return this.adapter.getActiveConfigurations();
  }
}
