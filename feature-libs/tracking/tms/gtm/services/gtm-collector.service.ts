import { Injectable } from '@angular/core';
import { CxEvent } from '@spartacus/core';
import {
  TmsCollector,
  TmsCollectorConfig,
  WindowObject,
} from '@spartacus/tracking/tms/core';

/**
 * Default Google Tag Manager collector.
 */
@Injectable({ providedIn: 'root' })
export class GtmCollectorService implements TmsCollector {
  /**
   * If the `TmsCollectorConfig.dataLayerProperty` is not specified, it uses the default `dataLayer`
   */
  init(config: TmsCollectorConfig, windowObject: WindowObject): void {
    const dataLayerProperty = config.dataLayerProperty ?? 'dataLayer';
    windowObject[dataLayerProperty] = windowObject[dataLayerProperty] ?? [];
  }

  pushEvent<T extends CxEvent>(
    config: TmsCollectorConfig,
    windowObject: WindowObject,
    event: T | any
  ): void {
    const dataLayerProperty = config.dataLayerProperty ?? 'dataLayer';
    windowObject[dataLayerProperty].push(event);
  }
}
