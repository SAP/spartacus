/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { PRODUCT_MULTIDIMENSIONAL_FEATURE } from './feature-name';
import { defaultProductMultiDimensionalConfig } from './config/default-product-multi-dimensional-config';

export function defaultProductMultiDimensionalComponentsConfig() {
  return {
    featureModules: {
      [PRODUCT_MULTIDIMENSIONAL_FEATURE]: {
        cmsComponents: [
          'ProductVariantSelectorComponent', // TBD trigger
          'ProductVariantMultiDimensionalSelectorComponent',
        ],
      },
    },
  };
}

@NgModule({
  providers: [
    provideDefaultConfig(defaultProductMultiDimensionalConfig),
    provideDefaultConfigFactory(defaultProductMultiDimensionalComponentsConfig),
  ],
})
export class VariantsMultiDimensionalRootModule {}
