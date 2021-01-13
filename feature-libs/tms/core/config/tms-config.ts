import { Injectable, Type } from '@angular/core';
import { Config, CxEvent } from '@spartacus/core';

export interface TmsEventsConfig {
  enabled?: boolean;
  events?: Type<CxEvent>[];
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
