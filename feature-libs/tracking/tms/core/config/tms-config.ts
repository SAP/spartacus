import { AbstractType, Injectable, Type } from '@angular/core';
import { Config, CxEvent } from '@spartacus/core';
import { TmsCollector } from '../model/tms.model';

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
   * Events to send to the configured TMS.
   */
  events?: AbstractType<CxEvent>[];
  /**
   * The collector service implementation.
   */
  collector?: Type<TmsCollector>;
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
