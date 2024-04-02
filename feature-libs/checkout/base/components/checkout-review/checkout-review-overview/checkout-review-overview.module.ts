/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { PromotionsModule } from '@spartacus/storefront';
import { CartNotEmptyGuard } from '../../guards/cart-not-empty.guard';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
import { CheckoutReviewOverviewComponent } from './checkout-review-overview.component';

@NgModule({
  declarations: [CheckoutReviewOverviewComponent],
  imports: [CommonModule, PromotionsModule, I18nModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutReviewOverview: {
          component: CheckoutReviewOverviewComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
})
export class CheckoutReviewOverviewModule {}
