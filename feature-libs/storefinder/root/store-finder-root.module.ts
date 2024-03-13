/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {NgModule} from '@angular/core';
import {provideDefaultConfig, provideDefaultConfigFactory,} from '@spartacus/core';
import {defaultStoreFinderLayoutConfig} from './config/default-store-finder-layout-config';
import {STORE_FINDER_FEATURE} from './feature-name';
import {CmsConfig} from "../../../projects/cms";

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultStoreFinderComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [STORE_FINDER_FEATURE]: {
        cmsComponents: ['StoreFinderComponent'],
      },
    },
  };

  return config;
}

@NgModule({
  declarations: [],
  providers: [
    provideDefaultConfig(defaultStoreFinderLayoutConfig),
    provideDefaultConfigFactory(defaultStoreFinderComponentsConfig),
  ],
})
export class StoreFinderRootModule {}
