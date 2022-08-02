import { Injectable } from '@angular/core';
import {
  QuoteAction,
  QuoteActionsByState,
} from '@spartacus/commerce-quotes/root';
import { Config } from '@spartacus/core';

export interface CommerceQuotesTresholdsConfig {
  /** Value above which seller approval is required */
  sellerAutoApproval: number;
  /** Minimal value required to submit a quote */
  requestInitiation: number;
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
    primaryActions?: QuoteAction[];
    actionsOrderByState?: Partial<QuoteActionsByState>;
  };
}

declare module '@spartacus/core' {
  interface Config extends CQConfig {}
}
