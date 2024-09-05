/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';




import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { ProductVariantsContainerComponent } from './product-variants-container/product-variants-container.component';
import { ProductVariantsGuard } from './guards/product-variants.guard';

@NgModule({
  imports: [],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductVariantSelectorComponent: {
          component: ProductVariantsContainerComponent,
          guards: [ProductVariantsGuard],
        },
      },
    }),
  ],
})
export class ProductVariantsComponentsModule {}
