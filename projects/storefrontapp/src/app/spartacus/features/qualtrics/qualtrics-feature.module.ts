/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import {
  QUALTRICS_FEATURE,
  QualtricsRootModule,
} from '@spartacus/qualtrics/root';

@NgModule({
  imports: [QualtricsRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [QUALTRICS_FEATURE]: {
          module: () =>
            import('@spartacus/qualtrics').then((m) => m.QualtricsModule),
        },
      },
    }),
  ],
})
export class QualtricsFeatureModule {}
