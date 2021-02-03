import { CxEvent, WindowRef } from '@spartacus/core';
import { TmsConfig } from './tms-config';

interface AdobeLaunchWindow extends Window {
  digitalData: {};
}

export const defaultAdobeLaunchConfig: TmsConfig = {
  tms: {
    adobeLaunch: {
      dataLayerPush: <T extends CxEvent>(event: T, winRef: WindowRef) => {
        const win = winRef.nativeWindow as AdobeLaunchWindow;
        if (win) {
          if (!win.digitalData) {
            win.digitalData = win.digitalData ?? {};
          }

          win.digitalData = {
            ...win.digitalData,
            ...event,
          };
        }
      },
    },
  },
};
