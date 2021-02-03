import { CxEvent } from '@spartacus/core';
import { WindowLike } from '../model/tms.model';
import { TmsConfig } from './tms-config';

export const defaultAdobeLaunchConfig: TmsConfig = {
  tms: {
    adobeLaunch: {
      dataLayerPush: <T extends CxEvent>(event: T, windowLike: WindowLike) => {
        if (!windowLike.digitalData) {
          windowLike.digitalData = windowLike.digitalData ?? {};
        }

        windowLike.digitalData = {
          ...windowLike.digitalData,
          ...event,
        };
      },
    },
  },
};
