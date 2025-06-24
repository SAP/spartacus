import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class LcpCmsComponentsConfig {
  lcpCmsComponents?: {
    idMarker?: string;
    ids?: string[];
  };
}

declare module '@spartacus/core' {
  interface Config extends LcpCmsComponentsConfig {}
}
