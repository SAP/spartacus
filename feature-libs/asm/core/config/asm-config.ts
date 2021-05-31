import { Injectable } from '@angular/core';
import '@spartacus/core';
import { Config, OccConfig } from '@spartacus/core';

/**
 * @deprecated Use regular `Config` to access spartacus configuration
 */
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class AsmConfig extends OccConfig {
  asm?: {
    agentSessionTimer?: {
      startingDelayInSeconds?: number;
    };
    customerSearch?: {
      maxResults?: number;
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends AsmConfig {}
}
