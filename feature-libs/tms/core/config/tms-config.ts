import { AbstractType, Injectable } from '@angular/core';
import { Config, CxEvent, WindowRef } from '@spartacus/core';

export interface TmsCollectorConfig {
  /**
   * This function will initialize the data layer before the events start being pushed to it.
   */
  dataLayerInit?: (winRef: WindowRef) => void;
  /**
   * The function that pushes the events to the event layer
   */
  dataLayerPush?: <T extends CxEvent>(event: T, winRef: WindowRef) => void;
  /** Should be enabled in development mode only */
  debug?: boolean;
  /**
   * An array of events to send to the configured TMS.
   */
  events: AbstractType<CxEvent>[];
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
    [tms: string]: TmsCollectorConfig;
  };
}
