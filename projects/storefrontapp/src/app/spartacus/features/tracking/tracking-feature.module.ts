/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
} from '@commerce-storefront-toolset/cart/base/root';
import { CmsConfig, provideConfig } from '@commerce-storefront-toolset/core';
import { NavigationEvent } from '@commerce-storefront-toolset/storefront';
import {
  PersonalizationRootModule,
  PERSONALIZATION_FEATURE,
} from '@commerce-storefront-toolset/tracking/personalization/root';
import { AepModule } from '@commerce-storefront-toolset/tracking/tms/aep';
import { BaseTmsModule, TmsConfig } from '@commerce-storefront-toolset/tracking/tms/core';
import { GtmModule } from '@commerce-storefront-toolset/tracking/tms/gtm';

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
            import('@commerce-storefront-toolset/tracking/personalization').then(
              (m) => m.PersonalizationModule
            ),
        },
      },
    }),
  ],
})
export class TrackingFeatureModule {}
