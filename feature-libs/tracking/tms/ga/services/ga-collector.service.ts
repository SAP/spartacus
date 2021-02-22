import { Injectable } from '@angular/core';
import { CxEvent } from '@spartacus/core';
import {
  TmsCollector,
  TmsCollectorConfig,
  WindowObject,
} from '@spartacus/tracking/tms/core';

/**
 * Default Google Analytics collector.
 */
@Injectable({ providedIn: 'root' })
export class GaCollectorService implements TmsCollector {
  /**
   * If the `TmsCollectorConfig.dataLayerProperty` is not specified, it uses the default `dataLayer`
   */
  init(config: TmsCollectorConfig, windowObject: WindowObject): void {
    const dataLayerProperty = config.dataLayerProperty ?? 'dataLayer';
    windowObject[dataLayerProperty] = windowObject[dataLayerProperty] ?? [];

    windowObject['gtag'] =
      windowObject['gtag'] ??
      function gtag() {
        windowObject[dataLayerProperty].push(arguments);
      };
  }

  pushEvent<T extends CxEvent>(
    _config: TmsCollectorConfig,
    windowObject: WindowObject,
    event: T | any
  ): void {
    windowObject['gtag'](event);
  }
}
