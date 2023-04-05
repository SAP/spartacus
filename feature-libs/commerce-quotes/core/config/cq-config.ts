/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  QuoteActionType,
  QuoteActionsByState,
} from '@spartacus/commerce-quotes/root';
import { Config } from '@spartacus/core';

export interface CommerceQuotesTresholdsConfig {
  /** Value above which seller approval is required */
  sellerAutoApproval: number;
  /** Minimal value required to submit a quote */
  requestInitiation: number;
}

export interface CommerceQuotesActionsConfig {
  /** Actions that should be presented in template as primary */
  primaryActions?: QuoteActionType[];
  /** Order of action rendering based on quote state */
  actionsOrderByState?: Partial<QuoteActionsByState>;
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CQConfig {
  /**
   * Commerce quotes config
   */
  commerceQuotes?: {
    tresholds?: CommerceQuotesTresholdsConfig;
    actions?: CommerceQuotesActionsConfig;
  };
}

declare module '@spartacus/core' {
  interface Config extends CQConfig {}
}
