/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { OutletModule } from '../../../cms-structure/outlet/outlet.module';
import { ProductSummaryComponent } from './product-summary.component';

@NgModule({
  imports: [CommonModule, OutletModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductSummaryComponent: {
          component: ProductSummaryComponent,
        },
      },
    }),
  ],
  declarations: [ProductSummaryComponent],
  exports: [ProductSummaryComponent],
})
export class ProductSummaryModule {}
