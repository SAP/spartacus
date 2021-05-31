import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CpqConfiguratorAuthConfig {
  productConfigurator?: {
    cpq: {
      authentication: {
        /** We should stop using/sending a token shortly before expiration,
         * to avoid that it is actually expired when evaluated in the target system.
         * Time given in ms. */
        tokenExpirationBuffer: number;
        /** max time in ms to pass until a token is considered expired and re-fetched,
         * even if token expiration time is longer */
        tokenMaxValidity: number;
        /** min time to pass until a token is re-fetched, even if token expiration time is shorter */
        tokenMinValidity: number;
      };
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends CpqConfiguratorAuthConfig {}
}
