import { CxEvent } from '@spartacus/core';
import { WindowObject } from '../model/tms.model';
import { TmsConfig } from './tms-config';

export const defaultGoogleTagManagerConfig: TmsConfig = {
  tagManager: {
    gtm: {
      pushStrategy: <T extends CxEvent>(
        event: T,
        windowObject: WindowObject
      ) => {
        windowObject.dataLayer = windowObject.dataLayer ?? [];
        windowObject.dataLayer.push(event);
      },
    },
  },
};
