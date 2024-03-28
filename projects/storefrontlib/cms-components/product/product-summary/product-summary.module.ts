/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  FeaturesConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultBreakingChangesFlags,
  provideDefaultConfig,
} from '@spartacus/core';
import { OutletModule } from '../../../cms-structure/outlet/outlet.module';
import { PromotionsModule } from '../../misc/promotions/promotions.module';
import { ProductSummaryComponent } from './product-summary.component';

@NgModule({
  providers: [
    provideDefaultConfig(<CmsConfig | FeaturesConfig>{
      cmsComponents: {
        ProductSummaryComponent: {
          component: ProductSummaryComponent,
        },
      },
    }),
    provideDefaultBreakingChangesFlags({
      showPromotionsInPDP: false,
    }),
  ],
  declarations: [ProductSummaryComponent],
  exports: [ProductSummaryComponent],
  imports: [
    CommonModule,
    OutletModule,
    I18nModule,
    PromotionsModule,
    FeaturesConfigModule,
  ],
})
export class ProductSummaryModule {}
