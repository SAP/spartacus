import { TmsConfig } from '@spartacus/tracking/tms/core';
import { AepCollectorService } from '../services/aep-collector.service';

export const defaultAdobeExperiencePlatformConfig: TmsConfig = {
  tagManager: {
    aep: {
      debug: true,
      collector: AepCollectorService,
      script: {
        url:
          '//assets.adobedtm.com/ccc66c06b30b/3d6ad0fe69f4/launch-2243563c1764-development.min.js',
      },
    },
  },
};
