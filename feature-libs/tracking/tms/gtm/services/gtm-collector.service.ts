import { Injectable } from '@angular/core';
import { CxEvent, ScriptLoader } from '@spartacus/core';
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
  constructor(protected scriptLoader: ScriptLoader) {}
  /**
   * If the `TmsCollectorConfig.dataLayerProperty` is not specified, it uses the default `dataLayer`
   */
  init(config: TmsCollectorConfig, windowObject: WindowObject): void {
    const dataLayerProperty = config.dataLayerProperty ?? 'dataLayer';
    windowObject[dataLayerProperty] = windowObject[dataLayerProperty] ?? [];

    this.pushEvent(config, windowObject, {
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });

    if (config.script) {
      const src = `${config.script.url}&l=${dataLayerProperty}`;
      this.scriptLoader.embedScript({ src });
    }
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
