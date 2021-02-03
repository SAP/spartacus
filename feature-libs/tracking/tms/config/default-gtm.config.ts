import { CxEvent } from '@spartacus/core';
import { WindowLike } from '../model/tms.model';
import { TmsConfig } from './tms-config';

export const defaultGoogleTagManagerConfig: TmsConfig = {
  tms: {
    gtm: {
      pushStrategy: <T extends CxEvent>(event: T, windowLike: WindowLike) => {
        windowLike.dataLayer = windowLike.dataLayer ?? [];
        windowLike.dataLayer?.push(event);
      },
    },
  },
};
