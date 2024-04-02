/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { PRODUCT_FUTURE_STOCK_FEATURE } from './feature-name';

export function defaultFutureStockComponentsConfig() {
  return {
    featureModules: {
      [PRODUCT_FUTURE_STOCK_FEATURE]: {
        cmsComponents: ['FutureStockComponent'],
      },
    },
  };
}

@NgModule({
  imports: [],
  providers: [provideDefaultConfigFactory(defaultFutureStockComponentsConfig)],
})
export class FutureStockRootModule {}
