/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CmsConfig, ConfigModule, I18nModule } from '@commerce-storefront-toolset/core';
import { SpinnerModule } from '@commerce-storefront-toolset/storefront';
import { BulkPricingTableComponent } from './bulk-pricing-table.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    SpinnerModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        BulkPricingTableComponent: {
          component: BulkPricingTableComponent,
        },
      },
    }),
  ],
  declarations: [BulkPricingTableComponent],
  exports: [BulkPricingTableComponent],
})
export class BulkPricingTableModule {}
