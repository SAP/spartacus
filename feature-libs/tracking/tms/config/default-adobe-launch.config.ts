import { CxEvent, WindowRef } from '@spartacus/core';
import { TmsConfig } from './tms-config';

interface AdobeLaunchWindow extends Window {
  digitalData: {};
}

export const defaultAdobeLaunchConfig: TmsConfig = {
  tms: {
    adobeLaunch: {
      dataLayerInit: (winRef: WindowRef) => {
        const win = winRef.nativeWindow as AdobeLaunchWindow;
        if (win) {
          win.digitalData = win.digitalData ?? {};
        }
      },
      dataLayerPush: <T extends CxEvent>(event: T, winRef: WindowRef) => {
        const win = winRef.nativeWindow as AdobeLaunchWindow;
        if (win) {
          win.digitalData = {
            ...win.digitalData,
            ...event,
          };
        }
      },
      debug: false,
      events: [],
    },
  },
};
