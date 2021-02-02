import { CxEvent, WindowRef } from '@spartacus/core';
import { TmsConfig } from './tms-config';

export const defaultGoogleTagManagerConfig: TmsConfig = {
  tms: {
    gtm: {
      dataLayerInit: (winRef: WindowRef) => {
        if (winRef.nativeWindow) {
          winRef.nativeWindow['dataLayer'] =
            winRef.nativeWindow['dataLayer'] ?? [];
        }
      },
      dataLayerPush: <T extends CxEvent>(event: T, winRef: WindowRef) => {
        winRef.nativeWindow?.['dataLayer']?.push(event);
      },
      debug: false,
      events: [],
    },
  },
};
