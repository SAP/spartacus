import { GtmCollectorService } from './gtm-collector.service';
import { TmsConfig } from './tms-config';

export const defaultGoogleTagManagerConfig: TmsConfig = {
  tagManager: {
    gtm: {
      collector: GtmCollectorService,
    },
  },
};
