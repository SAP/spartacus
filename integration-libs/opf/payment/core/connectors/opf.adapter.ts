/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
} from '@spartacus/opf/payment/root';
import { Observable } from 'rxjs';

export abstract class OpfAdapter {
  /**
   * Abstract method used to verify payment
   */

  abstract verifyPayment(
    paymentSessionId: string,
    payload: OpfPaymentVerificationPayload
  ): Observable<OpfPaymentVerificationResponse>;
}
