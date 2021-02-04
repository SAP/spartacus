import { CxEvent } from '@spartacus/core';
import { WindowObject } from '../model/tms.model';
import { TmsCollectorConfig, TmsConfig } from './tms-config';

export const defaultGtmPushStrategy = <T extends CxEvent>(
  event: T | any,
  windowObject: WindowObject,
  config: TmsCollectorConfig
): void => {
  const dataLayerProperty = config.dataLayerProperty ?? 'dataLayer';
  windowObject[dataLayerProperty] = windowObject[dataLayerProperty] ?? [];
  windowObject[dataLayerProperty].push(event);
};

export const defaultGoogleTagManagerConfig: TmsConfig = {
  tagManager: {
    gtm: {
      pushStrategy: defaultGtmPushStrategy,
    },
  },
};
