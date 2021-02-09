import { NgModule } from '@angular/core';
import {
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
} from '@spartacus/core';
import { NavigationEvent } from '@spartacus/storefront';
import { TmsCoreModule } from '@spartacus/tracking/tms/core';

@NgModule({
  imports: [
    TmsCoreModule.forRoot({
      tagManager: {
        gtm: {
          events: [NavigationEvent, CartAddEntrySuccessEvent],
        },
        aep: {
          events: [NavigationEvent, CartRemoveEntrySuccessEvent],
        },
      },
    }),
  ],
})
export class TrackingFeatureModule {}
