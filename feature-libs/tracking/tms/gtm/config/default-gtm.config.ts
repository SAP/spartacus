import { TmsCollectorConfig, TmsConfig } from '@spartacus/tracking/tms/core';
import { GtmCollectorService } from '../services/gtm-collector.service';

export interface GtmCollectorConfig extends TmsCollectorConfig {
  gtmId?: string;
}

declare module '@spartacus/tracking/tms/core' {
  interface TmsCollectors {
    gtm?: GtmCollectorConfig;
  }
}

export const defaultGoogleTagManagerConfig: TmsConfig = {
  tagManager: {
    gtm: {
      collector: GtmCollectorService,
    },
  },
};
