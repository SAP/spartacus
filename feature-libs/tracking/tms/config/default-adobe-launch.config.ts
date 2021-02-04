import { CxEvent } from '@spartacus/core';
import { WindowObject } from '../model/tms.model';
import { TmsConfig } from './tms-config';

export const defaultAdobeLaunchConfig: TmsConfig = {
  tagManager: {
    aep: {
      pushStrategy: <T extends CxEvent>(
        event: T,
        windowObject: WindowObject
      ) => {
        windowObject.digitalData = {
          ...windowObject.digitalData,
          ...event,
        };
      },
    },
  },
};
