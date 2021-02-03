import { AbstractType, Injectable } from '@angular/core';
import { Config, CxEvent } from '@spartacus/core';
import { WindowLike } from '../model/tms.model';

/**
 * Collector configuration
 */
export interface TmsCollectorConfig {
  /** Should be enabled in development mode only */
  debug?: boolean;
  /**
   * An optional custom mapping function used to map the event's payload
   */
  eventMapper?: <T extends CxEvent>(event: T) => T | any;
  /**
   * Pushes the event to the configured data layer.
   */
  pushStrategy?: <T extends CxEvent>(
    event: T | any,
    windowLike: WindowLike
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
  tms?: {
    [tms: string]: TmsCollectorConfig;
  };
}
