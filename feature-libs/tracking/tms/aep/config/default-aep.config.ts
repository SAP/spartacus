import { TmsConfig } from '@spartacus/tracking/tms/core';
import { AepCollectorService } from '../services/aep-collector.service';

export const defaultAdobeExperiencePlatformConfig: TmsConfig = {
  tagManager: {
    aep: {
      collector: AepCollectorService,
    },
  },
};
