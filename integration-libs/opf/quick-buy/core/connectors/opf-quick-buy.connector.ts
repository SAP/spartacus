/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  ApplePaySessionVerificationRequest,
  ApplePaySessionVerificationResponse,
} from '@spartacus/opf/quick-buy/root';
import { Observable } from 'rxjs';
import { OpfQuickBuyAdapter } from './opf-quick-buy.adapter';

@Injectable()
export class OpfQuickBuyConnector {
  constructor(protected adapter: OpfQuickBuyAdapter) {}

  public getApplePayWebSession(
    applePayWebRequest: ApplePaySessionVerificationRequest,
    accessCode: string
  ): Observable<ApplePaySessionVerificationResponse> {
    return this.adapter.getApplePayWebSession(applePayWebRequest, accessCode);
  }
}
