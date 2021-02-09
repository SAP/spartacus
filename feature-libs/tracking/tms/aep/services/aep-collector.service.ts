import { Injectable } from '@angular/core';
import { CxEvent } from '@spartacus/core';
import {
  TmsCollector,
  TmsCollectorConfig,
  WindowObject,
} from '@spartacus/tracking/tms/core';

/**
 * Default Adobe Experience Platform collector.
 */
@Injectable({ providedIn: 'root' })
export class AepCollectorService implements TmsCollector {
  /**
   * If the `TmsCollectorConfig.dataLayerProperty` is not specified, it uses the default `digitalData`
   */
  init(config: TmsCollectorConfig, windowObject: WindowObject): void {
    const dataLayerProperty = config.dataLayerProperty ?? 'digitalData';
    windowObject[dataLayerProperty] = windowObject[dataLayerProperty] ?? {};
  }

  pushEvent<T extends CxEvent>(
    config: TmsCollectorConfig,
    windowObject: WindowObject,
    event: T | any
  ): void {
    const dataLayerProperty = config.dataLayerProperty ?? 'digitalData';
    windowObject[dataLayerProperty] = {
      ...windowObject[dataLayerProperty],
      ...event,
    };
  }
}
