import { Injectable } from '@angular/core';
import { Config, OccConfig } from '@spartacus/core';

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
    /** @see UserIdInterceptor */
    userIdInterceptor?: {
      /** List of paths (in glob pattern) that should have the header "sap-commerce-cloud-user-id" when a user is emulated. */
      patterns?: Array<string>;
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends AsmConfig {}
}
