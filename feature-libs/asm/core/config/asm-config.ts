import { Injectable } from '@angular/core';
import { Config, OccConfig } from '@spartacus/core';

import { AsmCustomer360TabConfig } from '../models/customer-360-config';

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
    customer360?: {
      tabs?: Array<AsmCustomer360TabConfig>;
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends AsmConfig {}
}
