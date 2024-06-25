/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';

export function defaultProductMultiDimensionalComponentsConfig() {
  const config = {
    featureModules: {
      variantsMultidimensional: {
        cmsComponents: [
          'ProductVariantSelectorComponent', // mock trigger
          'ProductVariantMultiDimensionalSelectorComponent',
          'ProductOrderGridTabComponent',
        ],
      },
    },
  };
  return config;
}

@NgModule({
  imports: [],
  providers: [
    provideDefaultConfigFactory(defaultProductMultiDimensionalComponentsConfig),
  ],
})
export class VariantsMultiDimensionalRootModule {}
