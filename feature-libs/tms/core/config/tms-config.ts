import { Injectable, Type } from '@angular/core';
import { Config, CxEvent } from '@spartacus/core';

export interface TmsEventsConfig {
  /**
   * An array of events to send to the configured TMS.
   */
  events?: Type<CxEvent>[];
}

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
    gtm?: TmsEventsConfig;
    /**
     * Adobe Launch configuration.
     */
    adobeLaunch?: TmsEventsConfig;
  };
}
