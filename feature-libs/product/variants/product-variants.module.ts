/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ProductVariantsComponentsModule } from '@spartacus/product/variants/components';
import { ProductVariantsOccModule } from '@spartacus/product/variants/occ';

@NgModule({
  imports: [ProductVariantsOccModule, ProductVariantsComponentsModule],
})
export class ProductVariantsModule {}
