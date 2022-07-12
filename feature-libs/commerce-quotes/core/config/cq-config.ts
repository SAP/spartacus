import { Injectable } from '@angular/core';
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
  };
}

declare module '@spartacus/core' {
  interface Config extends CQConfig {}
}
