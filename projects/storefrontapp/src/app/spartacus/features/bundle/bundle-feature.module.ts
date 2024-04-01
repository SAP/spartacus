/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { BUNDLE_FEATURE, BundleRootModule } from '@spartacus/cart/bundle/root';
import { provideConfig } from '@spartacus/core';

@NgModule({
  imports: [BundleRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [BUNDLE_FEATURE]: {
          module: () =>
            import('@spartacus/cart/bundle').then((m) => m.BundleModule),
        },
      },
    }),
  ],
})
export class BundleFeatureModule {}
