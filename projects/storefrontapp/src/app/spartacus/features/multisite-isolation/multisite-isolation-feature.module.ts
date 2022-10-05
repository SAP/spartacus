/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import {
  MultisiteIsolationRootModule,
  MULTISITE_ISOLATION_FEATURE,
} from '@spartacus/multisite-isolation/root';

@NgModule({
  imports: [MultisiteIsolationRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [MULTISITE_ISOLATION_FEATURE]: {
          module: () =>
            import('@spartacus/multisite-isolation').then(
              (m) => m.MultisiteIsolationModule
            ),
        },
      },
    }),
  ],
})
export class MultisiteIsolationFeatureModule {}
