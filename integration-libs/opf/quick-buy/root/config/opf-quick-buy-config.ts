/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import {
  OpfQuickBuyApplePayProvider,
  OpfQuickBuyGooglePayProvider,
} from '../model';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class OpfQuickBuyConfig {
  providers?: {
    googlePay: OpfQuickBuyGooglePayProvider;
    applePay: OpfQuickBuyApplePayProvider;
    [key: string]: unknown;
  };
}

declare module '@spartacus/core' {
  interface Config extends OpfQuickBuyConfig {}
}
