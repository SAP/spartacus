import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class PersonalizationConfig {
  personalization?: {
    enabled?: boolean;
    httpHeaderName?: {
      id: string;
      timestamp: string;
    };
    context?: {
      slotPosition: string;
      componentId: string;
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends PersonalizationConfig {}
}
