import { AbstractType, Injectable } from '@angular/core';
import { Config, CxEvent } from '@spartacus/core';

/**
 * TMS configuration.
 */
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class TmsConfig {
  tms?: {
    /**
     * GTM configuration.
     */
    gtm?: {
      /** Should be enabled in development mode only */
      debug?: boolean;
      /**
       * An array of events to send to the configured TMS.
       */
      events?: AbstractType<CxEvent>[];
    };
    /**
     * Adobe Launch configuration.
     */
    adobeLaunch?: {
      /** Should be enabled in development mode only */
      debug?: boolean;
      /**
       * An array of events to send to the configured TMS.
       */
      events?: AbstractType<CxEvent>[];
    };
  };
}
