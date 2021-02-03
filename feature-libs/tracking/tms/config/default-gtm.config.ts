import { CxEvent, WindowRef } from '@spartacus/core';
import { TmsConfig } from './tms-config';

interface GtmWindow extends Window {
  dataLayer: CxEvent[];
}

export const defaultGoogleTagManagerConfig: TmsConfig = {
  tms: {
    gtm: {
      dataLayerInit: (winRef: WindowRef) => {
        const win = winRef.nativeWindow as GtmWindow;
        if (win) {
          win.dataLayer = win.dataLayer ?? [];
        }
      },
      dataLayerPush: <T extends CxEvent>(event: T, winRef: WindowRef) => {
        const win = winRef.nativeWindow as GtmWindow;
        win?.dataLayer?.push(event);
      },
      debug: false,
      events: [],
    },
  },
};
