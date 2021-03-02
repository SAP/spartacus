import { TmsConfig } from '@spartacus/tracking/tms/core';
import { GtmCollectorService } from '../services/gtm-collector.service';

export const defaultGoogleTagManagerConfig: TmsConfig = {
  tagManager: {
    gtm: {
      debug: true,
      collector: GtmCollectorService,
      script: {
        url: 'https://www.googletagmanager.com/gtm.js?id=GTM-NFCR3XV',
      },
    },
  },
};
