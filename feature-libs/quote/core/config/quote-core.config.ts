/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { QuoteActionType, QuoteActionsByState } from '@spartacus/quote/root';
import { Config } from '@spartacus/core';

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
    actions?: QuoteActionsConfig;
  };
}

declare module '@spartacus/core' {
  interface Config extends QuoteCoreConfig {}
}
