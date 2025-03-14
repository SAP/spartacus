/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import {
  PERSONALIZATION_FEATURE,
  PersonalizationRootModule,
} from '@spartacus/tracking/personalization/root';

@NgModule({
  declarations: [],
  imports: [PersonalizationRootModule],
  providers: [
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
export class PersonalizationFeatureModule {}
