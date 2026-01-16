/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { SubscriptionProductUsageChargeModule } from '../usage/subscription-product-usage-charge.module';
import { SubscriptionProductPriceComponent } from './subscription-product-price.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    SubscriptionProductUsageChargeModule,
    SubscriptionProductPriceComponent,
  ],
  exports: [SubscriptionProductPriceComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SubscriptionProductPriceComponent: {
          component: SubscriptionProductPriceComponent,
        },
      },
    }),
  ],
})
export class SubscriptionProductPriceModule {}
