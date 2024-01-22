/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { ProductVariantsGuard } from './guards/product-variants.guard';
import { ProductVariantsContainerComponent } from './product-variants-container/product-variants-container.component';
import { ProductVariantsContainerModule } from './product-variants-container/product-variants-container.module';
import { ProductVariantColorSelectorModule } from './variant-color-selector/product-variant-color-selector.module';
import { ProductVariantSizeSelectorModule } from './variant-size-selector/product-variant-size-selector.module';
import { ProductVariantStyleSelectorModule } from './variant-style-selector/product-variant-style-selector.module';

@NgModule({
  imports: [
    ProductVariantsContainerModule,
    ProductVariantColorSelectorModule,
    ProductVariantSizeSelectorModule,
    ProductVariantStyleSelectorModule,
  ],
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
