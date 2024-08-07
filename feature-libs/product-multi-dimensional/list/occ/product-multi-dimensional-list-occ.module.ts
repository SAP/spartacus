/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccProductMultiDimensionalListConfig } from './config/default-occ-product-multi-dimensional-list-config';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccProductMultiDimensionalListConfig),
  ],
})
export class ProductMultiDimensionalListOccModule {}
