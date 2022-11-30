/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultBundleLayoutConfig } from './config/default-bundle-layout-config';
import { BUNDLE_FEATURE } from './feature-name';

@NgModule({
  declarations: [],
  providers: [
    provideDefaultConfig(defaultBundleLayoutConfig),
    provideDefaultConfig({
      featureModules: {
        [BUNDLE_FEATURE]: {
          cmsComponents: ['BundleCarouselComponent', 'CartTotalsComponent'],
        },
      },
    }),
  ],
})
export class BundleRootModule {}
