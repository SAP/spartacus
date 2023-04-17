/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ActiveConfiguration,
  OpfVerifyPaymentPayload,
  OpfVerifyPaymentResponse,
  PaymentInitiationConfig,
  PaymentSessionData,
} from '@spartacus/opf/root';

import { Observable } from 'rxjs';

export abstract class OpfAdapter {
  /**
   * Abstract method used to get checkout payment
   * active configurations
   */
  abstract getActiveConfigurations(): Observable<ActiveConfiguration[]>;
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

  abstract getVerifyPayment(
    paymentSessionId: string,
    payload: OpfVerifyPaymentPayload
  ): Observable<OpfVerifyPaymentResponse>;
}
