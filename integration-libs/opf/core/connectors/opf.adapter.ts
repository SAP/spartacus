/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ActiveConfiguration,
  OpfVerifyPaymentPayload,
  OpfVerifyPaymentResponse,
} from '@spartacus/opf/root';
import { Observable } from 'rxjs';

export abstract class OpfAdapter {
  /**
   * Abstract method used to get checkout payment
   * active configurations
   */

  abstract getActiveConfigurations(): Observable<ActiveConfiguration[]>;
  abstract getVerifyPayment(
    paymentSessionId: string,
    payload: OpfVerifyPaymentPayload
  ): Observable<OpfVerifyPaymentResponse>;
}
