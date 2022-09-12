/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ProductVariantsOccModule } from '@commerce-storefront-toolset/product/variants/occ';
import { ProductVariantsComponentsModule } from '@commerce-storefront-toolset/product/variants/components';

@NgModule({
  imports: [ProductVariantsOccModule, ProductVariantsComponentsModule],
})
export class ProductVariantsModule {}
