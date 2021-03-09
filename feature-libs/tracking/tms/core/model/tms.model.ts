import { CxEvent } from '@spartacus/core';
import { TmsCollectorConfig } from '../config/tms-config';

/**
 * Window object enriched with a custom property.
 * Intended to be used for specifying the data layer name.
 */
export interface WindowObject extends Window {
  [prop: string]: any;
}

/**
 * Interface that a class can implement in order to be recognized as a TMS collector.
 */
export interface TmsCollector {
  /**
   * Initializes the data layer.
   */
  init(config: TmsCollectorConfig, windowObject: WindowObject): void;

  /**
   * Pushes the provided event to the data layer.
   */
  pushEvent<T extends CxEvent>(
    config: TmsCollectorConfig,
    windowObject: WindowObject,
    event: T | any
  ): void;

  /**
   * Maps the Spartacus event to another object.
   */
  map?<T extends CxEvent>(event: T): T | object;
}
