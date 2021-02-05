import { AbstractType, Injectable, InjectionToken, Type } from '@angular/core';
import { Config, CxEvent } from '@spartacus/core';
import { TmsMapper, WindowObject } from '../model/tms.model';

/**
 * Collector configuration
 */
export interface TmsCollectorConfig {
  /** Should be enabled in development mode only */
  debug?: boolean;
  /**
   * The name for the data layer object.
   */
  dataLayerProperty?: string;
  /**
   * An optional custom mapping function used to map the event's payload
   */
  eventMapper?: Type<TmsMapper> | InjectionToken<TmsMapper>;
  /**
   * Pushes the event to the configured data layer.
   */
  pushStrategy?: <T extends CxEvent>(
    event: T | any,
    windowObject: WindowObject,
    config: TmsCollectorConfig
  ) => void;
  /**
   * Events to send to the configured TMS.
   */
  events?: AbstractType<CxEvent>[];
}

/**
 * TMS configuration
 */
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class TmsConfig {
  /**
   * Tag manager config
   */
  tagManager?: {
    /**
     * Google Tag Manager
     */
    gtm?: TmsCollectorConfig;
    /**
     * Adobe Experience Platform
     */
    aep?: TmsCollectorConfig;
    /**
     * Any custom collector
     */
    [tms: string]: TmsCollectorConfig | undefined;
  };
}
