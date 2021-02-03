import { CxEvent, WindowRef } from '@spartacus/core';
import { TmsConfig } from './tms-config';

interface GtmWindow extends Window {
  dataLayer: CxEvent[];
}

export const defaultGoogleTagManagerConfig: TmsConfig = {
  tms: {
    gtm: {
      dataLayerPush: <T extends CxEvent>(event: T, winRef: WindowRef) => {
        const win = winRef.nativeWindow as GtmWindow;
        if (!win?.dataLayer) {
          win.dataLayer = win.dataLayer ?? [];
        }
        win?.dataLayer?.push(event);
      },
    },
  },
};
