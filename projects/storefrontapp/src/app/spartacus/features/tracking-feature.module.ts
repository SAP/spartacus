import { NgModule } from '@angular/core';
import {
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
} from '@spartacus/core';
import { NavigationEvent } from '@spartacus/storefront';
import { TmsModule } from '@spartacus/tracking/tms';

@NgModule({
  imports: [
    TmsModule.forRoot({
      tms: {
        gtm: {
          events: [NavigationEvent, CartAddEntrySuccessEvent],
        },
        adobeLaunch: {
          events: [NavigationEvent, CartRemoveEntrySuccessEvent],
        },
      },
    }),
  ],
})
export class TrackingFeatureModule {}
