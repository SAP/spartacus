import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CpqConfiguratorEndpointConfig {
  backend: {
    cpq: {
      endpoints: {
        configurationInit: string;
        configurationDisplay: string;
        attributeUpdate: string;
        valueUpdate: string;
      };
      prefix: string;
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends CpqConfiguratorEndpointConfig {}
}
