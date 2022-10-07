import { Injectable } from '@angular/core';
import { Config, OccConfig } from '@spartacus/core';

import { AsmCustomer360TabsConfig } from '../models/customer-360-tabs-config';

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
    customer360?: AsmCustomer360TabsConfig;
  };
}

declare module '@spartacus/core' {
  interface Config extends AsmConfig {}
}
