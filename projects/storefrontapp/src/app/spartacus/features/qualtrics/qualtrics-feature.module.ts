/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@commerce-storefront-toolset/core';
import {
  QualtricsRootModule,
  QUALTRICS_FEATURE,
} from '@commerce-storefront-toolset/qualtrics/root';

@NgModule({
  imports: [QualtricsRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [QUALTRICS_FEATURE]: {
          module: () =>
            import('@commerce-storefront-toolset/qualtrics').then((m) => m.QualtricsModule),
        },
      },
    }),
  ],
})
export class QualtricsFeatureModule {}
