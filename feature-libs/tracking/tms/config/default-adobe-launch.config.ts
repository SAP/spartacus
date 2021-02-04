import { CxEvent } from '@spartacus/core';
import { WindowLike } from '../model/tms.model';
import { TmsConfig } from './tms-config';

export const defaultAdobeLaunchConfig: TmsConfig = {
  tagManager: {
    aep: {
      pushStrategy: <T extends CxEvent>(event: T, windowLike: WindowLike) => {
        windowLike.digitalData = {
          ...windowLike.digitalData,
          ...event,
        };
      },
    },
  },
};
