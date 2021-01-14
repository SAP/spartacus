import {
  CartAddEntryEvent,
  CartAddEntryFailEvent,
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
  CartUpdateEntrySuccessEvent,
} from '@spartacus/core';
import { HomePageEvent, PageEvent } from '@spartacus/storefront';
import { TmsModule } from '@spartacus/tms';
import { FeatureEnvironment } from '../models/feature.model';

export const tmsFeature: FeatureEnvironment = {
  imports: [
    TmsModule.forRoot({
      tms: {
        gtm: {
          events: [
            CartAddEntryEvent,
            CartAddEntrySuccessEvent,
            CartAddEntryFailEvent,
            CartRemoveEntrySuccessEvent,
            CartUpdateEntrySuccessEvent,
          ],
        },
        adobeLaunch: {
          events: [PageEvent, HomePageEvent],
        },
      },
    }),
  ],
};
