/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OPF_QUICK_BUY_FEATURE } from '../feature-name';
import {
  ApplePaySessionVerificationRequest,
  ApplePaySessionVerificationResponse,
} from '../model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OpfQuickBuyFacade,
      feature: OPF_QUICK_BUY_FEATURE,
      methods: ['getApplePayWebSession'],
    }),
})
export abstract class OpfQuickBuyFacade {
  /**
   * Abstract method to get ApplePay session for QuickBuy.
   *
   * @param applePayWebSessionRequest
   */
  abstract getApplePayWebSession(
    applePayWebSessionRequest: ApplePaySessionVerificationRequest
  ): Observable<ApplePaySessionVerificationResponse>;
}
