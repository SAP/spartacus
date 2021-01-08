import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class TmsConfig {
  tms?: {
    /**
     * Enables the GTM.
     */
    gtm?: boolean;
    /**
     * Enables the Adobe Launch.
     */
    adobeLaunch?: boolean;
  };
}
