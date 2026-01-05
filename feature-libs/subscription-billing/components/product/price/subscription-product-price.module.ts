/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { SubscriptionProductPriceComponent } from './subscription-product-price.component';
import { SubscriptionProductUsageChargeModule } from '../usage/subscription-product-usage-charge.module';

@NgModule({
  imports: [CommonModule, I18nModule, SubscriptionProductUsageChargeModule],
  declarations: [SubscriptionProductPriceComponent],
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
