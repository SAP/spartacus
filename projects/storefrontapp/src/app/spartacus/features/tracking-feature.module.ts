import { NgModule } from '@angular/core';
import {
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
  provideConfig,
} from '@spartacus/core';
import { NavigationEvent } from '@spartacus/storefront';
import { PersonalizationRootModule } from '@spartacus/tracking/personalization/root';
import { AepModule } from '@spartacus/tracking/tms/aep';
import { BaseTmsModule, TmsConfig } from '@spartacus/tracking/tms/core';
import { GtmModule } from '@spartacus/tracking/tms/gtm';

@NgModule({
  imports: [
    BaseTmsModule.forRoot(),
    GtmModule,
    AepModule,
    PersonalizationRootModule,
  ],
  providers: [
    provideConfig({
      tagManager: {
        gtm: {
          events: [NavigationEvent, CartAddEntrySuccessEvent],
          gtmId: 'GTM-NFCR3XV',
        },
        aep: {
          events: [NavigationEvent, CartRemoveEntrySuccessEvent],
          scriptUrl:
            '//assets.adobedtm.com/ccc66c06b30b/3d6ad0fe69f4/launch-2243563c1764-development.min.js',
        },
      },
    } as TmsConfig),
    provideConfig({
      featureModules: {
        personalization: {
          module: () =>
            import('@spartacus/tracking/personalization').then(
              (m) => m.PersonalizationModule
            ),
        },
      },
    }),
  ],
})
export class TrackingFeatureModule {}
