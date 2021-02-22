import { NgModule } from '@angular/core';
import {
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
  provideConfig,
} from '@spartacus/core';
import { NavigationEvent } from '@spartacus/storefront';
import { AepModule } from '@spartacus/tracking/tms/aep';
import { BaseTmsModule, TmsConfig } from '@spartacus/tracking/tms/core';
import { GaModule } from '@spartacus/tracking/tms/ga';
import { GtmModule } from '@spartacus/tracking/tms/gtm';

@NgModule({
  imports: [BaseTmsModule.forRoot(), GaModule, GtmModule, AepModule],
  providers: [
    provideConfig({
      tagManager: {
        ga: {
          events: [NavigationEvent],
        },
        gtm: {
          events: [NavigationEvent, CartAddEntrySuccessEvent],
        },
        aep: {
          events: [NavigationEvent, CartRemoveEntrySuccessEvent],
        },
      },
    } as TmsConfig),
  ],
})
export class TrackingFeatureModule {}
