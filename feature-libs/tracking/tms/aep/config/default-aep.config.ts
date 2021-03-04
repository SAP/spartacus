import { TmsConfig } from '@spartacus/tracking/tms/core';
import { AepCollectorService } from '../services/aep-collector.service';

declare module '@spartacus/tracking/tms/core' {
  interface TmsCollectorConfig {
    scriptUrl?: string;
  }
}

export const defaultAdobeExperiencePlatformConfig: TmsConfig = {
  tagManager: {
    aep: {
      collector: AepCollectorService,
    },
  },
};
