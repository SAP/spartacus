/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
} from '@spartacus/opf/payment/root';

import { Observable } from 'rxjs';
import { OpfAdapter } from './opf.adapter';

@Injectable()
export class OpfPaymentConnector {
  constructor(protected adapter: OpfAdapter) {}

  public verifyPayment(
    paymentSessionId: string,
    payload: OpfPaymentVerificationPayload
  ): Observable<OpfPaymentVerificationResponse> {
    return this.adapter.verifyPayment(paymentSessionId, payload);
  }
}
