import { Injectable } from '@angular/core';
import { CxEvent, ScriptLoader } from '@spartacus/core';
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
  constructor(protected scriptLoader: ScriptLoader) {}
  /**
   * If the `TmsCollectorConfig.dataLayerProperty` is not specified, it uses the default `digitalData`
   */
  init(config: TmsCollectorConfig, windowObject: WindowObject): void {
    const dataLayerProperty = config.dataLayerProperty ?? 'digitalData';
    windowObject[dataLayerProperty] = windowObject[dataLayerProperty] ?? {};

    if (config.scriptUrl) {
      this.scriptLoader.embedScript({ src: config.scriptUrl });
    }
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
