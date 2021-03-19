import { Injectable } from '@angular/core';
import { CxEvent, WindowRef } from '@spartacus/core';
import {
  TmsCollector,
  TmsCollectorConfig,
  WindowObject,
} from '@spartacus/tracking/tms/core';
import { GtmCollectorConfig } from '../config/default-gtm.config';

/**
 * Default Google Tag Manager collector.
 */
@Injectable({ providedIn: 'root' })
export class GtmCollectorService implements TmsCollector {
  constructor(protected winRef: WindowRef) {}
  /**
   * If the `TmsCollectorConfig.dataLayerProperty` is not specified, it uses the default `dataLayer`
   */
  init(config: GtmCollectorConfig, windowObject: WindowObject): void {
    const dataLayerProperty = config.dataLayerProperty ?? 'dataLayer';
    windowObject[dataLayerProperty] = windowObject[dataLayerProperty] ?? [];

    if (config.gtmId) {
      (function (
        w: WindowObject,
        d: Document,
        s: string,
        l: string,
        i: string
      ) {
        w[l] = w[l] || [];
        w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        const f = d.getElementsByTagName(s)[0];
        const j = d.createElement(s) as HTMLScriptElement;
        const dl = l !== 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode?.insertBefore(j, f);
      })(
        windowObject,
        this.winRef.document,
        'script',
        dataLayerProperty,
        config.gtmId
      );
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
