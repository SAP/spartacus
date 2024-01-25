/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OPF_BASE_FEATURE } from '../feature-name';
import {
  ActiveConfiguration,
  AfterRedirectScriptResponse,
  ApplePaySessionVerificationRequest,
  ApplePaySessionVerificationResponse,
  CtaScriptsRequest,
  CtaScriptsResponse,
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
      methods: [
        'verifyPayment',
        'submitPayment',
        'submitCompletePayment',
        'afterRedirectScripts',
        'getActiveConfigurationsState',
        'getCtaScripts',
        'getApplePayWebSession',
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

  /**
   * abstract method to submit payment for Hosted Fields pattern.
   *
   * @param submitInput
   */
  abstract submitPayment(submitInput: SubmitInput): Observable<boolean>;

  /**
   * abstract method to submit-complete payment for Hosted Fields pattern.
   *
   * @param submitCompleteInput
   */
  abstract submitCompletePayment(
    submitCompleteInput: SubmitCompleteInput
  ): Observable<boolean>;

  /**
   * abstract method to submit-complete payment for Hosted Fields pattern.
   *
   * @param submitCompleteInput
   */
  abstract afterRedirectScripts(
    paymentSessionId: string
  ): Observable<AfterRedirectScriptResponse>;

  /**
   * Get payment active configurations
   */
  abstract getActiveConfigurationsState(): Observable<
    QueryState<ActiveConfiguration[] | undefined>
  >;

  abstract getCtaScripts(
    ctaScriptsRequest: CtaScriptsRequest
  ): Observable<CtaScriptsResponse>;

  /**
   * abstract method to get Apple Pay session for QuickBuy.
   *
   * @param applePayWebSessionRequest
   */
  abstract getApplePayWebSession(
    applePayWebSessionRequest: ApplePaySessionVerificationRequest
  ): Observable<ApplePaySessionVerificationResponse>;
}
