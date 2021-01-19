import { CartAddEntryEvent, CartAddEntrySuccessEvent } from '@spartacus/core';
import { PageEvent } from '@spartacus/storefront';
import { TmsModule } from '@spartacus/tms';
import { FeatureEnvironment } from '../models/feature.model';

export const tmsFeature: FeatureEnvironment = {
  imports: [
    TmsModule.forRoot({
      tms: {
        gtm: {
          events: [PageEvent, CartAddEntryEvent],
        },
        adobeLaunch: {
          events: [PageEvent, CartAddEntrySuccessEvent],
        },
      },
    }),
  ],
};
