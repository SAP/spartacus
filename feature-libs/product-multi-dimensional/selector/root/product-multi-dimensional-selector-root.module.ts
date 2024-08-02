/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { PRODUCT_MULTI_DIMENSIONAL_SELECTOR_FEATURE } from './feature-name';

export function defaultProductMultiDimensionalSelectorComponentsConfig() {
  return {
    featureModules: {
      [PRODUCT_MULTI_DIMENSIONAL_SELECTOR_FEATURE]: {
        cmsComponents: ['ProductMultiDimensionalSelectorComponent'],
      },
    },
  };
}

@NgModule({
  providers: [
    provideDefaultConfigFactory(
      defaultProductMultiDimensionalSelectorComponentsConfig
    ),
  ],
})
export class ProductMultiDimensionalSelectorRootModule {}
