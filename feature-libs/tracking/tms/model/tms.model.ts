import { InjectionToken } from '@angular/core';
import { CxEvent } from '@spartacus/core';

/**
 * Window object enriched with a custom property.
 * Intended to be used for specifying the data layer name.
 */
export interface WindowObject extends Window {
  [prop: string]: any;
}

/**
 * Interface that a class can implement in order to recognized as a TMS mapper.
 */
export interface TmsMapper {
  map<T extends CxEvent>(event: T): T | object;
}

export const TMS_MAPPER = new InjectionToken<TmsMapper>(
  'tms-mapper-injection-token'
);
