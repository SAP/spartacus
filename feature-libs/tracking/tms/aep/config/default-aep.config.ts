import { TmsConfig } from '@spartacus/tracking/tms/core';
import { AepCollectorService } from '../aep-collector.service';

export const defaultAdobeExperiencePlatformConfig: TmsConfig = {
  tagManager: {
    aep: {
      collector: AepCollectorService,
    },
  },
};
