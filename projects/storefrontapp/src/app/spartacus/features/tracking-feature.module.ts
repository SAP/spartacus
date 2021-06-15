import { NgModule } from '@angular/core';
import {
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
  CmsConfig,
  provideConfig,
} from '@spartacus/core';
import { NavigationEvent } from '@spartacus/storefront';
import {
  PersonalizationRootModule,
  PERSONALIZATION_FEATURE,
} from '@spartacus/tracking/personalization/root';
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
    provideConfig(<TmsConfig>{
      tagManager: {
        gtm: {
          events: [NavigationEvent, CartAddEntrySuccessEvent],
        },
        aep: {
          events: [NavigationEvent, CartRemoveEntrySuccessEvent],
        },
      },
    }),
    provideConfig(<CmsConfig>{
      featureModules: {
        [PERSONALIZATION_FEATURE]: {
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
