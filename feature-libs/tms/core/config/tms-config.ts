import { Injectable } from '@angular/core';
import { Config, Event } from '@spartacus/core';

export interface TmsEventsConfig {
  enabled?: boolean;
  events?: Event[];
}

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
