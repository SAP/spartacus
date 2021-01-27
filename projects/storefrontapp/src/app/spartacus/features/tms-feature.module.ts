import { NgModule } from '@angular/core';
import { CartAddEntrySuccessEvent } from '@spartacus/core';
import { PageEvent } from '@spartacus/storefront';
import { TmsModule } from '@spartacus/tms';

@NgModule({
  imports: [
    TmsModule.forRoot({
      tms: {
        gtm: {
          // events: [PageEvent, CartAddEntryEvent],
        },
        adobeLaunch: {
          events: [PageEvent, CartAddEntrySuccessEvent],
        },
      },
    }),
  ],
})
export class TmsFeatureModule {}
