/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import { CDP_FEATURE } from 'integration-libs/cdp/feature-name';

@NgModule({
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [CDP_FEATURE]: {
          module: () =>
            import('@spartacus/cdp').then((m) => m.CdpModule),
        },
      },
    }),
  ],
})
export class CdpFeatureModule {}
