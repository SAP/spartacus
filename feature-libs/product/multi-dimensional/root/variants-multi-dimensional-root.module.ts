/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { PRODUCT_MULTIDIMENSIONAL_FEATURE } from './feature-name';

export function defaultProductMultiDimensionalComponentsConfig() {
  const config = {
    featureModules: {
      [PRODUCT_MULTIDIMENSIONAL_FEATURE]: {
        cmsComponents: [
          'ProductVariantSelectorComponent', // mock trigger
          'ProductVariantMultiDimensionalSelectorComponent'
        ]
      }
    }
  };
  return config;
}

@NgModule({
  providers: [
    provideDefaultConfigFactory(defaultProductMultiDimensionalComponentsConfig)
  ]
})
export class VariantsMultiDimensionalRootModule {
}
