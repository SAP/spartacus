/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OPF_FEATURE } from '../feature-name';
import {
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
  PaymentInitiationConfig,
  PaymentSessionData,
} from '../model';
import { ActiveConfiguration } from '../model/opf-checkout.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OpfCheckoutFacade,
      feature: OPF_FEATURE,
      methods: [
        'getActiveConfigurationsState',
        'verifyPayment',
        'initiatePayment',
      ],
      async: true,
    }),
})
export abstract class OpfCheckoutFacade {
  /**
   * Get checkout payment active configurations
   */
  abstract getActiveConfigurationsState(): Observable<
    QueryState<ActiveConfiguration[] | undefined>
  >;

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
}
