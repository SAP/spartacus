import { NgModule } from '@angular/core';
import { CartAddEntryEvent, CartAddEntrySuccessEvent } from '@spartacus/core';
import { NavigationEvent } from '@spartacus/storefront';
import { AdobeLaunchModule } from '@spartacus/tms/adobe-launch';
import { GoogleTagManagerModule } from '@spartacus/tms/gtm';

@NgModule({
  imports: [
    GoogleTagManagerModule.forRoot({
      tms: {
        gtm: {
          debug: false,
          events: [NavigationEvent, CartAddEntryEvent],
        },
      },
    }),
    AdobeLaunchModule.forRoot({
      tms: {
        adobeLaunch: {
          debug: false,
          events: [NavigationEvent, CartAddEntrySuccessEvent],
        },
      },
    }),
  ],
})
export class TmsFeatureModule {}
