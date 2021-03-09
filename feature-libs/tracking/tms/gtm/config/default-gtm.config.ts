import { TmsConfig } from '@spartacus/tracking/tms/core';
import { GtmCollectorService } from '../services/gtm-collector.service';

export const defaultGoogleTagManagerConfig: TmsConfig = {
  tagManager: {
    gtm: {
      collector: GtmCollectorService,
    },
  },
};
