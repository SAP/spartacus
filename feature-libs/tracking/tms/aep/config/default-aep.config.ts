import { TmsCollectorConfig, TmsConfig } from '@spartacus/tracking/tms/core';
import { AepCollectorService } from '../services/aep-collector.service';

export interface AepCollectorConfig extends TmsCollectorConfig {
  scriptUrl?: string;
}

declare module '@spartacus/tracking/tms/core' {
  interface TmsCollectors {
    aep?: AepCollectorConfig;
  }
}

export const defaultAdobeExperiencePlatformConfig: TmsConfig = {
  tagManager: {
    aep: {
      collector: AepCollectorService,
    },
  },
};
