/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  OpfPaymentVerificationPayload,
  OpfPaymentVerificationResponse,
} from 'integration-libs/opf/base/root/public_api';
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
