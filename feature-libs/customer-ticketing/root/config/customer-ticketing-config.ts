import { Injectable } from '@angular/core';
import { Config, OccConfig } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CustomerTicketingConfig extends OccConfig {
  customerTicketing?: {
    agentSessionTimer?: {
      startingDelayInSeconds?: number;
    };
    attachmentRestrictions?: {
      maxSize?: number;
      maxEntries?: number;
      allowedTypes?: string[];
    };
    inputCharactersLimit?: number;
    inputCharactersLimitForSubject?: number;
  };
}

declare module '@spartacus/core' {
  interface Config extends CustomerTicketingConfig {}
}
