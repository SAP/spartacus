import { CxEvent, WindowRef } from '@spartacus/core';
import { TmsConfig } from './tms-config';

export const defaultAdobeLaunchConfig: TmsConfig = {
  tms: {
    adobeLaunch: {
      dataLayerInit: (winRef: WindowRef) => {
        if (winRef.nativeWindow) {
          winRef.nativeWindow['digitalData'] =
            winRef.nativeWindow['digitalData'] ?? {};
        }
      },
      dataLayerPush: <T extends CxEvent>(event: T, winRef: WindowRef) => {
        if (winRef.nativeWindow) {
          winRef.nativeWindow['digitalData'] = {
            ...winRef.nativeWindow['digitalData'],
            ...event,
          };
        }
      },
      debug: false,
      events: [],
    },
  },
};
