import { NgModule } from '@angular/core';
import { CartAddEntrySuccessEvent } from '@spartacus/core';
import { PageEvent } from '@spartacus/storefront';
import { AdobeLaunchModule } from '@spartacus/tms/adobe-launch';
import { GoogleTagManagerModule } from '@spartacus/tms/gtm';

@NgModule({
  imports: [
    GoogleTagManagerModule.forRoot({
      tms: {
        gtm: {
          // events: [PageEvent, CartAddEntryEvent],
        },
      },
    }),
    AdobeLaunchModule.forRoot({
      tms: {
        adobeLaunch: {
          events: [PageEvent, CartAddEntrySuccessEvent],
        },
      },
    }),
  ],
})
export class TmsFeatureModule {}
