/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {  provideDefaultConfigFactory } from '@spartacus/core';
import { PRODUCT_BULK_PRICING_FEATURE } from './feature-name';
import {CmsConfig} from "../../../../projects/cms";

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultProductBulkPricingComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [PRODUCT_BULK_PRICING_FEATURE]: {
        cmsComponents: ['BulkPricingTableComponent'],
      },
    },
  };

  return config;
}

@NgModule({
  imports: [],
  providers: [
    provideDefaultConfigFactory(defaultProductBulkPricingComponentsConfig),
  ],
})
export class BulkPricingRootModule {}
