import { CxEvent } from '@spartacus/core';
import { WindowObject } from '../model/tms.model';
import { TmsCollectorConfig, TmsConfig } from './tms-config';

export const defaultAepPushStrategy = <T extends CxEvent>(
  event: T | any,
  windowObject: WindowObject,
  config: TmsCollectorConfig
): void => {
  const dataLayerProperty = config.dataLayerProperty ?? 'digitalData';
  windowObject[dataLayerProperty] = {
    ...windowObject[dataLayerProperty],
    ...event,
  };
};

export const defaultAdobeLaunchConfig: TmsConfig = {
  tagManager: {
    aep: {
      pushStrategy: defaultAepPushStrategy,
    },
  },
};
