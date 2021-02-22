import { TmsConfig } from '@spartacus/tracking/tms/core';
import { GaCollectorService } from '../services/ga-collector.service';

export const defaultGoogleAnalyticsConfig: TmsConfig = {
  tagManager: {
    ga: {
      collector: GaCollectorService,
    },
  },
};
