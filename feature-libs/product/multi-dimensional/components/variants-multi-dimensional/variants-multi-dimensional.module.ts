/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { VariantsMultiDimensionalComponent } from './variants-multi-dimensional.component';
import { RouterModule } from '@angular/router';
import { VariantsMultiDimensionalGuard } from '../guards/variants-multi-dimensional.guard';
import { MediaModule } from '@spartacus/storefront';
import { VariantsMultiDimensionalSelectorComponent } from './variants-multi-dimensional-selector/variants-multi-dimensional-selector.component';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, I18nModule, MediaModule],
  declarations: [
    VariantsMultiDimensionalComponent,
    VariantsMultiDimensionalSelectorComponent,
  ],
  exports: [
    VariantsMultiDimensionalComponent,
    VariantsMultiDimensionalSelectorComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        // ProductVariantMultiDimensionalSelectorComponent
        ProductVariantSelectorComponent: {
          component: VariantsMultiDimensionalComponent,
          guards: [VariantsMultiDimensionalGuard],
        },
      },
    }),
  ],
})
export class VariantsMultiDimensionalModule {}
