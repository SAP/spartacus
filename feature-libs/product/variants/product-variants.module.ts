/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ProductVariantsOccModule } from '@spartacus/product/variants/occ';
import { ProductVariantsComponentsModule } from '@spartacus/product/variants/components';

@NgModule({
  imports: [ProductVariantsOccModule, ProductVariantsComponentsModule],
})
export class ProductVariantsModule {}
