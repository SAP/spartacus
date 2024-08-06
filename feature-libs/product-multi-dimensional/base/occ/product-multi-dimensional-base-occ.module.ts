/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccProductMultiDimensionalBaseConfig } from './config/default-occ-product-multi-dimensional-base-config';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccProductMultiDimensionalBaseConfig),
  ],
})
export class ProductMultiDimensionalBaseOccModule {}
