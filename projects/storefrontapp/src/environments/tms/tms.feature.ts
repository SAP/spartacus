import { CartAddEntryEvent, CartAddEntrySuccessEvent } from '@spartacus/core';
import { HomePageEvent, PageEvent } from '@spartacus/storefront';
import { TmsModule } from '@spartacus/tms';
import { FeatureEnvironment } from '../models/feature.model';

export const tmsFeature: FeatureEnvironment = {
  imports: [
    TmsModule.forRoot({
      tms: {
        gtm: {
          events: [HomePageEvent, PageEvent, CartAddEntryEvent],
        },
        adobeLaunch: {
          events: [HomePageEvent, PageEvent, CartAddEntrySuccessEvent],
        },
      },
    }),
  ],
};
