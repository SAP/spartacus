import { TmsConfig } from '@spartacus/tracking/tms/core';
import { GtmCollectorService } from '../services/gtm-collector.service';

declare module '@spartacus/tracking/tms/core' {
  interface TmsCollectorConfig {
    gtmId?: string;
  }
}

export const defaultGoogleTagManagerConfig: TmsConfig = {
  tagManager: {
    gtm: {
      collector: GtmCollectorService,
    },
  },
};
