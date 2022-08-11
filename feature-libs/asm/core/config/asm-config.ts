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
    customer360?: {
      activityTab?: {
        pageSize?: number;
      };
      feedbackTab?: {
        supportTickets?: {
          pageSize?: number;
        };
        productReviews?: {
          pageSize?: number;
        };
      };
      mapsTab?: {
        pageSize?: number;
      };
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends AsmConfig {}
}
