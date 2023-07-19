/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { QuoteActionType, QuoteActionsByState } from '@spartacus/quote/root';
import { Config } from '@spartacus/core';

//TODO CHHI: Delete when decision has been taken about quote request dialog
// export interface QuoteTresholdsConfig {
//
//   /** Value above which seller approval is required */
//   sellerAutoApproval: number;
//
//   /** Minimal value required to submit a quote */
//   requestInitiation: number;
// }

export interface QuoteActionsConfig {
  /** Actions that should be presented in template as primary */
  primaryActions?: QuoteActionType[];
  /** Order of action rendering based on quote state */
  actionsOrderByState?: Partial<QuoteActionsByState>;
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class QuoteCoreConfig {
  /**
   * Commerce quotes config
   */
  quote?: {
    //tresholds?: QuoteTresholdsConfig;
    actions?: QuoteActionsConfig;
  };
}

declare module '@spartacus/core' {
  interface Config extends QuoteCoreConfig {}
}
