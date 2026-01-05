/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ApplePaySessionVerificationRequest,
  ApplePaySessionVerificationResponse,
} from '@spartacus/opf/quick-buy/root';
import { Observable } from 'rxjs';

export abstract class OpfQuickBuyAdapter {
  /**
   * Abstract method used to request an ApplePay session, used by QuickBuy functionality
   */
  abstract getApplePayWebSession(
    applePayRequest: ApplePaySessionVerificationRequest,
    otpKey: string
  ): Observable<ApplePaySessionVerificationResponse>;
}
